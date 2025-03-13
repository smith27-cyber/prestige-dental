document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.token) {
            // Store the token in localStorage
            localStorage.setItem('authToken', data.token);
            window.location.href = 'admin-dashboard.html'; // Redirect to dashboard
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('An error occurred during login.');
    }
});
