<form action='' id='search_form'>
  <label for='first_name'>First Name</label>
  <input type='text' id='first_name' />
  <input type='submit' id='submit' />
</form>;

// Goal: Bundle up search data into one object.
// Pre: At least one of the search parameters, besides year, is included.
// Post: Return an object with data bundled together.
function enterSearchQuery(author, title, year) {
  // Create object.
  // Add author, title, year to object.
  // Return object.
  return {
    author,
    title,
    year,
  };
}

// Goal: Uses search query object to look through catalog for relevant books.
// Pre: search query object exists.
// Post: Returns a list of target books that fit search criteria.
function queryCatalog(formData) {
  const book_matches = [];

  catalog.forEach((book) => {
    for (let key in book) {
      console.log(key, book[key]);
      // If one of the fields match a search query field, return that book.
      if (
        formData.author === book[key] ||
        formData.title === book[key] ||
        formData.year === book[key]
      ) {
        book_matches.push(book);
        break;
      }

      // This statement is literally asking for a key property in catalog[0] which doesnt exist. key is not being evaluated unlike in square brackets.
      // console.log(catalog[0].key);
    }
    console.log('');
  });

  console.log('Matching books: ');
  console.log(book_matches);
  return book_matches;

  //  Set target books = [ ]
  //  For each value in formData
  //    For each book in library catalog
  //      If book’s property is equivalent to value
  //      Then
  //        Add book to target books.
  //    ENDFOR
  //  ENDFOR
  //  Return target books
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
