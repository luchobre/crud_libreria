const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));

// Middleware para archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para manejar texto y datos de formularios
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
