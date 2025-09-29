class RecursoExistenteError extends Error {
	constructor(message = 'El recurso ya existe', detail = 'duplicacion de registro') {
		super(message);
		this.name = 'RecursoExistenteError';
		this.code = 409;
		this.detail = detail;
		this.tipo = 'duplicado';
	}
}

export { RecursoExistenteError };
