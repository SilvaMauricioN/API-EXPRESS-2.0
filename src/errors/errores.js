class RecursoNoEncontradoError extends Error {
	constructor(
		mensaje = 'Recurso solicitado no existe',
		detail = 'No se encontró ningun recurso con el recurso solicitado'
	) {
		super(mensaje);
		this.name = 'RecursoNoEncontradoError';
		this.code = 404;
		this.detail = detail;
	}
}

class RecursoExistenteError extends Error {
	constructor(message = 'El recurso ya existe', detail = 'duplicacion de registro') {
		super(message);
		this.name = 'RecursoExistenteError';
		this.code = 409;
		this.detail = detail;
		this.tipo = 'duplicado';
	}
}

export { RecursoExistenteError, RecursoNoEncontradoError };
