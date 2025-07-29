import { getTodosLosArtistas } from '../repositories/repositorioArtista.js';
import { getColeccionObrasArtista } from '../repositories/repositorioColeccion.js';
import { getCantidadObras } from '../repositories/repositorioObra.js';
import { calcularPaginacion } from '../utils/paginacion.js';
import { repuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

//retorna todas las obras de un artista especifico
const getColeccionArtista = async (req, res) => {
	try {
		const artista = req.query.artista;
		const pagina = parseInt(req.query.pagina) || 1;
		const limite = parseInt(req.query.limite) || 20;
		const offset = (pagina - 1) * limite;

		const cantidadObras = await getCantidadObras(artista);
		const coleccionObras = await getColeccionObrasArtista(offset, limite, artista);
		const paginacion = calcularPaginacion(cantidadObras, pagina, limite);

		const hayResultado = cantidadObras > 0;
		const mensaje = hayResultado
			? 'Colección de obras de arte recuperada exitosamente.'
			: `No se encontraron obras para el artista: "${artista}".`;

		res.status(200).json(respuestaExitosa(mensaje, coleccionObras, paginacion, hayResultado));
	} catch (error) {
		console.error('Error al obtener las obras:', error.message);
		res.status(500).json(repuestaError('Error interno del servidor al obtener obras.', error.message));
	}
};

//Retorna todos los articas y especificaciones
const getListadoArtistas = async (reg, res) => {
	try {
		const coleccionArtistas = await getTodosLosArtistas();
		const hayResultado = coleccionArtistas.length > 0;

		const mensaje = hayResultado ? 'Listado de Autores recuperado Exitosamente.' : `No se encontro listado de Autores.`;

		res.status(200).json(respuestaExitosa(mensaje, coleccionArtistas, null, hayResultado));
	} catch (error) {
		console.error('Error al obtener listado de Autores:', error.message);
		res.status(500).json(repuestaError('Error interno del servidor al obtener listado de Autores.', error.message));
	}
};

export { getColeccionArtista, getListadoArtistas };
