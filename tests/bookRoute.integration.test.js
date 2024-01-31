const express = require('express')
const request = require('supertest')
const booksRoute = require('../routes/books.route')

const app = express()
 
app.use(express.json())
app.use('/api/books', booksRoute)

describe("Integration test for the books API", () => {
    it("GET /api/books - success - get all the books", async () => {
       const {body, statusCode} = await request(app).get('/api/books')

       expect(body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                author: expect.any(String)
            })
        ])
       )
       expect(statusCode).toBe(200)
    })
})