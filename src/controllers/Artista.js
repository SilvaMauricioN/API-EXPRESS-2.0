import { getCantidadObras, getColeccionObrasArtista } from '../repositories/repositorioColeccion.js';
import { calcularPaginacion } from '../utils/paginacion.js';
import { repuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

const getColeccionArtista = async (req, res) => {
	try {
		const artista = req.query.artista;
		const pagina = parseInt(req.query.pagina) || 1;
		const limite = parseInt(req.query.limite) || 20;
		const offset = (pagina - 1) * limite;

		const cantidadObras = await getCantidadObras(artista);
		const coleccionObras = await getColeccionObrasArtista(offset, limite, artista);
		const paginacion = calcularPaginacion(cantidadObras, pagina, limite);

		const hayResultado = coleccionObras.length > 0;
		res
			.status(200)
			.json(
				respuestaExitosa(
					hayResultado
						? 'Colección de obras de arte recuperada exitosamente.'
						: `No se encontraron obras para el artista: "${artista}".`,
					coleccionObras,
					paginacion,
					hayResultado
				)
			);
	} catch (error) {
		console.error('Error al obtener las obras:', error.message);
		res.status(500).json(repuestaError('Error interno del servidor al obtener obras.', error.message));
	}
};

export { getColeccionArtista };
