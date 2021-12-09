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
import ListOwnItem, { Separator } from "./ListOwnItems";

export default function OwnBooks() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref.once("value", function (snapshot) {
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
                alert("updated succesfully")
            })
        });
    }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
            <ListOwnItem {...item} onRightPress={() => removeItem(item.bookId)}
            onSwipeFromLeft={() => markAsRead(item.bookId)}/>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
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
