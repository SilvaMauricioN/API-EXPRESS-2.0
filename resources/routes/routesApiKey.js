import { Router } from 'express';
import { peticionDeKey } from '../controllers/controllerApiKey.js';
import { validarDatosBody, validarDevs } from '../middlewares/Validaciones.js';
import { userDevsScheme } from '../scheme/userDevs.js';

const ruta = Router();

ruta.post('/', validarDatosBody(userDevsScheme), validarDevs(userDevsScheme), peticionDeKey);

export default ruta;
