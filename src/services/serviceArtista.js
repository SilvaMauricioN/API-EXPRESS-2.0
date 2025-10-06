import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioArtista from '../repositories/repositorioArtista.js';
import * as repositorioArtistaOcupacion from '../repositories/repositorioArtistaOcupacion.js';
import * as repositorioColeccion from '../repositories/repositorioColeccion.js';
import * as repositorioObras from '../repositories/repositorioObra.js';
import * as repositorioOcupacion from '../repositories/repositorioOcupacion.js';
import { getPaginacion } from '../utils/paginacion.js';

const postArtista = async ({ occupations, datosArtista }) => {
	const existeArtista = await repositorioArtista.getArtistaPorNombre(datosArtista.name);
	if (existeArtista) {
		throw new RecursoExistenteError(
			`El artista ${datosArtista.name} ya existe.`,
			`Intento de duplicar un registro con nombre: ${datosArtista.name}`
		);
	}
	await validarOcupaciones(occupations);

	const artista = await repositorioArtista.postArtista(datosArtista);
	if (occupations && occupations.length > 0) {
		for (const ocupacionId of occupations) {
			await repositorioArtistaOcupacion.asignarOcupacionArtista(artista.idprincipalmaker, ocupacionId);
		}
	}
	return await repositorioArtista(artista.idprincipalmaker);
};

const putArtista = async (artistaId, datosArtista) => {
	const { occupations } = datosArtista;
	const existeArtista = await repositorioArtista.getArtistaPorId(artistaId);
	if (!existeArtista) {
		throw new RecursoNoEncontradoError(`Artista: ${artistaId}`, 'El artista solicitado no existe.');
	}
	// Si se está actualizando el nombre, verificar que no exista otro artista con ese nombre
	if (datosArtista.name !== existeArtista.name) {
		const artistaMismoNombre = await repositorioArtista.getArtistaPorNombre(datosArtista.name);
		if (artistaMismoNombre && artistaMismoNombre.idprincipalmaker !== artistaId) {
			throw new RecursoExistenteError(
				`El artista ${datosArtista.name} ya existe.`,
				`Intento de duplicar un registro con nombre: ${datosArtista.name}`
			);
		}
	}
	await validarOcupaciones(occupations);

	const artista = await repositorioArtista.putArtista(artistaId, datosArtista);
	await repositorioArtistaOcupacion.deleteRelacionPorArtistaId(artistaId);
	//asignar nuevas ocupaciones a artista
	if (occupations && occupations.length > 0) {
		for (const ocupacionId of occupations) {
			await repositorioArtistaOcupacion.asignarOcupacionArtista(artista.idprincipalmaker, ocupacionId);
		}
	}
	return await repositorioArtista.getArtistaPorId(artistaId);
};

const getObrasArtista = async (nombre, pagina = 1, limite = 20) => {
	const artista = await repositorioArtista.getArtistaPorNombre(nombre);
	if (!artista) {
		throw new RecursoNoEncontradoError(`Artista: ${nombre}`, 'El artista solicitado no existe.');
	}
	return getPaginacion(
		() => repositorioObras.getTotalObrasArtista(artista.idprincipalmaker),
		(offset, limit) => repositorioColeccion.getObrasArtista(offset, limit, artista.idprincipalmaker),
		pagina,
		limite
	);
};

const getArtistas = async (pagina = 1, limite = 20) => {
	return getPaginacion(
		() => repositorioArtista.getCantidadArtistas(),
		(offset, limit) => repositorioArtista.getArtistas(offset, limit),
		pagina,
		limite
	);
};

const getArtistaPorId = async (artistaId) => {
	const artista = await repositorioArtista.getArtistaPorId(artistaId);
	if (!artista) {
		throw new RecursoNoEncontradoError(`Artista: ${artistaId}`, 'El artista solicitado no existe.');
	}
	return artista;
};

const deleteArtista = async (artistaId) => {
	const existe = await repositorioArtista.getArtistaPorId(artistaId);
	if (!existe) {
		throw new RecursoNoEncontradoError(
			`El artista ${artistaId} no existe.`,
			`No hay registro del artista con id: ${artistaId}`
		);
	}
	await repositorioArtistaOcupacion.deleteRelacionPorArtistaId(artistaId);
	const artistaEliminado = await repositorioArtista.deleteArtista(artistaId);
	return artistaEliminado;
};

const validarOcupaciones = async (ocupaciones) => {
	if (!ocupaciones || ocupaciones.length === 0) {
		return;
	}

	const ocupacionesValidadas = await repositorioOcupacion.getOcupacionesPorIds(ocupaciones);

	if (ocupacionesValidadas.length !== ocupaciones.length) {
		const idsValidados = ocupacionesValidadas.map((o) => o.idoccupation);
		const idsInvalidos = ocupaciones.filter((id) => !idsValidados.includes(id));

		throw new RecursoNoEncontradoError(
			`Las ocupaciones con IDs [${idsInvalidos.join(', ')}] no existen.`,
			`Ocupaciones no encontradas: ${idsInvalidos.join(', ')}`
		);
	}
};
export { deleteArtista, getArtistaPorId, getArtistas, getObrasArtista, postArtista, putArtista };
