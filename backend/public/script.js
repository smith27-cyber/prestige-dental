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
