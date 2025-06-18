const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models"); // Import sequelize instance
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes")

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", authRoutes);
app.use("/services", serviceRoutes);
app.use("/bookings", bookingRoutes);



// Test database connection
sequelize
    .authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection failed:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));