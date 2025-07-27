import { Router } from 'express';
import { getColeccion } from '../controllers/Coleccion.js';

const ruta = Router();
ruta.get('/Coleccion', getColeccion);
export default ruta;
