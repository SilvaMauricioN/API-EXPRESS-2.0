import { Router } from 'express';
import { getColeccionArtista, getListadoArtistas, postArtista } from '../controllers/ControllerArtista.js';
import { validarDatosPaginacion, validarQueryString } from '../middlewares/Validaciones.js';

const ruta = Router();

ruta.get('/coleccion/artista', validarQueryString('nombre'), validarDatosPaginacion, getColeccionArtista);
ruta.get('/artistas', getListadoArtistas);
ruta.post('/artista', postArtista);

export default ruta;
