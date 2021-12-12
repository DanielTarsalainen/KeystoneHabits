import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Books from "./Books";
import OwnBooks from "./OwnBooks";
import ReadBooks from "./ReadBooks";
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();


const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen options={{headerShown: false}} name="Books" component={Books} />
      <Drawer.Screen name="Own books" component={OwnBooks} />
      <Drawer.Screen name="Read books" component={ReadBooks} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});
