const express = require("express");
const { getAllServices, createService, updateService, deleteService,deleteAllServices } = require("../controllers/serviceController");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getAllServices);
router.post("/", authenticateUser, authorizeAdmin, upload.single("image"), createService);
router.put("/:id", authenticateUser, authorizeAdmin, upload.single("image"), updateService); // Update service
router.delete("/:id", authenticateUser, authorizeAdmin, deleteService); // Delete service
router.delete("/services", deleteAllServices);

module.exports = router;