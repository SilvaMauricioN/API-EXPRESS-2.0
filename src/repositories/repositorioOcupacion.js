import { pool } from '../db/conexion.js';

//Obtener la tabla ocupacion (id,nombreOcupacion)
const getOcupaciones = async () => {
	const query = `SELECT * FROM occupations`;
	const { rows } = await pool.query(query);
	return rows;
};

const getOcupacionPorNombre = async (nombreOcupacion) => {
	const query = `SELECT * FROM occupations WHERE name = $1`;
	const { rows } = await pool.query(query, [nombreOcupacion]);
	return rows[0];
};
// Obtener ocupaciones asignadas del artista (IDs)
const getOcupacionesDeArtistaId = async (idArtista) => {
	const query = `
  SELECT o.IdOccupation, o.name 
		FROM occupations o
		JOIN makersOccupations mo ON o.IdOccupation = mo.IdOccupation
		WHERE mo.IdPrincipalMaker = $1;
  `;
	const { rows } = await pool.query(query, [idArtista]);
	return rows;
};

// crear una nueva ocupacion
const createOcupacion = async (name) => {
	const query = `INSERT INTO occupations (name) VALUES ($1) RETURNING *`;
	const { rows } = await pool.query(query, [name]);
	return rows[0];
};

// Verifica si una ocupación ya está asignada a un artista (retorna TRUE O FALSE)
const ocupacionAsignadaAArtista = async (idArtista, idOcupacion) => {
	const query = `
		SELECT * FROM makersOccupations 
		WHERE IdPrincipalMaker = $1 AND IdOccupation = $2
	`;
	const { rows } = await pool.query(query, [idArtista, idOcupacion]);
	return rows.length > 0;
};
//Relacionar el artista con la ocupación
const vincularOcupacion = async (idArtista, idOcupacion) => {
	const query = `
    INSERT INTO makersOccupations (IdPrincipalMaker, IdOccupation)
    VALUES ($1, $2) ON CONFLICT DO NOTHING;
  `;
	const { rows } = await pool.query(query, [idArtista, idOcupacion]);
	console.log(rows[0]);

	return rows[0];
};

const eliminarOcupaciondeArtista = async (idArtista, idOcupacion) => {
	return await pool.query(`DELETE FROM makersOccupations WHERE IdPrincipalMaker = $1 AND IdOccupation = $2`, [
		idArtista,
		idOcupacion
	]);
};

export {
	createOcupacion,
	eliminarOcupaciondeArtista,
	getOcupaciones,
	getOcupacionesDeArtistaId,
	getOcupacionPorNombre,
	ocupacionAsignadaAArtista,
	vincularOcupacion
};
