import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet } from "react-native";
import Books from "../Books";
import OwnBooks from "../OwnBooks";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FinishedBooks from '../FinishedBooks';


const Drawer = createDrawerNavigator();


const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen options={{headerShown: false}} name="Books" component={Books} />
      <Drawer.Screen name="Reading currently" component={OwnBooks} />
      <Drawer.Screen name="Finished books" component={FinishedBooks} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});
