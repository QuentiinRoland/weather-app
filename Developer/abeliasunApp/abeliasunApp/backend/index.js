require("dotenv").config(); // Charger les variables d'environnement
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const Customer = require("./models/Customer");
const customerRoutes = require("./routes/customer");
const employeeRoutes = require("./routes/Employee");
const servicesRoutes = require("./routes/Services");
const InvoiceRoutes = require("./routes/Invoice");
const Invoice = require("./models/Invoice");
const app = express();

// Middleware
app.use(bodyParser.json());

app.use("/api/customers", customerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/invoices", InvoiceRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Databse connected"))
  .catch((err) => console.error("Database error", err));

sequelize
  .sync({ force: true }) // `force: true` recrée les tables à chaque redémarrage (utile en dev)
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));

// Route par défaut pour tester
app.get("/api", (req, res) => {
  res.send("API is running");
});

// Démarrage du serveur
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on http://localhost:4000`);
});
