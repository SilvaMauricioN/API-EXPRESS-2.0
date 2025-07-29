import { Router } from 'express';
import { getColeccion } from '../controllers/Coleccion.js';

const ruta = Router();
ruta.get('', getColeccion);
export default ruta;
