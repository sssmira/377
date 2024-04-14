document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const lengthRequirement = document.getElementById('lengthRequirement');
    const uppercaseRequirement = document.getElementById('uppercaseRequirement');
    const lowercaseRequirement = document.getElementById('lowercaseRequirement');
    const numberRequirement = document.getElementById('numberRequirement');
  
    passwordInput.addEventListener('input', function() {
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
  
    // Prevent form submission
    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Password validated successfully!');
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
  
    eyeIcon.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    });
  });