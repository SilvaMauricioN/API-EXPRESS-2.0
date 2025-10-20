import * as serviceTituloAdic from '../services/serviceTituloAdic.js';
import { formatoRespuestaUnico } from '../utils/respuestaApi.js';

const postOtherTitle = async (req, res, next) => {
	try {
		const { ...datosTituloAdic } = req.body;

		const tituloAdic = await serviceTituloAdic.postOtherTitle(datosTituloAdic);
		const mensaje = 'Titulo adicional cargada Exitosamente';
		res.status(201).json(formatoRespuestaUnico(tituloAdic, mensaje));
	} catch (error) {
		next(error);
	}
};

const actualizarOtherTitle = async (req, res, next) => {
	try {
		const { idTituloAdic } = req.params;
		const { ...datosTituloAdic } = req.body;

		const tituloAdicActualizado = await serviceTituloAdic.actualizarOtherTitle(idTituloAdic, datosTituloAdic);
		const mensaje = 'iamgen actualizada Correctamente';
		res.status(200).json(formatoRespuestaUnico(tituloAdicActualizado, mensaje));
	} catch (error) {
		next(error);
	}
};

export { actualizarOtherTitle, postOtherTitle };
