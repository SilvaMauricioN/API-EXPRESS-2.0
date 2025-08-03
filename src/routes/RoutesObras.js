import { Router } from 'express';
import { getObraPorId } from '../controllers/ControllerObras.js';

const ruta = Router();

ruta.get('/obra/:id', getObraPorId);
export default ruta;
