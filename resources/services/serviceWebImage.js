import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioWebImage from '../repositories/repositorioImagen.js';
import * as repositorioObra from '../repositories/repositorioObra.js';

const postWebImages = async (datosImagen) => {
	const { IdArtObject } = datosImagen;
	const obra = await repositorioWebImage.verificarObraEImagen(IdArtObject);
	if (!obra) {
		throw new RecursoNoEncontradoError(
			`No existe obra con ID: '${IdArtObject}'`,
			`No se puede asignar imagen con ID: '${IdArtObject}'`
		);
	}
	if (obra.idwebimage) {
		throw new RecursoExistenteError(
			`Ya existe imagen para el ID: '${IdArtObject}'`,
			`Intento de duplicar imagen para obra con ID: '${IdArtObject}'`
		);
	}

	return await repositorioWebImage.postImagenWeb(datosImagen);
};

const actualizarWebImages = async (imagenId, datosImagen) => {
	const { IdArtObject } = datosImagen;
	const existeImagen = await repositorioWebImage.getImagenPorId(imagenId);

	if (!existeImagen) {
		throw new RecursoNoEncontradoError(`Imagen: ${imagenId}`, 'La imagen solicitada no existe');
	}
	// Si se está actualizando el id de la obra de arte (ID),
	if (IdArtObject && IdArtObject !== existeImagen.idartobject) {
		//verifica que no exista la nueva obra
		const nuevaObra = await repositorioObra.getObraPorId(IdArtObject);
		if (!nuevaObra) {
			throw new RecursoNoEncontradoError(
				`No existe obra con ID: '${IdArtObject}'`,
				`No se puede asignar imagen a la nueva obra con ID: '${IdArtObject}'`
			);
		}

		// verifica que no tenga imagen asignada.
		const duplicado = await repositorioWebImage.getImagenDeObra(datosImagen.IdArtObject);
		if (duplicado && duplicado.idwebimage !== imagenId) {
			throw new RecursoExistenteError(
				`La obra ${datosImagen.IdArtObject} ya tiene imagen asignada.`,
				`Intento de duplicar un registro: ${datosImagen.IdArtObject}`
			);
		}
	}

	return await repositorioWebImage.actualizarWebImages(imagenId, datosImagen);
};

export { actualizarWebImages, postWebImages };
