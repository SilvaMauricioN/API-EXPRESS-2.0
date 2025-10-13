import * as serviceObras from '../services/serviceObras.js';
import { formatoRespuestaColeccion, formatoRespuestaUnico } from '../utils/respuestaApi.js';

const getObraPorId = async (req, res, next) => {
	try {
		const { idObra } = req.params;
		const obra = await serviceObras.getObraPorId(idObra);
		const mensaje = 'Obra de arte recuperada exitosamente.';

		res.status(200).json(formatoRespuestaUnico(obra, mensaje));
	} catch (error) {
		next(error);
	}
};

const getColeccionObras = async (req, res, next) => {
	try {
		const pagina = req.query.pagina;
		const limite = req.query.limite;

		const { datos, paginacion } = await serviceObras.getColeccionObras(pagina, limite);
		const mensaje = 'Coleccion de Obras recuperada Exitosamente.';

		res.status(200).json(formatoRespuestaColeccion(datos, paginacion, mensaje));
	} catch (error) {
		next(error);
	}
};

const postObra = async (req, res, next) => {
	try {
		const datosObra = req.body;
		const obra = await serviceObras.postObra(datosObra);
		const mensaje = 'Obra cargadoa Exitosamente';
		res.status(201).json(formatoRespuestaUnico(obra, mensaje));
	} catch (error) {
		next(error);
	}
};

const putObra = async (req, res, next) => {
	try {
		const { numeroObjeto } = req.params;
		const { ...datosObra } = req.body;

		const obraActualizada = await serviceObras.putObra(numeroObjeto, datosObra);
		const mensaje = 'Obra actualizada Correctamente';
		res.status(200).json(formatoRespuestaUnico(obraActualizada, mensaje));
	} catch (error) {
		next(error);
	}
};
export { getColeccionObras, getObraPorId, postObra, putObra };
