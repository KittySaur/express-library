const Book = require('../modules/booksModule')

const { getUserData } = require('../utils')

const getBooks = async (req, res) => {
  try {
    const books = await Book.findBooks()
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.write(JSON.stringify(books))
    res.end()
  } catch (err) {
    console.log(err)
  }
}

const getBookById = async (req, res, bookId) => {
  try {
    const book = await Book.findBookById(bookId)

    if (!book) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: 'Book not found' }))
      res.end()
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify(book))
      res.end()
    }
  } catch (err) {
    console.log(err)
  }
}

const createBook = async (req, res) => {
  try {
    const body = await getUserData(req)
    const { bookName } = JSON.parse(body)

    const book = {
      bookName,
    }

    const newBook = await Book.create(book)

    res.writeHead(201, {
      'Content-Type': 'application/json',
    })
    return res.end(JSON.stringify(newBook))
  } catch (err) {
    console.log(err)
  }
}

const updateBook = async (req, res, id) => {
  try {
    const book = await Book.findBookById(id)

    if (!book) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: 'Book not found' }))
      res.end()
    } else {
      const body = await getUserData(req)

      const { bookName } = JSON.parse(body)

      const bookData = {
        bookName: bookName || book.bookName,
      }

      const updatedBook = await Book.update(book.id, bookData)

      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      return res.end(JSON.stringify(updatedBook))
    }
  } catch (err) {
    console.log(err)
  }
}

const deleteBook = async (req, res, id) => {
  try {
    const book = await Book.findBookById(id)

    if (!book) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: 'Book not found' }))
      res.end()
    } else {
      await Book.remove(id)
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: `Book ${book.bookName} is removed` }))
      res.end()
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook }
