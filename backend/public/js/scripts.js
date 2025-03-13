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
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    fetch('/api/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Booking successful') {
            document.getElementById('confirmation-message').textContent = 'Your appointment has been booked successfully!';
        } else {
            document.getElementById('confirmation-message').textContent = 'There was a problem with your booking. Please try again.';
        }
    })
    .catch(error => {
        document.getElementById('confirmation-message').textContent = 'There was an error processing your booking. Please try again.';
    });
});
