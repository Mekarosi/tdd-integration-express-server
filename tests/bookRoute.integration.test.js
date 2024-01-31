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

    it("POST /api/books - failure on invalid post body", async () => {
          
        const { body, statusCode } = await request(app).post("/api/books").send({
            name: "",
            author: "John Travolta"
        })

        expect(statusCode).toBe(400)
        expect(body).toEqual({
            errors: [
                {
                    "location": "body",
                    "msg": "Book name is required",
                    "path": "name",
                    "type": "field",
                    "value": "",
                }
            ]
        })
    })
})