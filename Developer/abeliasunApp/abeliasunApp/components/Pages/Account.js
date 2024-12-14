import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AccountPage = ({ onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      console.log("AccountPage : Déconnexion en cours...");
      onLogout(); // Appelle la fonction transmise par AuthNavigator
    } else {
      console.error("AccountPage : La fonction onLogout n'a pas été fournie !");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon compte</Text>
      <Button title="Déconnexion" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});

export default AccountPage;
