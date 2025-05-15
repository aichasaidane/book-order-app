const mongoose = require("mongoose");
const Book = require("./model"); 

mongoose.connect("mongodb://localhost:27017/books")
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const books = [
      { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", price: 10.99 },
      { title: "1984", author: "George Orwell", price: 12.50 },
      { title: "L’Étranger", author: "Albert Camus", price: 9.40 },
      { title: "Harry Potter à l'école des sorciers", author: "J.K. Rowling", price: 14.99 },
    ];

    return Book.insertMany(books);
  })
  .then(() => {
    console.log("📚 Livres insérés avec succès !");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Erreur :", err);
    mongoose.disconnect();
  });
