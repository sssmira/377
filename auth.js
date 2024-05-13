document.addEventListener('DOMContentLoaded', function () {
    // Password Validation code
    const passwordInput = document.getElementById('password');
    const lengthRequirement = document.getElementById('lengthRequirement');
    const uppercaseRequirement = document.getElementById('uppercaseRequirement');
    const lowercaseRequirement = document.getElementById('lowercaseRequirement');
    const numberRequirement = document.getElementById('numberRequirement');
  
    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
  
        // Check length requirement
        if (password.length >= 8) {
            lengthRequirement.style.color = 'green';
        } else {
            lengthRequirement.style.color = 'red';
        }
  
        // Check uppercase requirement
        if (/[A-Z]/.test(password)) {
            uppercaseRequirement.style.color = 'green';
        } else {
            uppercaseRequirement.style.color = 'red';
        }
  
        // Check lowercase requirement
        if (/[a-z]/.test(password)) {
            lowercaseRequirement.style.color = 'green';
        } else {
            lowercaseRequirement.style.color = 'red';
        }
  
        // Check number requirement
        if (/\d/.test(password)) {
            numberRequirement.style.color = 'green';
        } else {
            numberRequirement.style.color = 'red';
        }
    });
  
    // See masked Password Input
    const eyeIcon = document.getElementById('eyeIcon');
    eyeIcon.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });
  
    // Prevent form submission and handle Supabase registration
    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission
  
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        // Supabase initialization
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient('https://gocprlrznkxsdtxyhksm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3BybHJ6bmt4c2R0eHloa3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTEzOTksImV4cCI6MjAzMDQyNzM5OX0.VXq0ndDW9Y91IoQQeJqRC5-xhsqptP6hW50qvxZfX-g');
  
        try {
            // Register user with Supabase
            const { user, error } = await supabase.auth.signUp({ email, password });
  
            if (error) {
                console.error(error.message);
                alert('Failed to register user.');
            } else {
                console.log('User registered successfully:', user);
                alert('User registered successfully!');
                // Redirect user to another page or do something else
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
            alert('An error occurred while registering user.');
        }
    });
  });
  