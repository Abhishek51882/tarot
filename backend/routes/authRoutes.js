const express = require("express");
const { register, login, logout, updateUserDetails, forgotPassword, getAllUsers } = require("../controllers/authController");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

// Logout a user
router.post("/logout", logout);

// Update user details (requires admin authorization)
router.put("/update-user/:id", updateUserDetails);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Get all users (requires admin authorization)
router.get("/users", getAllUsers);

module.exports = router;