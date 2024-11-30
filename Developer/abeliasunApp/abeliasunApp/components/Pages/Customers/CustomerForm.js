import { useState } from "react";
import React from "react";
import { Text, Alert, TextInput, View, Button, StyleSheet } from "react-native";
import { createCustomer } from "../../../services/api";

const Customer = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    try {
      const newCustomer = { name, email, phone };
      const response = await createCustomer(newCustomer);
      Alert.alert("Succès", `Client créé avec l'ID : ${response.id}`);
      navigation.navigate("CustomerListing");
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de créer le client. Vérifiez les données."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le nom"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez l'email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Téléphone</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le téléphone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />

      <Button title="Créer le client" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default Customer;
