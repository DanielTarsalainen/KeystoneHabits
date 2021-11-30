import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomePage from './Homepage';
import { Ionicons } from '@expo/vector-icons';



export default function App() {

const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Settings') {
              iconName = 'md-settings';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomePage} />

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