import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import * as repositorioApiKey from '../repositories/repositorioApiKey.js';
import { generarApiKey, hashKey } from '../utils/cryptoKey.js';

const solicitarKey = async (datosDev) => {
	const { developerName, developerEmail } = datosDev;

	const existe = await repositorioApiKey.getPorEmail(developerEmail);
	if (existe) {
		throw new RecursoExistenteError(
			'Ya existe una solicitud con ese email',
			`El email ${developerEmail} ya esta registrado`
		);
	}
	const apiKey = generarApiKey();
	const apikeyHash = hashKey(apiKey);
	await repositorioApiKey.createApiKey(developerName, developerEmail, apikeyHash);

	return apiKey;
};

const validarApiKey = async (apiKey) => {
	const hash = hashKey(apiKey);
	const registroValido = await repositorioApiKey.getPorHash(hash);

	return registroValido;
};

export { solicitarKey, validarApiKey };
