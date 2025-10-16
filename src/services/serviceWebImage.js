import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import * as repositorioWebImage from '../repositories/repositorioImagen.js';

const postWebImages = async (datosImagen) => {
	const { IdArtObject } = datosImagen;
	let imagenWeb = await repositorioWebImage.getImagenDeObra(IdArtObject);
	if (imagenWeb) {
		throw new RecursoExistenteError(`Ya existe la imagen para obra'${IdArtObject}'`);
	}
	return await repositorioWebImage.postImagenWeb(datosImagen);
};

export { postWebImages };
