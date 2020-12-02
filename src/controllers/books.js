//controlador de books que estan en la base de datos
const { Pool } = require("pg");

//conexion a la base de datos
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "library",
  port: "5432",
});

//logica del controlador , peticiones get (retorno de valores)
const getBooks = async (req, res) => {
  const response = await pool.query("SELECT * FROM books");
  res.status(200).json(response.rows);
  console.log(res.status(200).json(response.rows));
};

const getBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM books Where id = $1", [id]);
  res.json(response.rows);
};

//logica del controlador , peticiones post (insercion de valores)
const createBook = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    console.log(req.body);
    const { section, title, author } = req.body;

    // Creamos la tarea

    const response = await pool.query(
      "INSERT INTO books (section, title, author) VALUES ($1,$2, $3)",
      [section, title, author]
    );
    res.json({ response, message: "libro añadido con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error" });
  }
};

/* para 

generar la peticion post usar postman o similar https://www.postman.com*/
//logica del controlador , peticiones put (actualizacion de valores)
const updateBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const { section, title, author } = req.body;
  console.log(id);

  const response = await pool.query(
    "UPDATE books SET  section = $1, title = $2, author = $3 Where id = $4",
    [section, title, author, id]
  );

  res.json({ message: "libro actualizado" });
};

//logica del controlador , peticiones delete (eliminacion  de valores)
const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("DELETE FROM books where id = $1", [id]);
  res.json("libro eliminado");
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

/*
 el manejo de async consiste en la ejecución asincrónica , donde se espera la ejecucion del los
 valores de la funcion (req,res) y luego tras terminar eso realizar la consulta 
 https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona
 */
