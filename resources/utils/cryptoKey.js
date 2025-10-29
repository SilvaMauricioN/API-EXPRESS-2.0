import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const SERVER_SECRET = process.env.SERVER_SECRET;

const generarApiKey = () => {
	const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let cadenaKey = '';
	for (let i = 0; i < 10; i++) {
		cadenaKey += caracteres[crypto.randomInt(0, caracteres.length)];
	}
	return cadenaKey;
};

const hashKey = (key) => {
	return crypto
		.createHmac('sha256', SERVER_SECRET)
		.update(key)
		.digest('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
};

export { generarApiKey, hashKey };
