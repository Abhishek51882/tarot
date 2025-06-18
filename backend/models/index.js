const sequelize = require("../config/database");
const User = require("./User");
const Service = require("./Service");
const Booking = require("./Booking");

// Define relationships
Service.hasMany(Booking, { foreignKey: "serviceId" });
Booking.belongsTo(Service, { foreignKey: "serviceId" });

// Sync all models with the database
sequelize
    .sync({ alter: true }) // Use { force: true } to drop and recreate tables (only for development)
    .then(() => console.log("Database synced successfully"))
    .catch((error) => console.error("Database sync failed:", error));

module.exports = { sequelize, User, Service, Booking };