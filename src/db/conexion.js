import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.SUPABASE_URL
	// ssl: { rejectUnauthorized: false, sslmode: 'require' }
});

const verificarConexion = async () => {
	try {
		const client = await pool.connect();
		console.log('✅ Conectado a la base de datos PostgreSQL de Supabase.');
		client.release();
	} catch (error) {
		console.error('❌ Error en la conexión a la base de datos de Supabase:', error.message);
		process.exit(1);
	}
};

verificarConexion();

pool.on('error', (err, client) => {
	console.error('🚨 Error inesperado en el pool o en un cliente inactivo de Postgres:', err);

	if (err.message && err.message.includes(':client_termination')) {
		console.warn('Advertencia: Cliente de BD terminado abruptamente. Pool lo gestionará.');
		return;
	}
});

export { pool };
