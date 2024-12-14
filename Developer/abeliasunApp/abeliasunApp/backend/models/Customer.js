const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { FALSE } = require("node-sass");

const Customer = sequelize.define("Customer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
  },
  postalCode: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Customer;
