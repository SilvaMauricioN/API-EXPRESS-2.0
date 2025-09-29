import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioArtista from '../repositories/repositorioArtista.js';
import * as repositorioArtistaOcupacion from '../repositories/repositorioArtistaOcupacion.js';
import * as repositorioColeccion from '../repositories/repositorioColeccion.js';
import * as repositorioObras from '../repositories/repositorioObra.js';
import * as repositorioOcupacion from '../repositories/repositorioOcupacion.js';
import { calcularPaginacion, getPaginacion } from '../utils/paginacion.js';

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
		await repositorioArtistaOcupacion.asignarOcupacionArtista(artista.idPrincipalMaker, idOcupacion);
	}
	const ocupacionesAsignadas = await repoOcupacion.getOcupacionesPorArtista(artista.idPrincipalMaker);
	return { ...artista, occupations: ocupacionesAsignadas };
};

const putArtista = async (artistaData) => {};

const getObrasArtista = async (nombre, pagina = 1, limite = 20) => {
	const artista = await repositorioArtista.getArtistaPorNombre(nombre);

	if (!artista) {
		const paginacion = calcularPaginacion(0, pagina, limite);
		return { hayResultado: false, obras: [], paginacion };
	}

	return getPaginacion(
		() => repositorioObras.getTotalObrasArtista(artista.idprincipalmaker),
		(offset, limit) => repositorioColeccion.getColeccionObrasArtista(offset, limit, artista.idprincipalmaker),
		pagina,
		limite
	);
};

const getTodosLosArtistas = async (pagina = 1, limite = 20) => {
	return getPaginacion(
		() => repositorioArtista.getCantidadArtistas(),
		(offset, limit) => repositorioArtista.getTodosLosArtistas(offset, limit),
		pagina,
		limite
	);
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

export { deleteArtista, getObrasArtista, getTodosLosArtistas, postArtista, putArtista };
