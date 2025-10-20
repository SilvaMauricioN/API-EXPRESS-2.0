import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioFecha from '../repositories/repositorioFecha.js';
import * as repositorioObra from '../repositories/repositorioObra.js';

const postDating = async (datosFecha) => {
	const { IdArtObject } = datosFecha;
	const fecha = await repositorioFecha.verificarObraYFecha(IdArtObject);
	if (!fecha) {
		throw new RecursoNoEncontradoError(
			`No existe obra con ID: '${IdArtObject}'`,
			`No se puede asignar fecha par obra con ID: '${IdArtObject}'`
		);
	}

	if (fecha.iddating) {
		throw new RecursoExistenteError(
			`Ya existe fecha para la obra con ID: '${IdArtObject}'`,
			`Intento de duplicar fecha para obra con ID: '${IdArtObject}'`
		);
	}
	return await repositorioFecha.postDating(datosFecha);
};

const actualizarDating = async (fechaId, datosFecha) => {
	const { IdArtObject } = datosFecha;

	const existeFecha = await repositorioFecha.getFechaPorId(fechaId);
	if (!existeFecha) {
		throw new RecursoNoEncontradoError(`Fecha con ID : ${fechaId} no existe`, 'La fecha solicitada no existe');
	}
	// Si se está actualizando el id de la obra de arte (ID), verifica que no tenga fecha asignada.
	if (IdArtObject && IdArtObject !== existeFecha.idartobject) {
		const nuevaObra = await repositorioObra.getObraPorId(IdArtObject);
		if (!nuevaObra) {
			throw new RecursoNoEncontradoError(
				`No existe obra con ID: '${IdArtObject}'`,
				`No se puede asignar fecha a la nueva obra con ID: '${IdArtObject}'`
			);
		}
		const duplicado = await repositorioFecha.getFechaDeObraPorId(IdArtObject);
		if (duplicado && duplicado.iddating !== fechaId) {
			throw new RecursoExistenteError(
				`La obra ${datosFecha.IdArtObject} ya tiene fecha asignada.`,
				`Intento de duplicar un registro obra id : ${datosFecha.IdArtObject}`
			);
		}
	}

	return await repositorioFecha.actualizarDating(fechaId, datosFecha);
};

export { actualizarDating, postDating };
