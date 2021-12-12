import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../Firebase";
import { getDatabase, push, ref, onValue, query } from "firebase/database";
import { ListItem, Avatar, Icon, Button } from "react-native-elements";

const ReadBooks = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("isRead")
      .equalTo(true)
      .once("value", function (snapshot) {
        if (snapshot.val()) {
          setItems(Object.values(snapshot.val()));
        }
      });
  }, [items]);

  const removeItem = (bookId) => {
    var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("bookId")
      .equalTo(bookId)
      .on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          ref.child(data.key).remove();
          deleteItemById(bookId);
        });
      });
  };

  const deleteItemById = (bookId) => {
    const filteredData = items.filter((item) => item.bookId !== bookId);
    setItems(filteredData);
    alert("Book removed succesfully")
  };

  return (
    <View>
      {items.map((item, i) => (
        <ListItem.Swipeable
          key={i}
          bottomDivider
          rightContent={
            <Button
              title="Delete"
              icon={{ name: "delete", color: "white" }}
              buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              onPress={() => {removeItem(item.bookId)}}
            />
          }
        >
          <Avatar size="large" source={{ uri: item.picture }} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
            <Image source={{ uri: item.picture }} style={styles.image} />
          </ListItem.Content>

          <ListItem.Chevron />
        </ListItem.Swipeable>
      ))}
    </View>
  );
};

export default ReadBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
