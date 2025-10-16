import { Router } from 'express';
import { postWebImages } from '../controllers/controllerWebImage.js';
import { validarDatosBody } from '../middlewares/Validaciones.js';
import { webImagesScheme } from '../scheme/webImage.js';

const ruta = Router();

ruta.post('/imagen', validarDatosBody(webImagesScheme), postWebImages);

export default ruta;
