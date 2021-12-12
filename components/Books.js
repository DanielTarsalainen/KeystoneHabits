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
  SafeAreaView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { userId } from "./Homepage";
import { auth, db } from "../Firebase";
import { getDatabase, push, ref, onValue, get } from "firebase/database";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
import Item, { Separator } from "./Item";
import { ListItem, Avatar, SearchBar, Icon } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";

export default function Books({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  
  const checkBook = (item) => {
    var ref = db.ref(`books/${auth.currentUser.uid}/`)
    var query = ref.orderByChild("bookId").equalTo(item.id)

    query.once('value', function (snapshot) {
      if (snapshot.exists()) {
        Alert.alert("You already have this book!")
      } else {
        saveBook(item)
      }
    });
  }
  
  const saveBook = (item) => {
    push(ref(db, `books/${auth.currentUser.uid}`), {
      'author': item.volumeInfo.authors ? item.volumeInfo.authors[0] : null, 'title': item.volumeInfo.title ? item.volumeInfo.title : null, 'picture': item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : null , 'isRead': false, 'bookId': item.id, 'userid': auth.currentUser.uid
    });
    deleteItemById(item.id)
  }

  const deleteItemById = (id) => {
    const filteredData = books.filter((item) => item.id !== id);
    setBooks(filteredData);
     Alert.alert("Book was added succesfully!")
  };

  const getBooks = (text) => {  
    setSearchTerm(text)
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${text}&key=AIzaSyD0JSSkprb0aJy9r-csuF7aWT3k7Jyhop8`
    )
      .then((reponse) => reponse.json())
      .then((responseJson) => setBooks(responseJson.items))
      .catch((error) => {
        Alert.alert("Error", error);
      });  
  };

 

  useEffect(() => {
    const timeoutId = setTimeout(() => console.log(`I can see you're not typing. I can use "${searchTerm}" now!`), 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.input}>
       <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => getBooks(text)}
          placeholder="Search an interesting book..."
          value={searchTerm}
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 1}}
          inputContainerStyle={{backgroundColor: 'white'}}
          placeholder={'Type text here'}
        
        />
      </View>
      <View style={styles.menu}>
        <Icon reverse name='menu-outline' type='ionicon' color='#517fa4' onPress={() => navigation.toggleDrawer()} />
      </View>
      <FlatList
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

      <View style={styles.buttons}>
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
    width: "100%",
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
    alignSelf: "stretch",
    marginLeft: 10
  },
  menu: {
    alignSelf: 'flex-end',
    marginTop: -65
  }
});
