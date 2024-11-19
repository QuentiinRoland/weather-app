import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";
import LoginPage from "./components/loginPage";
import Navigation from "./components/Navigation";

export default function App() {
  // État pour vérifier si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction de connexion
  const handleLogin = () => {
    setIsLoggedIn(true); // Simule une connexion
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Afficher LoginPage ou Navigation selon l'état */}
      {isLoggedIn ? <Navigation /> : <LoginPage onLogin={handleLogin} />}
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
