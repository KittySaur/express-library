const Book = require('../models/Book')

const getBooks = (req, res) => {
  Book.find({})
    .then((book) => {
      res.status(200).send(book)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

const createBook = (req, res) => {
  const data = req.body
  Book.create(data)
    .then((book) => {
      res.status(201).send(book)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

const getBookById = (req, res) => {
  const { bookId } = req.params
  Book.findById(bookId)
    .then((book) => {
      res.status(200).send(book)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

const updateBook = (req, res) => {
  const { bookId } = req.params
  const data = req.body
  Book.findByIdAndUpdate(bookId, data, { new: true, runValidators: true })
    .then((book) => {
      res.status(200).send(book)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const deleteBook = (req, res) => {
  const { bookId } = req.params
  Book.findByIdAndDelete(bookId)
    .then((book) => {
      res.status(200).send('Done')
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}
module.exports = { getBooks, createBook, getBookById, updateBook, deleteBook }
