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

export { getTodosLosArtistas };
