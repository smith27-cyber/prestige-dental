// config/db.js
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'paul',
    password: 'leahsm27',
    database: 'prestige_dental'
});

client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});
// Connect to the database
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

