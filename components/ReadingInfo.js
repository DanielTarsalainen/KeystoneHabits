import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { auth, db } from "../Firebase";
import { ref, onValue } from "firebase/database";
import { ListItem } from "react-native-elements";
import ReadingItem from "./ReadingItem";

const ReadingInfo = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
      const itemsRef = ref(db, `reading/${auth.currentUser.uid}`);
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setItems(Object.values(data));
        }
      });
    });
    return refresh;
  }, [navigation]);

  // Clean up 2
  useEffect(() => {
    return () => {
      setItems([]);
    };
  }, []);

  const removeItem = (date) => {
    var ref = db.ref(`reading/${auth.currentUser.uid}`);
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
    alert("Reading session removed succesfully");
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ReadingItem {...item} onRightPress={() => removeItem(item.date)} />
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default ReadingInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
