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
  ScrollView
} from "react-native";
import { auth, db } from "../Firebase";
import { getDatabase, push, ref, onValue, query } from "firebase/database";
import { ListItem, Avatar, Icon, Button } from "react-native-elements";

const ReadBooks = ({navigation}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
       var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("isRead")
      .equalTo(true)
      .once("value", function (snapshot) {
        if (snapshot.val()) {
          setItems(Object.values(snapshot.val()));
        }
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return refresh;
  }, [navigation]);

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
    alert("Book removed succesfully");
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 0}} style={{ backgroundColor: "white", paddingRight: 54}} >

      {items.map((item, i) => (
        <View>
        <ListItem.Swipeable 
          key={i}
            bottomDivider
          rightContent={
            <Button
              title="Delete"
              icon={{ name: "delete", color: "white" }}
              buttonStyle={{ minHeight: "100%", backgroundColor: "red", marginLeft: 20 }}
              onLongPress={() => { removeItem(item.bookId) }}
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
          </View>
      ))}
    </ScrollView>
);
}

export default ReadBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
