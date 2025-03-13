const { client } = require('../config/db'); // PostgreSQL connection
const sendWhatsAppNotification = require('../utils/sendNotification');


// Book a new appointment
exports.bookAppointment = async (req, res) => {
    const { patientName, service, date, time, contactNumber } = req.body;

    try {
        // Validate input
        if (!patientName || !service || !date || !time || !contactNumber) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Insert the new appointment into the database
        const result = await client.query(
            'INSERT INTO appointments (patient_name, service, date, time, contact_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [patientName, service, date, time, contactNumber]
        );

        const newAppointment = result.rows[0];

        // Optionally send a WhatsApp notification
        sendWhatsAppNotification(contactNumber, `Your appointment for ${service} on ${date} at ${time} is confirmed!`);

        // Respond with the newly created appointment
        res.status(201).json({
            message: 'Appointment booked successfully!',
            appointment: newAppointment
        });
    } catch (error) {
        // Log the error and respond with a message
        console.error('Error booking appointment:', error.message);
        res.status(500).json({
            error: 'Error booking appointment',
            details: error.message
        });
    }
};

// Get all appointments (for admin dashboard)
exports.getAppointments = async (req, res) => {
    try {
        // Retrieve all appointments from the database
        const result = await client.query('SELECT * FROM appointments ORDER BY date ASC');
        console.log('Fetched appointments:', result.rows); 
        // Send the result to the frontend (admin dashboard)
        res.json(result.rows);
    } catch (error) {
        // Log the error for debugging and respond with an error message
        console.error('Error fetching appointments:', error.message);
        res.status(500).json({
            error: 'Error fetching appointments',
            details: error.message
        });
    }
};

// Update appointment status (confirm, cancel, etc.)
exports.updateAppointmentStatus = async (req, res) => {
    console.log('Received PUT request for appointment ID:', req.params.id);
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Update the status of the appointment in the database
        const result = await client.query(
            'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        const updatedAppointment = result.rows[0];

        // If no appointment is found, return a 404 error
        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Respond with the updated appointment details
        res.json({
            message: 'Appointment status updated',
            appointment: updatedAppointment
        });
    } catch (error) {
        // Log the error and respond with an error message
        console.error('Error updating appointment status:', error.message);
        res.status(500).json({
            error: 'Error updating appointment status',
            details: error.message
        });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM appointments WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error.message);
        res.status(500).json({ error: 'Error deleting appointment', details: error.message });
    }
};
