import React from "react";
import { View, Text, Button } from "react-native";

const Account = ({ onLogout }) => {
  return (
    <View>
      <Text>Account</Text>
      <Button title="Déconnexion" onPress={onLogout} />
    </View>
  );
};

export default Account;
