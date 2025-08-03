import { getColeccionObras } from '../repositories/repositorioColeccion.js';
import { getCantidadObras } from '../repositories/repositorioObra.js';
import { calcularPaginacion } from '../utils/paginacion.js';
import { respuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

const getColeccion = async (req, res) => {
	try {
		const pagina = parseInt(req.query.pagina) || 1;
		const limite = parseInt(req.query.limite) || 20;
		const offset = (pagina - 1) * limite;

		const cantidadObras = await getCantidadObras();
		const coleccionObras = await getColeccionObras(offset, limite);
		const paginacion = calcularPaginacion(cantidadObras, pagina, limite);

		const hayResultado = cantidadObras > 0;
		const mensaje = hayResultado
			? 'Colección de obras de arte recuperada exitosamente.'
			: `No se ha encontrado coleccion de obra.`;
		res.status(200).json(respuestaExitosa(mensaje, coleccionObras, paginacion));
	} catch (error) {
		console.error('Error al obtener las obras:', error); // muestra todo
		console.error('Tipo de error:', typeof error);
		console.error('Error.message:', error?.message);
		console.error('Error al obtener las obras:', error?.message);
		res.status(500).json(respuestaError('Error interno del servidor al obtener obras.', error.message));
	}
};

export { getColeccion };
