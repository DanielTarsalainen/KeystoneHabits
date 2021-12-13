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
  KeyboardAvoidingView,
} from "react-native";
import { auth, db } from "../Firebase";
import {
  getDatabase,
  push,
  ref,
  onValue,
  query,
  connectDatabaseEmulator,
} from "firebase/database";
import { ListItem, Avatar, SearchBar, Icon, PricingCard } from "react-native-elements";


export default function KeystoneHabits() {
  const [timeRead, setTimeRead] = useState("");
  const [timeMeditated, setTimemeditated] = useState("");
  const [meditationItems, setMeditationItems] = useState([]);
  const [readingItems, setReadingItems] = useState([]);
  const [totalReadingTime, setTotalReadingTime] = useState(0);
  const [totalMeditationtime, setTotalMeditationTime] = useState(0);

  let monthtime = new Date().toISOString().slice(0, 10);

  const saveReadingTime = () => {
    let clocktime = new Date().toLocaleTimeString().slice(0, 5);

    if (!isNaN(+timeMeditated)) {
    push(ref(db, `reading/${auth.currentUser.uid}`), {
      reading_duration: timeRead,
      date: monthtime + " " + clocktime,
    }    
    );
      console.log("added succesfully");
      }
  };

  const saveMeditationTime = () => {
    let clocktime = new Date().toLocaleTimeString().slice(0, 5);

    if (!isNaN(+timeMeditated)) {
      push(ref(db, `meditation/${auth.currentUser.uid}`), {
        meditation_duration: timeMeditated,
        date: monthtime + " " + clocktime,
      });
      console.log("added succesfully");
    }
  };

  useEffect(() => {
    setMeditationItems([])
    setReadingItems([])
    
    const meditationRef = ref(db, `meditation/${auth.currentUser.uid}`);
    onValue(meditationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMeditationItems(Object.values(data));
        getMeditationSum(Object.values(data));
      }
    });

    const readingRef = ref(db, `reading/${auth.currentUser.uid}`);
    onValue(readingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setReadingItems(Object.values(data));
        getReadingSum(Object.values(data));
      }
    });
  }, []);

  const getReadingSum = (data) => {
    const func = data.reduce(
      (a, b) => (a = a + parseInt(b.reading_duration)),
      0
    );
    setTotalReadingTime(func);
  };

  const getMeditationSum = (data) => {
    const func = data.reduce(
      (a, b) => (a = a + parseInt(b.meditation_duration)),
      0
    );
    setTotalMeditationTime(func);
  };

  return (
    <View style={styles.container}>
     <PricingCard
        color="#4f9deb"
        title="Reading"
        price={totalReadingTime}
        info={["Minutes in total", `Or ${(totalReadingTime / 60).toFixed(2)} hours`, `Average duration: ${(totalReadingTime / readingItems.length).toFixed(0)} minutes`]}
        button={{ title: "Track your progress", icon: "flight-takeoff" }}
      />  
      <PricingCard
        color="#4f9deb"
        title="Meditation"
        price={totalMeditationtime}
        info={["Minutes in total", `Or ${(totalMeditationtime / 60).toFixed(2)} hours`, `Average duration: ${(totalMeditationtime / meditationItems.length).toFixed(0)} minutes`] }
        button={{ title: "Track your progress", icon: "flight-takeoff" }}
      />  
         <TextInput
          placeholder="Set reading duration"
          value={timeRead}
          onChangeText={(text) => setTimeRead(text)}
          style={styles.input}
      />
      
        <Button onPress={saveReadingTime} title="Save reading time"></Button>
        <TextInput
          placeholder="Set meditation duration"
          value={timeMeditated}
          onChangeText={(text) => setTimemeditated(text)}
          style={styles.input}
        />
        <Button
          onPress={saveMeditationTime}
          title="Save meditation time"
        ></Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  }
});
