const fs = require('fs')
const path = require('path')

const saveBook = (booksData) => {
    try {
        fs.writeFileSync(path.join(__dirname, "..", "data", "books.json"), JSON.stringify(booksData) )
        return true
    } catch (error) {
        return false
    }

}

module.exports = {
    saveBook
}