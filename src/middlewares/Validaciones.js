import { respuestaError } from '../utils/respuestaApi.js';
import { normalizarString, validarIdNumerico, validarString } from '../utils/validacionDatos.js';

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

//parámetros de paginación
const validarDatosPaginacion = (req, res, next) => {
	let pagina = Number(req.query.pagina) || 1;
	let limite = Number(req.query.limite) || 20;

	if (!Number.isInteger(pagina) || pagina <= 0) {
		return res.status(400).json({ error: "El parámetro 'pagina' debe ser un número entero mayor a 0." });
	}

	if (!Number.isInteger(limite) || limite <= 0 || limite > 100) {
		return res.status(400).json({ error: "El parámetro 'limite' debe ser un número entero entre 1 y 100." });
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

export {
	validarDatosArtistas,
	validarDatosPaginacion,
	validarIdParam,
	validarNombreOcupacion,
	validarOcupacion,
	validarQueryString
};
