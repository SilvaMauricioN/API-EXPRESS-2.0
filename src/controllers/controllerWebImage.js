import * as serviceWebImage from '../services/serviceWebImage.js';
import { formatoRespuestaUnico } from '../utils/respuestaApi.js';

const postWebImages = async (req, res, next) => {
	try {
		const { ...datosImagen } = req.body;

		const imagenWeb = await serviceWebImage.postWebImages(datosImagen);
		const mensaje = 'Imagen cargada Exitosamente';
		res.status(201).json(formatoRespuestaUnico(imagenWeb, mensaje));
	} catch (error) {
		next(error);
	}
};

export { postWebImages };
