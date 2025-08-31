import { Router } from 'express';
import { getColeccionArtista, getListadoArtistas, postArtista } from '../controllers/ControllerArtista.js';
import { validarDatosPaginacion, validarQueryString } from '../middlewares/Validaciones.js';

const ruta = Router();
//Coleccion de obras de un artista en particular a partir de su nombre
ruta.get('/coleccion/artista', validarQueryString('nombre'), validarDatosPaginacion, getColeccionArtista);
//todos los artistas y sus especificaciones
ruta.get('/artistas', validarDatosPaginacion, getListadoArtistas);
//crear un nuevo artista
ruta.post('/artista', postArtista);

export default ruta;
