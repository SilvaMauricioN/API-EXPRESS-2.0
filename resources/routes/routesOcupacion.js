import { Router } from 'express';
import {
	deleteOcupacion,
	getOcupaciones,
	getOcupacionPorId,
	postOcupacion,
	putOcupacion
} from '../controllers/controllerOcupacion.js';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.js';
import { validarDatosBody, validarIdParam } from '../middlewares/Validaciones.js';
import { occupationsScheme } from '../scheme/occupations.js';

const ruta = Router();
ruta.use(apiKeyMiddleware);

ruta.get('/ocupaciones', getOcupaciones);
ruta.get('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), getOcupacionPorId);
ruta.post('/ocupacion', validarDatosBody(occupationsScheme), postOcupacion);
ruta.put('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), validarDatosBody(occupationsScheme), putOcupacion);
ruta.delete('/ocupacion/:idOcupacion', validarIdParam('idOcupacion'), deleteOcupacion);

export default ruta;
