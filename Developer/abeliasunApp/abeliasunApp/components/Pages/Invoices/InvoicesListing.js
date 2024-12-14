import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { getInvoices } from "../../../services/apiInvoices";

const ListingInvoice = ({ navigation }) => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [customerOptions, setCustomerOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  // Récupérer les factures depuis l'API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
        setFilteredInvoices(data); // Initialiser avec toutes les factures

        const customers = [
          ...new Set(
            data.map((invoice) => invoice.customer?.name || "Inconnu")
          ),
        ];
        const years = [
          ...new Set(data.map((invoice) => invoice.date.split("-")[0])),
        ];

        setCustomerOptions(customers);
        setYearOptions(years);
      } catch (error) {
        console.error("Erreur lors de la récupération des factures :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Mettre à jour les factures filtrées à chaque changement de filtre
  useEffect(() => {
    let filtered = invoices;

    // Filtrer par client
    if (selectedCustomer) {
      filtered = filtered.filter(
        (invoice) => invoice.customer?.name === selectedCustomer
      );
    }

    // Filtrer par année
    if (selectedYear) {
      filtered = filtered.filter((invoice) =>
        invoice.date.startsWith(selectedYear)
      );
    }

    setFilteredInvoices(filtered);
  }, [selectedCustomer, selectedYear, invoices]);

  if (loading) {
    return <Text style={styles.loading}>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Filtres */}
      <View style={styles.filters}>
        <Picker
          selectedValue={selectedCustomer}
          onValueChange={(value) => setSelectedCustomer(value)}
          style={styles.picker}
        >
          <Picker.Item label="Tous les clients" value="" />
          {customerOptions.map((customer, index) => (
            <Picker.Item key={index} label={customer} value={customer} />
          ))}
        </Picker>

        {/* Filtre par année */}
        <Text style={styles.filterLabel}>Année :</Text>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
          style={styles.picker}
        >
          <Picker.Item label="Toutes les années" value="" />
          {yearOptions.map((year, index) => (
            <Picker.Item key={index} label={year} value={year} />
          ))}
        </Picker>
      </View>

      {/* Liste des factures */}
      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("InvoiceDetails", { invoiceId: item.id })
            }
          >
            <Text style={styles.cardTitle}>
              Prestation #{item.numberInvoice}
            </Text>
            <Text style={styles.cardSubtitle}>Date: {item.date}</Text>
            <Text style={styles.cardSubtitle}>
              Client: {item.customer?.name || "Inconnu"}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("CustomerAdd")}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Ajouter un client</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFEFF4" },
  loading: { fontSize: 18, textAlign: "center", marginTop: 20 },
  filters: { padding: 10, backgroundColor: "#fff", marginBottom: 10 },
  filterLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  filterButtons: { flexDirection: "row", justifyContent: "space-around" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardSubtitle: { fontSize: 14, color: "#555" },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default ListingInvoice;
