class RecursoExistenteError extends Error {
	constructor(mensaje = 'El recurso ya existe', detail = 'duplicacion de registro') {
		super(mensaje);
		this.name = 'RecursoExistenteError';
		this.code = 409;
		this.detail = detail;
	}
}

export { RecursoExistenteError };
