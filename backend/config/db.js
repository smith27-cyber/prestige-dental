// config/db.js
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres', // replace with your username
    password: 'leahsm27', // replace with your password
    database: 'prestige_dental'
});

// Function to connect to the database
const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (err) {
        console.error('Connection error', err.stack);
    }
};

// Export the client and connectDB function
module.exports = { client, connectDB };
