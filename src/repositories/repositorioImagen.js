import { pool } from '../db/conexion.js';
import { webImagesScheme } from '../scheme/webImage.js';
import { construirQueryActualizar } from './construirQuery.js';

const postImagenWeb = async (datosImagen) => {
	const query = `INSERT INTO webImages(IdArtObject,width,height,url) VALUES ($1,$2,$3,$4) RETURNING*;`;
	const values = [datosImagen.IdArtObject, datosImagen.width, datosImagen.height, datosImagen.url];

	const { rows } = await pool.query(query, values);
	return rows[0];
};

const getImagenDeObra = async (obraId) => {
	const query = `SELECT * FROM webImages WHERE IdArtObject = $1`;
	const { rows } = await pool.query(query, [obraId]);
	return rows[0];
};

const getImagenPorId = async (imagenId) => {
	const query = `SELECT * FROM webImages WHERE IdWebImage = $1`;
	const { rows } = await pool.query(query, [imagenId]);
	return rows[0];
};

const actualizarWebImages = async (imagenId, datosImagen) => {
	const NOMBRE_TABLA = 'webimages';
	const COLUMNA_ID = 'idwebimage';
	const { query, valores } = construirQueryActualizar(NOMBRE_TABLA, COLUMNA_ID, imagenId, datosImagen, webImagesScheme);
	const { rows } = await pool.query(query, valores);
	return rows[0];
};

export { actualizarWebImages, getImagenDeObra, getImagenPorId, postImagenWeb };
