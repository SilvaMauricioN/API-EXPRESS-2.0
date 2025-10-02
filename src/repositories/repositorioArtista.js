import { pool } from '../db/conexion.js';

const getCantidadArtistas = async () => {
	const query = `SELECT COUNT(*)::int AS total FROM principalMakers `;
	const { rows } = await pool.query(query);
	return rows[0].total;
};

const getArtistas = async (offset, limite) => {
	const safeOffset = offset < 0 ? 0 : offset;
	const consulta = `
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
                LIMIT $2;
                `;

	const data = await pool.query(consulta, [safeOffset, limite]);
	return data.rows;
};
//para verificar si existe un artista
const getArtistaPorNombre = async (nombre) => {
	const query = `SELECT * FROM principalMakers WHERE LOWER(TRIM(name)) = LOWER(TRIM($1)) LIMIT 1`;
	const { rows } = await pool.query(query, [nombre]);
	return rows[0] || null;
};

// const getArtistaPorId = async (id) => {
// 	const query = 'SELECT * FROM principalMakers WHERE idprincipalmaker = $1';
// 	const { rows } = await pool.query(query, [id]);
// 	return rows[0] || null;
// };

const getArtistaPorId = async (idArtista) => {
	const consulta = `
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
	const { rows } = await pool.query(consulta, [idArtista]);
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

const putArtista = async (id, artistaData) => {
	const { name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality } = artistaData;

	const query = `
		UPDATE principalMakers
		SET name = $1,
			placeOfBirth = $2,
			dateOfBirth = $3,
			dateOfDeath = $4,
			placeOfDeath = $5,
			nationality = $6
		WHERE IdPrincipalMaker = $7
		RETURNING *;
	`;

	const values = [name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality, id];
	const { rows } = await pool.query(query, values);
	return rows[0];
};

const deleteArtista = async (id) => {
	const consulta = 'DELETE FROM principalMakers WHERE IdPrincipalMaker = $1 RETURNING *';
	const { rows } = await pool.query(consulta, [id]);
	return rows[0] || null;
};

export {
	deleteArtista,
	getArtistaPorId,
	getArtistaPorNombre,
	getArtistas,
	getCantidadArtistas,
	postArtista,
	putArtista
};
