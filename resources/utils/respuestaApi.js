const respuestaExitosa = (mensaje, data = [], paginacion = null, hayResultado = null, metaData = null) => {
	const respuesta = {
		status: 'success',
		mensaje: mensaje
	};

	if (paginacion) {
		respuesta.paginacion = paginacion;
	}
	if (hayResultado !== null) {
		respuesta.hayResultado = hayResultado;
	}

	if (metaData) {
		respuesta.metaData = metaData;
	}

	respuesta.data = data;

	return respuesta;
};

const formatoRespuestaUnico = (data, mensaje = 'Operación exitosa') => {
	return {
		status: 'success',
		mensaje: mensaje,
		data: data || null
	};
};

const formatoRespuestaColeccion = (data, paginacion = null, mensaje = 'Datos obtenidos exitosamente') => {
	const respuesta = {
		status: 'success',
		message: mensaje
	};

	if (paginacion) {
		// Usamos 'pagination' para seguir convenciones API
		respuesta.paginacion = paginacion;
	}
	respuesta.data = data;

	return respuesta;
};

const respuestaError = (mensaje, detalle = null) => {
	const respuesta = {
		status: 'error',
		mensaje: mensaje
	};

	if (detalle) {
		respuesta.detalle = detalle;
	}

	return respuesta;
};

export { formatoRespuestaColeccion, formatoRespuestaUnico, respuestaError, respuestaExitosa };
