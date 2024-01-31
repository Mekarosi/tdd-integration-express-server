const express = require('express')
const router = express.Router()
const booksData = require('../data/books.json')
const {check, validationResult} = require('express-validator')

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
})

module.exports = router