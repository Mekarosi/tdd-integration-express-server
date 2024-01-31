const express = require('express')
const router = express.Router()
const booksData = require('../data/books.json')
const {check, validationResult} = require('express-validator')
const { saveBook } = require('../bookServices/saveBook')

router.get('/', (req, res) => {
   res.json(booksData)
})

router.post('/', [
    check('name', 'Book name is required').not().isEmpty(),
    check('author', 'Author name is required').not().isEmpty(),  
] ,
(req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name, author } = req.body
    booksData.push({
        name ,
        author,  
        id: Math.random()
    })
    const isSaved = saveBook(booksData)

    if(!isSaved){
       return res.status(500).json({
        error: true,
        message: "Could not save book  "
       })
    }
    res.json({
        message: "Successfully posted"
    })
}) 

module.exports = router 