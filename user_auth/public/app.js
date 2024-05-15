// See masked Password Input
const eyeIcon = document.getElementById('eyeIcon');
eyeIcon.addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});

document.addEventListener('DOMContentLoaded', function () {
    // Password Validation code...
    const passwordInput = document.getElementById('password');
    const lengthRequirement = document.getElementById('lengthRequirement');
    const uppercaseRequirement = document.getElementById('uppercaseRequirement');
    const lowercaseRequirement = document.getElementById('lowercaseRequirement');
    const numberRequirement = document.getElementById('numberRequirement');

    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;

        // Check length requirement
        if (password.length >= 6) {
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

    // Form submission event listener
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value; //Get email value
        const password = document.getElementById('password').value; // Get password value
        const username = document.getElementById('username').value; // Get username value
        const fullName = document.getElementById('full_name').value; // Get full name value

        try {
            // Send signup request to backend
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username, full_name: fullName })
            });

            if (!response.ok) {
                throw new Error('Failed to sign up user');
            }

            const data = await response.json();
            alert(data.message); // Display success message
            // Redirect user or perform other actions...
        } catch (error) {
            console.error('Error signing up user:', error.message);
            alert('An error occurred while signing up user');
        }
    });
});
