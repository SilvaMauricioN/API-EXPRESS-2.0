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

export { RecursoNoEncontradoError };
