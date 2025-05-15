const express = require("express");
const mongoose = require("mongoose");
const app = express();
const booksRouter = require("./booksController");

app.use(express.json());
app.use("/books", booksRouter);

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/books") 
  .then(() => {
    console.log("✅ MongoDB connected (Books DB)");
    app.listen(3001, () => console.log("📚 Books service listening on port 3001"));
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
