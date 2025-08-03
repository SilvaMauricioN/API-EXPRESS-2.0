import { Router } from 'express';
import { getColeccion } from '../controllers/ControllerColeccion.js';

const ruta = Router();
ruta.get('', getColeccion);
export default ruta;
