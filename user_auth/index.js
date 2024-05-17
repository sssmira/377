require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Supabase URL (hardcoded) and Key (loaded from environment variable)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
    console.error("Supabase Key is missing. Please check your .env file.");
    process.exit(1); // Exit the application with a failure status
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Route to serve the signup page
app.get('/', (req, res) => {
    res.sendFile('signup.html', { root: __dirname });
});

// Route to handle user sign-up
app.post('/signup', async (req, res) => {
    console.log('Received signup request with body:', req.body);
    const { userName, fullName, userEmail, userPass } = req.body;

    try {
        // Sign up the user with Supabase authentication
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: userEmail,
            password: userPass
        });

        if (signUpError) {
            console.error('Error signing up user:', signUpError.message);
            return res.status(500).json({ error: `Failed to sign up user: ${signUpError.message}` });
        }

        console.log('Signup successful:', signUpData);

        // Insert user profile into profiles table
        const { user } = signUpData;
        const { data: insertData, error: insertError } = await supabase
            .from('profiles')
            .insert([{ username: userName, full_name: fullName, email: userEmail }]);

        if (insertError) {
            console.error('Error inserting user profile:', insertError.message);
            return res.status(500).json({ error: `Failed to insert user profile: ${insertError.message}` });
        }

        console.log('User profile inserted successfully:', insertData);
        return res.status(200).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Unexpected error signing up user:', error.message);
        return res.status(500).json({ error: `Failed to sign up user: ${error.message}` });
    }
});

// Route to retrieve all user profiles
app.get('/profiles', async (req, res) => {
    console.log('Getting all user profiles');

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select();

        if (error) {
            console.error('Error retrieving user profiles:', error.message);
            return res.status(500).json({ error: 'Failed to retrieve user profiles' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Unexpected error retrieving user profiles:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve user profiles' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`App is live and listening on port ${port}`);
});
