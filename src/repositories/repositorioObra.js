import { pool } from '../db/conexion.js';

const getObraNumeroObjeto = async (numeroObra) => {
	const consulta = `
        SELECT 
            ao.*,
            json_build_object(
                'name', pm.name,
                'placeOfBirth', pm.placeOfBirth,
                'dateOfBirth', pm.dateOfBirth,
                'dateOfDeath', pm.dateOfDeath,
                'placeOfDeath', pm.placeOfDeath,
                'nationality', pm.nationality
            ) AS "principalOrFirstMaker",
            json_build_object(
                'width', wi.width,
                'height', wi.height,
                'url', wi.url
            ) AS "webImage"
        FROM artObjects ao
        LEFT JOIN principalMakers pm ON ao.IdPrincipalMaker = pm.IdPrincipalMaker
        LEFT JOIN webImages wi ON ao.IdArtObject = wi.IdArtObject
        WHERE ao.hasImage = TRUE AND ao.objectNumber = $1;
    `;

	const data = await pool.query(consulta, [numeroObra]);
	return data.rows;
};

export { getObraNumeroObjeto };
