import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomerNavigation from "./CustomerNavigation";
import Account from "../Pages/Account";
import Services from "../Pages/Services";
import Home from "../Pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: "green",
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Clients" component={CustomerNavigation} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen
        name="Account"
        children={() => <Account onLogout={onLogout} />}
      />
    </Tab.Navigator>
  );
};
const Navigation = ({ onLogout }) => {
  return (
    <NavigationContainer>
      <TabNavigator onLogout={onLogout} />
    </NavigationContainer>
  );
};

export default Navigation;
