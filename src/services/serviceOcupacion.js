import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioOcupacion from '../repositories/repositorioOcupacion.js';

const getOcupaciones = async () => {
	const ocupaciones = await repositorioOcupacion.getOcupaciones();
	return ocupaciones;
};
// Obtener ocupaciones asignadas a un artista
const getOcupacionesDeArtistaId = async (idArtista) => {
	return await repositorioOcupacion.getOcupacionesDeArtistaId(idArtista);
};

const postOcupacion = async (name) => {
	let ocupacion = await repositorioOcupacion.getOcupacionPorNombre(name);
	if (ocupacion) {
		throw new RecursoExistenteError(`Ya existe la ocupación '${name}'`);
	}
	return await repositorioOcupacion.postOcupacion(name);
};

const putOcupacion = async (idOcupacion, nombreOcupacion) => {
	const existeOcupacion = await repositorioOcupacion.getOcupacionPorId(idOcupacion);
	if (!existeOcupacion) {
		throw new RecursoNoEncontradoError(
			`La ocupación ${nombreOcupacion} no existe`,
			`No se encuentra la ocupación con ID: ${idOcupacion}`
		);
	}
	if (existeOcupacion.name == nombreOcupacion) {
		return { ...existeOcupacion, unchanged: true };
	}
	//verifico si existe la misma ocupación pero con diferente id
	const igualOcupacion = await repositorioOcupacion.verificarOcupacionAlActualizar(idOcupacion, nombreOcupacion);
	if (igualOcupacion) {
		throw new RecursoExistenteError(
			`La ocupacíon ${nombreOcupacion} ya existe`,
			`Intento de duplicar un registro con nombre: ${nombreOcupacion}`
		);
	}
	return await repositorioOcupacion.putOcupacion(idOcupacion, nombreOcupacion);
};

const deleteOcupacion = async (idOcupacion) => {
	return await repositorioOcupacion.deleteOcupacion(idOcupacion);
};
// REEVER Asignar una ocupación a un artista (crea si no existe, verifica si ya está)
const putOcupacionArtista = async (idArtista, nombreOcupacion) => {
	let ocupacion = await repositorioOcupacion.getOcupacionPorNombre(nombreOcupacion);
	//objeto es un valor "verdadero" (truthy)
	if (!ocupacion) {
		return {
			asignada: false,
			mensaje: `La ocupación "${nombreOcupacion}" no existe`
		};
	}
	const yaAsignada = await repositorioOcupacion.ocupacionAsignadaAArtista(idArtista, ocupacion.IdOccupation);
	if (yaAsignada) {
		return {
			asignada: false,
			mensaje: `La ocupación "${nombreOcupacion}" ya está asignada al artista.`
		};
	}
	// Si no está asignada, la asignamos
	await repositorioOcupacion.putOcupacionArtista(idArtista, ocupacion.IdOccupation);
	return {
		asignada: true,
		mensaje: `Ocupación "${nombreOcupacion}" asignada correctamente al artista.`
	};
};
//Eliminar ocupación de un artista
const deleteOcupacionDeArtista = async (idArtista, nombreOcupacion) => {
	const ocupacion = await repositorioOcupacion.getOcupacionPorNombre(nombreOcupacion);
	if (!ocupacion) {
		return {
			eliminada: false,
			mensaje: `La ocupación "${nombreOcupacion}" no existe.`
		};
	}

	const yaAsignada = await repositorioOcupacion.ocupacionAsignadaAArtista(idArtista, ocupacion.IdOccupation);
	if (!yaAsignada) {
		return {
			eliminada: false,
			mensaje: `La ocupación "${nombreOcupacion}" no estaba asignada al artista.`
		};
	}

	await repositorioOcupacion.deleteOcupacionDeArtista(idArtista, ocupacion.IdOccupation);
	return {
		eliminada: true,
		mensaje: `Ocupación "${nombreOcupacion}" eliminada del artista.`
	};
};

export {
	deleteOcupacion,
	deleteOcupacionDeArtista,
	getOcupaciones,
	getOcupacionesDeArtistaId,
	postOcupacion,
	putOcupacion,
	putOcupacionArtista
};
