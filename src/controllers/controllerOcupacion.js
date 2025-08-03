import { getOcupacionesDeArtista, obtenerOcupaciones } from '../services/serviceOcupacion.js';
import { respuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

// GET /api/ocupaciones/:idArtista
const obtenerTodasLasOcupaciones = async (req, res) => {
	try {
		const ocupaciones = await obtenerOcupaciones();

		res.json(respuestaExitosa('Ocupaciones obtenidas correctamente.', ocupaciones, null, ocupaciones.length > 0));
	} catch (error) {
		console.error('Error al obtener ocupaciones:', error);
		res.status(500).json(respuestaError('Error al obtener ocupaciones.', error.message));
	}
};

// GET /api/ocupaciones/:idArtista
const obtenerOcupacionesArtista = async (req, res) => {
	try {
		const artistaId = req.params.idArtista;

		// 		if (artistaId == null) {
		// 			const mensaje = `ID '${artistaId}' de autor inválido: el parámetro debe ser un número entero.`;
		//
		// 			return res.status(400).json({
		// 				status: 'error',
		// 				mensaje: mensaje,
		// 				hayResultado: false,
		// 				data: null
		// 			});
		// 		}
		const ocupaciones = await getOcupacionesDeArtista(artistaId);
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

// POST /api/ocupaciones/:idArtista / nombre de ocupacion a artista nombre
const asignarOcupacion = async (req, res) => {
	try {
		const artistaId = req.params.idArtista;
		const { nombreOcupacion } = req.body;

		// if (artistaId) {
		// 	const mensaje = `ID inválido: el parámetro '${artistaId}' debe ser un número entero.`;
		// 	return res.status(400).json(respuestaError(mensaje, null));
		// }

		// if (!validarString(nombreOcupacion)) {
		// 	return res
		// 		.status(400)
		// 		.json(respuestaError('Falta el nombreOcupacion de la ocupación o es una cadena vacía.', null));
		// }

		const resultado = await putOcupacion(artistaId, nombreOcupacion);
		res.json(respuestaExitosa(resultado.mensaje, resultado, null, resultado.asignada));
	} catch (error) {
		console.error(error);
		res.status(500).json(respuestaError('Error al asignar ocupación.', error.message));
	}
};

// DELETE /api/ocupaciones/:idArtista
const eliminarOcupacionDeArtista = async (req, res) => {
	try {
		const artistaId = req.params.idArtista;
		const { nombreOcupacion } = req.body;

		// if (artistaId) {
		// 	const mensaje = `ID inválido: el parámetro '${artistaId}' debe ser un número entero.`;
		// 	return res.status(400).json(respuestaError(mensaje, null));
		// }

		// if (!validarString(nombreOcupacion)) {
		// 	return res
		// 		.status(400)
		// 		.json(respuestaError('Falta el nombreOcupacion de la ocupación o es una cadena vacía.', null));
		// }

		const resultado = await quitarOcupacion(artistaId, nombreOcupacion);

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

export { asignarOcupacion, eliminarOcupacionDeArtista, obtenerOcupacionesArtista, obtenerTodasLasOcupaciones };
