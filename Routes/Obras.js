const { Router } = require('express');
const {getObras, getObraPorId } = require('../Controllers/Obras');
const ruta = Router();

ruta.get('/Obras/Artista', getObras);
ruta.get('/Obra/:id',getObraPorId);
module.exports = ruta;