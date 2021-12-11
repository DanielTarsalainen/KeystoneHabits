import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../Firebase";
import { getDatabase, push, ref, onValue, query } from "firebase/database";
import OwnItem, { Separator } from "./OwnItem";
import { ListItem, Avatar } from 'react-native-elements'

export default function OwnBooks({navigation}) {
    
  const [items, setItems] = useState([]);

  console.log(items)

  useEffect(() => {
    var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("isRead")
      .equalTo(false)
      .once("value", function (snapshot) {
        if (snapshot.val()) {
          setItems(Object.values(snapshot.val()));
        }
      });
  }, []);

  const removeItem = (bookId) => {
    var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("bookId")
      .equalTo(bookId)
      .on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          ref.child(data.key).remove();
          deleteItemById(bookId);
          console.log("removed succesfully");
        });
      });
  };

  const deleteItemById = (bookId) => {
    const filteredData = items.filter((item) => item.bookId !== bookId);
    setItems(filteredData);
    };
    
    const markAsRead = (item) => {
        var ref = db.ref(`books/${auth.currentUser.uid}`);
        ref.orderByChild("bookId").equalTo(item).on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                ref.child(data.key).update({
                    'isRead':true
                })
                deleteItemById(item)
                alert("Book added to 'read books' list ")
            })
        });
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <OwnItem {...item} onRightPress={() => removeItem(item.bookId)}
              onSwipeFromLeft={() => markAsRead(item.bookId)} />
         </ListItem>
        )}
          />
        <Button onPress={() => navigation.navigate('Finished books')} title="View books that you have read"> </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
