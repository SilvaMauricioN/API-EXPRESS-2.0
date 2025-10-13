const construirQueryActualizar = (nombreTabla, columnaId, valorId, datos, schemaEntidad) => {
	const listaActualizaciones = [];
	const valores = [];
	let paramIndex = 1;

	// 1. Filtrar, mapear y preparar parámetros.
	Object.entries(datos).forEach(([key, value]) => {
		const configCampo = schemaEntidad[key];

		// Se verifica que el campo esté en el esquema para seguridad
		if (configCampo) {
			const nombreColumnaDb = configCampo.dbName || key;
			listaActualizaciones.push(`"${nombreColumnaDb}" = $${paramIndex++}`);
			valores.push(value);
		}
	});

	// 2. Validación.
	if (listaActualizaciones.length === 0) {
		throw new Error('No hay campos válidos para actualizar');
	}

	// 3. Añadir el valor de la clave primaria para la cláusula WHERE.
	valores.push(valorId);
	const idParam = paramIndex;

	// 4. Construcción de la Query SQL.
	const query = `
        UPDATE "${nombreTabla}"
        SET ${listaActualizaciones.join(', ')}
        WHERE "${columnaId}" = $${idParam}
        RETURNING *;
    `;

	return { query, valores };
};

export { construirQueryActualizar };
