import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Books from './Books';
import OwnBooks from './OwnBooks'
// import LoginNav from './navigations/LoginNav'

const Stack = createStackNavigator();

export default function App() {
  
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Books" component={Books} />
        <Stack.Screen options={{headerShown: true}} name="OwnBooks" component={OwnBooks} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 140
  },
  text: {
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: "center"
  }
}
)