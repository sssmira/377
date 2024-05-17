
const readingSubjects = [
  "fantasy",
  "biography",
  "history",
  "self help",
  "psychology",
  "science",
  "philosophy",
  "art",
  "business",
  "politics",
  "travel",
  "food",
  "technology",
  "health",
  "nutrition",
  "fitness",
  "mental health",
  "education",
  "miscellaneous",
  "poetry",
  "short stories",
  "essays",
  "comics",
  "magazines"
];


function getRandomSubject(list_of_subjects){
  const randomIndex = Math.floor(Math.random() * list_of_subjects.length);
  return list_of_subjects[randomIndex];
}

function getRandomObject(data){
  const worksArray = data.works;
  const randomIndex = Math.floor(Math.random() * worksArray.length);
  return worksArray[randomIndex];
}

async function getDescription(isbn) {
  try {
    const response = await fetch(`https://openlibrary.org/books/${isbn}.json`);
    const data = await response.json();

    
    
    const bookDescription = data.description ? data.description.value: 'Not found';

    if (bookDescription === 'Not found' || bookDescription == undefined) {
      throw new Error("Description not found");
    }

    return bookDescription;
  } catch (error) {
    console.error('Error Getting book description 1:', error);
    getRandomBook()
    //return "Error getting description 2";
  }
}

/**
 * return a dictionary containing book data; book_title, Author, Genre, Date, description
 *
 * @return {dictionary} dictionary containing singular book data
 */
async function getRandomBook() {
  const randomSubject = getRandomSubject(readingSubjects);
  console.log('Random Subject:', randomSubject);

  try {
    const response = await fetch(`https://openlibrary.org/subjects/${randomSubject}.json?details=false`);
    const data = await response.json();

    const bookToShow = getRandomObject(data);
    const { title, authors, subject } = bookToShow;

    if (!bookToShow.availability || !bookToShow.availability.isbn) {
      throw new Error('Book availability is undefined or ISBN is missing');
    }

    const bookOlid = bookToShow.availability.openlibrary_work;
    const bookIsbn = bookToShow.availability.isbn;
    const authorName = authors[0].name;
    const genre = subject[0];

    const description = await getDescription(bookOlid);
    const bookCover = await getBookCover(bookIsbn);

    const bookData = {
      title,
      authorName,
      genre,
      description,
      bookCover,
      bookOlid,
      bookIsbn
    };

    console.log('Book Data:', bookData);
    return bookData;
  } catch (error) {
    console.error('Error fetching random book:', error);
    return getRandomBook(); // Retry fetching a random book
  }
}


async function getBookCover(isbn){
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`; 
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch book cover');
    }
    const imageUrl = response.url;
    return imageUrl;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
  }

}

function setBook(bookData) {
  if (!bookData) {
    console.error('No book data provided');
    return;
  }

  console.log('Book Data:', JSON.stringify(bookData, null, 2));

  document.getElementById('title').textContent = `Book Title: ${bookData.title}`;
  document.getElementById('author').textContent = `Book Author: ${bookData.authorName}`;
  document.getElementById('genre').textContent = `Book Genre: ${bookData.genre}`;
  // Assuming date is not available in the provided data, hence commented
  // document.getElementById('date').textContent = `Date Published: ${bookData.date}`;
  document.getElementById('description').textContent = `Description: ${bookData.description}`;
  if (bookData.bookCover) {
    document.getElementById('book-cover').src = bookData.bookCover;
  } else {
    document.getElementById('book-cover').alt = 'No cover available';
  }
}



/**
 * helper function that clears a div 
 *
 */
function clearDiv(divId) {
  document.getElementById(divId).textContent = '';
}

async function displayRandomBook() {
  const bookData = await getRandomBook();
  setBook(bookData);
}

// Call displayRandomBook to fetch and display a random book
displayRandomBook();