document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission
    
    // Gather form data
    const appointmentData = {
        patientName: document.getElementById('name').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        contactNumber: document.getElementById('contactNumber').value
    };

    // Send the data to the backend via Axios
    axios.post('http://localhost:5000/api/book', appointmentData)
        .then(function (response) {
            document.getElementById('confirmationMessage').innerText = 'Appointment booked successfully!';
            document.getElementById('confirmationMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';

            // Reset form
            document.getElementById('bookingForm').reset();
        })
        .catch(function (error) {
            document.getElementById('errorMessage').innerText = 'Error booking appointment. Please try again.';
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('confirmationMessage').style.display = 'none';
        });
});
