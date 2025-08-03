const validarIdNumerico = (idString) => {
	if (!idString || idString.trim().length === 0) {
		return null;
	}

	const id = parseInt(idString, 10);

	if (isNaN(id) || String(id) !== idString) {
		return null;
	}

	return id;
};

const validarString = (string) => {
	return !!string && string.trim().length > 0;
};

export { validarIdNumerico, validarString };
