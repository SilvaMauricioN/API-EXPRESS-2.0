const { Router } = require('express');
const {  getArtistas} = require('../Controllers/Artista');
const ruta = Router();

ruta.get('/Artistas', getArtistas);
module.exports = ruta;




