// import { putArtista } from '../repositories/repositorioArtista.js';
import * as serviceArtista from '../services/serviceArtista.js';
import { respuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

//GET retorna todas las obras de un artista especifico
const getColeccionArtista = async (req, res) => {
	try {
		const nombre = req.query.nombre;
		const pagina = req.query.pagina;
		const limite = req.query.limite;

		const { hayResultado, datos, paginacion } = await serviceArtista.getObrasArtista(nombre, pagina, limite);
		const mensaje = hayResultado
			? 'Colección de obras de arte recuperada exitosamente.'
			: `El artista '${nombre}' no existe en la base de datos.`;

		res.status(200).json(respuestaExitosa(mensaje, datos, paginacion, hayResultado));
	} catch (error) {
		console.error('Error al obtener las obras:', error.message);
		res.status(500).json(respuestaError('Error interno del servidor al obtener obras.', error.message));
	}
};

//GET Retorna todos los artistas y especificaciones
const getTodosLosArtistas = async (req, res) => {
	try {
		const pagina = req.query.pagina;
		const limite = req.query.limite;

		const { hayResultado, datos, paginacion } = await serviceArtista.getTodosLosArtistas(pagina, limite);

		const mensaje = hayResultado ? 'Listado de Autores recuperado Exitosamente.' : `No se encontro listado de Autores.`;

		res.status(200).json(respuestaExitosa(mensaje, datos, paginacion, hayResultado));
	} catch (error) {
		console.error('Error al obtener listado de Autores:', error.message);
		res.status(500).json(respuestaError('Error interno del servidor al obtener listado de Autores.', error.message));
	}
};

//POST Crear un nuevo artista
const postArtista = async (req, res) => {
	try {
		const { occupations, ...datosArtista } = req.body;

		const resultado = await serviceArtista.postArtista({ occupations, datosArtista });
		const hayResultado = resultado.artista !== null;
		res.status(201).json(respuestaExitosa('Artista cargado Exitosamente', resultado, null, hayResultado));
	} catch (error) {
		console.error('Error al Crear el Artista:', error.message);
		const codigo = error.code || 500;
		res.status(codigo).json(respuestaError(error.message, error.detail || null));
	}
};

//PUT Modifica las especificaciones de unb artista
const putArtista = async (req, res) => {
	try {
		const resultado = await serviceArtista.putArtista(req.body);
		const hayResultado = resultado.artista !== null;
		res.status(200).json(respuestaExitosa('Artista cargado Exitosamente', resultado, null, hayResultado));
	} catch (error) {
		console.error('Error al Crear el Artista:', error.message);
		const codigo = error.code || 500;
		res.status(codigo).json(respuestaError(error.message, error.detail || null));
	}
};

const deleteArtista = async (req, res) => {
	try {
		const { idArtista } = req.params;
		const resultado = await serviceArtista.deleteArtista(idArtista);
		res.status(200).json(respuestaExitosa('Artista eliminado correctamente.', resultado, null, null));
	} catch (error) {
		const codigo = error.code || 500;
		if (codigo >= 599) {
			res.status(500).json(respuestaError(error.message, error.detail || null));
		}
		res.status(codigo).json(respuestaError(error.message, error.detail || null));
	}
};
export { deleteArtista, getColeccionArtista, getTodosLosArtistas, postArtista, putArtista };
