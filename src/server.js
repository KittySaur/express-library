const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./dbConnection')
const bodyParser = require('body-parser')
require('dotenv/config')
const cors = require('cors')

app.use(bodyParser())
app.use(cors())

connectDB()

const usersRoute = require('./routes/userRoutes')
const booksRoute = require('./routes/bookRoutes')

app.use('/users', usersRoute)
app.use('/books', booksRoute)

app.get('/', (req, res) => {
  res.send('Welcome to the library')
  res.status(200)
})

app.get('/*', (req, res) => {
  res.send('Page not found')
  res.status(404)
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(process.env.PORT, () => {
    try {
      console.log(`Server link: ${process.env.API_URL}:${process.env.PORT}`)
    } catch (err) {
      console.log(err)
    }
  })
})
