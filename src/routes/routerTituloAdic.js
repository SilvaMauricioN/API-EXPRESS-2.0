import { Router } from 'express';
import { actualizarOtherTitle, postOtherTitle } from '../controllers/controllerTituloAdic.js';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.js';
import { validarDatosBody, validarIdParam } from '../middlewares/Validaciones.js';
import { otherTitleScheme } from '../scheme/otherTitle.js';

const ruta = Router();
ruta.use(apiKeyMiddleware);

ruta.post('/titulo/adicional', validarDatosBody(otherTitleScheme), postOtherTitle);
ruta.put(
	'/titulo/adicional/:idTituloAdic',
	validarIdParam('idTituloAdic'),
	validarDatosBody(otherTitleScheme),
	actualizarOtherTitle
);
ruta.patch(
	'/titulo/adicional/:idTituloAdic',
	validarIdParam('idTituloAdic'),
	validarDatosBody(otherTitleScheme),
	actualizarOtherTitle
);

export default ruta;
