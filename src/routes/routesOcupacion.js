import { Router } from 'express';
import {
	deleteOcupacion,
	// deleteOcupacionDeArtista,
	getOcupaciones,
	getOcupacionPorId,
	postOcupacion,
	putOcupacion
} from '../controllers/controllerOcupacion.js';
import { validarIdParam, validarNombreOcupacion } from '../middlewares/Validaciones.js';

const ruta = Router();

ruta.get('/ocupaciones', getOcupaciones);
ruta.get('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), getOcupacionPorId);
ruta.post('/ocupacion', validarNombreOcupacion, postOcupacion);
ruta.put('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), validarNombreOcupacion, putOcupacion);
ruta.delete('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), deleteOcupacion);

export default ruta;
