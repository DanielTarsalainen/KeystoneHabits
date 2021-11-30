import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { Card, Button, Text, useTheme, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 


export default function App() {

  const Tab = createBottomTabNavigator();

  const [quoteData, setQuoteData] = useState([])
  const [photoData, setPhotoData] = useState("")
  const [counter, setCounter] = useState(1);

  let dayOfMonth = new Date().toISOString().slice(0, 10);
  const { theme } = useTheme();
  
  // Following logic (lines 18-85) represents the following call: "render a new quote and image automatically everyday"
  // I Decided to use React Native Community's aSyncStorage 

  const storeDateData = async (value) => {
    try {
    const toString = value.toString()
    await AsyncStorage.setItem('@day_data', toString)
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
    const savedDate = await AsyncStorage.getItem('@day_data')
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
        .then(responseJson => storePhotoData(responseJson.urls.small))
        .catch(error => {
          isString(photoData) ? Alert.alert("Exceeded the picture request limit") :
            Alert.alert('Error', error)
        })
  }
  
  const getNewData = () => {
    incrementCounter()
    getQuoteData()
    getPhotoData()
    if (counter == 4) {
      Alert.alert("Caution! Requests (total requests of all users) are limited to 50/hour")
      setCounter(1)
    }
  }

  const incrementCounter = () => setCounter(counter + 1);

 
  useEffect(() => {
    getData()
  }, []);


  return (
    <View style={styles.container}>
      
      <Text h2 style={{ fontFamily: 'monospace', textAlignVertical: 'top', flex: 1, marginTop: 8 }}>  KeystoneHabits </Text>

      <Text style={styles.text} h4 h4Style={{ color: theme?.colors?.primary }}>
        Here's a daily dose of Stoic wisdom for you: </Text>
      <View style={{marginBottom: 100}}>
      <Card>
        <Card.Title>A quote from {quoteData.author}</Card.Title>
        <Card.Divider></Card.Divider>
        <Text>"{quoteData.body}"</Text>
        <Card.Divider></Card.Divider>
        {!!photoData ? 
        <Card.Image   
          source={{uri:photoData}}
        />
          : <Text>Too many renders, come back later!</Text>
        }
              <AntDesign style={{position: 'absolute',
                right: 5,
                  top: -1}} onPress={getNewData} name="retweet" size={24} color="black" />
              </Card>
              </View>
          <View style={{ marginTop: 20,  }}>
              
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: "center"


  }
}
)