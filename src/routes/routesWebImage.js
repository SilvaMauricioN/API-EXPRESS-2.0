import { Router } from 'express';
import { actualizarWebImages, postWebImages } from '../controllers/controllerWebImage.js';
import { validarDatosBody, validarIdParam } from '../middlewares/Validaciones.js';
import { webImagesScheme } from '../scheme/webImage.js';

const ruta = Router();

ruta.post('/imagen', validarDatosBody(webImagesScheme), postWebImages);
ruta.put('/imagen/:idImagen', validarIdParam('idImagen'), validarDatosBody(webImagesScheme), actualizarWebImages);
ruta.patch('/imagen/:idImagen', validarIdParam('idImagen'), validarDatosBody(webImagesScheme), actualizarWebImages);

export default ruta;
