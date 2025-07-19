const { Router } = require('express');
const {getColeccion } = require('../controllers/Coleccion');
const ruta = Router();

ruta.get('/Coleccion', getColeccion);
module.exports = ruta;