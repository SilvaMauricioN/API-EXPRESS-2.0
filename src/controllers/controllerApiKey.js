import * as serviceApiKey from '../services/serviceApiKey.js';
import { generarApiKey, hashKey } from '../utils/cryptoKey.js';
import { formatoRespuestaUnico } from '../utils/respuestaApi.js';

const peticionDeKey2 = async (req, res) => {
	const { developerName, developerEmail } = req.body;
	if (!developerName || !developerEmail) return res.status(400).json({ error: 'Faltan datos' });

	// Evitar duplicados
	const existing = await repositorioApiKey.findByEmail(developerEmail);
	if (existing) return res.status(400).json({ error: 'Ya existe una solicitud con ese email' });

	const apikey = generarApiKey();
	const apikeyHash = hashKey(apikey);

	await repositorioApiKey.create({ developerName, developerEmail, apikeyHash });

	// IMPORTANTE: devolver la API key solo una vez
	res.status(201).json({
		message: 'Solicitud recibida. Tu API key ha sido generada (en estado PENDIENTE).',
		apiKey: apikey,
		note: 'Guarda esta clave de forma segura, no se mostrará nuevamente.'
	});
};

const peticionDeKey = async (req, res, next) => {
	try {
		const { ...datosDev } = req.body;

		const apiKeyDev = await serviceApiKey.solicitarKey(datosDev);
		const mensaje = 'Solicitud recibida. Tu API key ha sido generada (en estado PENDIENTE).';
		res.status(201).json(formatoRespuestaUnico(apiKeyDev, mensaje));
	} catch (error) {
		next(error);
	}
};

export { peticionDeKey };
