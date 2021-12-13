import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import KeystoneHabits from './KeystoneHabits';
import ReadingInfo from './ReadingInfo';
import MeditationInfo from './MeditationInfo'
// import LoginNav from './navigations/LoginNav'

const Stack = createStackNavigator();

export default function HabitsNav() {
  
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="KeystoneHabits" component={KeystoneHabits} />
        <Stack.Screen options={{ headerShown: true }} name="ReadingInfo" component={ReadingInfo} />
        <Stack.Screen options={{headerShown: true}} name="MeditationInfo" component={MeditationInfo} />

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