const express = require('express')
const request = require('supertest')
const booksRoute = require('../routes/books.route')

const app = express()

app.use(express.json())
app.use('/api/books', booksRoute)
