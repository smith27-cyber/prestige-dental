const express = require('express');
const {connectDB}= require('./config/db')
const path = require('path'); // To handle paths correctly
const appointmentRoutes = require('./routes/appointments'); // Appointment API routes
const userRoutes = require('./routes/users');
const appointmentController = require('./controllers/appointmentController'); // Appointment controller

const basicAuth = require('express-basic-auth'); 
const app = express();
const port = 5000;
connectDB();

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

// Middleware for parsing JSON data in requests
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API route for fetching all appointments
app.get('/api/appointments', appointmentController.getAppointments);

// Use the appointmentRoutes for handling other appointment-related routes prefixed with '/api'
app.use('/api', appointmentRoutes);
app.use('/api/', userRoutes);

// Add basic auth middleware for the admin section
app.use('/admin', basicAuth({
    users: { 'admin': 'password' }, // Username and password
    challenge: true,
    realm: 'Admin Area'
}));

// Serve the admin dashboard HTML for the admin dashboard route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

// Serve the booking HTML for the booking route
app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

// Serve the users HTML for the users route
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-users.html'));
});

// Catch-all route to serve index.html for any unknown routes (useful for SPA like admin dashboard)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
