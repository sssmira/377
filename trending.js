
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
  randomSubject = getRandomSubject(readingSubjects);
  console.log('Random Subject: ' + randomSubject);
  
  let bookData = {}; // Object to store book data

  try {
    const response = await fetch(`https://openlibrary.org/subjects/${randomSubject}.json?details=false`);
    const data = await response.json();

    book_to_show = getRandomObject(data);
    if (!book_to_show.availability || book_to_show.availability.isbn === null) {
      throw new Error('Book availability is undefined');
    }

    const book_olid = book_to_show.availability.openlibrary_work;
    const book_isbn = book_to_show.availability.isbn;
    const book_title = book_to_show.title;
    const authorName = book_to_show.authors[0].name;
    const genre = book_to_show.subject[0];

    let description = "";
    try {
      description = await getDescription(book_olid);
    } catch (error) {
      console.error('Error getting book description:', error);
      throw new Error('Error getting book description');
    }

    // fetch book image
    const book_cover = await getBookCover(book_isbn);

    // Populate book data object
    bookData = {
      book_to_show,
      book_olid,
      book_isbn,
      book_title,
      description,
      authorName,
      genre,
      book_cover // Add book cover to the object
    };

    console.log('Book:', book_to_show);
    console.log('OLID:', book_olid);
    console.log('ISBN:', book_isbn);
    console.log('Title:', book_title);
    console.log('Description:', description);
    console.log('Author:', authorName);
    console.log('Genre:', genre);
    console.log('Book Cover:', book_cover);

  } catch (error) {
    console.error('Error fetching random book:', error);
    
    return getRandomBook();
  }

  
  return bookData;
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

function setBook(){

}



/**
 * helper function that clears a div 
 *
 */
function clearDiv(divId) {
  document.getElementById(divId).textContent = '';
}

getRandomBook()