const express = require('express')
const {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} = require('../controllers/bookController')
const router = express.Router()

require('../controllers/bookController')

router.get('/', getBooks)

router.get('/:bookId', getBookById)

router.post('/', createBook)

router.patch('/:bookId', updateBook)

router.delete('/:bookId', deleteBook)

module.exports = router
