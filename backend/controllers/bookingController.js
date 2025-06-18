const Booking = require("../models/Booking");
const transporter = require("../utils/mailer");

exports.createBooking = async (req, res) => {
    try {
        const { name, email, phone, serviceId } = req.body;
        console.log(req.body);

        // Create the booking (uncomment if needed)
        // const booking = await Booking.create({ name, email, phone, serviceId });
        // console.log("here booking is", booking);

        console.log('email', process.env.EMAIL_USER);

        // Send response immediately to the user
        res.status(201).json({ message: "Booking created successfully!" });

        // Send emails asynchronously
        (async () => {
            try {
                // Send email to user
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "Booking Confirmation",
                    text: `Thank you for booking a session!`,
                });

                // Send email to admin
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER,
                    subject: "New Booking",
                    text: `A new booking has been made by ${name}.`,
                });

                console.log("Emails sent successfully!");
            } catch (emailError) {
                console.error("Error sending emails:", emailError);
            }
        })();

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
};