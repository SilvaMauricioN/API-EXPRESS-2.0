import { Router } from 'express';
import {
	asignarOcupacion,
	eliminarOcupacionDeArtista,
	obtenerOcupacionesArtista,
	obtenerTodasLasOcupaciones
} from '../controllers/controllerOcupacion.js';
import { validarIdArtista, validarNombreOcupacion } from '../middlewares/ocupacionValidacion.js';

const ruta = Router();

ruta.get('/ocupaciones', obtenerTodasLasOcupaciones);
ruta.get('/artista/:idArtista/ocupaciones', validarIdArtista, obtenerOcupacionesArtista);
ruta.post('/asignar/ocupacion/:idArtista', validarIdArtista, validarNombreOcupacion, asignarOcupacion);
ruta.delete('/acupacion/:idArtista', validarIdArtista, validarNombreOcupacion, eliminarOcupacionDeArtista);

export default ruta;
