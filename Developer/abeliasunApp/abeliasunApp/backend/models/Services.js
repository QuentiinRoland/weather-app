const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { types } = require("node-sass");

const Services = sequelize.define("Services", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricing: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Services;
