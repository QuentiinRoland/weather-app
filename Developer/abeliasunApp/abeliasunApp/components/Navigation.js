import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customer from "./Pages/Customer";
import Account from "./Pages/Account";
import Services from "./Pages/Services";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Clients" component={Customer} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
