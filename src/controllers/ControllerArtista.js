import { createArtista, getTodosLosArtistas } from '../repositories/repositorioArtista.js';
import { getColeccionObrasArtista } from '../repositories/repositorioColeccion.js';
import { getCantidadObras } from '../repositories/repositorioObra.js';
import { createArtistaSiNoExiste } from '../services/serviceArtista.js';
import { calcularPaginacion } from '../utils/paginacion.js';
import { respuestaError, respuestaExitosa } from '../utils/respuestaApi.js';

//GET retorna todas las obras de un artista especifico
const getColeccionArtista = async (req, res) => {
	try {
		const artista = req.query.artista;
		const pagina = parseInt(req.query.pagina) || 1;
		const limite = parseInt(req.query.limite) || 20;
		const offset = (pagina - 1) * limite;

		const cantidadObras = await getCantidadObras(artista);
		const coleccionObras = await getColeccionObrasArtista(offset, limite, artista);
		const paginacion = calcularPaginacion(cantidadObras, pagina, limite);

		const hayResultado = cantidadObras > 0;
		const mensaje = hayResultado
			? 'Colección de obras de arte recuperada exitosamente.'
			: `No se encontraron obras para el artista: "${artista}".`;

		res.status(200).json(respuestaExitosa(mensaje, coleccionObras, paginacion, hayResultado));
	} catch (error) {
		console.error('Error al obtener las obras:', error.message);
		res.status(500).json(respuestaError('Error interno del servidor al obtener obras.', error.message));
	}
};

//GET Retorna todos los artistas y especificaciones
const getListadoArtistas = async (reg, res) => {
	try {
		const coleccionArtistas = await getTodosLosArtistas();
		const hayResultado = coleccionArtistas.length > 0;

		const mensaje = hayResultado ? 'Listado de Autores recuperado Exitosamente.' : `No se encontro listado de Autores.`;

		res.status(200).json(respuestaExitosa(mensaje, coleccionArtistas, null, hayResultado));
	} catch (error) {
		console.error('Error al obtener listado de Autores:', error.message);
		res.status(500).json(respuestaError('Error interno del servidor al obtener listado de Autores.', error.message));
	}
};

//POST Crear un nuevo artista
const createArtistaNuevo = async (req, res) => {
	try {
		const resultado = await createArtistaSiNoExiste(req.body);

		const status = resultado.creado ? 201 : 200;
		const hayResultado = resultado.artista !== null;

		res.status(status).json(respuestaExitosa('No se puede cargar el Artista', resultado, null, hayResultado));
	} catch (error) {
		console.error('Error al Crear el Artista:', error.message);
		res.status(500).json(respuestaError('Error al crear el artista', error.message));
	}
};

export { createArtistaNuevo, getColeccionArtista, getListadoArtistas };
