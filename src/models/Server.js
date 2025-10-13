import express from 'express';
import { handleCustomError } from '../middlewares/errorHandler.js';
import artistaRoutes from '../routes/routesArtista.js';
import obrasRoutes from '../routes/routesObras.js';
import ocupacionRoutes from '../routes/routesOcupacion.js';

export default class Server {
	constructor() {
		this.port = process.env.PORT || 3000;
		this.app = express();
		this.app.disable('x-powered-by');
		this.middleware();
		this.routers();
		this.errorMiddleware();
	}
	middleware() {
		this.app.use(express.static('Public'));
		this.app.use(express.json());
	}
	routers() {
		this.app.use('/api/museorijks', artistaRoutes);
		this.app.use('/api/museorijks', obrasRoutes);
		this.app.use('/api/museorijks', ocupacionRoutes);

		this.app.all('*', (req, res) => {
			res.status(404).json({
				statusCode: 404,
				message: 'Ruta No Encontrada'
			});
		});
	}
	errorMiddleware() {
		this.app.use((err, req, res, next) => {
			handleCustomError(res, err);
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Escuchando en el puerto http://localhost:${this.port}`);
		});
	}
}
