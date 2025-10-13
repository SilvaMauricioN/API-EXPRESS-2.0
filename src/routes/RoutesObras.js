import { Router } from 'express';
import { getColeccionObras, getObraPorId, postObra, putObra } from '../controllers/ControllerObras.js';
import { validarDatosBody, validarDatosPaginacion, validarIdParam } from '../middlewares/Validaciones.js';
import { artObjectsSchema } from '../scheme/artObject.js';

const ruta = Router();

ruta.get('/obra/:idObra', getObraPorId);
ruta.get('/obras/coleccion', validarDatosPaginacion, getColeccionObras);
ruta.post('/obra', validarDatosBody(artObjectsSchema), postObra);
ruta.patch('/obra/:numeroObjeto', validarDatosBody(artObjectsSchema), putObra);

export default ruta;
