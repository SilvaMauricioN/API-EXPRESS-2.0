import { Router } from 'express';
import {
	deleteOcupacion,
	getOcupaciones,
	getOcupacionPorId,
	postOcupacion,
	putOcupacion
} from '../controllers/controllerOcupacion.js';
import { validarDatosBody, validarIdParam } from '../middlewares/Validaciones.js';
import { occupationsSchema } from '../scheme/occupations.js';

const ruta = Router();

ruta.get('/ocupaciones', getOcupaciones);
ruta.get('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), getOcupacionPorId);
ruta.post('/ocupacion', validarDatosBody(occupationsSchema), postOcupacion);
ruta.put('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), validarDatosBody(occupationsSchema), putOcupacion);
ruta.delete('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), deleteOcupacion);

export default ruta;
