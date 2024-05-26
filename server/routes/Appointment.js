const express = require("express");
const router = express.Router();
const { Appointments } = require("../models");

// Route to create a new appointment
router.post("/", async (req, res) => {
    try {
        const appointmentData = req.body;
        // Assuming Appointments is the model for the appointments table
        const newAppointment = await Appointments.create(appointmentData);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
});

module.exports = router;
