import { Router } from 'express';
import { getColeccionArtista } from '../controllers/Artista.js';

const ruta = Router();

ruta.get('/Artista', getColeccionArtista);
export default ruta;
