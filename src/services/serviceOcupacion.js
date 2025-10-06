import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioArtistaOcupacion from '../repositories/repositorioArtistaOcupacion.js';
import * as repositorioOcupacion from '../repositories/repositorioOcupacion.js';
import { getPaginacion } from '../utils/paginacion.js';

const getOcupaciones = async (pagina = 1, limite = 20) => {
	return getPaginacion(
		() => repositorioOcupacion.getCantidadOcupaciones(),
		(offset, limit) => repositorioOcupacion.getOcupaciones(offset, limit),
		pagina,
		limite
	);
};
const getOcupacionPorId = async (ocupacionId) => {
	const ocupacion = await repositorioOcupacion.getOcupacionPorId(ocupacionId);

	if (!ocupacion) {
		throw new RecursoNoEncontradoError(`Ocupacion: ${ocupacionId}`, 'La ocupacion solicitado no existe.');
	}

	return ocupacion;
};

const postOcupacion = async (name) => {
	let ocupacion = await repositorioOcupacion.getOcupacionPorNombre(name);
	if (ocupacion) {
		throw new RecursoExistenteError(`Ya existe la ocupación'${name}'`);
	}
	return await repositorioOcupacion.postOcupacion(name);
};

const putOcupacion = async (ocupacionId, nombreOcupacion) => {
	const existeOcupacion = await repositorioOcupacion.getOcupacionPorId(ocupacionId);
	if (!existeOcupacion) {
		throw new RecursoNoEncontradoError(
			`La ocupación ${nombreOcupacion} no existe`,
			`No se encuentra la ocupación con ID: ${ocupacionId}`
		);
	}
	if (existeOcupacion.name == nombreOcupacion) {
		return { ...existeOcupacion, unchanged: true };
	}
	//verifico si existe la misma ocupación pero con diferente id
	const igualOcupacion = await repositorioOcupacion.verificarOcupacionAlActualizar(nombreOcupacion, ocupacionId);
	if (igualOcupacion) {
		throw new RecursoExistenteError(
			`La ocupacíon ${nombreOcupacion} ya existe`,
			`Intento de duplicar un registro con nombre: ${nombreOcupacion}`
		);
	}
	return await repositorioOcupacion.putOcupacion(nombreOcupacion, ocupacionId);
};

const deleteOcupacion = async (ocupacionId) => {
	const existeOcupacion = await repositorioOcupacion.getOcupacionPorId(ocupacionId);
	if (!existeOcupacion) {
		throw new RecursoNoEncontradoError(
			`La ocupación ${ocupacionId} no existe`,
			`No se encuentra la ocupación con ID: ${ocupacionId}`
		);
	}
	await repositorioArtistaOcupacion.deleteRelacionPorOcupacionId(ocupacionId);

	return await repositorioOcupacion.deleteOcupacion(ocupacionId);
};

export { deleteOcupacion, getOcupaciones, getOcupacionPorId, postOcupacion, putOcupacion };
