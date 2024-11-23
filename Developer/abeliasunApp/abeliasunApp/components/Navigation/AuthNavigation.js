import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import { NavigationContainer } from "@react-navigation/native";
import { myTheme } from "./NavigationTheme";

const Stack = createStackNavigator();

const AuthNavigator = ({ onLogin }) => (
  <NavigationContainer theme={myTheme}>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        children={() => <LoginPage onLogin={onLogin} />}
      />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
