import { respuestaError } from '../utils/respuestaApi.js';
import { normalizarCadenaTexto, normalizarString, validarIdNumerico, validarString } from '../utils/validacionDatos.js';

//param
const validarIdParam = (nombreParam) => (req, res, next) => {
	const id = validarIdNumerico(req.params[nombreParam]);
	if (!id) {
		return res
			.status(400)
			.json(
				respuestaError(`ID inválido para '${nombreParam}', debe ser un numero entero: '${req.params[nombreParam]}'`)
			);
	}
	req[nombreParam] = id;
	next();
};

//body
const validarNombreOcupacion = (req, res, next) => {
	let { name } = req.body;
	if (!validarString(name)) {
		return res.status(400).json(respuestaError('Falta el nombre de la ocupacion o es una cadena vacía.'));
	}
	const nombreNormalizado = normalizarString(name);
	req.body.name = nombreNormalizado;
	next();
};

//query
const validarQueryString = (nombreQuery) => (req, res, next) => {
	let valor = req.query[nombreQuery];

	if (!valor) {
		return res.status(400).json(respuestaError(`Falta el parámetro query '${nombreQuery}' en la ruta`));
	}

	if (!validarString(valor)) {
		return res.status(400).json(respuestaError(`El parámetro query '${nombreQuery}' es inválido`));
	}
	req.query[nombreQuery] = normalizarString(valor);
	next();
};

const validarDatosPaginacion = (req, res, next) => {
	const paginaStr = req.query.pagina;
	const limiteStr = req.query.limite;

	const pagina = paginaStr ? Number(paginaStr) : 1;
	const limite = limiteStr ? Number(limiteStr) : 20;

	if (paginaStr && (!Number.isInteger(pagina) || pagina <= 0)) {
		return res.status(400).json({
			error: "El parámetro 'pagina' debe ser un número entero mayor a 0."
		});
	}

	if (limiteStr && (!Number.isInteger(limite) || limite <= 0 || limite > 100)) {
		return res.status(400).json({
			error: "El parámetro 'limite' debe ser un número entero entre 1 y 100."
		});
	}

	req.query.pagina = pagina;
	req.query.limite = limite;

	next();
};

//Validar id ocupaciones
// const validarOcupacion = (req, res, next) => {
// 	const { occupations } = req.body;
//
// 	if (!Array.isArray(occupations)) {
// 		return res.status(400).json({
// 			error: "El valor 'occupations' debe ser un array de IDs numéricos."
// 		});
// 	}
//
// 	// Verificar que todos los elementos sean números
// 	const valoresInvalidos = occupations.filter((o) => typeof o !== 'number');
// 	if (valoresInvalidos.length > 0) {
// 		return res.status(400).json({
// 			error: `Ocupaciones inválidas. Solo se aceptan IDs de ocupación.`,
// 			detalles: valoresInvalidos
// 		});
// 	}
//
// 	next();
// };

// const validarDatosArtistas = (req, res, next) => {
// 	const { name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality } = req.body;
// 	// Validación de combreos obligatorios
// 	const valoresRequeridos = [
// 		{ valor: name, nombre: 'name' },
// 		{ valor: placeOfBirth, nombre: 'placeOfBirth' },
// 		{ valor: placeOfDeath, nombre: 'placeOfDeath' },
// 		{ valor: nationality, nombre: 'nationality' }
// 	];
// 	for (const { valor, nombre } of valoresRequeridos) {
// 		if (!valor || valor.toString().trim() === '') {
// 			return res.status(400).json({ error: `El campo ${nombre} es obligatorio` });
// 		}
// 	}
//
// 	const fechas = [
// 		{ valor: dateOfBirth, nombre: 'dateOfBirth' },
// 		{ valor: dateOfDeath, nombre: 'dateOfDeath' }
// 	];
//
// 	for (const { valor, nombre } of fechas) {
// 		if (valor && isNaN(Date.parse(valor))) {
// 			return res.status(400).json({ error: `Formato inválido en '${nombre}'.` });
// 		}
// 	}
//
// 	next();
// };

const validarCamposNoPermitidos = (datosBody, scheme) => {
	const errores = [];
	for (const key in datosBody) {
		if (!(key in scheme)) {
			errores.push(`El campo '${key}' no es válido.`);
		}
	}
	return errores;
};

