import { pool } from '../db/conexion.js';

const getTodosLosArtistas = async () => {
	const consulta = `
            SELECT
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
                
                FROM principalMakers pm;
                `;

	const data = await pool.query(consulta);
	return data.rows;
};

const getArtistaPorNombre = async (nombre) => {
	const query = 'SELECT 1 FROM principalMakers WHERE name = $1 LIMIT 1';
	const { rowCount } = await pool.query(query, [nombre]);
	return rowCount > 0;
};

const createArtista = async (artistaData) => {
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

const updateArtista = async (id, artistaData) => {
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

export { createArtista, getArtistaPorNombre, getTodosLosArtistas, updateArtista };
