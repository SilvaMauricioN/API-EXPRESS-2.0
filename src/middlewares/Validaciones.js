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

export { validarDatosPaginacion, validarIdParam, validarNombreOcupacion, validarQueryString };
