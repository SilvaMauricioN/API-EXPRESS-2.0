import { pool } from '../db/conexion.js';

const getColeccionObras = async (offset, limite) => {
	const consulta = `
            SELECT 
                ao.objectNumber,
                ao.title,
                ao.hasImage,
                pm.name AS "principalOrFirstMaker",
                ao.longTitle,
                ao.hasImage,                   
                json_build_object(
                    'width', wi.width,
                    'height', wi.height,
                    'url', wi.url
                ) AS "webImage"          
                FROM artObjects ao
                LEFT JOIN principalMakers pm ON ao.IdPrincipalMaker = pm.IdPrincipalMaker
                LEFT JOIN webImages wi ON ao.IdArtObject = wi.IdArtObject
                WHERE ao.hasImage = TRUE
                OFFSET $1
                LIMIT $2; `;

	const data = await pool.query(consulta, [offset, limite]);
	return data.rows;
};

// Funcion para obtener el TOTAL de resultados
const getCantidadObras = async () => {
	const cantidadObras = `SELECT COUNT(*) FROM artObjects WHERE hasImage = TRUE;`;
	const resultadoTotal = await pool.query(cantidadObras);
	return parseInt(resultadoTotal.rows[0].count);
};

export { getCantidadObras, getColeccionObras };
