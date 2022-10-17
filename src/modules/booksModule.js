let books = require('../data/books.json')
const path = require('path')
const { v4: uuid } = require('uuid')
const { writeDataToFile } = require('../utils')

const findBooks = () => {
  return new Promise((resolve, rejected) => {
    resolve(books)
  })
}

const findBookById = (bookId) => {
  return new Promise((resolve, rejected) => {
    const book = books.find((book) => book.id === bookId)
    resolve(book)
  })
}

const create = (book) => {
  return new Promise((resolve, reject) => {
    const newBook = { id: uuid(), ...book }
    books.push(newBook)
    writeDataToFile(path.join(__dirname, '../data/books.json'), books)
    resolve(newBook)
  })
}

const update = (id, book) => {
  return new Promise((resolve, reject) => {
    const index = books.findIndex((book) => book.id === id)
    books[index] = { id, ...book }
    writeDataToFile(path.join(__dirname, '../data/books.json'), books)
    resolve(books[index])
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    books = books.filter((book) => book.id !== id)
    writeDataToFile(path.join(__dirname, '../data/books.json'), books)
    resolve()
  })
}

module.exports = { findBooks, findBookById, create, update, remove }
