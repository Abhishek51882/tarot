const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Service = require("./Service");

const Booking = sequelize.define("Booking", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Service.hasMany(Booking, { foreignKey: "serviceId" });
Booking.belongsTo(Service, { foreignKey: "serviceId" });

module.exports = Booking;