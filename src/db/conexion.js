import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.SUPABASE_URL
	// ssl: { rejectUnauthorized: false, sslmode: 'require' }
});

pool.on('connect', () => {
	console.log('Conectado a la base de datos PostgreSQL de Supabase.');
});

pool.on('error', (err) => {
	console.error('Error en la conexión a la base de datos de Supabase:', err.message, err.stack);
});

export { pool };
