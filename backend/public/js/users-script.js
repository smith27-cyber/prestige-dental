const usersTable = document.getElementById('users-table').getElementsByTagName('tbody')[0];
const userForm = document.getElementById('user-form');
const bulkEditForm = document.getElementById('bulk-edit-form');
const statusMessage = document.getElementById('status-message');

// Utility function to display status messages
function showMessage(message, type = 'success') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = '';
    }, 3000); // Clears message after 3 seconds
}

// Utility function to show loading indicator
function showLoading(isLoading) {
    statusMessage.textContent = isLoading ? 'Processing...' : '';
}

// Fetch and display users in the table
function fetchUsers() {
    showLoading(true);
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            usersTable.innerHTML = ''; // Clear previous data
            data.forEach(user => {
                const row = usersTable.insertRow();
                row.insertCell(0).innerHTML = `<input type="checkbox" class="user-checkbox" data-id="${user.id}">`;
                row.insertCell(1).textContent = user.username;
                row.insertCell(2).textContent = user.email;
                row.insertCell(3).textContent = user.role;
                const actionCell = row.insertCell(4);
                actionCell.innerHTML = `
                    <button class="edit-user" data-id="${user.id}">Edit</button>
                    <button class="delete-user" data-id="${user.id}">Delete</button>
                    <button class="view-user" data-id="${user.id}">View</button>
                `;
            });
            showLoading(false);
        })
        .catch(() => showMessage('Failed to load users', 'error'));
}

// Add new user with validation
userForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('user-name').value.trim();
    const password = document.getElementById('user-password').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const role = document.getElementById('user-role').value;

    if (!username || !password || !email || !role) {
        showMessage('All fields are required', 'error');
        return;
    }

    showLoading(true);
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, role, password })
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to add user');
            return response.json();
        })
        .then(() => {
            fetchUsers();
            userForm.reset();
            showMessage('User added successfully');
        })
        .catch(err => showMessage(err.message, 'error'))
        .finally(() => showLoading(false));
});

// Bulk update selected users' roles with validation
bulkEditForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const selectedUsers = Array.from(document.querySelectorAll('.user-checkbox:checked'))
        .map(cb => parseInt(cb.getAttribute('data-id'), 10));
    const newRole = document.getElementById('bulk-role').value;

    if (selectedUsers.length === 0) {
        showMessage('Select at least one user', 'error');
        return;
    }

    showLoading(true);
    fetch('/api/users/bulk-update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedUsers, role: newRole })
    })
        .then(response => {
            if (!response.ok) throw new Error('Bulk update failed');
            return response.json();
        })
        .then(() => {
            fetchUsers();
            showMessage('Users updated successfully');
        })
        .catch(err => showMessage(err.message, 'error'))
        .finally(() => showLoading(false));
});

// Update user with optional password change
function updateUser(id) {
    const username = prompt('Enter new username:').trim();
    const email = prompt('Enter new email:').trim();
    const role = prompt('Enter new role:').trim();
    const password = prompt('Enter new password (leave blank to keep current):').trim();

    if (!username || !email || !role) {
        showMessage('All fields except password are required', 'error');
        return;
    }

    const updateData = { username, email, role };
    if (password) updateData.password = password;

    showLoading(true);
    fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update user');
            return response.json();
        })
        .then(() => {
            fetchUsers();
            showMessage('User updated successfully');
        })
        .catch(err => showMessage(err.message, 'error'))
        .finally(() => showLoading(false));
}

// Delete user with confirmation
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        showLoading(true);
        fetch(`/api/users/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete user');
                return response.json();
            })
            .then(() => {
                fetchUsers();
                showMessage('User deleted successfully');
            })
            .catch(err => showMessage(err.message, 'error'))
            .finally(() => showLoading(false));
        }}

// View user details
function viewUser(id) {
    showLoading(true);
    fetch(`/api/users/${id}`)
        .then(response => response.json())
        .then(user => {
            alert(`User Details:\nUsername: ${user.username}\nEmail: ${user.email}\nRole: ${user.role}`);
        })
        .catch(() => showMessage('Failed to fetch user details', 'error'))
        .finally(() => showLoading(false));
}

// Initial fetch of users
fetchUsers();

// Event delegation for edit, delete, and view buttons
usersTable.addEventListener('click', (event) => {
    const target = event.target;
    const userId = target.dataset.id;

    if (target.classList.contains('edit-user')) {
        updateUser(userId);
    } else if (target.classList.contains('delete-user')) {
        deleteUser(userId);
    } else if (target.classList.contains('view-user')) {
        viewUser(userId);
    }
});