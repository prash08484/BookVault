const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const bookRouter = express.Router();


// create Book 
bookRouter.post('/', expressAsyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    if (book) {
        console.log("book added successfully");
        res.status(200);
        res.json(book);
    }
    else {
        console.log("book adding fails");
        res.status(500);
        throw new Error(`Book creating Failed`);
    }
}));



module.exports = bookRouter;

