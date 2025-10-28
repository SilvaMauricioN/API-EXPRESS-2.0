import { pool } from '../db/conexion.js';

const createApiKey = async (developerName, developerEmail, apikeyHash) => {
	const result = await pool.query(
		'INSERT INTO userDevs (developerName, developerEmail, apiKeyHash) VALUES ($1, $2, $3) RETURNING developerName, developerEmail, status',
		[developerName, developerEmail, apikeyHash]
	);
	return result.rows[0];
};

const getPorEmail = async (email) => {
	const result = await pool.query('SELECT * FROM userDevs WHERE developerEmail = $1', [email]);
	return result.rows[0];
};

const getPorHash = async (hash) => {
	const result = await pool.query('SELECT * FROM userDevs WHERE apiKeyHash = $1 AND status = $2', [hash, 'aprobado']);
	console.log('Base de datos: ', result.rows[0], 'Numero: ', result.rowCount, 'result:', result);
	return result.rowCount > 0;
};

export { createApiKey, getPorEmail, getPorHash };
