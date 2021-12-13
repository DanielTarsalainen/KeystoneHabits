import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  StyleSheet,
  View
} from "react-native";
import {
  Card,
  Text,
  useTheme,
  Overlay,
  Icon
} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function Homepage({navigation}) {
  const { theme } = useTheme();
  const Tab = createBottomTabNavigator();
  const [quoteData, setQuoteData] = useState([]);
  const [photoData, setPhotoData] = useState("");
  const [counter, setCounter] = useState(1);
  let dayOfMonth = new Date().toISOString().slice(0, 10);
  const [visible, setVisible] = useState(false);
  const isMountedRef = useRef(1)


  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const storeDateData = async (value) => {
    try {
      const toString = value.toString();
      await AsyncStorage.setItem("@day_data", toString);
      getData();
    } catch (e) {
      return e;
    }
  };

  const storeQuoteData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@quote_data", jsonValue);
      getQuoteStorage();
    } catch (e) {
      return e;
    }
  };

  const storePhotoData = async (value) => {
    try {
      await AsyncStorage.setItem("@photo_data", value);
      getPhotoStorage();
    } catch (e) {
      return e;
    }
  };

  const getPhotoStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@photo_data");
      setPhotoData(value);
    } catch (e) {
      return e;
    }
  };

  const getQuoteStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@quote_data");
      const valueToObject = JSON.parse(value);
      setQuoteData(valueToObject);
    } catch (e) {
      return e;
    }
  };

  const getData = async () => {
    setVisible(true)
    try {
      const savedDate = await AsyncStorage.getItem("@day_data");
      const parsedSavedDate = Date.parse(savedDate);
      const parsedInitialDate = Date.parse(dayOfMonth);

      if (parsedSavedDate == parsedInitialDate) {
          getQuoteStorage();
          getPhotoStorage()
          // }, 500);
      } else if (!savedDate || parsedSavedDate < parsedInitialDate) {
          storeDateData(dayOfMonth);
          getQuoteData();
          getPhotoData();
      }
    } catch (e) {
      return e;
    }
  };

  const getQuoteData = () => {
    fetch("https://stoic-server.herokuapp.com/random")
      .then((reponse) => reponse.json())
      .then((responseJson) => storeQuoteData(responseJson[0]))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  function isString(value) {
    return typeof value === "string" || value instanceof String;
  }

  const getPhotoData = () => {
    fetch(
      "https://api.unsplash.com/photos/random?client_id=b7YQ1F52WYTy-uNWGKFdp1ADP09pfDvLJs3uUQ7cMBg&query=wanderlust,nature"
    )
      .then((response) => response.json())
      .then((responseJson) => storePhotoData(responseJson.urls.small))
      .catch((error) => {
        isString(photoData)
          ? Alert.alert("Exceeded the picture request limit")
          : Alert.alert("Error", error);
      });
  };

  const getNewData = () => {
    incrementCounter();
    getQuoteData();
    getPhotoData();
    if (counter == 4) {
      Alert.alert(
        "Caution! Requests (total requests of all users) are limited to 50/hour"
      );
      setCounter(1);
    }
  };

  const incrementCounter = () => setCounter(counter + 1);
  

  // Clean up 1
  useEffect(() => {
    getData();
    return () => {
      setQuoteData([]);
      setPhotoData("");
      setVisible(null)
      dayOfMonth = null
      setCounter(null)
    };
  }, []);


  // Clean up 2
  useEffect(() => {
  isMountedRef.current = true;               // set true when mounted
    return () =>
      isMountedRef.current = false; // clear when unmounted
  }, []);

  
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity hitSlop={{top: 30, bottom: 30, left: 50, right: 50}}>
          <Icon style={{position: "absolute"}} name='rightcircleo' type='antdesign' color='#517fa4' size={50} onPress={() => navigation.toggleDrawer
            ()} />
          </TouchableOpacity>
        </View>
      <Overlay overlayStyle={{ padding: 70, borderRadius: 20 }} isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Welcome to KeystoneHabits. I hope you enjoy this simple application! :)
        </Text>
      </Overlay>
      <View style={styles.content}>
      <Text style={styles.text} h4 h4Style={{ color: theme?.colors?.black }}>
        Here's a daily dose of Stoic wisdom for you:
      </Text>
        <Card>
          <Card.Title>A quote from {quoteData.author}</Card.Title>
          <Card.Divider></Card.Divider>
          <Text>"{quoteData.body}"</Text>
          <Card.Divider></Card.Divider>
          {!!photoData ? (
            <Card.Image source={{ uri: photoData }} />
          ) : (
            <Text>Too many renders, come back later!</Text>
          )}
          <AntDesign
            style={{ position: "absolute", right: 5, top: -1 }}
            onPress={getNewData}
            name="retweet"
            size={24}
            color="black"
          />
          </Card>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: "center",
  },
  buttonOutLine: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  }, 
  buttonContainer: {
  top: 55,
  right: 10,
  alignSelf: 'flex-end',
  position: "absolute"
  }
});
