const { Router } = require("express");
const router = Router();

const { getBooks } = require("../controllers/books");

//ruta de libros
router.get("/books", getBooks);

module.exports = router;
