import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { updateCustomer } from "../../../services/apiCustomer";

const EditCustomer = ({ route, navigation }) => {
  const { customer } = route.params;
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [street, setStreet] = useState(customer.street);
  const [city, setCity] = useState(customer.city);
  const [postalCode, setPostalCode] = useState(customer.postalCode);

  const handleUpdate = async () => {
    try {
      await updateCustomer(customer.id, {
        name,
        email,
        phone,
        street,
        city,
        postalCode,
      });
      Alert.alert("Succès", "Le client a été modifié avec succès !");
      navigation.navigate("CustomerListing");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      Alert.alert("Erreur", "Impossible de modifier le client.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Rue"
        value={street}
        onChangeText={(text) => setStreet(text)}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.cityInput]}
          placeholder="Ville"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={[styles.input, styles.postalInput]}
          placeholder="Code postal"
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
          keyboardType="numeric"
        />
      </View>
      <Button title="Enregistrer les modifications" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityInput: {
    flex: 1,
    marginRight: 10,
  },
  postalInput: {
    flex: 1,
  },
});

export default EditCustomer;
