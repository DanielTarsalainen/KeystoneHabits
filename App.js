import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/Homepage';
import Books from './components/Books';
import Meditations from './components/Meditations'
import Saved_books from './components/Saved_books'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Stoic wisdom') {
              iconName = 'thought-bubble';
            } else if (route.name === 'Books') {
              iconName = 'bookshelf';
            } else if (route.name === 'Meditations') {
              iconName = 'meditation'
            }
            
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Stoic wisdom" component={HomePage} />
        <Tab.Screen name="Books" component={Books} />
        <Tab.Screen name="Meditations" component={Meditations}/>
      </Tab.Navigator>
    </ NavigationContainer>
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