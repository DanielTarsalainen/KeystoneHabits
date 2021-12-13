import React, { useEffect, useState, Time } from 'react';
import { Alert, StyleSheet, View, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Homepage';
import Books from './Books';
import HabitsNav from './HabitsNav'
import DrawerNav from './DrawerNav'
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import LoginNav from './navigations/LoginNav'
import MainDrawerNav from './MainDrawerNav'




const MainNav = () => {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Stoic wisdom') {
              iconName = 'thought-bubble';
            } else if (route.name === 'Books page') {
              iconName = 'bookshelf';
            } else if (route.name === 'Habits') {
              iconName = 'meditation' 
            }
            
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen options={{headerShown: false}} name="Stoic wisdom" component={MainDrawerNav} />
        <Tab.Screen options={{headerShown: false}} name="Books page" component={DrawerNav} />
        <Tab.Screen options={{headerShown: false}} name="Habits" component={HabitsNav}/>
      </Tab.Navigator>
    )
}

export default MainNav

const styles = StyleSheet.create({})
