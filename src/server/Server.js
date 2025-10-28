import dotenv from 'dotenv';
import express from 'express';
import { SERVER_SECRET } from '../config/serverSecret.js';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware.js';
import { handleCustomError } from '../middlewares/errorHandler.js';
import tituloAdicRoutes from '../routes/routerTituloAdic.js';
import apiKeyRoutes from '../routes/routesApiKey.js';
import artistaRoutes from '../routes/routesArtista.js';
import fechaRoutes from '../routes/routesFechas.js';
import obrasRoutes from '../routes/routesObras.js';
import ocupacionRoutes from '../routes/routesOcupacion.js';
import imagenRoutes from '../routes/routesWebImage.js';

export default class Server {
	constructor() {
		this.port = process.env.PORT || 3000;
		dotenv.config();
		this.app = express();
		this.app.disable('x-powered-by');
		this.middleware();
		this.routers();
		this.errorMiddleware();
	}
	middleware() {
		this.app.use(express.json());
		// this.app.use(express.static('Public'));
		this.app.use(express.urlencoded({ extended: true }));

		// this.app.use(express.json());
	}
	routers() {
		// this.app.use((req, res, next) => {
		// 	console.log(`📥 ${req.method} ${req.path}`);
		// 	next();
		// });

		// console.log('📍 Montando ruta: /api/peticion/key');

		this.app.use('/peticion/key', apiKeyRoutes);
		this.app.use('/api/museorijks', artistaRoutes);
		this.app.use('/api/museorijks', obrasRoutes);
		this.app.use('/api/museorijks', ocupacionRoutes);
		this.app.use('/api/museorijks', imagenRoutes);
		this.app.use('/api/museorijks', fechaRoutes);
		this.app.use('/api/museorijks', tituloAdicRoutes);

		this.app.use(express.static('Public'));

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
