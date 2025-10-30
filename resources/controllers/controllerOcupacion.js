import * as serviceOcupacion from '../services/serviceOcupacion.js';
import { formatoRespuestaUnico, respuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

const getOcupaciones = async (req, res, next) => {
	try {
		const { pagina } = req.query;
		const { limite } = req.query;
		const { datos, paginacion } = await serviceOcupacion.getOcupaciones(pagina, limite);
		const mensaje = 'Listado de Ocupaciones recuperado Exitosamente';

		res.status(200).json(formatoRespuestaUnico(datos, paginacion, mensaje));
	} catch (error) {
		next(error);
	}
};

const getOcupacionPorId = async (req, res, next) => {
	try {
		const { idOcupacion } = req.params;
		const ocupacion = await serviceOcupacion.getOcupacionPorId(idOcupacion);
		const mensaje = 'Ocupaciones recuperadas Exitosamente';

		res.status(200).json(formatoRespuestaUnico(ocupacion, mensaje));
	} catch (error) {
		next(error);
	}
};
//Crear nueva ocupacion
const postOcupacion = async (req, res, next) => {
	try {
		const { name } = req.body;
		const nuevaOcupacion = await serviceOcupacion.postOcupacion(name);
		const mensaje = 'Ocupacion creada Exitosamente';

		res.status(201).json(formatoRespuestaUnico(nuevaOcupacion, mensaje));
	} catch (error) {
		next(error);
	}
};
//actualiza ocupacion, id ocupacion name a actualizar
const putOcupacion = async (req, res, next) => {
	try {
		const { idOcupacion } = req.params;
		const { name } = req.body;
		const ocupacionActualizada = await serviceOcupacion.putOcupacion(idOcupacion, name);
		const mensaje = 'Ocupación actualizada correctamente.';

		res.status(200).json(formatoRespuestaUnico(mensaje, ocupacionActualizada));
	} catch (error) {
		next(error);
	}
};

const deleteOcupacion = async (req, res, next) => {
	try {
		const { idOcupacion } = req.params;
		const ocupacionEliminada = await serviceOcupacion.deleteOcupacion(idOcupacion);
		const mensaje = 'Ocupación eliminada correctamente.';
		res.status(200).json(formatoRespuestaUnico(ocupacionEliminada, mensaje));
	} catch (error) {
		next(error);
	}
};

export { deleteOcupacion, getOcupaciones, getOcupacionPorId, postOcupacion, putOcupacion };
