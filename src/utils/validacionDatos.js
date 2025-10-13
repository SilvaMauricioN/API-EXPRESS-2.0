const validarIdNumerico = (idString) => {
	if (!idString || idString.trim().length === 0) {
		return null;
	}

	const id = parseInt(idString.trim(), 10);

	if (isNaN(id) || id <= 0 || String(id) !== idString) {
		return null;
	}

	return id;
};

const validarString = (string) => {
	return typeof string === 'string' && string.trim().length > 0;
};

const normalizarString = (string) => {
	//	return string.trim().toLowerCase().replace(/\s+/g, ' ');
	return string.trim().replace(/\s+/g, ' ');
};

const normalizarCadenaTexto = (valor) => {
	if (typeof valor !== 'string' || valor === null || valor === undefined) {
		return valor;
	}

	let normalizado = valor.trim();
	// normalizado = normalizado.toLowerCase();
	normalizado = normalizado.replace(/\s+/g, ' ');

	return normalizado;
};

export { normalizarCadenaTexto, normalizarString, validarIdNumerico, validarString };
