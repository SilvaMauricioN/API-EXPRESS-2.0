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
const validarOcupacion = (req, res, next) => {
	const { occupations } = req.body;

	if (!Array.isArray(occupations)) {
		return res.status(400).json({
			error: "El valor 'occupations' debe ser un array de IDs numéricos."
		});
	}

	// Verificar que todos los elementos sean números
	const valoresInvalidos = occupations.filter((o) => typeof o !== 'number');
	if (valoresInvalidos.length > 0) {
		return res.status(400).json({
			error: `Ocupaciones inválidas. Solo se aceptan IDs de ocupación.`,
			detalles: valoresInvalidos
		});
	}

	next();
};

const validarDatosArtistas = (req, res, next) => {
	const { name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality } = req.body;
	// Validación de combreos obligatorios
	const valoresRequeridos = [
		{ valor: name, nombre: 'name' },
		{ valor: placeOfBirth, nombre: 'placeOfBirth' },
		{ valor: placeOfDeath, nombre: 'placeOfDeath' },
		{ valor: nationality, nombre: 'nationality' }
	];
	for (const { valor, nombre } of valoresRequeridos) {
		if (!valor || valor.toString().trim() === '') {
			return res.status(400).json({ error: `El campo ${nombre} es obligatorio` });
		}
	}

	const fechas = [
		{ valor: dateOfBirth, nombre: 'dateOfBirth' },
		{ valor: dateOfDeath, nombre: 'dateOfDeath' }
	];

	for (const { valor, nombre } of fechas) {
		if (valor && isNaN(Date.parse(valor))) {
			return res.status(400).json({ error: `Formato inválido en '${nombre}'.` });
		}
	}

	next();
};

// middlewares/validate.js
const validarDatosBody = (objeto) => {
	return (req, res, next) => {
		const body = req.body;
		const errores = [];

		for (const key in objeto) {
			const regla = objeto[key];
			let valor = body[key];

			// 1. Campo obligatorio
			if (regla.required && (valor === undefined || valor === null || valor.toString().trim() === '')) {
				errores.push(`El campo '${key}' es obligatorio.`);
				continue;
			}

			// 2. Aplicar Normalización y reasignar
			if (regla.type === 'string' && typeof valor === 'string') {
				valor = normalizarCadenaTexto(valor);
				req.body[key] = valor;
			}

			// 3. Validación de tipo
			if (valor !== undefined && regla.type) {
				const type = regla.type;
				if (type === 'string' && typeof valor !== 'string') {
					errores.push(`El campo '${key}' debe ser un texto.`);
				}
				if (type === 'number' && typeof valor !== 'number') {
					errores.push(`El campo '${key}' debe ser un número.`);
				}
				if (type === 'boolean' && typeof valor !== 'boolean') {
					errores.push(`El campo '${key}' debe ser true o false.`);
				}
				if (type === 'array' && !Array.isArray(valor)) {
					errores.push(`El campo '${key}' debe ser una lista/array.`);
				}
				if (type === 'date' && valor && isNaN(Date.parse(valor))) {
					errores.push(`El campo '${key}' debe tener un formato de fecha válido (YYYY-MM-DD).`);
				}
			}

			// 4. Validación de longitud mínima
			if (regla.minLength && typeof valor === 'string' && valor.length < regla.minLength) {
				errores.push(`El campo '${key}' debe tener al menos ${regla.minLength} caracteres.`);
			}
		}

		if (errores.length > 0) {
			return res.status(400).json({ errores: errores });
		}

		next();
	};
};

export {
	validarDatosArtistas,
	validarDatosBody,
	validarDatosPaginacion,
	validarIdParam,
	validarNombreOcupacion,
	validarOcupacion,
	validarQueryString
};
