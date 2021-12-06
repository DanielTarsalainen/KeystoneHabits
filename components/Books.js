import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Books({ navigation }) {


    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([])
    const [savedBooks, setSavedBooks] = useState([])


    const getBooks = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyD0JSSkprb0aJy9r-csuF7aWT3k7Jyhop8`)
            .then(reponse => reponse.json())
            .then(responseJson => setBooks(responseJson.items))
            .catch(error => {
                Alert.alert('Error', error)
            })
    }

    const saveBook = (item) => {
        setSavedBooks([...savedBooks, item])
        console.log(savedBooks[0])
    }

    return (
        <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
        <View>
                        <Text style={{ fontSize: 18 }}>{item.volumeInfo.title}</Text>
                        { item.volumeInfo.imageLinks ?
                            <Image source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                                style={{ width: 100, height: 100 }} /> :
                            null
                        }
            <Button title="Save" onPress={() => saveBook(item)}></Button>
        </View>
        }
        data={books}/>
      <TextInput style={{ fontSize: 18, width: 200 }} placeholder='keyword'
        onChangeText={text => setSearchTerm(text)} />
            <Button title="Search books" onPress={getBooks}></Button>
             {/* <Button onPress={() => navigation.navigate('Saved_books')}
            title="Saved_books"
          /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
)