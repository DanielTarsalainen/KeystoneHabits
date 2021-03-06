import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HabitsNav from "./HabitsNav";
import BooksNav from "./BooksNav";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomepageDrawer from "./HomepageDrawer";

const MainNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Stoic wisdom") {
            iconName = "thought-bubble";
          } else if (route.name === "Books page") {
            iconName = "bookshelf";
          } else if (route.name === "Habits") {
            iconName = "meditation";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Stoic wisdom"
        component={HomepageDrawer}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Books page"
        component={BooksNav}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Habits"
        component={HabitsNav}
      />
    </Tab.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
