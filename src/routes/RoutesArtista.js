import { Router } from 'express';
import {
	deleteArtista,
	getArtistaPorId,
	getArtistas,
	getObrasArtista,
	postArtista,
	putArtista
} from '../controllers/ControllerArtista.js';
import {
	validarDatosBody,
	validarDatosPaginacion,
	validarIdParam,
	validarOcupacion,
	validarQueryString
} from '../middlewares/Validaciones.js';
import { artistsSchema } from '../scheme/principalMaker.js';

const ruta = Router();
//Coleccion de obras de un artista en particular a partir de su nombre
ruta.get('/coleccion/artista', validarQueryString('nombre'), validarDatosPaginacion, getObrasArtista);
//todos los artistas y sus especificaciones
ruta.get('/artistas', validarDatosPaginacion, getArtistas);
//get artista por id
ruta.get('/artista/:idArtista', validarIdParam('idArtista'), getArtistaPorId);

//crear un nuevo artista
ruta.post('/artista', validarDatosBody(artistsSchema), validarOcupacion, postArtista);
ruta.put(
	'/artista/:idArtista',
	validarIdParam('idArtista'),
	validarDatosBody(artistsSchema),
	validarOcupacion,
	putArtista
);
ruta.delete('/artista/:idArtista', validarIdParam('idArtista'), deleteArtista);

export default ruta;
