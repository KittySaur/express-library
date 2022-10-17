let users = require('../data/users.json')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

const findUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users)
  })
}

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id)

    resolve(user)
  })
}

const create = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user }
    users.push(newUser)
    writeDataToFile(path.join(__dirname, '../data/users.json'), users)

    resolve(newUser)
  })
}

const update = (id, user) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id === id)
    users[index] = { id, ...user }
    writeDataToFile(path.join(__dirname, '../data/users.json'), users)
    resolve(users[index])
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    users = users.filter((user) => user.id !== id)
    writeDataToFile(path.join(__dirname, '../data/users.json'), users)
    resolve()
  })
}

module.exports = { findUsers, findUserById, create, update, remove }
