import { Router } from 'express';
import {
	deleteArtista,
	getColeccionArtista,
	getTodosLosArtistas,
	postArtista
} from '../controllers/ControllerArtista.js';
import {
	validarDatosArtistas,
	validarDatosPaginacion,
	validarIdParam,
	validarOcupacion,
	validarQueryString
} from '../middlewares/Validaciones.js';

const ruta = Router();
//Coleccion de obras de un artista en particular a partir de su nombre
ruta.get('/coleccion/artista', validarQueryString('nombre'), validarDatosPaginacion, getColeccionArtista);
//todos los artistas y sus especificaciones
ruta.get('/artistas', validarDatosPaginacion, getTodosLosArtistas);
//crear un nuevo artista
ruta.post('/artista', validarDatosArtistas, validarOcupacion, postArtista);
ruta.delete('/artista/:idArtista', validarIdParam('idArtista'), deleteArtista);

export default ruta;
