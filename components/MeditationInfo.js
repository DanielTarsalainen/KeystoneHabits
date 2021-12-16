import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { auth, db } from "../Firebase";
import { ref, onValue } from "firebase/database";
import { ListItem } from "react-native-elements";
import MeditationItem from "./items/MeditationItem";

const MeditationInfo = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
      const itemsRef = ref(db, `meditation/${auth.currentUser.uid}`);
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setItems(Object.values(data));
        }
      });
    });
    return refresh;
  }, [navigation]);

  // Clean up
  useEffect(() => {
    return () => {
      setItems([]);
    };
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <MeditationItem
              {...item}
              onRightPress={() => removeItem(item.date)}
            />
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default MeditationInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
