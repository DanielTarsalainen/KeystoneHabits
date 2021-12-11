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
  KeyboardAvoidingView
} from "react-native";
import { auth, db } from "../Firebase";
import { getDatabase, push, ref, onValue, query, connectDatabaseEmulator } from "firebase/database";

export default function KeystoneHabits() {
  

  const [timeRead, setTimeRead] = useState("");
  const [timeMeditated, setTimemeditated] = useState("");
  const [meditationItems, setMeditationItems] = useState([])
  const [readingItems, setReadingItems] = useState([])
  const [totalReadingTime, setTotalReadingTime] = useState(0)
  const [totalMeditationtime, setTotalMeditationTime] = useState(0)
  const [avgReading, setAvgReading] = useState(0)
  const [avgMeditating, setAvgMeditating] = useState(0)


  let monthtime = new Date().toISOString().slice(0, 10)

  const saveReadingTime = () => {
    let clocktime = new Date().toLocaleTimeString().slice(0, 5)
    
    push(ref(db, `reading/${auth.currentUser.uid}`), {
      'reading_duration': timeRead,
      'date': monthtime + " " + clocktime
    });
    console.log("added succesfully")
  }

  const saveMeditationTime = () => {
  let clocktime = new Date().toLocaleTimeString().slice(0, 5)
    
    push(ref(db, `meditation/${auth.currentUser.uid}`), {
      'meditation_duration': timeMeditated,
      'date': monthtime + " " + clocktime
    });
    console.log("added succesfully")
  }


  useEffect(() => {
    const meditationRef = ref(db, `meditation/${auth.currentUser.uid}`)
    onValue(meditationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMeditationItems(Object.values(data));
        getMeditationSum(Object.values(data))
      }
    })

    const readingRef = ref(db, `reading/${auth.currentUser.uid}`)
    onValue(readingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setReadingItems(Object.values(data));
        getReadingSum(Object.values(data))
      }
    })
  }, []);

  const getReadingSum = (data) => {
    const func = (data.reduce((a, b) => a = a + parseInt(b.reading_duration), 0))
    getAvgReading(func)
    setTotalReadingTime(func)
  }

  const getMeditationSum = (data) => {
    const func = (data.reduce((a, b) => a = a + parseInt(b.meditation_duration), 0))
    getAvgMeditating(func)
    setTotalMeditationTime(func)
  }

  

  const getAvgReading = (data) => {
    const func = (data / readingItems.length).toFixed(0)
    setAvgReading(func)
    console.log(data)
  }
  console.log(avgReading)

  const getAvgMeditating = (data) => {
    setAvgMeditating((data / readingItems.length).toFixed(0))
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.text}>Total minutes of reading {totalReadingTime}</Text>
      <Text style={styles.text}>Total minutes of meditation: {totalMeditationtime} </Text>
      <Text style={styles.text}>Average duration of reading: {avgReading}</Text>
      <Text style={styles.text}>Average duration of meditating: {avgMeditating} </Text>


      <View style={styles.inputContainer}>
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
        <Button onPress={saveMeditationTime} title="Save meditation time"></Button>
        <Button title="Track your progress" ></Button>
      </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 200
  },
  inputContainer: {
    marginTop: 400,
  },
  input: {
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttons: {
    flexDirection: "row",
    marginTop: 47,
    flexDirection: "row",
    alignItems: "center"
  },
  list: {
    fontWeight: "bold"
  }
});

