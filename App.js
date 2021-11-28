import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [quoteData, setQuoteData] = useState([])
  const [photoData, setPhotoData] = useState("")

  let dayOfMonth = new Date();

  dayOfMonth = dayOfMonth.toISOString().slice(0, 10)



  // Following logic (lines 21-88) represents the idea of: "render a new quote and image automatically everyday"
  // I Decided to use aSyncStorage 

  const storeDateData = async (value) => {
    try {
    const toString = value.toString()
    await AsyncStorage.setItem('@month', toString)
    getData()
  } catch (e) {
    return e
  }
  }
  
  const storeQuoteData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@quote_data', jsonValue)
    getQuoteStorage()
  } catch (e) {
    return e
  }
  }
  
  const storePhotoData = async (value) => {
  try {
    await AsyncStorage.setItem('@photo_data', value)
    getPhotoStorage()
  } catch (e) {
    return e
  }
  }
  
   const getPhotoStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@photo_data')
    setPhotoData(value);
  } catch(e) {
    return e
  }
  }
    
const getQuoteStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@quote_data')
    const valueToObject = JSON.parse(value)
    setQuoteData(valueToObject);
  } catch(e) {
    return e
  }
}
  
const getData = async () => {
  try {
    const savedDate = await AsyncStorage.getItem('@month')
    const parsedSavedDate = Date.parse(savedDate)
    const parsedInitialDate = Date.parse(dayOfMonth)

      if (parsedSavedDate == parsedInitialDate) {
        getQuoteStorage()
        getPhotoStorage()
      } else if (!savedDate || parsedSavedDate < parsedInitialDate) {
        storeDateData(dayOfMonth)
        getQuoteData()
        getPhotoData()
      }

  } catch(e) {
    return e
  }
  }

  const getQuoteData = () => {
    fetch("https://stoic-server.herokuapp.com/random")
      .then(reponse => reponse.json())
      .then(responseJson => storeQuoteData(responseJson[0]))
      // .then(responseJson => setQuoteData(responseJson[0]))
      .catch(error => {
        Alert.alert('Error', error)
      })
  }

  function isString(value) {
    return typeof value === 'string' || value instanceof String;
  }
  
  const getPhotoData = () => {
      fetch("https://api.unsplash.com/photos/random?client_id=b7YQ1F52WYTy-uNWGKFdp1ADP09pfDvLJs3uUQ7cMBg&query=wanderlust,nature")
        .then(response => response.json())
        .then(responseJson => storePhotoData(responseJson.urls.full))
        .catch(error => {
          isString(photoData) ? Alert.alert("Exceeded the picture request limit") :
            Alert.alert('Error', error)
        })
    }

  
  useEffect(() => {
    getData()
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>A quote from {quoteData.author}</Card.Title>
        <Card.Divider></Card.Divider>
        <Text>{quoteData.body}</Text>
        <Card.Divider></Card.Divider>
        {!!photoData ? 
        <Card.Image
          style={{width: '100%', height: '76%'}}
          source={{uri:photoData}}
        />
          : <Text>Too many renders, come back later!</Text>
        }
      </Card>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 190
  },
});
