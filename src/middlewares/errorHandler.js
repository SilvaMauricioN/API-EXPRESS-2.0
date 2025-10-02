import { respuestaError } from '../utils/respuestaApi.js';

const mapSQLErrorToHTTP = (sqlCode) => {
	switch (sqlCode) {
		case '23505':
			return { code: 409, mensaje: 'Valor duplicado, ya existe un registro con este dato.' };
		case '23503':
			return { code: 400, mensaje: 'Violación de clave foránea, revise relaciones.' };
		case '22P02':
			return { code: 400, mensaje: 'Formato de dato inválido.' };
		case '42703':
			return { code: 400, mensaje: 'Columna no existe en la tabla.' };
		case '42601':
			return { code: 400, mensaje: 'Error de sintaxis en la consulta SQL.' };
		case '40001':
			return { code: 409, mensaje: 'Conflicto de transacción, intente de nuevo.' };
		case '42P01':
			return { code: 500, mensaje: 'Error interno: tabla no encontrada.' };
		case '08000':
			return { code: 503, mensaje: 'No se pudo conectar a la base de datos.' };
		default:
			return { code: 500, mensaje: 'Error interno del servidor.' };
	}
};

const handleCustomError = (res, error) => {
	if (typeof error.code === 'number' && error.code >= 100 && error.code <= 599) {
		const statusCode = error.code;
		return res.status(statusCode).json(respuestaError(error.message, error.detail));
	}

	if (typeof error.code === 'string') {
		const httpStatus = mapSQLErrorToHTTP(error.code);
		const bodyRespuesta = respuestaError(httpStatus.mensaje, error.detail || error.message);
		return res.status(httpStatus.code).json(bodyRespuesta);
	}
	console.log('Error no mapeado:', error);
	return res.status(500).json(respuestaError('Error interno del servidor', error.message));
};

export { handleCustomError };
