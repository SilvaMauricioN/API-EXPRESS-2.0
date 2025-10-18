import { RecursoExistenteError } from '../errors/recursoExistenteError.js';
import { RecursoNoEncontradoError } from '../errors/recursoNoEncontradoError.js';
import * as repositorioArtista from '../repositories/repositorioArtista.js';
import * as repositorioObras from '../repositories/repositorioObra.js';
import { getPaginacion } from '../utils/paginacion.js';

const getObraPorId = async (obraId) => {
	const obra = await repositorioObras.getObraDetalladaPorId(obraId);
	if (!obra) {
		throw new RecursoNoEncontradoError(`Obra: ${obraId}`, 'La obra solicitado no existe.');
	}
	return obra;
};

const getColeccionObras = async (pagina = 1, limite = 20) => {
	return getPaginacion(
		() => repositorioObras.getCantidadObras(),
		(offset, limit) => repositorioObras.getColeccionObras(offset, limit),
		pagina,
		limite
	);
};

const postObra = async (datosObra) => {
	const { title, IdPrincipalMaker } = datosObra;
	const existeObra = await repositorioObras.getObraPorTitulo(title, IdPrincipalMaker);
	if (existeObra) {
		throw new RecursoExistenteError(
			`La obra ${title} ya existe.`,
			`Intento de duplicar un registro con nombre de titulo: ${title}`
		);
	}
	const objectNumber = await repositorioObras.generateNumeroObjeto('OA-N-');

	const datosCompletos = {
		...datosObra,
		objectNumber
	};

	return await repositorioObras.postObra(datosCompletos);
};

const actualizarObra = async (numeroObjeto, datosObra) => {
	const { title, IdPrincipalMaker } = datosObra;
	const existeObra = await repositorioObras.getObraPorNumeroObjeto(numeroObjeto);

	if (!existeObra) {
		throw new RecursoNoEncontradoError(
			`La Obra con nombre: ${title} no encontrada`,
			`La obra con ${numeroObjeto} solicitada no encontrada.`
		);
	}
	if (IdPrincipalMaker) {
		const existeArtista = await repositorioArtista.getArtistaId(IdPrincipalMaker);
		if (!existeArtista) {
			throw new RecursoNoEncontradoError(`Artista: ${IdPrincipalMaker}`, 'Artista no encontrado.');
		}
	}

	if (title !== existeObra.title) {
		const obraMismoNombre = await repositorioObras.getObraDifNumeroObjeto(numeroObjeto, title, IdPrincipalMaker);
		if (obraMismoNombre) {
			throw new RecursoExistenteError(
				`La obra ${datosObra.title} ya existe.`,
				`Intento de duplicar un registro con nombre: ${datosObra.title}`
			);
		}
	}

	return await repositorioObras.actualizarObra(numeroObjeto, datosObra);
};
export { actualizarObra, getColeccionObras, getObraPorId, postObra };
