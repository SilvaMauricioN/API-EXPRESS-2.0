import { Router } from 'express';
import { getArtistas } from '../controllers/Artista.js';

const ruta = Router();

ruta.get('/Artistas', getArtistas);
export default ruta;
