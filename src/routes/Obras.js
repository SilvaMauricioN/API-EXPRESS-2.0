import { Router } from 'express';
import { getObraPorId } from '../controllers/Obras.js';

const ruta = Router();

ruta.get('/obra/:id', getObraPorId);
export default ruta;
