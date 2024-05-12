
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

/**
 * return a dictionary containing book data; book_title, Author, Genre, Date, description
 *
 * @return {dictionary} dictionary containing singular book data
 */
async function getRandomBook() {

  randomSubject = getRandomSubject(readingSubjects)
  console.log(randomSubject)

  try {
    const response = await fetch(`https://openlibrary.org/subjects/${randomSubject}.json?details=false`);
    const data = await response.json();

    book_to_show = getRandomObject(data)
    book_isbn = book_to_show.isbn
    book_title = book_to_show.title
    authorName = book_to_show.authors[0].name;
    genre = book_to_show.subject[0];

    console.log(book_to_show)
    console.log(book_title)
    console.log(authorName)
    console.log(genre)

    if (data.numFound === 0 || !data.docs || data.docs.length === 0) {
      console.error('No random book found. Try again!');
      return;
    }

    
    //getBookImg(); // Call function to fetch book image

  } catch (error) {
    console.error('Error fetching random book:', error);
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