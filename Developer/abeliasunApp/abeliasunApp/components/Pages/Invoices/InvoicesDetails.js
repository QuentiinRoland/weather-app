import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getInvoiceById } from "../../../services/apiInvoices";

const InvoiceDetails = ({ route, navigation }) => {
  const { invoiceId } = route.params;
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await getInvoiceById(invoiceId);
        setInvoice(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la facture :", error);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (!invoice) {
    return <Text style={styles.loading}>Chargement des informations...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facture #{invoice.numberInvoice}</Text>
      <Text style={styles.info}>Date : {invoice.date}</Text>
      <Text style={styles.info}>Client ID : {invoice.customerId}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("InvoiceForm", { invoice })}
      >
        <Text style={styles.buttonText}>Modifier la facture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loading: { fontSize: 18, textAlign: "center", marginTop: 20 },
});

export default InvoiceDetails;
