const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Service = sequelize.define("Service", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discountedPrice: {
        type: DataTypes.FLOAT, // Use FLOAT for decimal values
        allowNull: false,
        defaultValue: 0.0, // Default value is 0.0
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, // Use TEXT for longer descriptions
        allowNull: true, // Allow null if the description is optional
    },
});

module.exports = Service;