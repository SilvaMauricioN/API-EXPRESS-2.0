import { Router } from 'express';
import {
	deleteOcupacion,
	// deleteOcupacionDeArtista,
	getOcupaciones,
	getOcupacionesArtistaId,
	postOcupacion,
	putOcupacion
} from '../controllers/controllerOcupacion.js';
import { validarIdParam, validarNombreOcupacion } from '../middlewares/Validaciones.js';

const ruta = Router();

ruta.get('/ocupaciones', getOcupaciones);
ruta.get('/artista/:idArtista/ocupaciones', validarIdParam('idArtista'), getOcupacionesArtistaId);
ruta.post('/ocupacion', validarNombreOcupacion, postOcupacion);
ruta.put('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), validarNombreOcupacion, putOcupacion);
ruta.delete('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), deleteOcupacion);

// rutas relacionas con artista y ocupacion
// ruta.post('/asignar/ocupacion/:idArtista', validarIdParam('idArtista'), validarNombreOcupacion, putOcupacion);
// ruta.delete('/acupacion/:idArtista', validarIdParam('idArtista'), validarNombreOcupacion, deleteOcupacionDeArtista);

export default ruta;
