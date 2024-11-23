import React from "react";
import { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginPage = ({ onLogin }) => {
  const navigation = useNavigation();
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handlingInputName = (e) => {
    setInputName(e.target.value);
  };

  const handlingInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/LoginPage/abeliasun-logo.png")}
        style={styles.iconAbeliasun}
      />
      <View style={[styles.flexbox, styles.inputStyle]}>
        <MaterialCommunityIcons
          name="email"
          size={20}
          style={styles.iconInput}
          color={"#fff"}
        />
        <TextInput
          placeholder="Votre adresse mail"
          onChange={handlingInputName}
          value={inputName}
        />
      </View>
      <View style={[styles.flexbox, styles.inputStyle]}>
        <MaterialCommunityIcons
          name="phone"
          size={20}
          style={styles.iconInput}
          color={"#fff"}
        />
        <TextInput
          placeholder="Votre mot de passe"
          secureTextEntry
          onChange={handlingInputPassword}
          value={inputPassword}
        />
      </View>
      <View style={styles.flexbox}>
        <Button title="Se connecter" onPress={onLogin} />
        <Button
          title="S'inscrire"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexbox: {
    flexDirection: "row",
  },
  inputStyle: {
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
    width: 250,
  },
  iconAbeliasun: {
    height: 100,
    width: 250,
  },
  iconInput: {
    marginRight: 10,
  },
  colorIconInput: {
    backgroundColor: "#ff1f1",
  },
});

export default LoginPage;
