import * as serviceDating from '../services/serviceDating.js';
import { formatoRespuestaUnico } from '../utils/respuestaApi.js';

const postDating = async (req, res, next) => {
	try {
		const { ...datosFechas } = req.body;

		const fecha = await serviceDating.postDating(datosFechas);
		const mensaje = 'Fecha cargada Exitosamente';
		res.status(201).json(formatoRespuestaUnico(fecha, mensaje));
	} catch (error) {
		next(error);
	}
};

const actualizarDating = async (req, res, next) => {
	try {
		const { idFecha } = req.params;
		const { ...datosFecha } = req.body;

		const fechaActualizada = await serviceDating.actualizarDating(idFecha, datosFecha);
		const mensaje = 'Fecha actualizada Correctamente';
		res.status(200).json(formatoRespuestaUnico(fechaActualizada, mensaje));
	} catch (error) {
		next(error);
	}
};

export { actualizarDating, postDating };
