const { findAuthorById } = require("./books")

function getTotalBooksCount(books) {
  return books.length
}


function getTotalAccountsCount(accounts) {
  return accounts.length
}


function getBooksBorrowedCount(books) {
  const borrowed = books.filter((book) => !book.borrows[0].returned)
  return borrowed.length
}


function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre)
  const genreTally = genres.reduce((tally, genre) => {
    tally[genre] = (tally[genre] || 0) + 1
    return tally
  }, {})  
  const genreCount = []
  Object.keys(genreTally).forEach(genre => {
    genreCount.push({ name: genre, count: genreTally[genre] })
  })
  genreCount.sort((countA, countB) => countA.count < countB.count ? 1 : -1)
  const topFive = genreCount.slice(0,5)
  return topFive
}


function getMostPopularBooks(books) {
  const bookByCount = books.map((book) => ({name: book.title, count: book.borrows.length}))
  bookByCount.sort((countA, countB) => countA.count < countB.count ? 1 : -1)
  const topFive = bookByCount.slice(0,5)
  return topFive
}


function getMostPopularAuthors(books, authors) {
  const bookByCount = books.map((book) => {
    const {authorId, borrows} = book
    return {name: authorId, count: borrows.length}
  })
  const bookCount = []
  bookByCount.forEach((book) => {
    let selected = bookCount.find(entry => entry.name === book.name)
    if (selected) {
      selected.count += book.count
    } else {
      bookCount.push(book)
    }
    return bookCount
  })
  bookCount.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1)
  const topFive = bookCount.slice(0, 5)
  topFive.map(people => {
    let authorName = (findAuthorById(authors, people.name))
    if (authorName) {
      const fullName = [authorName.name.first, authorName.name.last]
      let combined = fullName.join(" ")
      return people.name = combined
    }
  })
  return topFive
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
