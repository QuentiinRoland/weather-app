import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Customer from "../Pages/Customers/CustomerForm";
import CustomerListing from "../Pages/Customers/CustomerListing";
import CustomerDetails from "../Pages/Customers/CustomerDetails";
import EditCustomer from "../Pages/Customers/EditingCustomer";

const Stack = createStackNavigator();
const CustomerNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerListing"
        component={CustomerListing}
        options={{ title: "CustomerList" }}
      ></Stack.Screen>
      <Stack.Screen
        name="CustomerAdd"
        component={Customer}
        options={{ title: "Création client" }}
      ></Stack.Screen>
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{ title: "Détails du Client" }}
      />
      <Stack.Screen
        name="EditCustomer"
        component={EditCustomer}
        options={{ title: "Détails du Client" }}
      />
    </Stack.Navigator>
  );
};

export default CustomerNavigation;
