import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";
import AuthNavigator from "./components/Navigation/AuthNavigation";
import Navigation from "./components/Navigation/Navigation";

export default function App() {
  // État pour vérifier si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction de connexion
  const handleLogin = () => {
    setIsLoggedIn(true); // Simule une connexion
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simule une connexion
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <Navigation onLogout={handleLogout} />
      ) : (
        <AuthNavigator onLogin={handleLogin} />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
