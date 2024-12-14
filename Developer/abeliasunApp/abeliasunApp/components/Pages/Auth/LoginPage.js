import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginPage = ({ onLogin }) => {
  const navigation = useNavigation();
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleInputName = (text) => setInputName(text);
  const handleInputPassword = (text) => setInputPassword(text);

  const handleLogin = () => {
    if (inputName && inputPassword) {
      console.log("Connexion réussie avec :", inputName);
      onLogin && onLogin(); // Appelle la fonction onLogin pour passer à la navigation principale
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/LoginPage/abeliasunLogin.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.darkOverlay}>
          <View style={styles.overlay}>
            <Text style={styles.title}>
              Transformez Votre Jardin en Un Havre de Paix et de Beauté
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.loginSection}>
        <Image
          source={require("../../../assets/LoginPage/abeliasun-logo.png")}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Votre adresse mail"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={handleInputName}
            value={inputName}
          />
          <TextInput
            placeholder="Votre mot de passe"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            onChangeText={handleInputPassword}
            value={inputPassword}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonTextLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("Register")} // Navigue vers RegisterPage
          >
            <Text style={styles.buttonTextRegister}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: "80%",
    opacity: 1, // Changé à 1 car nous utilisons maintenant un overlay
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Couche sombre semi-transparente
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", // Texte en blanc
    textAlign: "left",
    maxWidth: 300,
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Ombre pour meilleure lisibilité
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  loginSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -200,
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  signupButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonTextLogin: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonTextRegister: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default LoginPage;
