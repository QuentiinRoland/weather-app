import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Employee from "../Pages/Employee/EmployeeForm";
import EmployeeListing from "../Pages/Employee/EmployeeListing";
import EmployeeDetails from "../Pages/Employee/EmployeeDetails";
import EditEmployee from "../Pages/Employee/EditingEmployee";

const Stack = createStackNavigator();
export const EmployeeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EmployeeListing"
        options={{ title: "Liste employée" }}
        component={EmployeeListing}
      ></Stack.Screen>
      <Stack.Screen
        name="EmployeeAdd"
        component={Employee}
        options={{ title: "Création client" }}
      ></Stack.Screen>
      <Stack.Screen
        name="EmployeeDetails"
        options={{ title: "Détail de l'employé" }}
        component={EmployeeDetails}
      ></Stack.Screen>
      <Stack.Screen
        name="EditEmployee"
        options={{ title: "Edition de l'employé" }}
        component={EditEmployee}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
