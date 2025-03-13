document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const appointmentsTable = document
        .getElementById('appointments-table')
        .getElementsByTagName('tbody')[0];

    // Initialize
    fetchAppointments();

    // Handle form submission
    bookingForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const appointmentData = {
            patientName: document.getElementById('patient-name').value,
            service: document.getElementById('service').value,
            date: formatDate(document.getElementById('appointment-date').value),
            time: document.getElementById('appointment-time').value,
            contactNumber: document.getElementById('contact-number').value,
        };

        if (!validateForm(appointmentData)) return;

        try {
            const response = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            });

            const data = await handleResponse(response);
            showAlert('Appointment booked successfully!');
            bookingForm.reset();
            bookingForm.querySelector('input').focus(); // Set focus back to form
            fetchAppointments();
        } catch (error) {
            console.error('Error:', error);
            showAlert('Error booking appointment. Please try again.', 'error');
        }
    });

    // Fetch appointments from the server
    async function fetchAppointments() {
        console.log('Fetching appointments...');
        try {
            const response = await fetch('/api/appointments');
            const data = await handleResponse(response);
            populateTable(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            showAlert('Failed to fetch appointments.', 'error');
        }
    }

    // Populate the table with appointment data
    function populateTable(appointments) {
        appointmentsTable.innerHTML = ''; // Clear existing rows
        appointments.forEach((appointment) => {
            const row = appointmentsTable.insertRow();
            row.innerHTML = `
                <td>${appointment.patient_name}</td>
                <td>${appointment.service}</td>
                <td>${new Date(appointment.date).toLocaleDateString()}</td>
                <td>${appointment.time}</td>
                <td>${appointment.status || 'Pending'}</td>
                <td>${appointment.contact_number}</td>
                <td>
                    <button class="update-status-button" data-id="${appointment.id}">Update Status</button>
                    <button class="delete-button" data-id="${appointment.id}">Delete</button>
                </td>
            `;
        });
        attachEventHandlers();
    }

    // Attach event handlers to update and delete buttons
    function attachEventHandlers() {
        document.querySelectorAll('.update-status-button').forEach((button) =>
            button.addEventListener('click', handleUpdateStatus)
        );
        document.querySelectorAll('.delete-button').forEach((button) =>
            button.addEventListener('click', handleDelete)
        );
    }

    // Handle appointment status update
    async function handleUpdateStatus() {
        const id = this.getAttribute('data-id');
        const newStatus = prompt('Enter new status:');
        if (!newStatus) return;

        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            await handleResponse(response);
            showAlert('Appointment status updated!');
            fetchAppointments();
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to update status.', 'error');
        }
    }

    // Handle appointment deletion
    async function handleDelete() {
        const id = this.getAttribute('data-id');
        if (!confirm('Are you sure you want to delete this appointment?')) return;

        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: 'DELETE',
            });

            await handleResponse(response);
            showAlert('Appointment deleted!');
            fetchAppointments();
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to delete appointment.', 'error');
        }
    }

    // Utility function to format date to YYYY-MM-DD
    function formatDate(date) {
        return new Date(date).toISOString().split('T')[0];
    }

    // Utility function to validate form data
    function validateForm({ patientName, service, date, time, contactNumber }) {
        if (!patientName || !service || !date || !time || !contactNumber) {
            showAlert('Please fill in all fields.', 'error');
            return false;
        }
        return true;
    }

    // Utility function to show alerts
    function showAlert(message, type = 'success') {
        alert(`${type === 'error' ? 'Error: ' : ''}${message}`);
    }

    // Utility function to handle responses
    async function handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Server Error');
        }
        return response.json();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    // Logout functionality
    logoutButton.addEventListener('click', handleLogout);

    function handleLogout() {
        if (confirm('Are you sure you want to log out?')) {
            // Clear the JWT token from localStorage
            localStorage.removeItem('authToken');

            // Redirect to the login page
            window.location.href = 'login.html';
        }
    }

    // Verify if the user is logged in
    function checkAuthentication() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Please log in to access the dashboard.');
            window.location.href = 'login.html';
        }
    }

    // Run authentication check on page load
    checkAuthentication();
});

