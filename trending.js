
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
    console.log(data)

    if (data.numFound === 0 || !data.docs || data.docs.length === 0) {
      console.error('No random book found. Try again!');
      return;
    }

    const bookData = data.docs[Math.floor(Math.random() * data.docs.length)];
    const title = bookData.title || 'Unknown Title';
    const author = (bookData.author_name && bookData.author_name[0]) || 'Unknown Author';
    
    document.getElementById('title').textContent = `Book Title: ${title}`;
    document.getElementById('author').textContent = `Author: ${author}`;

    //getBookImg(); // Call function to fetch book image

  } catch (error) {
    console.error('Error fetching random book:', error);
  }
}


async function getBookImg(){

}

/**
 * helper function that clears a div 
 *
 */
function clearDiv(divId) {
  document.getElementById(divId).textContent = '';
}

getRandomBook()