import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Button,
  ScrollView, // Import ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Signature from "react-native-signature-canvas";

const InvoiceForm = ({ navigation, route }) => {
  const { invoice } = route.params || {}; // Invoice existante pour modification
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [signature, setSignature] = useState(null);

  const [date, setDate] = useState(invoice ? invoice.date : "");
  const [numberInvoice, setNumberInvoice] = useState(
    invoice ? invoice.numberInvoice : ""
  );
  const [customerId, setCustomerId] = useState(
    invoice ? invoice.customerId : ""
  );

  const handleSignature = (sig) => {
    setSignature(sig);
  };
  const handleSubmit = async () => {
    if (!date || !numberInvoice || !customerId) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    try {
      const invoiceData = { date, numberInvoice, customerId };

      if (invoice) {
        await updateInvoice(invoice.id, invoiceData);
        Alert.alert("Succès", "Facture mise à jour avec succès !");
      } else {
        await createInvoice(invoiceData);
        Alert.alert("Succès", "Facture créée avec succès !");
      }

      navigation.navigate("InvoicesListing");
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'enregistrer la facture.");
    }
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 10,
    });
    if (!result.canceled) {
      setSelectedPictures((prevPictures) => [
        ...prevPictures,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Nous avons besoin de votre autorisation pour accéder à la caméra."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedPictures((prevPictures) => [
        ...prevPictures,
        result.assets[0].uri,
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {invoice ? "Modifier la prestation" : "Créer une prestation"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de prestation"
        value={numberInvoice}
        onChangeText={(text) => setNumberInvoice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="ID du client"
        value={customerId}
        onChangeText={(text) => setCustomerId(text)}
        keyboardType="numeric"
      />
      <TextInput placeholder="Commentaire" style={styles.input} />
      <Button title="Ajouter des images" onPress={pickImages} />
      <Button title="Prendre une photo" onPress={takePicture} />
      <View>
        {selectedPictures.map((uri, index) => (
          <Image key={index} source={uri} style={styles.image} />
        ))}
      </View>
      <View
        style={{
          height: 300,
          width: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
          marginVertical: 20,
        }}
      >
        <Signature
          onOK={handleSignature}
          onClear={() => setSignature(null)}
          descriptionText="Signer ici"
          clearText="Effacer"
          confirmText="Confirmer"
          webStyle={`
    .m-signature-pad {
      box-shadow: none;
      border: 1px solid #000;
      height: 100%;
    }
    .m-signature-pad--body {
      border: none;
      height: 100%;
    }
    .m-signature-pad--footer {
      display: flex; /* Assure que le footer est visible */
      justify-content: space-between; /* Aligne les boutons à gauche et à droite */
      padding: 10px;
    }
    .m-signature-pad--footer button {
      font-size: 16px; /* Taille des boutons */
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `}
        />
        {signature && (
          <Image
            source={{ uri: `data:image/png;base64,${signature}` }}
            style={{
              width: 300,
              height: 500,
              marginTop: 20,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {invoice ? "Mettre à jour" : "Créer"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  image: { width: 100, height: 100, margin: 5, borderRadius: 5 },
});

export default InvoiceForm;
