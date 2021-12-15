import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import HomePage from "../Homepage";
import { Icon } from "react-native-elements";
import { auth } from "../../Firebase";
import { useNavigation } from "@react-navigation/core";

const Drawer = createDrawerNavigator();

export default function MainDrawerNav() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <TouchableOpacity
              hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
            >
              <Icon
                name="log-out"
                type="feather"
                color="#517fa4"
                size={34}
                onPress={handleSignOut}
              />
            </TouchableOpacity>
            <View>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Log out
              </Text>
            </View>
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        options={{ drawerPosition: "right", headerShown: false }}
        name="Home"
        component={HomePage}
      />
    </Drawer.Navigator>
  );
}
