import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Books from './Books';
import OwnBooksNav from './OwnBooksNav'
// import LoginNav from './navigations/LoginNav'

const Stack = createStackNavigator();

export default function App() {
  
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: true}} name="Books" component={Books} />
        <Stack.Screen options={{headerShown: true}} name="Bookshelf" component={OwnBooksNav} />
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