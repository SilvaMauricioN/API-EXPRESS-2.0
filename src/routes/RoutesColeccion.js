import { Router } from 'express';
import { getColeccion } from '../controllers/ControllerColeccion.js';

const ruta = Router();
//coleccion de obras
ruta.get('', getColeccion);
export default ruta;
