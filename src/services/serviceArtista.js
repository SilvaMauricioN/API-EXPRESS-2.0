import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import * as repositorioArtista from '../repositories/repositorioArtista.js';
import * as repositorioColeccion from '../repositories/repositorioColeccion.js';
import * as repositorioObras from '../repositories/repositorioObra.js';
import * as repositorioOcupacion from '../repositories/repositorioOcupacion.js';
import * as serviceOcupacion from '../services/serviceOcupacion.js';
import { calcularPaginacion } from '../utils/paginacion.js';

const postArtista = async (artistaData) => {
	const { name, occupations = [] } = artistaData;
	const existe = await repositorioArtista.getArtistaPorNombre(name);

	if (existe) {
		throw new RecursoExistenteError(
			`El artista "${artistaData.name}" ya existe.`,
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
	console.log(artista);

	if (!artista) {
		return { Artista: nombre, Obras: [], Paginacio: calcularPaginacion(0, pagina, limite) };
	}

	const numeroObras = await repositorioObras.getCantidadObras2(artista.idprincipalmaker);
	const offset = (pagina - 1) * limite;
	const obras = await repositorioColeccion.getColeccionObrasArtista(offset, limite, artista.idprincipalmaker);
	console.log(obras);
	const paginacion = calcularPaginacion(numeroObras, pagina, limite);

	return { artista, obras, paginacion };
};

export { getObrasArtista, postArtista };
