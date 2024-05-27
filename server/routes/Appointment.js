const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { Appointments } = require('../models'); // Adjust the path as needed
=======
const { Appointments } = require("../models");
>>>>>>> 2cdeff876bf9b9ddd422f93bfb86075073870b36

// Route to create a new appointment
router.post("/", async (req, res) => {
<<<<<<< HEAD
  try {
    const appointmentData = req.body;
    const newAppointment = await Appointments.create(appointmentData);
    res.json(newAppointment);
  } catch (error) {
    console.error('Error creating new Appointment item:', error);
    res.status(500).json({ error: 'Server error' });
  }
=======
    try {
        const appointmentData = req.body;
        // Assuming Appointments is the model for the appointments table
        const newAppointment = await Appointments.create(appointmentData);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
>>>>>>> 2cdeff876bf9b9ddd422f93bfb86075073870b36
});

module.exports = router;
