import { respuestaError } from '../utils/respuestaApi.js';

const SQL_ERROR_MAP = {
	23505: { code: 409, mensaje: 'Valor duplicado, ya existe un registro con este dato.' },
	23503: { code: 400, mensaje: 'Violación de clave foránea, revise relaciones.' },
	'22P02': { code: 400, mensaje: 'Formato de dato inválido.' },
	42703: { code: 400, mensaje: 'Columna no existe en la tabla.' },
	42601: { code: 400, mensaje: 'Error de sintaxis en la consulta SQL.' },
	40001: { code: 409, mensaje: 'Conflicto de transacción, intente de nuevo.' },
	'42P01': { code: 500, mensaje: 'Error interno: tabla no encontrada.' },
	'08000': { code: 503, mensaje: 'No se pudo conectar a la base de datos.' }
};

const mapSQLErrorToHTTP = (sqlCode) => {
	const errorMapeado = SQL_ERROR_MAP[sqlCode];
	if (errorMapeado) {
		return errorMapeado;
	}
	const erroresConexion = ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EHOSTUNREACH', 'ENOTFOUND'];
	if (erroresConexion.includes(sqlCode)) {
		return { code: 503, mensaje: 'Conexión con la base de datos interrumpida o rechazada.' };
	}

	const erroresServidor = ['57P01', '57P02', '57P03', 'XX000'];
	if (erroresServidor.includes(sqlCode)) {
		return { code: 503, mensaje: 'El servidor de base de datos cerró la conexión inesperadamente.' };
	}

	return { code: 500, mensaje: 'Error interno del servidor.' };
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
