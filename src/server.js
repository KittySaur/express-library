const http = require('http')

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('./controllers/usersController')

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('./controllers/booksController')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if ((req.url === '/users' || req.url === '/users/') && req.method === 'GET') {
    getUsers(req, res)
  } else if (req.url === '/users' && req.method === 'POST') {
    createUser(req, res)
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2]
    getUserById(req, res, id)
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2]
    updateUser(req, res, id)
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2]
    deleteUser(req, res, id)
  } else if (
    (req.url === '/books' || req.url === '/books/') &&
    req.method === 'GET'
  ) {
    getBooks(req, res)
  } else if (req.url === '/books' && req.method === 'POST') {
    createBook(req, res)
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === 'GET') {
    const bookId = req.url.split('/')[2]
    getBookById(req, res, bookId)
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2]
    updateBook(req, res, id)
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2]
    deleteBook(req, res, id)
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    })
    res.write('Welcome to the library')
    res.end()
  }
})

server.listen(PORT, () => {
  try {
    console.log('Server is running')
  } catch (err) {
    console.log(err)
  }
})
