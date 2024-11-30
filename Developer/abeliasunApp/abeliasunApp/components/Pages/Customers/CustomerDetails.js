import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { getCustomersId } from "../../../services/api";

const CustomerDetails = ({ route, navigation }) => {
  const { customerId } = route.params;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomersId(customerId);
        setCustomer(data);
      } catch (error) {
        console.error("Erreur lors de la récup du client :", error);
      }
    };

    fetchCustomers();
  }, [customerId]);

  return (
    <View style={styles.container}>
      {customer ? (
        <>
          <Text style={styles.label}>Nom : {customer.name}</Text>
          <Text style={styles.label}>Email : {customer.email}</Text>
          <Text style={styles.label}>Téléphone : {customer.phone}</Text>

          <Button
            title="Modifier le client"
            onPress={() => navigation.navigate("EditCustomer", { customer })}
          />
        </>
      ) : (
        <Text style={styles.loading}>Chargement des informations...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CustomerDetails;
