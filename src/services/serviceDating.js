import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioFecha from '../repositories/repositorioFecha.js';

const postDating = async (datosFecha) => {
	const { IdArtObject } = datosFecha;
	let fecha = await repositorioFecha.getFechaDeObraPorId(IdArtObject);
	if (fecha) {
		throw new RecursoExistenteError(`Ya existe la fecha para obra'${IdArtObject}'`);
	}
	return await repositorioFecha.postDating(datosFecha);
};

const actualizarDating = async (fechaId, datosFecha) => {
	const existeFecha = await repositorioFecha.getFechaPorId(fechaId);
	if (!existeFecha) {
		throw new RecursoNoEncontradoError(`Fecha con ID : ${fechaId} no existe`, 'La fecha solicitada no existe');
	}
	// Si se está actualizando el id de la obra de arte (ID), verifica que no tenga fecha asignada.
	if (datosFecha.IdArtObject !== existeFecha.idartobject) {
		const existeFechaParaObra = await repositorioFecha.getFechaDeObra(datosFecha.IdArtObject);
		if (existeFechaParaObra && existeFechaParaObra.iddating !== fechaId) {
			throw new RecursoExistenteError(
				`La obra ${datosFecha.IdArtObject} ya tiene fecha asignada.`,
				`Intento de duplicar un registro obra id : ${datosFecha.IdArtObject}`
			);
		}
	}

	return await repositorioFecha.actualizarDating(fechaId, datosFecha);
};

export { actualizarDating, postDating };
