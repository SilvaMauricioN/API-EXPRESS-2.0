import * as serviceOcupacion from '../services/serviceOcupacion.js';
import { respuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

const getOcupaciones = async (req, res) => {
	try {
		const ocupaciones = await serviceOcupacion.getOcupaciones();

		res.json(respuestaExitosa('Ocupaciones obtenidas correctamente.', ocupaciones, null, ocupaciones.length > 0));
	} catch (error) {
		console.error('Error al obtener ocupaciones:', error);
		res.status(500).json(respuestaError('Error al obtener ocupaciones.', error.message));
	}
};

const getOcupacionesArtistaId = async (req, res) => {
	try {
		const artistaId = req.params.idArtista;

		const ocupaciones = await serviceOcupacion.getOcupacionesDeArtistaId(artistaId);
		const hayResultado = ocupaciones.length > 0;

		if (!hayResultado) {
			return res.status(200).json(respuestaExitosa(`El artista con ID ${artistaId} no existe`, [], null, hayResultado));
		} else {
			return res
				.status(200)
				.json(respuestaExitosa(`Ocupaciones del artista con ID ${artistaId}`, ocupaciones, null, hayResultado));
		}
	} catch (error) {
		console.error('Error al obtener las ocupaciones', error);
		res.status(500).json(respuestaError('Error al obtener ocupaciones.', error.message));
	}
};
//Crear nueva ocupacion
const postOcupacion = async (req, res) => {
	try {
		const { name } = req.body;
		const nuevaOcupacion = await serviceOcupacion.postOcupacion(name);
		res.status(201).json(respuestaExitosa('Ocupación creada correctamente.', nuevaOcupacion, null, true));
	} catch (error) {
		const codigo = error.code || 500;

		console.error('Error al crear ocupación:', error);
		res.status(codigo).json(respuestaError(error.message, error.detail || null));
	}
};
//actualiza ocupacion, id ocupacion name a actualizar
const putOcupacion = async (req, res) => {
	try {
		const { idOcupacion } = req.params;
		const { name } = req.body;

		const ocupacionActualizada = await serviceOcupacion.putOcupacion(idOcupacion, name);

		res.json(respuestaExitosa('Ocupación actualizada correctamente.', ocupacionActualizada, null, true));
	} catch (error) {
		const codigo = error.code || 500;

		console.error('Error al actualizar la  ocupación:', error);
		res.status(codigo).json(respuestaError(error.message, error.detail || null));
	}
};

const deleteOcupacion = async (req, res) => {
	try {
		const { idOcupacion } = req.params;
		const data = await serviceOcupacion.deleteOcupacion(idOcupacion);
		res.json(respuestaExitosa('Ocupación eliminada correctamente.', data, null, true));
	} catch (error) {
		console.error('Error al eliminar ocupación:', error);
		res.status(500).json(respuestaError('Error al eliminar ocupación.', error.message));
	}
};

//REEVER SI PERTENECEN A ARTISTA CONTROLLER
// asignar una ocupacion a un artista
const putOcupacionArtista = async (req, res) => {
	try {
		const artistaId = req.params.idArtista;
		const { name } = req.body;

		const resultado = await serviceOcupacion.putOcupacion(artistaId, name);
		res.json(respuestaExitosa(resultado.mensaje, resultado, null, resultado.asignada));
	} catch (error) {
		console.error(error);
		res.status(500).json(respuestaError('Error al asignar ocupación.', error.message));
	}
};
// quita la relacion de la tabla intermedia entre artista y ocupacion
const deleteOcupacionDeArtista = async (req, res) => {
	try {
		const artistaId = req.params.idArtista;
		const { name } = req.body;

		const resultado = await serviceOcupacion.deletOcupacionDeArtista(artistaId, name);

		res.status.json(200).json(
			respuestaExitosa(
				resultado.mensaje,
				{
					nombreOcupacion: nombreOcupacion
				},
				null,
				resultado.eliminada
			)
		);
	} catch (error) {
		console.error(error);
		res.status(500).json(respuestaError('Error al eliminar ocupación.', error.message));
	}
};

export { deleteOcupacion, getOcupaciones, getOcupacionesArtistaId, postOcupacion, putOcupacion };
