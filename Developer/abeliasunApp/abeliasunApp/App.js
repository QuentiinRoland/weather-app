import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import AuthNavigator from "./components/Navigation/AuthNavigation"; // Auth pour non connectés
import Navigation from "./components/Navigation/Navigation"; // TabNavigator pour connectés

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État d'authentification

  const handleLogin = () => {
    console.log("App.js : Utilisateur connecté !");
    setIsLoggedIn(true); // Passe à la navigation principale
  };

  const handleLogout = () => {
    console.log("App.js : Utilisateur déconnecté !");
    setIsLoggedIn(false); // Retourne à l'écran de connexion
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <Navigation onLogout={handleLogout} /> // TabNavigator si connecté
      ) : (
        <AuthNavigator onLogin={handleLogin} /> // AuthNavigator si non connecté
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
