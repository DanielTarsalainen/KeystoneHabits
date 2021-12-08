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
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    backgroundColor: '#dd2c00',
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

const ListItem = ({ volumeInfo, onSwipeFromLeft, onRightPress }) => (
  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={onSwipeFromLeft}
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
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

const ListOwnItem = ({ author, picture, title, onSwipeFromLeft, onRightPress }) => (
  <Swipeable
    // renderLeftActions={LeftActions}
    // onSwipeableLeftOpen={onSwipeFromLeft}
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
  >
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{author}</Text>
            {picture != null ? (
              <Image
                source={{ uri: picture }}
                style={{ width: 100, height: 100 }}
              />
            ) : <Image
                source={{ uri: "https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg" }}
                style={{ width: 100, height: 100 }}
              /> }
    </View>
  </Swipeable>
);

export default ListOwnItem