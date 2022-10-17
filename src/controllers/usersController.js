const User = require('../modules/usersModule')
const Book = require('../modules/booksModule')

const { getUserData } = require('../utils')

const getUsers = async (req, res) => {
  try {
    const users = await User.findUsers()
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.write(JSON.stringify(users))
    res.end()
  } catch (err) {
    console.log(err)
  }
}

const getUserById = async (req, res, id) => {
  try {
    const user = await User.findUserById(id)

    if (!user) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: 'User not found' }))
      res.end()
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify(user))
      res.end()
    }
  } catch (err) {
    console.log(err)
  }
}

const createUser = async (req, res) => {
  try {
    const body = await getUserData(req)
    const { userName, userBooks } = JSON.parse(body)

    const user = {
      userName,
      userBooks,
    }

    const newUser = await User.create(user)

    res.writeHead(201, {
      'Content-Type': 'application/json',
    })
    return res.end(JSON.stringify(newUser))
  } catch (err) {
    console.log(err)
  }
}

const updateUser = async (req, res, id) => {
  try {
    const user = await User.findUserById(id)

    if (!user) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: 'User not found' }))
      res.end()
    } else {
      const body = await getUserData(req)

      const { userName, userBooks } = JSON.parse(body)

      const userData = {
        userName: userName || user.userName,
        userBooks: user.userBooks,
      }

      const updatedUser = await User.update(user.id, userData)

      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      return res.end(JSON.stringify(updatedUser))
    }
  } catch (err) {
    console.log(err)
  }
}

const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findUserById(id)

    if (!user) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: 'User not found' }))
      res.end()
    } else {
      await User.remove(id)
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.write(JSON.stringify({ message: `User ${user.userName} is removed` }))
      res.end()
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
