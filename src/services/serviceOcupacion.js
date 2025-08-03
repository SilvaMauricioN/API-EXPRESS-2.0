import {
	createOcupacion,
	eliminarOcupaciondeArtista,
	getOcupaciones,
	getOcupacionesDeArtistaId,
	ocupacionAsignadaAArtista,
	vincularOcupacion
} from '../repositories/repositorioOcupacion.js';

const obtenerOcupaciones = async () => {
	const ocupaciones = await getOcupaciones();
	return ocupaciones;
};

// Obtener ocupaciones asignadas a un artista
const getOcupacionesDeArtista = async (idArtista) => {
	return await getOcupacionesDeArtistaId(idArtista);
};

const crearOcupacionNueva = async (name) => {
	createOcupacion(name);
};

// Asignar una ocupación a un artista (crea si no existe, verifica si ya está)
const putOcupacion = async (idArtista, nombreOcupacion) => {
	let ocupacion = await getOcupacionPorNombre(nombreOcupacion);
	//objeto es un valor "verdadero" (truthy)
	if (!ocupacion) {
		ocupacion = await createOcupacion(nombreOcupacion);
	}
	const yaAsignada = await ocupacionAsignadaAArtista(idArtista, ocupacion.IdOccupation);
	if (yaAsignada) {
		return {
			asignada: false,
			mensaje: `La ocupación "${nombreOcupacion}" ya está asignada al artista.`
		};
	}
	// Si no está asignada, la asignamos
	await vincularOcupacion(idArtista, ocupacion.IdOccupation);
	return {
		asignada: true,
		mensaje: `Ocupación "${nombreOcupacion}" asignada correctamente al artista.`
	};
};

// Eliminar ocupación de un artista
// const quitarOcupacion = async (idArtista, nombreOcupacion) => {
// 	const ocupacion = await getOcupacionPorNombre(nombreOcupacion);
// 	if (!ocupacion) {
// 		return {
// 			eliminada: false,
// 			mensaje: `La ocupación "${nombreOcupacion}" no existe.`
// 		};
// 	}
//
// 	const yaAsignada = await getOcupacionesDeArtista(idArtista, ocupacion.IdOccupation);
// 	if (!yaAsignada) {
// 		return {
// 			eliminada: false,
// 			mensaje: `La ocupación "${nombreOcupacion}" no estaba asignada al artista.`
// 		};
// 	}
//
// 	await eliminarVinculoOcupacion(idArtista, ocupacion.IdOccupation);
// 	return {
// 		eliminada: true,
// 		mensaje: `Ocupación "${nombreOcupacion}" eliminada del artista.`
// 	};
// };

export { crearOcupacionNueva, getOcupacionesDeArtista, obtenerOcupaciones, putOcupacion };
