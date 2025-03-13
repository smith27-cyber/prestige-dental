document.getElementById('settings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    // Send data to your API
    fetch('/api/settings', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle response data
        console.log(data);
        alert('Settings saved successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save settings.');
    });
});
