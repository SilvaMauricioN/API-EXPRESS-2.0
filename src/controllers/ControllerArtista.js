import * as serviceArtista from '../services/serviceArtista.js';
import { formatoRespuestaColeccion, formatoRespuestaUnico } from '../utils/respuestaApi.js';

//GET retorna todas las obras de un artista especifico
const getObrasArtista = async (req, res, next) => {
	try {
		const nombre = req.query.nombre;
		const pagina = req.query.pagina;
		const limite = req.query.limite;

		const { datos, paginacion } = await serviceArtista.getObrasArtista(nombre, pagina, limite);
		const mensaje = 'Colección de obras de arte recuperada exitosamente.';
		res.status(200).json(formatoRespuestaColeccion(datos, paginacion, mensaje));
	} catch (error) {
		next(error);
	}
};

//GET Retorna todos los artistas y especificaciones
const getArtistas = async (req, res, next) => {
	try {
		const pagina = req.query.pagina;
		const limite = req.query.limite;

		const { datos, paginacion } = await serviceArtista.getArtistas(pagina, limite);
		const mensaje = 'Listado de Autores recuperado Exitosamente.';

		res.status(200).json(formatoRespuestaColeccion(datos, paginacion, mensaje));
	} catch (error) {
		next(error);
	}
};

const getArtistaPorId = async (req, res, next) => {
	try {
		const { idArtista } = req.params;
		const artista = await serviceArtista.getArtistaPorId(idArtista);
		const mensaje = 'Artista recuperado Exitosamente.';

		res.status(200).json(formatoRespuestaUnico(artista, mensaje));
	} catch (error) {
		next(error);
	}
};
//POST Crear un nuevo artista
const postArtista = async (req, res, next) => {
	try {
		const { occupations, ...datosArtista } = req.body;

		const artista = await serviceArtista.postArtista({ occupations, datosArtista });
		const mensaje = 'Artista cargado Exitosamente';
		res.status(201).json(formatoRespuestaUnico(artista, mensaje));
	} catch (error) {
		next(error);
	}
};
//PUT Modifica las especificaciones de unb artista
const actualizarArtista = async (req, res, next) => {
	try {
		const { idArtista } = req.params;
		const { ...datosArtista } = req.body;

		const artistaActualizado = await serviceArtista.actualizarArtista(idArtista, datosArtista);
		const mensaje = 'artista actualizado Correctamente';
		res.status(200).json(formatoRespuestaUnico(artistaActualizado, mensaje));
	} catch (error) {
		next(error);
	}
};

const deleteArtista = async (req, res, next) => {
	try {
		const { idArtista } = req.params;
		const artistaEliminado = await serviceArtista.deleteArtista(idArtista);
		const mensaje = 'Artista eliminado correctamente.';
		res.status(200).json(formatoRespuestaUnico(artistaEliminado, mensaje));
	} catch (error) {
		next(error);
	}
};
export { actualizarArtista, deleteArtista, getArtistaPorId, getArtistas, getObrasArtista, postArtista };
