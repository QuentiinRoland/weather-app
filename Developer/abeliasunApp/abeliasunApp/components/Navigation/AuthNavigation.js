import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import AccountPage from "../Pages/Account";
import { NavigationContainer } from "@react-navigation/native";
import { myTheme } from "./NavigationTheme";

const Stack = createStackNavigator();

const AuthNavigator = ({ onLogin, onLogout }) => {
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Cache l'en-tête pour toutes les écrans
        }}
      >
        <Stack.Screen
          name="Login"
          children={() => {
            console.log("AuthNavigator : onLogin transmis à LoginPage");
            return <LoginPage onLogin={onLogin} />;
          }}
        />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen
          name="Account"
          children={() => {
            console.log("AuthNavigator : onLogout transmis à AccountPage");
            return <AccountPage onLogout={onLogout} />;
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
