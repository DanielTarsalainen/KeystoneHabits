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

const RightActions = ({ progress, dragX, onPress }) => {
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

const FinishedItem = ({ author, picture, title, onRightPress }) => (
  <Swipeable
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}>
    <View style={styles.container}>
      <ListItem.Title>{title}</ListItem.Title>
      {author ? <ListItem.Subtitle>{author}</ListItem.Subtitle> : null}
      {picture ? (
        <Image source={{ uri: picture }} style={{ width: 100, height: 100 }} />
      ) : null}
    </View>
  </Swipeable>
);

export default FinishedItem;

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
