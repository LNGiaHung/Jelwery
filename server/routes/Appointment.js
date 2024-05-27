const express = require('express');
const router = express.Router();
const { Appointments } = require('../models'); // Adjust the path as needed

router.post("/", async (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointment = await Appointments.create(appointmentData);
    res.json(newAppointment);
  } catch (error) {
    console.error('Error creating new Appointment item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
