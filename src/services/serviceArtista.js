import { createArtista, getArtistaPorNombre } from '../repositories/repositorioArtista.js';

const createArtistaSiNoExiste = async (artistaData) => {
	const yaExiste = await getArtistaPorNombre(artistaData.name);

	if (yaExiste) {
		return {
			creado: false,
			artista: artistaData,
			mensaje: `El artista "${artistaData.name}" ya existe.`
		};
	}

	const nuevoArtista = await createArtista(artistaData);

	return {
		creado: true,
		artista: nuevoArtista,
		mensaje: `Artista "${nuevoArtista.name}" creado exitosamente.`
	};
};

export { createArtistaSiNoExiste };
