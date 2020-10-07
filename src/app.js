// inicializaremos el servidor
const express = require("express");
const bodyParser = require("body-parser");

//funcion express para inicializar servidor
const app = express();

//carga de rutas
app.use(require("./routes/index"));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//exportar app
module.exports = app;
