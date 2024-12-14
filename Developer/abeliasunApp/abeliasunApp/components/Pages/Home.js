import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

const Home = ({ navigation }) => {
  const userName = "Jimmy"; // Remplacez par le nom de l'utilisateur connecté.
  const { width } = Dimensions.get("window");

  // Exemple de données météo (remplacez par une API pour la météo en Belgique si nécessaire)
  const weatherData = {
    location: "Bruxelles, Belgique",
    temperature: "+8°C",
    condition: "Nuageux",
    humidity: "60%",
    precipitation: "1.2mm",
    pressure: "1013 hPa",
    wind: "18 km/h",
  };

  // Exemple de données pour le carrousel
  const carouselItems = [
    { id: "1", title: "Services", screen: "Services" },
    { id: "2", title: "Employés", screen: "Employés" },
    { id: "3", title: "Clients", screen: "Clients" },
    { id: "4", title: "Factures", screen: "Factures" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Message de bienvenue */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bonjour, {userName} 👋</Text>
        <TouchableOpacity
          style={styles.profilePic}
          onPress={() => navigation.navigate("Account")}
        >
          <Image
            source={{ uri: "https://via.placeholder.com/50" }} // Remplacez par l'image de profil
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Widget météo */}
      <View style={styles.weatherWidget}>
        <Text style={styles.weatherLocation}>{weatherData.location}</Text>
        <View style={styles.weatherMain}>
          <Text style={styles.weatherTemperature}>
            {weatherData.temperature}
          </Text>
          <Text style={styles.weatherCondition}>{weatherData.condition}</Text>
        </View>
        <View style={styles.weatherDetails}>
          <Text>Humidité : {weatherData.humidity}</Text>
          <Text>Précipitations : {weatherData.precipitation}</Text>
          <Text>Pression : {weatherData.pressure}</Text>
          <Text>Vent : {weatherData.wind}</Text>
        </View>
      </View>

      {/* Carrousel des sections */}
      <Text style={styles.carouselTitle}>Navigation rapide</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {carouselItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.carouselItem}
            onPress={() => navigation.navigate(item.screen)} // Corrigé ici
          >
            <Text style={styles.carouselText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.notificationsSection}>
        <Text style={styles.notificationsTitle}>Rappel</Text>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            3 factures en retard de validation
          </Text>
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            2 employés absents aujourd'hui
          </Text>
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            Nouveau client ajouté hier : Jean Dupont
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  weatherWidget: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  weatherLocation: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  weatherMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  weatherTemperature: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  weatherCondition: {
    fontSize: 16,
    color: "#666",
  },
  weatherDetails: {
    fontSize: 14,
    color: "#666",
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  carousel: {
    paddingLeft: 20,
  },
  carouselItem: {
    backgroundColor: "#ffffff",
    width: 120,
    height: 120,
    marginRight: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carouselText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  notificationsSection: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  notificationItem: {
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  notificationText: {
    fontSize: 14,
    color: "#666",
  },
});

export default Home;
