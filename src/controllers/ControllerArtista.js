import { getTodosLosArtistas } from '../repositories/repositorioArtista.js';
import * as serviceArtista from '../services/serviceArtista.js';
import { respuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

//GET retorna todas las obras de un artista especifico
const getColeccionArtista = async (req, res) => {
	try {
		const nombre = req.query.nombre;
		const pagina = req.query.pagina;
		const limite = req.query.limite;

		const { artista, obras, paginacion } = await serviceArtista.getObrasArtista(nombre, pagina, limite);

		if (!artista) {
			return res.status(404).json(respuestaError(`El artista '${nombre}' no existe en la base de datos.`));
		}

		const mensaje = 'Colección de obras de arte recuperada exitosamente.';

		res.status(200).json(respuestaExitosa(mensaje, obras, paginacion, obras.length > 0));
	} catch (error) {
		console.error('Error al obtener las obras:', error.message);
		res.status(500).json(respuestaError('Error interno del servidor al obtener obras.', error.message));
	}
};

//GET Retorna todos los artistas y especificaciones
const getListadoArtistas = async (reg, res) => {
	try {
		const coleccionArtistas = await getTodosLosArtistas();
		const hayResultado = coleccionArtistas.length > 0;

		const mensaje = hayResultado ? 'Listado de Autores recuperado Exitosamente.' : `No se encontro listado de Autores.`;

		res.status(200).json(respuestaExitosa(mensaje, coleccionArtistas, null, hayResultado));
	} catch (error) {
		console.error('Error al obtener listado de Autores:', error.message);
		res.status(500).json(respuestaError('Error interno del servidor al obtener listado de Autores.', error.message));
	}
};

//POST Crear un nuevo artista
const postArtista = async (req, res) => {
	try {
		const resultado = await serviceArtista.postArtista(req.body);

		const hayResultado = resultado.artista !== null;

		res.status(200).json(respuestaExitosa('Artista cargado Exitosamente', resultado, null, hayResultado));
	} catch (error) {
		console.error('Error al Crear el Artista:', error.message);
		const codigo = error.codigo || 500;
		res.status(codigo).json(respuestaError(error.message, error.detail || null));
	}
};

export { getColeccionArtista, getListadoArtistas, postArtista };
