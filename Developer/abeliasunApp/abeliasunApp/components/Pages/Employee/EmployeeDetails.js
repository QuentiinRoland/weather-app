import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { getEmployeeById, getEmployees } from "../../../services/apiEmployee";

const EmployeeDetails = ({ route, navigation }) => {
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(employeeId);
        setEmployee(data);
      } catch (error) {
        console.error("Erreur lors de la récup du client :", error);
      }
    };

    fetchEmployee();
  }),
    [employeeId];

  return (
    <View style={styles.container}>
      {employee ? (
        <>
          <Text style={styles.label}>Nom : {employee.name}</Text>
          <Text style={styles.label}>Email : {employee.email}</Text>
          <Text style={styles.label}>Téléphone : {employee.phone}</Text>

          <Button
            title="Modifier l'employé"
            onPress={() => navigation.navigate("EditEmployee", { employee })}
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

export default EmployeeDetails;
