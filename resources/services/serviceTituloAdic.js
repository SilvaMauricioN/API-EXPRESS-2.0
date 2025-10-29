import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioObra from '../repositories/repositorioObra.js';
import * as repositorioTituloAdic from '../repositories/repositorioTituloAdic.js';

const postOtherTitle = async (datosTituloAdic) => {
	const { IdArtObject, alternativeTitle } = datosTituloAdic;
	const obra = await repositorioObra.getObraPorId(IdArtObject);

	if (!obra) {
		throw new RecursoNoEncontradoError(
			`No existe obra con ID: '${IdArtObject}'`,
			`No se puede asignar titulo alternativo: '${alternativeTitle}'`
		);
	}
	const duplicado = await repositorioTituloAdic.getTituloDuplicado(IdArtObject, alternativeTitle);
	if (duplicado) {
		throw new RecursoExistenteError(
			`Ya existe el titulo alternativo para la obra con ID: '${IdArtObject}'`,
			`Intento de duplicar titulo alternativo: '${alternativeTitle}'`
		);
	}
	return await repositorioTituloAdic.postOtherTitle(datosTituloAdic);
};

//actualizar verificar si existe la obra antes de actualizar dos veces
const actualizarOtherTitle = async (tituloAdicId, datosTituloAdic) => {
	const { IdArtObject, alternativeTitle } = datosTituloAdic;

	const existeTitulo = await repositorioTituloAdic.getTituloAltPorId(tituloAdicId);
	if (!existeTitulo) {
		throw new RecursoNoEncontradoError(`Titulo con ID : ${tituloAdicId} no existe`, 'La titulo solicitada no existe');
	}
	// Si se está actualizando el id de la obra de arte (ID), verifica si existe obra
	if (IdArtObject && IdArtObject !== existeTitulo.idartobject) {
		const nuevaObra = await repositorioObra.getObraPorId(IdArtObject);
		if (!nuevaObra) {
			throw new RecursoNoEncontradoError(
				`No existe obra con ID: '${IdArtObject}'`,
				`No se puede asignar titulo alternativo a la nueva obra con ID: '${IdArtObject}'`
			);
		}
	}

	if (alternativeTitle) {
		const duplicado = await repositorioTituloAdic.getTituloDuplicado(IdArtObject, alternativeTitle);
		if (duplicado && duplicado.idothertitle !== tituloAdicId) {
			throw new RecursoExistenteError(
				`Ya existe titulo para la obra: ${IdArtObject}`,
				`Intento de duplicar titulo: ${alternativeTitle}`
			);
		}
	}

	return await repositorioTituloAdic.actualizarOtherTitle(tituloAdicId, datosTituloAdic);
};
export { actualizarOtherTitle, postOtherTitle };
