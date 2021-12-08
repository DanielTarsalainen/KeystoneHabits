import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Homepage';
import Books from './Books';
import Meditations from './Meditations'
import BooksNav from './BooksNav'

import { MaterialCommunityIcons } from '@expo/vector-icons';
// import LoginNav from './navigations/LoginNav'



const MainNav = () => {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Stoic wisdom') {
              iconName = 'thought-bubble';
            } else if (route.name === 'BooksNav') {
              iconName = 'bookshelf';
            } else if (route.name === 'Meditations') {
              iconName = 'meditation' 
            }
            
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen options={{headerShown: false}} name="Stoic wisdom" component={HomePage} />
        <Tab.Screen options={{headerShown: false}} name="BooksNav" component={BooksNav} />
        <Tab.Screen options={{headerShown: false}} name="Meditations" component={Meditations}/>
      </Tab.Navigator>
    )
}

export default MainNav

const styles = StyleSheet.create({})
