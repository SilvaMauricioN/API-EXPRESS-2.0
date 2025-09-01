import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioArtista from '../repositories/repositorioArtista.js';
import * as repositorioColeccion from '../repositories/repositorioColeccion.js';
import * as repositorioObras from '../repositories/repositorioObra.js';
import * as repositorioOcupacion from '../repositories/repositorioOcupacion.js';
import * as serviceOcupacion from '../services/serviceOcupacion.js';
import { calcularPaginacion, getPaginacion } from '../utils/paginacion.js';

const postArtista = async (artistaData) => {
	const { name, occupations = [] } = artistaData;
	const existe = await repositorioArtista.getArtistaPorNombre(name);

	if (existe) {
		throw new RecursoExistenteError(
			`El artista ${artistaData.name} ya existe.`,
			`Intento de duplicar un registro con nombre: ${artistaData.name}`
		);
	}
	const artista = await repositorioArtista.postArtista(artistaData);

	for (const nombreOcupacion of occupations) {
		const ocupacion = await serviceOcupacion.postOcupacion(nombreOcupacion);
		await repositorioOcupacion.putOcupacionArtista(artista.idPrincipalMaker, ocupacion.idOccupation);
	}
	return artista;
};

const getObrasArtista = async (nombre, pagina = 1, limite = 20) => {
	const artista = await repositorioArtista.getArtistaPorNombre(nombre);

	if (!artista) {
		const paginacion = calcularPaginacion(0, pagina, limite);
		return { hayResultado: false, obras: [], paginacion };
	}

	return getPaginacion(
		() => repositorioObras.getCantidadObras2(artista.idprincipalmaker),
		(offset, limit) => repositorioColeccion.getColeccionObrasArtista(offset, limit, artista.idprincipalmaker),
		pagina,
		limite
	);
};

const getListadoDeArtistas = async (pagina = 1, limite = 20) => {
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
	await repositorioOcupacion.eliminarRelacionesOcupaciones(id);
	const artistaEliminado = await repositorioArtista.deleteArtista(id);
	return artistaEliminado;
};

export { deleteArtista, getListadoDeArtistas, getObrasArtista, postArtista };
