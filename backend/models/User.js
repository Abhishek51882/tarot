const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
            isEmail: true, // Validate email format
        },
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false, // Password is required for standard login
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user", // Default role is "user"
    },
});

module.exports = User;