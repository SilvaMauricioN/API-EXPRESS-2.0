import { respuestaError } from '../utils/respuestaApi.js';
import { validarIdNumerico, validarString } from '../utils/validacionDatos.js';

const validarIdArtista = (req, res, next) => {
	const id = validarIdNumerico(req.params.idArtista);
	if (!id) {
		return res
			.status(400)
			.json(respuestaError(`ID artista inválido, debe ser un numero entero: '${req.params.idArtista}'`));
	}
	req.idArtista = id;
	next();
};

const validarNombreOcupacion = (req, res, nect) => {
	let { nombreOcupacion } = req.body;
	if (!validarString(nombreOcupacion)) {
		return res.status(400).json(respuestaError('Falta el nombre de la ocupacion o es una cadena vacía.'));
	}
	nombreOcupacion = nombreOcupacion.trim().toLowerCase().replace(/\s+/g, ' ');
	req.body.nombreOcupacion = nombreOcupacion;
	next();
};

export { validarIdArtista, validarNombreOcupacion };
