import { Router } from 'express';
import { actualizarObra, getColeccionObras, getObraPorId, postObra } from '../controllers/controllerObras.js';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.js';
import { validarDatosBody, validarDatosPaginacion, validarIdParam } from '../middlewares/Validaciones.js';
import { artObjectsScheme } from '../scheme/artObject.js';

const ruta = Router();
ruta.use(apiKeyMiddleware);

ruta.get('/obra/:idObra', getObraPorId);
ruta.get('/obras/coleccion', validarDatosPaginacion, getColeccionObras);
ruta.post('/obra', validarDatosBody(artObjectsScheme), postObra);
ruta.put('/obra/:numeroObjeto', validarDatosBody(artObjectsScheme), actualizarObra);
ruta.patch('/obra/:numeroObjeto', validarDatosBody(artObjectsScheme), actualizarObra);

export default ruta;
