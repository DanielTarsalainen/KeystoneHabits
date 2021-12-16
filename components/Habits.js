import React, { useState, useEffect, useRef, createRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { auth, db } from "../Firebase";
import { push, ref, onValue } from "firebase/database";
import { PricingCard, Button } from "react-native-elements";

export default function KeystoneHabits({ navigation }) {
  const [timeRead, setTimeRead] = useState("");
  const [timeMeditated, setTimemeditated] = useState("");
  const [meditationItems, setMeditationItems] = useState([]);
  const [readingItems, setReadingItems] = useState([]);
  const [totalReadingTime, setTotalReadingTime] = useState(0);
  const [totalMeditationtime, setTotalMeditationTime] = useState(0);
  const isMountedRef = useRef(1);
  const inputRef = createRef();

  let monthtime = new Date().toISOString().slice(0, 10);

  const saveReadingTime = () => {
    setTimeRead("");
    inputRef.current.clear();
    let clocktime = new Date().toLocaleTimeString().slice(0, 8);

    if (!isNaN(+timeRead) && timeRead.length > 0) {
      push(ref(db, `reading/${auth.currentUser.uid}`), {
        reading_duration: timeRead,
        date: monthtime + " at " + clocktime,
      });
      console.log("added succesfully");
    }
  };

  const saveMeditationTime = () => {
    setTimemeditated("");
    inputRef.current.clear();
    let clocktime = new Date().toLocaleTimeString().slice(0, 8);

    if (!isNaN(+timeMeditated) && timeMeditated.length > 0) {
      push(ref(db, `meditation/${auth.currentUser.uid}`), {
        meditation_duration: timeMeditated,
        date: monthtime + " at " + clocktime,
      });
      console.log("added succesfully");
    }
  };

  useEffect(() => {
    setMeditationItems([]);
    setReadingItems([]);

    const refresh = navigation.addListener("focus", () => {
      const meditationRef = ref(db, `meditation/${auth.currentUser.uid}`);
      onValue(meditationRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMeditationItems(Object.values(data));
          getMeditationSum(Object.values(data));
        }
      });
      return refresh;
    });

    const readingRef = ref(db, `reading/${auth.currentUser.uid}`);
    onValue(readingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setReadingItems(Object.values(data));
        getReadingSum(Object.values(data));
      }
    });
    // Clean up
    return () => {
      setReadingItems([]);
      setMeditationItems([]);
      setTimeRead("");
      setTimemeditated("");
      setTotalReadingTime(0);
      setTotalMeditationTime(0);
    };
  }, []);

  // Clean up 2
  useEffect(() => {
    isMountedRef.current = true; // set true when mounted
    return () => ((isMountedRef.current = false), (inputRef.current = false)); // clear when unmounted
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
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.cards}>
        <PricingCard
          containerStyle={{ margin: 1 }}
          pricingStyle={{ marginTop: -24 }}
          color="#4fdc6d"
          title="Reading"
          info={[
            `Total sessions: ${readingItems.length}`,
            `${totalReadingTime} minutes`,
            `Or ${(totalReadingTime / 60).toFixed(2)} hours in total`,
            `Average duration: ${
              totalReadingTime
                ? (totalReadingTime / readingItems.length).toFixed(0)
                : 0
            } minutes`,
          ]}
          button={{ title: "Track your progress", icon: "flight-takeoff" }}
          onButtonPress={() => navigation.navigate("ReadingInfo")}
        />
        <PricingCard
          containerStyle={{ margin: 1 }}
          pricingStyle={{ marginTop: -24 }}
          color="#4fdcba"
          title="Meditation"
          info={[
            `Total sessions: ${meditationItems.length}`,
            `${totalMeditationtime} minutes`,
            `Or ${(totalMeditationtime / 60).toFixed(2)} hours in total`,
            `Average duration: ${
              totalMeditationtime
                ? (totalMeditationtime / meditationItems.length).toFixed(0)
                : 0
            } minutes`,
          ]}
          button={{ title: "Track your progress", icon: "flight-takeoff" }}
          onButtonPress={() => navigation.navigate("MeditationInfo")}
        />
      </View>

      <View style={{ position: "absolute", bottom: 0 }}>
        <View style={styles.container2}>
          <View style={styles.container3}>
            <TextInput
              ref={inputRef}
              placeholder="Set reading duration"
              value={timeRead}
              onChangeText={(text) => setTimeRead(text)}
              style={styles.input}
              placeholderTextColor={"black"}
            />
            <Button
              icon={{ name: "save", size: 15, color: "white" }}
              onPress={saveReadingTime}
              title="Save reading"
              buttonStyle={{
                borderRadius: 30,
                backgroundColor: "#4fdc6d",
                marginTop: 10,
              }}
            />
          </View>
          <View style={styles.container4}>
            <TextInput
              ref={inputRef}
              placeholder="Set meditation duration"
              value={timeMeditated}
              onChangeText={(text) => setTimemeditated(text)}
              style={styles.input}
              placeholderTextColor={"black"}
            />
            <Button
              icon={{ name: "save", size: 15, color: "white" }}
              title="Save meditation"
              buttonStyle={{
                borderRadius: 30,
                backgroundColor: "#4fdcba",
                marginTop: 10,
              }}
              onPress={saveMeditationTime}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cards: {
    flexDirection: "column",
    backfaceVisibility: "hidden",
  },
  container2: {
    flexDirection: "row",
    marginTop: "auto",
  },
  container3: {
    flexDirection: "column",
    marginHorizontal: 10,
  },
  container4: {
    flexDirection: "column",
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: "#eef9f3",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 14,
    color: "black",
  },
});
