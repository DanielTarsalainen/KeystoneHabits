import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { auth, db } from "../Firebase";
import { push, ref } from "firebase/database";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
import Item from "./Item";
import { ListItem, SearchBar, Icon } from "react-native-elements";
import googleKey from "../GoogleApi";

export default function Books({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const checkBook = (item) => {
    var ref = db.ref(`books/${auth.currentUser.uid}/`);
    var query = ref.orderByChild("bookId").equalTo(item.id);

    query.once("value", function (snapshot) {
      if (snapshot.exists()) {
        Alert.alert("You already have this book!");
      } else {
        saveBook(item);
      }
    });
  };

  const saveBook = (item) => {
    push(ref(db, `books/${auth.currentUser.uid}`), {
      author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : null,
      title: item.volumeInfo.title ? item.volumeInfo.title : null,
      picture: item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.smallThumbnail
        : null,
      pages: item.volumeInfo.pageCount ? item.volumeInfo.pageCount : null,
      isRead: false,
      bookId: item.id,
      userid: auth.currentUser.uid,
    });
    deleteItemById(item.id);
  };

  const deleteItemById = (id) => {
    const filteredData = books.filter((item) => item.id !== id);
    setBooks(filteredData);
    Alert.alert("Book was added succesfully!");
  };

  const getBooks = (text) => {
    setSearchTerm(text);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${text}&key=${googleKey}`
    )
      .then((reponse) => reponse.json())
      .then((responseJson) => setBooks(responseJson.items))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.input}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => getBooks(text)}
          placeholder="Search an interesting book..."
          value={searchTerm}
          inputStyle={{ backgroundColor: "white" }}
          containerStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderRadius: 20,
          }}
          inputContainerStyle={{ backgroundColor: "white" }}
        />
      </View>
      <View style={styles.menu}>
        <Icon
          name="menu"
          type="feather"
          color="#517fa4"
          size={34}
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <Item
              style={styles.item}
              {...item}
              onSwipeFromLeft={() => checkBook(item)}
            />
          </ListItem>
        )}
      />
      <View style={styles.buttons}></View>
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
  leftAction: {
    backgroundColor: "#388e3c",
    justifyContent: "center",
    flex: 1,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
  },
  input: {
    marginTop: 50,
    width: "80%",
    alignSelf: "flex-end",
    marginRight: 20,
  },
  menu: {
    alignSelf: "flex-start",
    marginTop: -50,
    paddingLeft: 14,
  },
});
