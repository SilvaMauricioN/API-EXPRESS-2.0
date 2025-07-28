import axios from 'axios';
import { getObraNumeroObjeto } from '../repositories/repositorioObra.js';
import { repuestaError, respuestaExitosa } from '../utils/respuestaApi.js';
const apiKey = process.env.API_KEY;

const getObras = (req, res) => {
	const { nombreArtista } = req.query;
	axios
		.get(`https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&involvedMaker=${nombreArtista}`)
		.then(({ data }) => {
			const { artObjects } = data;
			res.status(200).json(artObjects);
		})
		.catch((error) => {
			//si sucede una respuesta de error de axiso, es decir de la api
			if (error.response) {
				const { status, statusText, data } = error.response;
				res.status(status).json({
					status: status,
					msg: statusText,
					detalle: data
				});
			} else {
				res.status(500).json({
					status: 500,
					msg: 'Error inesperado'
				});
			}
		});
};

const getObraPorId = async (req, res) => {
	try {
		const idObject = req.query.numeroObjeto;
		const obra = await getObraNumeroObjeto(idObject);

		const hayResultado = obra.length > 0;
		const mensaje = hayResultado
			? 'Obra de arte recuperada exitosamente.'
			: `No se ha encontrado obra para el identificador: "${idObject}".`;

		res.status(200).json(respuestaExitosa(mensaje, obra, null, hayResultado));
	} catch (error) {
		console.error('Error al obtener la obra:', error.message);
		res.status(500).json(repuestaError('Error interno del servidor al obtener obra.', error.message));
	}
};

export { getObraPorId, getObras };
