const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const bookRouter = express.Router();
// const authMiddleware = require('../middlewares/authMiddleware');

/* NOTE: create and find are public options but 
   delete and update are private router they need id */


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



// Find Book 
bookRouter.get('/', expressAsyncHandler(async (req, res) => {
    const book = await Book.find({});
    if (book) {
        console.log("Book found successfully ");
        res.status(200);
        res.json(book);
    }
    else {
        console.log("No Such book exists in db");
        res.status(500);
        throw new Error(`No Such book exists in db`);
    }
}));


// bookRouter.put('/:id', authMiddleware, expressAsyncHandler(async (req, res) => {
bookRouter.put('/:id', expressAsyncHandler(async (req, res) => {

    // res.send(req.params.id); 
    const book = await Book.findById(req.params.id);
    if (book) {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200);
        res.json(updatedBook);
    }
    else {
        res.status(500);
        throw new Error("Book updation Failied");
    }

}));



bookRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send("book deleted ");
    }
    catch (error) {
        res.status(500);
         res.send("Unable to delete book ");
    }
}));


module.exports = bookRouter;

