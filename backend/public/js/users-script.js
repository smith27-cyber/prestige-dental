document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-form');
    if (!userForm) {
        console.error('User form not found!');
        return;
    }

    const usersTable = document.getElementById('users-table').getElementsByTagName('tbody')[0];
    if (!usersTable) {
        console.error('Users table not found!');
        return;
    }

    // Fetch and display existing users
    fetchUsers();

    // Handle form submission to add a new user
userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const role = document.getElementById('user-role').value;

    if (!username || !email || !role) {
        alert('Please fill in all fields.');
        return;
    }

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, role }) // Adjust key names as per your API
    })
    .then(response => response.json())
    .then(data => {
        alert('User added successfully!');
        fetchUsers(); // Refresh the users table
        userForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding user.');
    });
});


   // Fetch users from the server
   function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            usersTable.innerHTML = '';
            data.forEach(user => {
                const row = usersTable.insertRow();
                row.insertCell(0).textContent = user.username;
                row.insertCell(1).textContent = user.email;
                row.insertCell(2).textContent = user.role;

                const actionsCell = row.insertCell(3);
                actionsCell.innerHTML = `
                    <button class="update-user-button" data-id="${user.id}">Update</button>
                    <button class="delete-user-button" data-id="${user.id}">Delete</button>
                `;
            });

            attachUpdateHandlers();
            attachDeleteHandlers();
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}


    // Attach update event handlers
    function attachUpdateHandlers() {
        document.querySelectorAll('.update-user-button').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = prompt('Enter new name:');
                const email = prompt('Enter new email:');
                const role = prompt('Enter new role:');

                if (name && email && role) {
                    fetch(`/api/users/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, email, role })
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert('User updated successfully!');
                        fetchUsers(); // Refresh the users table
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error updating user.');
                    });
                }
            });
        });
    }

    // Attach delete event handlers
    function attachDeleteHandlers() {
        document.querySelectorAll('.delete-user-button').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this user?')) {
                    fetch(`/api/users/${id}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert('User deleted successfully!');
                        fetchUsers(); // Refresh the users table
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error deleting user.');
                    });
                }
            });
        });
    }
});
