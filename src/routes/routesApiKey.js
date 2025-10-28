import { Router } from 'express';
import { peticionDeKey } from '../controllers/controllerApiKey.js';
import { validarDatosBody, validarDevs } from '../middlewares/Validaciones.js';
import { userDevsScheme } from '../scheme/userDevs.js';

const ruta = Router();

ruta.post('/', validarDatosBody(userDevsScheme), validarDevs(userDevsScheme), peticionDeKey);

// ruta.post(
// 	'/',
// 	(req, res, next) => {
// 		console.log('🎯 Entró a la ruta POST /');
// 		console.log('Body:', req.body);
// 		next();
// 	},
// 	peticionDeKey
// );

export default ruta;
