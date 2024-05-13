
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