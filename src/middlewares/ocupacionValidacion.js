import { respuestaError } from '../utils/respuestaApi.js';
import { validarIdNumerico, validarString } from '../utils/validacionDatos.js';

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

const validarNombreOcupacion = (req, res, next) => {
	let { name } = req.body;
	if (!validarString(name)) {
		return res.status(400).json(respuestaError('Falta el nombre de la ocupacion o es una cadena vacía.'));
	}
	const nombreNormalizado = name.trim().toLowerCase().replace(/\s+/g, ' ');
	req.body.name = nombreNormalizado;
	next();
};

export { validarIdParam, validarNombreOcupacion };
