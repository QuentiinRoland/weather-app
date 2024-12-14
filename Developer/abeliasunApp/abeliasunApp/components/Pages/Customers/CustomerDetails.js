import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getCustomerById } from "../../../services/apiCustomer";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomerDetails = ({ route, navigation }) => {
  const { customerId } = route.params;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomerById(customerId);
        setCustomer(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error);
      }
    };

    fetchCustomers();
  }, [customerId]);

  return (
    <View style={styles.container}>
      {customer ? (
        <>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{customer.name[0]}</Text>
            </View>
            <Text style={styles.name}>{customer.name}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Icon name="email" size={24} color="#007AFF" />
            <Text style={styles.infoText}>{customer.email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Icon name="phone" size={24} color="#007AFF" />
            <Text style={styles.infoText}>{customer.phone}</Text>
          </View>

          {/* Address Section */}
          <View style={styles.infoContainer}>
            <Icon name="location-on" size={24} color="#007AFF" />
            <Text style={styles.infoText}>{customer.street}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="location-city" size={24} color="#007AFF" />
            <Text style={styles.infoText}>
              {customer.city}, {customer.postalCode}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditCustomer", { customer })}
          >
            <Text style={styles.editButtonText}>Modifier le client</Text>
          </TouchableOpacity>
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
    backgroundColor: "#EFEFF4",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CustomerDetails;
