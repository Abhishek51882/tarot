const Service = require("../models/Service");
const fs = require("fs");
const path = require("path");

// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        if (services) {
            services.forEach(service => {
                service.imageUrl = `${req.protocol}://${req.get('host')}${service.imageUrl}`;
            });
        }
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch services" });
    }
};

// Create a new service
exports.createService = async (req, res) => {
    try {
        const { title, price, description, discountedPrice } = req.body;

        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        // Save the image URL (relative path)
        const imageUrl = `/uploads/${req.file.filename}`;

        // Create the service in the database
        const service = await Service.create({
            title,
            price,
            description,
            discountedPrice: discountedPrice || 0.0, // Use provided value or default to 0.0
            imageUrl,
        });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to create service" });
    }
};

// Update an existing service
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params; // Get the service ID from the request parameters
        const { title, price, description, discountedPrice } = req.body;

        // Find the service by ID
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        // Update the service details
        if (req.file) {
            const imageUrl = `/uploads/${req.file.filename}`;
            service.imageUrl = imageUrl;
        }
        service.title = title || service.title;
        service.price = price || service.price;
        service.description = description || service.description;
        service.discountedPrice = discountedPrice !== undefined ? discountedPrice : service.discountedPrice;

        await service.save(); // Save the updated service
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to update service" });
    }
};



// Delete a service
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params; // Get the service ID from the request parameters

        // Find the service by ID
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        // Delete the associated image file
        const imagePath = path.join(__dirname, "../", service.imageUrl); // Resolve the full path of the image
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete image file:", err);
            } else {
                console.log("Image file deleted successfully:", imagePath);
            }
        });

        // Delete the service from the database
        await service.destroy();
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ error: "Failed to delete service" });
    }
};

// Delete all services
exports.deleteAllServices = async (req, res) => {
    try {
        // Fetch all services
        const services = await Service.findAll();

        if (!services || services.length === 0) {
            return res.status(404).json({ error: "No services found to delete" });
        }

        // Delete associated image files
        services.forEach(service => {
            const imagePath = path.join(__dirname, "../", service.imageUrl); // Resolve the full path of the image
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image file for service ID ${service.id}:`, err);
                } else {
                    console.log(`Image file deleted successfully for service ID ${service.id}:`, imagePath);
                }
            });
        });

        // Delete all services from the database
        await Service.destroy({ where: {} }); // Deletes all rows in the Service table
        res.status(200).json({ message: "All services deleted successfully" });
    } catch (error) {
        console.error("Error deleting all services:", error);
        res.status(500).json({ error: "Failed to delete all services" });
    }
};