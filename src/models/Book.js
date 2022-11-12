const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
  },
  issueYear: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('book', bookSchema)
