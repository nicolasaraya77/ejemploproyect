// inicializaremos el servidor
const express = require("express");
const bodyParser = require("body-parser");
//funcion express para inicializar servidor
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//carga de rutas
app.use(require("./routes/index"));
//exportar app
module.exports = app;
