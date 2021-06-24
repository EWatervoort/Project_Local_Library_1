
function findAuthorById(authors, id) {
  const authorId = authors.find((author) => author.id === id);
  return authorId;
};

function findBookById(books, id) {
  const bookId = books.find((book) => book.id === id);
  return bookId;
};

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => book.borrows[0].returned === false );
  const notBorrowed = books.filter((book) => book.borrows[0].returned === true );
  const allBooks = [borrowed, notBorrowed];
  return allBooks;
};

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows.slice(0,10);
  return borrows.map((borrow) => {
    const acct = accounts.find((account) => account.id == borrow.id);
    acct.returned = borrow.returned;
    return acct;   
  });
};


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
