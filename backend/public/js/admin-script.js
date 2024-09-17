document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const appointmentsTable = document.getElementById('appointments-table').getElementsByTagName('tbody')[0];

    // Fetch and display existing appointments
    fetchAppointments();

    // Handle form submission
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const patientName = document.getElementById('patient-name').value;
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;

        // Basic validation
        if (!patientName || !appointmentDate || !appointmentTime) {
            alert('Please fill in all fields.');
            return;
        }

        // Format appointmentDate and appointmentTime for the API (if needed)
        const formattedDate = new Date(appointmentDate).toISOString().split('T')[0]; // YYYY-MM-DD format
        const formattedTime = appointmentTime;

        // POST request to book a new appointment
        fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patientName,
                date: formattedDate,  // Sending date as YYYY-MM-DD
                time: formattedTime    // Sending time directly
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Appointment booked successfully!');
            fetchAppointments(); // Refresh the appointments table
            // Clear the form fields
            bookingForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error booking appointment.');
        });
    });
    
// Fetch appointments from the server
function fetchAppointments() {
    fetch('/api/appointments')
        .then(response => response.json())
        .then(data => {
            // Populate the table with appointment data
            const appointmentsTable = document.getElementById('appointments-table').getElementsByTagName('tbody')[0];
            appointmentsTable.innerHTML = ''; // Clear existing table rows
            data.forEach(appointment => {
                const row = appointmentsTable.insertRow();
                row.insertCell(0).textContent = appointment.patient_name;
                row.insertCell(1).textContent = new Date(appointment.date).toLocaleDateString();
                row.insertCell(2).textContent = appointment.time;
                row.insertCell(3).textContent = appointment.status || 'Pending';
            });
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
        });
}

    // Attach update status event handlers
    function attachUpdateStatusHandlers() {
        document.querySelectorAll('.update-status-button').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const newStatus = prompt('Enter new status:');
                if (newStatus) {
                    // PUT request to update the status of the appointment
                    fetch('/api/appointments/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: newStatus })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert('Appointment status updated!');
                        fetchAppointments(); // Refresh the appointments table
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error updating appointment status.');
                    });
                }
            });
        });
    }
});
