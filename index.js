const express = require('express')

const app = express()
const booksRoute = require('./routes/books.route')

app.use(express.json())
app.use('/api/books', booksRoute)


const PORT = process.env.PORT || 8080




app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})