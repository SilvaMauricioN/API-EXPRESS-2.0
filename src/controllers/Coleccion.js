import { getCantidadObras, getColeccionObras } from '../repositories/repositorioColeccion.js';
import { calcularPaginacion } from '../utils/paginacion.js';
import { repuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

const getColeccion = async (req, res) => {
	try {
		const pagina = parseInt(req.query.pagina) || 1;
		const limite = parseInt(req.query.limite) || 20;
		const offset = (pagina - 1) * limite;

		const cantidadObras = await getCantidadObras();
		const coleccionObras = await getColeccionObras(offset, limite);
		const paginacion = calcularPaginacion(cantidadObras, pagina, limite);

		res
			.status(200)
			.json(respuestaExitosa('Colección de obras de arte recuperada exitosamente.', coleccionObras, paginacion));
	} catch (error) {
		console.error('Error al obtener las obras:', error.message);
		res.status(500).json(repuestaError('Error interno del servidor al obtener obras.', error.message));
	}
};

export { getColeccion };
