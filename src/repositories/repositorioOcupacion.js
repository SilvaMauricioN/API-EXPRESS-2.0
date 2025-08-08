import { pool } from '../db/conexion.js';

//Obtener la tabla ocupacion (id,nombreOcupacion)
const getOcupaciones = async () => {
	const query = `SELECT * FROM occupations`;
	const { rows } = await pool.query(query);
	return rows;
};

const getOcupacionPorId = async (id) => {
	const query = 'SELECT * FROM occupations WHERE IdOccupation = $1';
	const { rows } = await pool.query(query, [id]);
	return rows[0];
};
const getOcupacionPorNombre = async (nombreOcupacion) => {
	const query = `SELECT * FROM occupations WHERE name = $1`;
	const { rows } = await pool.query(query, [nombreOcupacion]);
	return rows[0];
};
//Puede ir en repositorio artista Obtener ocupaciones asignadas del artista (IDs)
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

const verificarOcupacionAlActualizar = async (id, nombreOcupacion) => {
	const query = 'SELECT 1 FROM occupations WHERE name = $1 AND idoccupation <> $2';
	const { rowCount } = await pool.query(query, [nombreOcupacion, id]);
	return rowCount > 0;
};
// crear una nueva ocupacion
const postOcupacion = async (name) => {
	const query = `INSERT INTO occupations (name) VALUES ($1) RETURNING *`;
	const { rows } = await pool.query(query, [name]);
	return rows[0];
};
//Actualizar ocupacion
const putOcupacion = async (id, nombre) => {
	const query = 'UPDATE occupations SET name = $1 WHERE IdOccupation = $2 RETURNING *';
	const values = [nombre, id];
	const { rows } = await pool.query(query, values);
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
const putOcupacionArtista = async (idArtista, idOcupacion) => {
	const query = `
    INSERT INTO makersOccupations (IdPrincipalMaker, IdOccupation)
    VALUES ($1, $2) ON CONFLICT DO NOTHING;
  `;
	const { rows } = await pool.query(query, [idArtista, idOcupacion]);
	console.log(rows[0]);
	return rows[0];
};

const deleteOcupacion = async (idOcupacion) => {
	try {
		// Eliminar relaciones en la tabla intermedia
		await pool.query('DELETE FROM makersOccupations WHERE IdOccupation = $1', [idOcupacion]);
		// Eliminar la ocupación
		const resultado = await pool.query('DELETE FROM occupations WHERE IdOccupation = $1', [idOcupacion]);
		if (resultado.rowCount === 0) {
			throw new Error('Ocupación no encontrada');
		}
	} catch (error) {
		throw error;
	}
};

const deleteOcupacionDeArtista = async (idArtista, idOcupacion) => {
	return await pool.query(`DELETE FROM makersOccupations WHERE IdPrincipalMaker = $1 AND IdOccupation = $2`, [
		idArtista,
		idOcupacion
	]);
};

export {
	deleteOcupacion,
	deleteOcupacionDeArtista,
	getOcupaciones,
	getOcupacionesDeArtistaId,
	getOcupacionPorId,
	getOcupacionPorNombre,
	ocupacionAsignadaAArtista,
	postOcupacion,
	putOcupacion,
	putOcupacionArtista,
	verificarOcupacionAlActualizar
};
