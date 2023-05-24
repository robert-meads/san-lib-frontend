// Add submit eventlistener.
const searchForm = document.getElementById('search_form');
const nameEl = document.getElementById('name');
const titleEl = document.getElementById('title');
const yearEl = document.getElementById('year');
const genreEl = document.getElementById('genre');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let bookData = enterSearchQuery(
    nameEl.value,
    titleEl.value,
    yearEl.value,
    genreEl.value
  );
  console.log(`bookData: ${JSON.stringify(bookData)}`);

  let matches = await queryCatalog(bookData);
  console.log(
    `Matching books from submit eventListener: ${JSON.stringify(matches)}`
  );
});

const catalog = [
  {
    author: 'JK Rowling',
    title: "Harry Potter and the Sorcerer's Stone",
    year: 1999,
    genre: 'sci-fi',
    count: 2,
  },
  {
    author: 'Rick Riordan',
    title: 'The Lightning Thief (Percy Jackson and the Olympians, #1)',
    year: 2011,
    genre: 'teens',
    count: 1,
  },
  {
    author: 'Lemony Snicket',
    title: 'The Bad Beginning (A Series of Unfortunate Events, #1)',
    year: 2001,
    genre: 'kids',
    count: 4,
  },
  {
    author: 'Christopher Paolini',
    title: 'Eragon (The Inheritance Cycle, #1)',
    genre: 'teens',
    year: 2004,
    count: 0,
  },
  {
    author: 'Eoin Colfer',
    title: 'Artemis Fowl (Artemis Fowl, #1)',
    genre: 'kids',
    year: 2003,
    count: 3,
  },
  {
    author: 'Cornelia Funke',
    title: 'Inkheart',
    genre: 'kids',
    year: 2002,
    count: 1,
  },
];

const sampleFormData = {
    author: 'JK Rowling',
  },
  sampleFormData2 = {
    year: 2001,
  };

// Goal: Bundle up search data into one object.
// Pre: At least one of the search parameters, besides year, is included.
// Post: Return an object with data bundled together.
function enterSearchQuery(author, title, year, genre) {
  // Create object.
  // Add author, title, year to object.
  // Return object.
  return {
    author,
    title,
    year,
    genre,
  };
}

// Goal: Uses search query object to look through catalog for relevant books.
// Pre: search query object exists.
// Post: Returns a list of target books that fit search criteria.
async function queryCatalog(formData) {
  const loaded_catalog = await new Promise((resolve) => {
    console.log(`Setting setTimeout for 2 seconds...`);
    setTimeout(resolve, 2000, catalog);
  });
  console.log(`Loaded catalog from database...`, loaded_catalog);
  const book_matches = [];

  console.log(`Inside nested loop.`);
  // Not doing an async loop yet.
  for (let book of loaded_catalog) {
    console.log(`book: ${JSON.stringify(book)}`);
    for (let bookProperty in book) {
      console.log(`property: ${bookProperty}`);
      if (
        book[bookProperty] === formData.name ||
        book[bookProperty] === formData.year ||
        book[bookProperty] === formData.title ||
        book[bookProperty] === formData.genre
      ) {
        console.log(`Found match: ${JSON.stringify(book)}`);
        book_matches.push(book);
        break;
      }
      console.log(`${bookProperty} was not a match.`);
    }
    console.log('');
  }

  console.log(
    `Matching books from query catalog: ${JSON.stringify(book_matches)}`
  );
  return book_matches;
}

// Goal: Get user’s list of books to be borrowed. User checks off books they want to borrow off of website.
// Pre: User checks off the books they want from list sent to them from library catalog search results.
// Post: Send list of books to library catalog.
function displayBooks(listOfBooks) {
  // Look at the listOfBooks marked to be checked out.
  // Look at the webpage and decrement the number of books avaliable or put on hold if books are unavaliable.
}

// Goal: Check out books from library and get a receipt of books borrowed.
// Pre: List of books that user wants to borrow.
// // Pre: Books to be borrowed must be available.
// Post: List of books that user wants  to borrow is noted in library catalog system.
function updateCatalog(patronReceipt) {
  // For each book in patronReceipt
  //  Decrement book count in library catalog.
  // ENDFOR
  // Add return date to patronReceipt.
  // Return patronReceipt
}
