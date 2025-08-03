import express from 'express';
import artistaRoutes from '../routes/RoutesArtista.js';
import coleccionRoutes from '../routes/RoutesColeccion.js';
import obrasRoutes from '../routes/RoutesObras.js';
import ocupacionRoutes from '../routes/routesOcupacion.js';

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
		this.app.use(express.json());
	}
	routers() {
		this.app.use('/api/museorijks/coleccion', coleccionRoutes);
		this.app.use('/api/museorijks/coleccion', artistaRoutes);
		this.app.use('/api/museorijks/coleccion', obrasRoutes);
		this.app.use('/api/museorijks/coleccion', ocupacionRoutes);

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
