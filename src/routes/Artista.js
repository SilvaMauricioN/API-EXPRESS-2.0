const { Router } = require('express');
const {  getArtistas} = require('../controllers/Artista');
const ruta = Router();

ruta.get('/Artistas', getArtistas);
module.exports = ruta;




