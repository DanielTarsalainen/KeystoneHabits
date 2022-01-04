import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { auth, db } from "../Firebase";
import { ListItem } from "react-native-elements";
import FinishedItem from "./items/FinishedItem";

const FinishedBooks = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
      var ref = db.ref(`books/${auth.currentUser.uid}`);
      ref
        .orderByChild("isRead")
        .equalTo(true)
        .once("value", function (snapshot) {
          if (snapshot.val()) {
            setItems(Object.values(snapshot.val()));
          }
        });
    });

    return refresh;
  }, [navigation]);

  const removeItem = (id) => {
    var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("id")
      .equalTo(id)
      .on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          ref.child(data.key).remove();
          filterItemById(id);
        });
      });
  };

  const filterItemById = (id) => {
    const filteredData = items.filter((item) => item.id !== id);
    setItems(filteredData);
    alert("Book removed succesfully");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <FinishedItem
              {...item}
              onRightPress={() => removeItem(item.id)}
            />
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default FinishedBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
