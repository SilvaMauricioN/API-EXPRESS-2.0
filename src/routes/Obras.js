import { Router } from 'express';
import { getObraPorId, getObras } from '../controllers/Obras.js';

const ruta = Router();

ruta.get('/Obras/Artista', getObras);
ruta.get('/Obra/', getObraPorId);
export default ruta;
