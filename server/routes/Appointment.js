const express = require("express");
const router = express.Router();
const { Appointments } = require("../models");

// Route to create a new appointment using URL parameters
router.post("/:FirstName/:LastName/:Mail/:BookedDate/:Interest", async (req, res) => {
    try {
        const { FirstName, LastName, Mail, BookedDate, Interest } = req.params;
        // console.log("FirstName: ",FirstName);
        // console.log("LastName: ",LastName);
        // console.log("Mail: ",Mail);
        // console.log("BookedDate: ",BookedDate);
        // console.log("Interest: ",Interest);
        const appointmentData = {
            FirstName,
            LastName,
            Mail,
            BookedDate,
            Interest
        };

        // Assuming Appointments is the model for the appointments table
        const newAppointment = await Appointments.create(appointmentData);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
});

module.exports = router;
