const respuestaExitosa = (mensaje, data, paginacion = null, metaData = null) => {
	const respuesta = {
		status: 'success',
		mensaje: mensaje
	};

	if (paginacion) {
		respuesta.paginacion = paginacion;
	}
	if (metaData) {
		respuesta.metaData = metaData;
	}

	respuesta.data = data;

	return respuesta;
};

const repuestaError = (mensaje, detalle = null) => {
	const respuesta = {
		status: 'error',
		mensaje: mensaje
	};

	if (detalle) {
		respuesta.detalle = detalle;
	}

	return respuesta;
};

export { repuestaError, respuestaExitosa };
