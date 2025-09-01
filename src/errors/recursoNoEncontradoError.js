class RecursoNoEncontradoError extends Error {
	constructor(mensaje = 'El recurso no se encontró', detail = null) {
		super(mensaje);
		this.name = 'RecursoNoEncontradoError';
		this.code = 404;
		this.detail = detail;
	}
}

export { RecursoNoEncontradoError };
