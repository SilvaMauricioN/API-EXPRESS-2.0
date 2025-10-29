import { Router } from 'express';
import {
	actualizarArtista,
	deleteArtista,
	getArtistaPorId,
	getArtistas,
	getObrasArtista,
	postArtista
} from '../controllers/ControllerArtista.js';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.js';
import {
	validarDatosBody,
	validarDatosPaginacion,
	validarIdParam,
	// validarOcupacion,
	validarQueryString
} from '../middlewares/Validaciones.js';
import { principalMakerScheme } from '../scheme/principalMaker.js';

const ruta = Router();
ruta.use(apiKeyMiddleware);

//Coleccion de obras de un artista en particular a partir de su nombre
ruta.get('/coleccion/artista', validarQueryString('nombre'), validarDatosPaginacion, getObrasArtista);
//todos los artistas y sus especificaciones
ruta.get('/artistas', validarDatosPaginacion, getArtistas);
//get artista por id
ruta.get('/artista/:idArtista', validarIdParam('idArtista'), getArtistaPorId);

//crear un nuevo artista
ruta.post('/artista', validarDatosBody(principalMakerScheme), postArtista);
ruta.put(
	'/artista/:idArtista',
	validarIdParam('idArtista'),
	validarDatosBody(principalMakerScheme),
	// validarOcupacion,
	actualizarArtista
);
ruta.patch(
	'/artista/:idArtista',
	validarIdParam('idArtista'),
	validarDatosBody(principalMakerScheme),
	// validarOcupacion,
	actualizarArtista
);
ruta.delete('/artista/:idArtista', validarIdParam('idArtista'), deleteArtista);

export default ruta;
