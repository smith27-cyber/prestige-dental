const { createClient } = require('@supabase/supabase-js');

// Environment variables for Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// You can create any functions here for interacting with Supabase
// Example function to fetch data from the 'appointments' table
const fetchAppointments = async () => {
    const { data, error } = await supabase
        .from('appointments') // Replace with your actual table name
        .select('*');

    if (error) {
        console.error('Error fetching appointments:', error);
        throw error; // Handle the error appropriately
    }
    return data;
};

// Export the Supabase client and any functions
module.exports = { supabase, fetchAppointments };
