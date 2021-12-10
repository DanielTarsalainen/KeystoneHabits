import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export const Separator = () => <View style={styles.separator} />;

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
            <Text style={styles.text}>{volumeInfo.title}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
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