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
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { userId } from "./Homepage"
import { auth, db } from '../Firebase';
import { getDatabase, push, ref, onValue } from "firebase/database";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
import Item, { Separator } from './Item';

export default function Books({navigation}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

   const saveItem = (item) => {
     let isTrue = false;

     var bookRef = db.ref(`books/${auth.currentUser.uid}`);
    bookRef.orderByChild("bookId").equalTo(item.id).on("value", function (snapshot) {
       if (snapshot) {
         isTrue = true
       }
     })

     if (isTrue == false) {
     push(ref(db, `books/${auth.currentUser.uid}`), {
      'author': item.volumeInfo.authors ? item.volumeInfo.authors[0] : null, 'title': item.volumeInfo.title ? item.volumeInfo.title : null, 'picture': item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : null , 'isRead': false, 'bookId': item.id, 'userid': auth.currentUser.uid
    });
    deleteItemById(item.id)
     alert("Book " + item.volumeInfo.title + ' added succesfully')
     } else {
       alert("You already have this book")
     }
     }
  
  const deleteItemById = (id) => {
    const filteredData = books.filter(item => item.id !== id);
    setBooks(filteredData)
  }

  const getBooks = () => {
    console.log(searchTerm)
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyD0JSSkprb0aJy9r-csuF7aWT3k7Jyhop8`
    )
      .then((reponse) => reponse.json())
      .then((responseJson) => setBooks(responseJson.items))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

   useEffect(() => {
   setBooks([])
  }, [!searchTerm]);

 
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
            <Item style={styles.item}
              {...item}
              onSwipeFromLeft={() => saveItem(item)}
              />
              </View>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
         <TextInput
        style={{ fontSize: 18, width: 200 }}
        placeholder="keyword"
        onChangeText={(text) => setSearchTerm(text)}
        />
        <View style={styles.buttons}>
      <Button title="Search books" onPress={getBooks}></Button>
      <Button onPress={() => navigation.navigate('Bookshelf')} title="OwnBooks"/>
      </View>
      </SafeAreaView>

    );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20
  },
  buttons: {
    flexDirection: "row",
  }

});
