import { pool } from '../db/conexion.js';
import { otherTitleScheme } from '../scheme/otherTitle.js';
import { construirQueryActualizar } from './construirQuery.js';

const getTituloDuplicado = async (obraId, tituloAdic) => {
	const query = `SELECT IdOtherTitle
      FROM otherTitles
      WHERE IdArtObject = $1 AND LOWER(TRIM(alternativeTitle)) = LOWER(TRIM($2))`;
	const { rows } = await pool.query(query, [obraId, tituloAdic]);
	return rows[0];
};

const postOtherTitle = async (datosTituloAdic) => {
	const query = `INSERT INTO otherTitles (IdArtObject,alternativeTitle,titleType) VALUES ($1,$2,$3) RETURNING*;`;
	const values = [datosTituloAdic.IdArtObject, datosTituloAdic.alternativeTitle, datosTituloAdic.titleType];

	const { rows } = await pool.query(query, values);
	return rows[0];
};

const getTituloAltPorId = async (tituloAdicId) => {
	const { rows } = await pool.query('SELECT * FROM otherTitles WHERE IdOtherTitle = $1', [tituloAdicId]);
	return rows[0];
};

const actualizarOtherTitle = async (tituloAdicId, datosTituloAdic) => {
	const NOMBRE_TABLA = 'othertitles';
	const COLUMNA_ID = 'idothertitle';
	const { query, valores } = construirQueryActualizar(
		NOMBRE_TABLA,
		COLUMNA_ID,
		tituloAdicId,
		datosTituloAdic,
		otherTitleScheme
	);

	const { rows } = await pool.query(query, valores);
	return rows[0];
};

export { actualizarOtherTitle, getTituloAltPorId, getTituloDuplicado, postOtherTitle };
