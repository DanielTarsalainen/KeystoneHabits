import React from 'react';
import {StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import KeystoneHabits from '../Habits';
import ReadingInfo from '../ReadingInfo';
import MeditationInfo from '../MeditationInfo'

const Stack = createStackNavigator();

export default function HabitsNav() {
  
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="KeystoneHabits" component={KeystoneHabits} />
        <Stack.Screen options={{ headerShown: true }} name="Reading information" component={ReadingInfo} />
        <Stack.Screen options={{headerShown: true}} name="Meditation information" component={MeditationInfo} />

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