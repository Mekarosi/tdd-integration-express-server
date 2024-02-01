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
        console.log(body);
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

    it("POST /abi/books - success", async  () => {
        const { body, statusCode } = await request(app).post("/api/books").send({
            name: "Entitled",
            author: "John Travolta"
        })

        expect(statusCode).toBe(200)
       expect(body).toEqual({
        message: "Successfully posted"
       })
    })

    it("PUT /api/books/:bookId - failure when book is not found", async () => {
        const { body, statusCode } = await request(app).put("/api/books/:5000").send({
            name: "Loved",
            author: "John Travolta"
        }) 
        expect(statusCode).toBe(404)

        expect(body).toEqual({ 
            error: true,
            message: "Book not found"})
    })

    it("PUT /api/books/:bookId - Success -Successfully updated book", async () => {
        const { body, statusCode } = await request(app).put("/api/books/ 2").send({
            name: "Loved init",
            author: "Jack White"
        }) 
        expect(statusCode).toBe(201)

        expect(body).toEqual({ 
            name: "Loved init",
            author: "Jack White",
            id: 2
        })
    })
})