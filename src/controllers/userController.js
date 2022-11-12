const User = require('../models/User')

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

const createUser = (req, res) => {
  const data = req.body
  User.create(data)
    .then((user) => {
      res.status(201).send(user)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

const getUserById = (req, res) => {
  const { userId } = req.params
  User.findById(userId)
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

const updateUser = (req, res) => {
  const { userId } = req.params
  const data = req.body
  User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const deleteUser = (req, res) => {
  const { userId } = req.params
  User.findByIdAndDelete(userId)
    .then((user) => {
      res.status(200).send('Done')
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const addBookToUser = (req, res) => {
  const { userId, bookId } = req.params

  User.findByIdAndUpdate(
    userId,
    { $addToSet: { books: bookId } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const deleteBookFromUser = (req, res) => {
  const { userId, bookId } = req.params

  User.findByIdAndUpdate(
    userId,
    { $pullAll: { books: [{ _id: bookId }] } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addBookToUser,
  deleteBookFromUser,
}
