import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { auth, db } from "../Firebase";
import {  Icon } from "react-native-elements";


const EditItem = ({navigation}) => {
  const route = useRoute();
  const { object } = route.params;
  const [pages, setPages] = useState("");
  const isMountedRef = useRef(null);

  if (global.__fbBatchedBridge) {
  const origMessageQueue = global.__fbBatchedBridge;
  const modules = origMessageQueue._remoteModuleTable;
  const methods = origMessageQueue._remoteMethodTable;
  global.findModuleByModuleAndMethodIds = (moduleId, methodId) => {
    console.log(`The problematic line code is in: ${modules[moduleId]}.${methods[moduleId][methodId]}`)
  }
}


  const updatePages = () => {
    var ref = db.ref(`books/${auth.currentUser.uid}`);
    ref
      .orderByChild("id")
      .equalTo(object.id)
      .on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          ref.child(data.key).update({
            pagesRead: pages,
          });
          exitPage()
        });
      });
  };
      
    const exitPage = () => {
        navigation.replace("OwnBooks")
    }

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    return () => {
      setPages("")
      const isMountedRef = useRef(null);
    };
  }, []);

  return (
      <View style={styles.container}>
          <Text>Set current page</Text>
      <TextInput
        placeholder="Pages"
        value={pages}
        onChangeText={(text) => setPages(text)}
        style={styles.input}
          />
          <Icon style={{marginTop: 20}} onPress={updatePages}
          name='save-outline'
          type='ionicon'
            color='#517fa4'
        />
    </View>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
  },
});
