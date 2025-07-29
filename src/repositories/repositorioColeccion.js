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

const getColeccionObrasArtista = async (offset, limite, artista) => {
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
                WHERE ao.hasImage = TRUE AND
                pm.name = $3
                OFFSET $1
                LIMIT $2; `;

	const data = await pool.query(consulta, [offset, limite, artista]);
	return data.rows;
};

export { getColeccionObras, getColeccionObrasArtista };
