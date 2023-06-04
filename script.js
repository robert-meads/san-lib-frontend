// Add submit eventlistener.
const searchForm = document.getElementById('search_form');
const nameEl = document.getElementById('name');
const titleEl = document.getElementById('title');
const yearEl = document.getElementById('year');
const genreEl = document.getElementById('genre');
const bookResultsForm = document.getElementById('book_results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let bookData = enterSearchQuery(
    nameEl.value,
    titleEl.value,
    yearEl.value,
    genreEl.value
  );

  let matches = await queryCatalog(bookData);
  console.log('Matched books: ', matches);

  displayBooks(matches);
});

bookResultsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get all books that are to be checked out
  const checkedBooks = getCheckedBooks();

  // update catalog
  updateCatalog(checkedBooks);
});

function getCheckedBooks() {
  // get all checked books via unique identifier in checkmark name/value pair
  // OR get all checked books as an object with checkmark and book details together.
  let bookResults = document.querySelectorAll('div.book_slot');

  let checkedBooks = [];

  // NodeList obj has a forEach method.
  bookResults.forEach((book) => {
    // Book details
    let result = book.children[1];
    if (book.children[0].checked) {
      checkedBooks.push(result);
    }
  });
  console.log('Here are the checked books: ', checkedBooks);
  return checkedBooks;
}

const catalog = [
  {
    author: 'JK Rowling',
    title: "Harry Potter and the Sorcerer's Stone",
    year: 1999,
    genre: 'sci-fi',
    count: 2,
    id: 0,
  },
  {
    author: 'Rick Riordan',
    title: 'The Lightning Thief (Percy Jackson and the Olympians)',
    year: 2011,
    genre: 'teens',
    count: 1,
    id: 1,
  },
  {
    author: 'Lemony Snicket',
    title: 'The Bad Beginning (A Series of Unfortunate Events)',
    year: 2001,
    genre: 'kids',
    count: 4,
    id: 2,
  },
  {
    author: 'Christopher Paolini',
    title: 'Eragon (The Inheritance Cycle)',
    genre: 'teens',
    year: 2004,
    count: 0,
    id: 3,
  },
  {
    author: 'Eoin Colfer',
    title: 'Artemis Fowl',
    genre: 'kids',
    year: 2003,
    count: 3,
    id: 4,
  },
  {
    author: 'Cornelia Funke',
    title: 'Inkheart',
    genre: 'kids',
    year: 2002,
    count: 1,
    id: 5,
  },
];

const sampleFormData = {
    author: 'JK Rowling',
  },
  sampleFormData2 = {
    year: 2001,
  },
  sampleFormData3 = {
    genre: 'teens',
  },
  sampleFormData4 = {
    genre: 'kids',
  };

// Goal: Bundle up search data into one object.
// Pre: At least one of the search parameters, besides year, is included.
// Post: Return an object with data bundled together.
function enterSearchQuery(author, title, year, genre) {
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
    setTimeout(resolve, 2000, catalog);
  });
  console.log(`Loaded catalog from database...`, loaded_catalog);
  const book_matches = [];

  // Not doing an async loop yet.
  for (let book of loaded_catalog) {
    for (let bookProperty in book) {
      if (
        book[bookProperty] === formData.name ||
        book[bookProperty] === formData.year ||
        book[bookProperty] === formData.title ||
        book[bookProperty] === formData.genre
      ) {
        book_matches.push(book);
        break;
      }
    }
  }

  return book_matches;
}

// Goal: Get user’s list of books to be borrowed. User checks off books they want to borrow off of website.
// Pre: User checks off the books they want from list sent to them from library catalog search results.
// Post: Send list of books to library catalog.
function displayBooks(listOfBooks) {
  listOfBooks.forEach((book, index) => {
    const { author, title, year, genre } = book;
    const bookEl = document.createElement('div');

    bookEl.classList.add('book_slot');

    bookEl.innerHTML = `<input type="checkbox" id="checkbox${index}" />
    <div class="book_details">
      <h3>${title}</h3>
      <ul>
        <li>${author}</li>
        <li>${year}</li>
        <li>${genre}</li>
        <li>${id}</li>
      </ul>
    </div>
    <br />`;

    bookResultsForm.appendChild(bookEl);
  });
  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('id', 'bookResults_submit');
  bookResultsForm.appendChild(submitBtn);
}

// Goal: Check out books from library and get a receipt of books borrowed.
// Pre: List of books that user wants to borrow.
// // Pre: Books to be borrowed must be available.
// Post: List of books that user wants  to borrow is noted in library catalog system.
function updateCatalog(booksBorrowed) {
  
}

const getBookProperties = (book) => {
  // Reduce error chances from having to type book.children over and over again.
  const bookProperties = book.children;

  // Prints title of book.
  console.log(bookProperties[0].innerText);
  for (
    let property = 0;
    property < bookProperties[1].children.length;
    property++
  ) {
    // Prints author, year, genre.
    console.log(bookProperties[1].children[property].innerText);
  }
};
/*
  for each checked book
    for each book in catalog
      if checked book == book in catalog AND book in catalog's amount is availiable
      then
        decrease book count in catalog
      else if book is all checked out
      then
        ask user if they want to place hold
      else
        (book doesnt exist in catalog for some reason)
        ask user if they want lib to order the book.
      endif
    endfor
  endfor
*/
