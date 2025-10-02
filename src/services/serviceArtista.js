import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioArtista from '../repositories/repositorioArtista.js';
import * as repositorioArtistaOcupacion from '../repositories/repositorioArtistaOcupacion.js';
import * as repositorioColeccion from '../repositories/repositorioColeccion.js';
import * as repositorioObras from '../repositories/repositorioObra.js';
import * as repositorioOcupacion from '../repositories/repositorioOcupacion.js';
import { getPaginacion } from '../utils/paginacion.js';

const postArtista = async ({ occupations, datosArtista }) => {
	const existe = await repositorioArtista.getArtistaPorNombre(datosArtista.name);
	if (existe) {
		throw new RecursoExistenteError(
			`El artista ${datosArtista.name} ya existe.`,
			`Intento de duplicar un registro con nombre: ${datosArtista.name}`
		);
	}

	if (occupations.length > 0) {
		const ocupacionesValidadas = await repositorioOcupacion.getOcupacionesPorIds(occupations);
		if (ocupacionesValidadas.length !== occupations.length) {
			throw new RecursoNoEncontradoError(
				`La ocupación con ID ${occupations} no existe.`,
				`Registro con ID ${occupations} : no encontrado`
			);
		}
	}
	const artista = await repositorioArtista.postArtista(datosArtista);

	for (const idOcupacion of occupations) {
		await repositorioArtistaOcupacion.asignarOcupacionArtista(artista.idprincipalmaker, idOcupacion);
	}
	const ocupacionesAsignadas = await repositorioOcupacion.getOcupacionesDeArtistaId(artista.idprincipalmaker);
	return { ...artista, occupations: ocupacionesAsignadas };
};

const putArtista = async (idArtista, datosArtista) => {
	const { occupations } = datosArtista;
	const existe = await repositorioArtista.getArtistaPorId(idArtista);
	if (!existe) {
		throw new RecursoNoEncontradoError(`Artista: ${idArtista}`, 'El artista solicitado no existe.');
	}
	//existen las ocupaciones
	if (occupations.length > 0) {
		const ocupacionesValidadas = await repositorioOcupacion.getOcupacionesPorIds(occupations);
		if (ocupacionesValidadas.length !== occupations.length) {
			throw new RecursoNoEncontradoError(
				`La ocupación con ID ${occupations} no existe.`,
				`Registro con ID ${occupations} : no encontrado`
			);
		}
	}
	const artista = await repositorioArtista.putArtista(idArtista, datosArtista);
	await repositorioArtistaOcupacion.eliminarRelacionOcupacionArt(idArtista);
	//asignar nuevas ocupaciones a artista
	for (const idOcupacion of occupations) {
		await repositorioArtistaOcupacion.asignarOcupacionArtista(artista.idprincipalmaker, idOcupacion);
	}
	const ocupacionesAsignadas = await repositorioOcupacion.getOcupacionesDeArtistaId(idArtista);
	return { ...artista, occupations: ocupacionesAsignadas };
};
//
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

const getArtistaPorId = async (idArtista) => {
	const artista = await repositorioArtista.getArtistaPorId(idArtista);
	if (!artista) {
		throw new RecursoNoEncontradoError(`Artista: ${idArtista}`, 'El artista solicitado no existe.');
	}
	return artista;
};

const deleteArtista = async (id) => {
	const existe = await repositorioArtista.getArtistaPorId(id);
	if (!existe) {
		throw new RecursoNoEncontradoError(`El artista ${id} no existe.`, `No hay registro del artista con id: ${id}`);
	}
	await repositorioArtistaOcupacion.eliminarRelacionOcupacionArt(id);
	const artistaEliminado = await repositorioArtista.deleteArtista(id);
	return artistaEliminado;
};

export { deleteArtista, getArtistaPorId, getArtistas, getObrasArtista, postArtista, putArtista };
