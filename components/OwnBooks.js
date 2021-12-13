import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
       var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("isRead")
      .equalTo(false)
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
     alert("Book was removed succesfully")
  };
  
  const markAsReadById = (bookId) => {
    const filteredData = items.filter((item) => item.bookId !== bookId);
    setItems(filteredData);
    alert("Book added to 'Finished books' list ")
    };
    
    const markAsRead = (item) => {
        var ref = db.ref(`books/${auth.currentUser.uid}`);
        ref.orderByChild("bookId").equalTo(item).on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                ref.child(data.key).update({
                    'isRead':true
                })
                markAsReadById(item)
               
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
