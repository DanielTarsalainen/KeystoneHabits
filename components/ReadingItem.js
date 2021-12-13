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
import { ListItem, Avatar } from 'react-native-elements'

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const ReadingItem = ({ reading_duration, date, onRightPress }) => (
  <Swipeable
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
  >
    <View style={styles.container}>
      <ListItem.Title>{reading_duration} minutes of reading</ListItem.Title>
      <ListItem.Subtitle>{date}</ListItem.Subtitle>
    </View>
  </Swipeable>
);

export default ReadingItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 300
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  rightAction: {
    backgroundColor: '#f96d4e',
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