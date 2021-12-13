import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  StatusBar,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { auth, db } from "../Firebase";
import { getDatabase, push, ref, onValue, query } from "firebase/database";
import { ListItem, Avatar, Icon, Button } from "react-native-elements";
import MeditationItem, { Separator } from "./MeditationItem";

const MeditationInfo = ({navigation}) => {
  const [items, setItems] = useState([]);


   useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
    const itemsRef = ref(db, `meditation/${auth.currentUser.uid}`)
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItems(Object.values(data));
      }
    })
      });
     return refresh;
   }, [navigation]);
  
  // Clean up
    useEffect(() => {
      return () => {
      setItems([])
    }
  }, []);
    

  const removeItem = (date) => {
    var ref = db.ref(`meditation/${auth.currentUser.uid}`);
    ref
      .orderByChild("date")
      .equalTo(date)
      .on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          ref.child(data.key).remove();
          deleteItemById(date);
        });
      });
  };

  const deleteItemById = (date) => {
    const filteredData = items.filter((item) => item.date !== date);
    setItems(filteredData);
    alert("Meditation session removed succesfully");
    };
    
    console.log(items)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <MeditationItem {...item} onRightPress={() => removeItem(item.date)}
              />
         </ListItem>
        )}
          />
    </SafeAreaView>
);
}

export default MeditationInfo

const styles = StyleSheet.create({  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }})
