import { getObraNumeroObjeto } from '../repositories/repositorioObra.js';
import { repuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

const getObraPorId = async (req, res) => {
	try {
		const { id } = req.params;
		const obra = await getObraNumeroObjeto(id);

		const hayResultado = obra.length > 0;
		const mensaje = hayResultado
			? 'Obra de arte recuperada exitosamente.'
			: `No se ha encontrado obra para el identificador: "${id}".`;

		res.status(200).json(respuestaExitosa(mensaje, obra, null, hayResultado));
	} catch (error) {
		console.error('Error al obtener la obra:', error.message);
		res.status(500).json(repuestaError('Error interno del servidor al obtener obra.', error.message));
	}
};

export { getObraPorId };
