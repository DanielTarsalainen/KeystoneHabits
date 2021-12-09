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

const ReadBooks = () => {
  const [items, setItems] = useState([]);

  console.log(items);

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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
            <View>
                <Text>{item.author}</Text>
                <Text>{item.title}</Text>
            {item.picture != null ? (
              <Image
                source={{ uri: item.picture }}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg",
                }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
        )}
      />
    </SafeAreaView>
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
