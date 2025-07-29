import { Router } from 'express';
import { getColeccionArtista, getListadoArtistas } from '../controllers/Artista.js';

const ruta = Router();

ruta.get('/autor', getColeccionArtista);
ruta.get('/autores', getListadoArtistas);
export default ruta;
