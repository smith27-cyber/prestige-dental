const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Routes for appointments
router.post('/book', appointmentController.bookAppointment );      // Book appointment
router.get('/appointments', appointmentController.getAppointments);  // Get all appointments (for admin)
router.put('/appointments/:id', appointmentController.updateAppointmentStatus);  // Update appointment status
router.delete('/appointments/:id', appointmentController.deleteAppointment); // Delete appointment

module.exports = router;
