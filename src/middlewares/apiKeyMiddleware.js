import { validarApiKey } from '../services/serviceApiKey.js';

const apiKeyMiddleware = async (req, res, next) => {
	const key = req.header('api-key');
	if (!key) return res.status(401).json({ error: 'API key requerida' });

	const registro = await validarApiKey(key);
	console.log('User DEvs ', registro);
	if (!registro) return res.status(403).json({ error: 'API key inválida o no aprobada' });

	req.developer = registro;
	console.log('Developer: ', registro.developer);
	next();
};

export { apiKeyMiddleware };
