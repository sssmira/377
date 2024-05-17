require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const jwtSecret = process.env.JWT_SECRET;

if (!supabaseKey || !jwtSecret) {
    console.error("Supabase Key or JWT Secret is missing. Please check your .env file.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Route to serve the signup page
app.get('/', (req, res) => {
    res.sendFile('signup.html', { root: __dirname });
});

// Route to handle user sign-up
app.post('/signup', async (req, res) => {
    console.log('Received signup request with body:', req.body);
    const { userEmail, userPass, userName, fullName } = req.body;

    try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: 'zeeshawn.ahmad@gmail.com',
            password: 'Test24'
        });

        if (signUpError) {
            console.error('Error signing up user:', signUpError.message);
            return res.status(500).json({ error: `Failed to sign up user: ${signUpError.message}` });
        }

        console.log('Signup successful:', signUpData);

        const { user } = signUpData;
        const { data: insertData, error: insertError } = await supabase
            .from('profiles')
            .insert([{ username: userName, full_name: fullName, email: userEmail }]);

        if (insertError) {
            console.error('Error inserting user profile:', insertError.message);
            return res.status(500).json({ error: `Failed to insert user profile: ${insertError.message}` });
        }

        console.log('User profile inserted successfully:', insertData);

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({ message: 'User signed up successfully', token });
    } catch (error) {
        console.error('Unexpected error signing up user:', error.message);
        return res.status(500).json({ error: `Failed to sign up user: ${error.message}` });
    }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        req.userId = decoded.userId;
        next();
    });
};

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Hello user with ID: ${req.userId}` });
});

// Start the Express server
app.listen(port, () => {
    console.log(`App is live and listening on port ${port}`);
});
