const { client } = require('../config/db');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
};

// Add a new user
exports.addUser = async (req, res) => {
    const { username, email, role } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO users (username, email, role) VALUES ($1, $2, $3) RETURNING *',
            [username, email, role]
        );
        res.status(201).json({ message: 'User added successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error adding user:', error.message);
        res.status(500).json({ error: 'Error adding user', details: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    try {
        const result = await client.query(
            'UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
            [username, email, role, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Error updating user', details: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
};
