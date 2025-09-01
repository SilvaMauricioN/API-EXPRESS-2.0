import { Router } from 'express';
import {
	deleteArtista,
	getColeccionArtista,
	getListadoArtistas,
	postArtista
} from '../controllers/ControllerArtista.js';
import { validarDatosPaginacion, validarIdParam, validarQueryString } from '../middlewares/Validaciones.js';

const ruta = Router();
//Coleccion de obras de un artista en particular a partir de su nombre
ruta.get('/coleccion/artista', validarQueryString('nombre'), validarDatosPaginacion, getColeccionArtista);
//todos los artistas y sus especificaciones
ruta.get('/artistas', validarDatosPaginacion, getListadoArtistas);
//crear un nuevo artista
ruta.post('/artista', postArtista);
ruta.delete('/artista/:idArtista', validarIdParam('idArtista'), deleteArtista);

export default ruta;
