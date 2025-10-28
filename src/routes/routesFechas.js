import { Router } from 'express';
import { actualizarDating, postDating } from '../controllers/controllerDating.js';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.js';
import { validarDatosBody, validarIdParam } from '../middlewares/Validaciones.js';
import { datingScheme } from '../scheme/dating.js';

const ruta = Router();
ruta.use(apiKeyMiddleware);

ruta.post('/fecha', validarDatosBody(datingScheme), postDating);
ruta.put('/fecha/:idFecha', validarIdParam('idFecha'), validarDatosBody(datingScheme), actualizarDating);
ruta.patch('/fecha/:idFecha', validarIdParam('idFecha'), validarDatosBody(datingScheme), actualizarDating);

export default ruta;
