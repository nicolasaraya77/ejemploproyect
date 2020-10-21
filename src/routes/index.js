const { Router } = require("express");
const router = Router();

const {
  getBooks,
  getBookBySection,
  createBook,
  updateBook,
} = require("../controllers/books");

//ruta de libros
router.get("/books", getBooks);
router.get("/books/:section", getBookBySection);

router.post("/books", createBook);
router.put("books/:section", updateBook);

module.exports = router;
