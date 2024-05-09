// Password Validation
document.addEventListener('DOMContentLoaded', function () {
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

  // Prevent form submission
  const passwordForm = document.getElementById('passwordForm');
  passwordForm.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Password validated successfully!');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');

  eyeIcon.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  });
});


/**
 * return a dictionary containing book data; book_title, Author, Genre, Date, description
 *
 * @return {dictionary} dictionary containing singular book data
 */
async function getBook() {


}

/**
 * helper function that clears a div 
 *
 */
function clearDiv() {

}

/* THE FOLLOWING IS THE JS NEEDED FOR THE HELP.HTML PAGE */

const apiUrl = 'https://openlibrary.org/search.json?';

// Query params from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fetch a book based on the Open Library ID (OLID), which is passed in from the book a user cicks "help" on (or something similar)
function fetchBookById(olid) {
  fetch(`https://openlibrary.org/search.json?olid=${olid}&limit=1`)
    .then(response => response.json())
    .then(data => {
      if (data.docs.length > 0) {
        displayBookDetails(data.docs[0]);
      } else {
        console.error('No book found with the provided OLID.');
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Display book details
function displayBookDetails(book) {
  const defaultImageUrl = 'https://media1.tenor.com/m/NGFJ4ILyBtcAAAAC/spongebob-reading.gif'; // Copyright risk but oh well

  if (!book) { // This is the default when no OLID is passed in.
    document.getElementById('book-title').textContent = 'Oops! No book was selected.';
    document.getElementById('book-cover').src = defaultImageUrl;
    document.getElementById('title').textContent = 'No title available';
    document.getElementById('author').textContent = 'Author: Unknown';
    document.getElementById('genre').textContent = 'Genre: N/A';
    document.getElementById('date').textContent = 'Date of Publication: Unknown';
    document.getElementById('description').textContent = 'Description: No description available.';
    return;
  }

  // If OLID is passed in, fetch details of the book to populate page
  document.getElementById('book-title').textContent = book.title || 'No title available';
  document.getElementById('book-cover').src = book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : defaultImageUrl;
  document.getElementById('title').textContent = book.title || 'No title available';
  document.getElementById('author').textContent = `Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
  document.getElementById('genre').textContent = `Genre: ${book.subject ? book.subject.join(', ') : 'N/A'}`;
  document.getElementById('date').textContent = `Date of Publication: ${book.first_publish_year || 'Unknown'}`;
  document.getElementById('description').textContent = `Description: ${book.first_sentence ? book.first_sentence.join(' ') : 'No description available.'}`;
}

// Get the OLID 
const olid = getQueryParam('book');
if (olid) {
  fetchBookById(olid);
} else {
  console.error('No book identifier provided in the URL.');
  displayBookDetails(); // Call the function with no argument to set default values
}

/* END HELP.HTML JS */