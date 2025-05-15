const express = require("express");
const Book = require("./model");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

module.exports = router;
