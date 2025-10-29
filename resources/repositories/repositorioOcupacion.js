import { pool } from '../db/conexion.js';

//Obtener la tabla ocupacion (id,nombreOcupacion)
const getOcupaciones = async (offset, limite) => {
	const safeOffset = offset < 0 ? 0 : offset;
	const query = `SELECT * FROM occupations OFFSET $1 LIMIT $2`;
	const { rows } = await pool.query(query, [safeOffset, limite]);
	return rows;
};

const getOcupacionPorId = async (ocupacionId) => {
	const query = 'SELECT * FROM occupations WHERE IdOccupation = $1';
	const { rows } = await pool.query(query, [ocupacionId]);
	return rows[0];
};
//buscar coincidencias en una lista .SELECT idOccupation, name FROM occupations WHERE idOccupation = 10 OR idOccupation = 25 OR idOccupation = 42
const getOcupacionesPorIds = async (ids = []) => {
	if (ids.length === 0) return [];

	const { rows } = await pool.query(
		`SELECT idOccupation, name 
     FROM occupations 
     WHERE idOccupation = ANY($1)`,
		[ids]
	);
	return rows;
};
const getOcupacionPorNombre = async (nombreOcupacion) => {
	//`SELECT * FROM occupations WHERE name = $1`
	const query = `SELECT * FROM occupations WHERE LOWER(TRIM(name)) = LOWER(TRIM($1)) LIMIT 1`;
	const { rows } = await pool.query(query, [nombreOcupacion]);
	return rows[0];
};
//Puede ir en repositorio artista Obtener ocupaciones asignadas del artista (IDs)
const getOcupacionesDeArtistaId = async (artistaId) => {
	const query = `
  SELECT o.IdOccupation, o.name 
		FROM occupations o
		JOIN makersOccupations mo ON o.IdOccupation = mo.IdOccupation
		WHERE mo.IdPrincipalMaker = $1;
  `;
	const { rows } = await pool.query(query, [artistaId]);
	return rows;
};

const getCantidadOcupaciones = async () => {
	const query = `SELECT COUNT(*)::int AS total FROM occupations `;
	const { rows } = await pool.query(query);
	return rows[0].total;
};

const verificarOcupacionAlActualizar = async (nombreOcupacion, ocupacionId) => {
	const query = 'SELECT 1 FROM occupations WHERE name = $1 AND idoccupation <> $2';
	const { rowCount } = await pool.query(query, [nombreOcupacion, ocupacionId]);
	return rowCount > 0;
};
// crear una nueva ocupacion
const postOcupacion = async (name) => {
	const query = `INSERT INTO occupations (name) VALUES ($1) RETURNING *`;
	const { rows } = await pool.query(query, [name]);
	return rows[0];
};
//Actualizar ocupacion
const putOcupacion = async (nombre, ocupacionId) => {
	const query = 'UPDATE occupations SET name = $1 WHERE IdOccupation = $2 RETURNING *';
	const values = [nombre, ocupacionId];
	const { rows } = await pool.query(query, values);
	return rows[0];
};

const deleteOcupacion = async (ocupacionId) => {
	const query = 'DELETE FROM occupations WHERE IdOccupation = $1 RETURNING *';
	const { rows } = await pool.query(query, [ocupacionId]);
	return rows[0] || null;
};

export {
	deleteOcupacion,
	getCantidadOcupaciones,
	getOcupaciones,
	getOcupacionesDeArtistaId,
	getOcupacionesPorIds,
	getOcupacionPorId,
	getOcupacionPorNombre,
	postOcupacion,
	putOcupacion,
	verificarOcupacionAlActualizar
};
