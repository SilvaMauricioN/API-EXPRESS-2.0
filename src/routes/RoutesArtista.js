import { Router } from 'express';
import { createArtistaNuevo, getColeccionArtista, getListadoArtistas } from '../controllers/ControllerArtista.js';

const ruta = Router();

ruta.get('/autor', getColeccionArtista);
ruta.get('/autores', getListadoArtistas);
ruta.post('/autor/nuevo', createArtistaNuevo);
export default ruta;
