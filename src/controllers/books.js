//controlador de books que estan en la base de datos
const { Pool } = require("pg");

//conexion a la base de datos
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "",
  database: "library",
  port: "5432",
});

//logica del controlador , peticiones get (retorno de valores)
const getBooks = async (req, res) => {
  const response = await pool.query("SELECT * FROM books");
  res.status(200).json(response.rows);
  console.log(res.status(200).json(response.rows));
};

const getBookBySection = async (req, res) => {
  const Section = req.params.section;
  const response = await pool.query("SELECT * FROM books Where section = $1", [
    Section,
  ]);
  res.json(response.rows);
};

//logica del controlador , peticiones post (insercion de valores)
const createBook = async (req, res) => {
  console.log(req.body);
  const { title, author } = req.body;
  const response = await pool.query(
    "INSERT INTO books (section, tittle, author) VALUES ($1,$2,$3)",
    [2, title, author]
  );
  res.json({
    message: "libro añadido con exito",
    body: {
      book: { section, title, author },
    },
  });
};

/* para 

generar la peticion post usar postman o similar https://www.postman.com*/
//logica del controlador , peticiones put (actualizacion de valores)
const updateBook = async (req, res) => {
  const Section = parseInt(req.params.section);
  const { title, author } = req.body;
  console.log(Section);
  console.log(req.body);

  const response = await pool.query(
    "UPDATE books SET title = $1, author = $2 Where section = $3",
    [title, author, Section]
  );

  res.json({ message: "libro actualizado" });
};

//logica del controlador , peticiones delete (eliminacion  de valores)
const deleteBook = async (req, res) => {
  const Section = req.params.section;
  await pool.query("DELETE FROM books where section = $1", [Section]);
  res.json("eliminado");
};

module.exports = {
  getBooks,
  getBookBySection,
  createBook,
  updateBook,
};

/*
 el manejo de async consiste en la ejecución asincrónica , donde se espera la ejecucion del los
 valores de la funcion (req,res) y luego tras terminar eso realizar la consulta 
 https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona
 */
