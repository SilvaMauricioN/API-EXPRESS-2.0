import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioWebImage from '../repositories/repositorioImagen.js';

const postWebImages = async (datosImagen) => {
	const { IdArtObject } = datosImagen;
	let imagenWeb = await repositorioWebImage.getImagenDeObra(IdArtObject);
	if (imagenWeb) {
		throw new RecursoExistenteError(`Ya existe la imagen para obra'${IdArtObject}'`);
	}
	return await repositorioWebImage.postImagenWeb(datosImagen);
};

const actualizarWebImages = async (imagenId, datosImagen) => {
	const existeImagen = await repositorioWebImage.getImagenPorId(imagenId);

	if (!existeImagen) {
		throw new RecursoNoEncontradoError(`Imagen: ${imagenId}`, 'La imagen solicitada no existe');
	}
	// Si se está actualizando el id de la obra de arte (ID), verifica que no tenga imagen asignada.
	if (datosImagen.IdArtObject !== existeImagen.idartobject) {
		const existeImagenParaObra = await repositorioWebImage.getImagenDeObra(datosImagen.IdArtObject);

		if (existeImagenParaObra && existeImagenParaObra.idwebimage !== imagenId) {
			throw new RecursoExistenteError(
				`La obra ${datosImagen.IdArtObject} ya tiene imagen asignada.`,
				`Intento de duplicar un registro: ${datosImagen.IdArtObject}`
			);
		}
	}

	return await repositorioWebImage.actualizarWebImages(imagenId, datosImagen);
};

export { actualizarWebImages, postWebImages };
