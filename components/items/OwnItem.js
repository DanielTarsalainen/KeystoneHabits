import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { ListItem } from "react-native-elements";

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Mark as read
      </Animated.Text>
    </View>
  );
};

const RightActions = ({ dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
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

const OwnItem = ({
  author,
  picture,
  title,
  pages,
  onSwipeFromLeft,
  onRightPress,
}) => (
  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={onSwipeFromLeft}
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
  >
    <View style={styles.container}>
      <ListItem.Title>{title}</ListItem.Title>
      {author ? <ListItem.Subtitle>Author: {author}</ListItem.Subtitle> : null}
      { pages ?
        <ListItem.Subtitle>Number of pages: {pages}</ListItem.Subtitle>
      : null}
      {picture ? (
        <Image source={{ uri: picture }} style={{ width: 100, height: 100 }} />
      ) : null}
    </View>
  </Swipeable>
);

export default OwnItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: 300,
  },
  text: {
    color: "#4a4a4a",
    fontSize: 15,
  },
  leftAction: {
    backgroundColor: "#98f500",
    justifyContent: "center",
  },
  rightAction: {
    backgroundColor: "#f58900",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end",
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20,
    fontSize: 20,
  },
});
