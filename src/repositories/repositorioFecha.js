import { pool } from '../db/conexion.js';
import { datingScheme } from '../scheme/dating.js';
import { construirQueryActualizar } from './construirQuery.js';

const getFechaDeObraPorId = async (obraId) => {
	const query = `SELECT * FROM datings WHERE IdArtObject = $1`;
	const { rows } = await pool.query(query, [obraId]);
	return rows[0];
};

const verificarObraYFecha = async (obraId) => {
	const query = `SELECT a.IdArtObject, d.IdDating
      FROM artObjects a
      LEFT JOIN datings d 
        ON a.IdArtObject = d.IdArtObject
      WHERE a.IdArtObject = $1;`;

	const { rows } = await pool.query(query, [obraId]);
	return rows[0];
};

const getFechaPorId = async (fechaId) => {
	const query = `SELECT * FROM datings WHERE IdDating = $1`;
	const { rows } = await pool.query(query, [fechaId]);
	return rows[0];
};

const postDating = async (datosFecha) => {
	const query = `INSERT INTO datings(IdArtObject,presentingDate,sortingDate,period,yearEarly,yearLate) VALUES ($1,$2,$3,$4,$5,$6) RETURNING*;`;
	const values = [
		datosFecha.IdArtObject,
		datosFecha.presentingDate,
		datosFecha.sortingDate,
		datosFecha.period,
		datosFecha.yearEarly,
		datosFecha.yearLate
	];

	const { rows } = await pool.query(query, values);
	return rows[0];
};

const actualizarDating = async (fechaId, datosFecha) => {
	const NOMBRE_TABLA = 'datings';
	const COLUMNA_ID = 'iddating';
	const { query, valores } = construirQueryActualizar(NOMBRE_TABLA, COLUMNA_ID, fechaId, datosFecha, datingScheme);
	const { rows } = await pool.query(query, valores);
	return rows[0];
};

export { actualizarDating, getFechaDeObraPorId, getFechaPorId, postDating, verificarObraYFecha };
