const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://ybexbycrpokdmgdpibeg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZXhieWNycG9rZG1nZHBpYmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3NDM3ODUsImV4cCI6MjAzMTMxOTc4NX0.IXDHlD493Fcdj1N8yxfbQTvr5J64Vz1nwCdFywt6AIY'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

// Route to serve the signup page
app.get('/', (req, res) => {
    res.sendFile('signup.html', { root: __dirname });
});

// Route to handle user sign-up
app.post('/signup', async (req, res) => {
    console.log('Signing up a new user');
    const { username, full_name, email, user_pass } = req.body;

    try {
        // Sign up the user with Supabase authentication
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password: user_pass
        });

        if (signUpError) {
            console.error('Error signing up user:', signUpError.message);
            return res.status(500).json({ error: 'Failed to sign up user' });
        }

        // Insert user profile into profiles table
        const { data: insertData, error: insertError } = await supabase
            .from('profiles')
            .insert([{ username, full_name, email, user_pass }]);

        if (insertError) {
            console.error('Error inserting user profile:', insertError.message);
            return res.status(500).json({ error: 'Failed to insert user profile' });
        }

        console.log('User signed up successfully:', signUpData.user);
        return res.status(200).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up user:', error.message);
        return res.status(500).json({ error: 'Failed to sign up user' });
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
            console.error('Error:', error);
            return res.status(500).json({ error: 'Failed to retrieve user profiles' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving user profiles:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve user profiles' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`App is live and listening on port ${port}`);
});