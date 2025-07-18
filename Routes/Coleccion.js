const { Router } = require('express');
const {getColeccion } = require('../Controllers/Coleccion');
const ruta = Router();

ruta.get('/Coleccion', getColeccion);
module.exports = ruta;