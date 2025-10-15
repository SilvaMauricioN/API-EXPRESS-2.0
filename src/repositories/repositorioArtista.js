import { pool } from '../db/conexion.js';
import { principalMakerScheme } from '../scheme/principalMaker.js';
import { construirQueryActualizar } from './construirQuery.js';

const getCantidadArtistas = async () => {
	const query = `SELECT COUNT(*)::int AS total FROM principalMakers `;
	const { rows } = await pool.query(query);
	return rows[0].total;
};

const getArtistas = async (offset, limite) => {
	const safeOffset = offset < 0 ? 0 : offset;
	const query = `
            SELECT
								pm.idprincipalmaker,
                pm.name,
                pm.placeofBirth,
                pm.dateofBirth,
                pm.dateofDeath,
                pm.placeofDeath,
                nationality, 
                (
                    SELECT json_agg(DISTINCT o.name)
                    FROM makersOccupations mo 
                    JOIN occupations o ON mo.IdOccupation = o.IdOccupation
                    WHERE mo.IdPrincipalMaker = pm.IdPrincipalMaker
                ) AS "occupations"                
                FROM principalMakers pm
								OFFSET $1
                LIMIT $2;`;

	const data = await pool.query(query, [safeOffset, limite]);
	return data.rows;
};
//para verificar si existe un artista
const getArtistaPorNombre = async (nombre) => {
	const query = `SELECT * FROM principalMakers WHERE LOWER(TRIM(name)) = LOWER(TRIM($1)) LIMIT 1`;
	const { rows } = await pool.query(query, [nombre]);
	return rows[0] || null;
};
const getArtistaId = async (artistaId) => {
	const resultado = await pool.query('SELECT 1 FROM principalMakers WHERE IdPrincipalMaker = $1', [artistaId]);
	return resultado.rowCount > 0;
};

const getArtistaPorId = async (artistaId) => {
	const query = `
							SELECT
									pm.idPrincipalMaker,
									pm.name,
									pm.placeOfBirth,
									pm.dateOfBirth,
									pm.dateOfDeath,
									pm.placeOfDeath,
									pm.nationality,
									json_agg(
											json_build_object(
													'idOccupation', o.idOccupation,
													'name', o.name
											)
									) AS occupations
								FROM
										principalMakers pm
								LEFT JOIN
										makersOccupations mo ON pm.idPrincipalMaker = mo.idPrincipalMaker
								LEFT JOIN
										occupations o ON mo.idOccupation = o.idOccupation
								WHERE
										pm.idPrincipalMaker = $1
								GROUP BY
										pm.idPrincipalMaker, pm.name, pm.placeOfBirth, pm.dateOfBirth, pm.dateOfDeath, pm.placeOfDeath, pm.nationality;`;
	const { rows } = await pool.query(query, [artistaId]);
	return rows[0] || null;
};

const postArtista = async (artistaData) => {
	const { name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality } = artistaData;
	const query = `
            INSERT INTO principalMakers (name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
	const values = [name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality];
	const { rows } = await pool.query(query, values);
	return rows[0];
};

const actualizarArtista = async (artistaId, artistaData) => {
	// 	const { name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality } = artistaData;
	//
	// 	const query = `
	// 		UPDATE principalMakers SET
	// 			name = $1,
	// 			placeOfBirth = $2,
	// 			dateOfBirth = $3,
	// 			dateOfDeath = $4,
	// 			placeOfDeath = $5,
	// 			nationality = $6
	// 		WHERE IdPrincipalMaker = $7
	// 		RETURNING *;
	// 	`;
	const NOMBRE_TABLA = 'principalmakers';
	const COLUMNA_ID = 'idprincipalmaker';
	const { query, valores } = construirQueryActualizar(
		NOMBRE_TABLA,
		COLUMNA_ID,
		artistaId,
		artistaData,
		principalMakerScheme
	);
	// 	const values = [name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality, artistaId];
	const { rows } = await pool.query(query, valores);
	return rows[0];
};

const deleteArtista = async (artistaId) => {
	const query = 'DELETE FROM principalMakers WHERE IdPrincipalMaker = $1 RETURNING *';
	const { rows } = await pool.query(query, [artistaId]);
	return rows[0] || null;
};

export {
	actualizarArtista,
	deleteArtista,
	getArtistaId,
	getArtistaPorId,
	getArtistaPorNombre,
	getArtistas,
	getCantidadArtistas,
	postArtista
};
