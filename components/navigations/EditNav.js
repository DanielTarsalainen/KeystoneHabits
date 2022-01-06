import React from 'react';
import {StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ReadingInfo from '../ReadingInfo';
import OwnBooks from '../OwnBooks';
import EditItem from '../EditItem';

const Stack = createStackNavigator();

export default function EditNav() {
  
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="OwnBooks" component={OwnBooks} />
        <Stack.Screen options={{ headerShown: true }} name="EditItem" component={EditItem} />
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