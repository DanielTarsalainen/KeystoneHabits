import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ListItem, Avatar } from 'react-native-elements'


const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Add to Your books
      </Animated.Text>
    </View>
  );
};

const Item = ({ volumeInfo, onSwipeFromLeft, onRightPress }) => (
  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={onSwipeFromLeft}
    
  >
    <View style={styles.container}>
      <ListItem.Title>{volumeInfo.title}</ListItem.Title>
      {volumeInfo.authors ? 
      <ListItem.Subtitle>{volumeInfo.authors[0]}</ListItem.Subtitle> : null
      }
      
            {volumeInfo.imageLinks ? (
              <Image
                source={{ uri: volumeInfo.imageLinks.thumbnail }}
                style={{ width: 100, height: 100 }}
              />
            ) : null}
    </View>
  </Swipeable>
);

export default Item

const styles = StyleSheet.create({
   container: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 5,
    width: 300
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  leftAction: {
    backgroundColor: '#98f500',
    justifyContent: 'center',
  },
  rightAction: {
    backgroundColor: '#f58900',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
    fontSize: 20
  },
});