import express from 'express';
import artistaRoutes from '../Routes/Artista.js';
import coleccionRoutes from '../Routes/Coleccion.js';
import obrasRoutes from '../Routes/Obras.js';

export default class Server {
	constructor() {
		this.port = process.env.PORT || 3000;
		this.app = express();
		this.app.disable('x-powered-by');
		this.middleware();
		this.routers();
	}
	middleware() {
		this.app.use(express.static('Public'));
	}
	routers() {
		this.app.use('/api/MuseoRijks/', coleccionRoutes);
		this.app.use('/api/MuseoRijks/', artistaRoutes);
		this.app.use('/api/MuseoRijks/', obrasRoutes);
		this.app.all('*', (req, res) => {
			res.status(404).json({
				statusCode: 404,
				message: 'Ruta No Encontrada'
			});
		});
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Escuchando en el puerto http://localhost:${this.port}`);
		});
	}
}
//export default { Server };
