const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = require("./Customer");
const Services = require("./Services");

const Invoice = sequelize.define("Invoice", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  numberInvoice: {
    type: DataTypes.INTEGER,
  },
  services: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  tagline: {
    type: DataTypes.STRING,
  },
});

Invoice.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});

module.exports = Invoice;
