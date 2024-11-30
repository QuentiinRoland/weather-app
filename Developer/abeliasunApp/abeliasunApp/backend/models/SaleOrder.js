const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = require("./Customer");
const Services = require("./Services");

const SaleOrder = sequelize.define("SaleOrder", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  numberInvoice: {
    type: DataTypes.INTEGER,
  },
});

SaleOrder.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});

SaleOrder.belongsToMany(Services, {
  through: "SaleOrderServices",
  as: "services",
  foreignKey: "saleOrderId",
});

Services.belongsToMany(SaleOrder, {
  through: "SaleOrderServices",
  as: "orders",
  foreignKey: "servicesId",
});