const validarTiposDatosScheme = (key, regla, valor) => {
	const errores = [];
	switch (regla.type) {
		case String:
			if (typeof valor !== 'string') errores.push(`El campo '${key}' debe ser un texto.`);
			break;
		case Number:
			if (typeof valor !== 'number' || isNaN(valor)) errores.push(`El campo '${key}' debe ser un número.`);
			break;
		case Boolean:
			if (typeof valor !== 'boolean') errores.push(`El campo '${key}' debe ser true o false.`);
			break;
		case Array:
			if (!Array.isArray(valor)) {
				errores.push(`El campo '${key}' debe ser una lista/array.`);
			} else {
				errores.push(...validarContenidoArray(key, regla, valor));
			}
			break;
		case Date:
			if (typeof valor === 'string' && isNaN(Date.parse(valor))) {
				errores.push(`El campo '${key}' debe tener un formato de fecha válido (YYYY-MM-DD).`);
			}
			break;
	}

	return errores;
};

const validarContenidoArray = (key, regla, valor) => {
	const errores = [];
	if (!regla.itemsType) return errores; // No hay especificación del tipo interno

	for (let i = 0; i < valor.length; i++) {
		const item = valor[i];
		if (regla.itemsType === Number && (typeof item !== 'number' || isNaN(item))) {
			errores.push(`El campo '${key}' tiene que ser númerico.`);
		}
		if (regla.itemsType === String && typeof item !== 'string') {
			errores.push(`El campo '${key}' tiene que ser un texto`);
		}
	}
	return errores;
};

const esValorVacio = (valor) => {
	return (
		valor === null ||
		valor === undefined ||
		(typeof valor === 'string' && valor.trim() === '') ||
		(Array.isArray(valor) && valor.length === 0) ||
		(typeof valor === 'object' && !Array.isArray(valor) && valor !== null && Object.keys(valor).length === 0)
	);
};

const controlBodyVacio = (req, res) => {
	const keys = Object.keys(req.body);

	if (keys.length === 0) {
		return res.status(400).json({
			status: 'error',
			mensaje: 'Petición inválida',
			detalle: 'El cuerpo de la solicitud no puede estar vacío'
		});
	}
};

const validarDatosBody = (scheme) => {
	return (req, res, next) => {
		const errorResponse = controlBodyVacio(req, res);

		if (errorResponse) {
			return errorResponse;
		}

		const datosBody = req.body;
		const errores = [];
		const metodo = req.method.toUpperCase();
		const esPOST = metodo === 'POST';
		const esPUT = metodo === 'PUT';
		const esPATCH = metodo === 'PATCH';
		const requiereValidacionCompleta = esPOST || esPUT;

		// Validar campos no permitidos
		errores.push(...validarCamposNoPermitidos(datosBody, scheme));

		// Validar campos según el esquema
		for (const key in scheme) {
			const regla = scheme[key];
			let valor = datosBody[key];
			const estaPresente = datosBody.hasOwnProperty(key);

			// En PATCH, ignorar campos no presentes
			if (esPATCH && !estaPresente) {
				continue;
			}

			// Validar campos requeridos (POST/PUT)
			if (requiereValidacionCompleta && regla.required === true) {
				if (!estaPresente || valor === undefined) {
					errores.push(`El campo '${key}' es obligatorio.`);
					continue;
				}
			}

			// Si el campo no está presente y no es requerido, continuar
			if (!estaPresente) {
				continue;
			}

			// Normalizar strings ANTES de validar
			if (regla.type === 'string' && typeof valor === 'string') {
				req.body[key] = normalizarCadenaTexto(valor);
			}

			if (esValorVacio(valor)) {
				if (!regla.nullable) {
					errores.push(`El campo '${key}' no puede ser nulo.`);
				}
				continue;
			}

			// Validar campos obligatorios que quedaron vacíos después de normalizar
			if (regla.required && regla.type === 'string' && valor === '') {
				errores.push(`El campo '${key}' no puede estar vacío.`);
				continue;
			}

			errores.push(...validarTiposDatosScheme(key, regla, valor));

			if (regla.minLength && typeof valor === 'string' && valor.length > 0 && valor.length < regla.minLength) {
				errores.push(`El campo '${key}' debe tener al menos ${regla.minLength} caracteres.`);
			}
		}

		if (errores.length > 0) {
			return res.status(400).json({ errores });
		}

		next();
	};
};

export { validarDatosBody, validarDatosPaginacion, validarIdParam, validarNombreOcupacion, validarQueryString };
