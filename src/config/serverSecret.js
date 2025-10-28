import dotenv from 'dotenv';
dotenv.config();

const SERVER_SECRET = process.env.SERVER_SECRET;

if (!SERVER_SECRET || SERVER_SECRET.length < 32) {
	console.error('================================================================');
	console.error(' FATAL: SERVER_SECRET ausente o demasiado débil. El servidor no puede arrancar.');
	console.error(' Define SERVER_SECRET en tu archivo .env o entorno con una clave fuerte y persistente.');
	console.error('================================================================');
	process.exit(1);
}

export { SERVER_SECRET };
