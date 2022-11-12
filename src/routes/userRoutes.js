const express = require('express')
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addBookToUser,
  deleteBookFromUser,
} = require('../controllers/userController')
const router = express.Router()
const User = require('../models/User')
{
  getUsers
}
require('../controllers/userController')

router.get('/', getUsers)

router.get('/:userId', getUserById)

router.post('/', createUser)

router.patch('/:userId', updateUser)

router.delete('/:userId', deleteUser)

router.patch('/:userId/book/:bookId', addBookToUser)

router.delete('/:userId/book/:bookId', deleteBookFromUser)

module.exports = router
