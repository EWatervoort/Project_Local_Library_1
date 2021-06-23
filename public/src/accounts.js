function findAccountById(accounts, id) {
  const personId = accounts.find((person) => person.id === id)
  return personId
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  )
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  const booksBorrowed =  books.filter((book) => {
    if (book.borrows.some((borrow) => borrow.id === account.id))
    return book.id
  } )
  return booksBorrowed.length
}

function getBooksPossessedByAccount(account, books, authors) {
  const checkedOutBooks = books.filter(book => !book.borrows[0].returned && book.borrows[0].id === account.id)
  const authorInfo = checkedOutBooks.map(book => {
    const acct = authors.find(author => author.id === book.authorId)
    book.author = acct;
    return book;
  })

return authorInfo
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
