import { pool } from '../db/conexion.js';

// Funcion para obtener detalles de una obra especifica
const getObraNumeroObjeto = async (numeroObra) => {
	const consulta = `
        SELECT            
            ao.objectNumber,
            ao.title,
            ao.longTitle,
            ao.hasImage,
            ao.productionPlaces,
            ao.description,
            ao.plaqueDescription,
            ao.materials,
            ao.techniques,
            ao.physicalMedium,
            ao.scLabelLine,
            ao.historicalDescription,

        -- Subconsulta: tipos de objeto (1:N)
        (
            SELECT json_agg(DISTINCT ot2.typeName)
            FROM artObjectsTypes aot
            JOIN objectTypes ot2 ON aot.IdObjectType = ot2.IdObjectType
            WHERE aot.IdArtObject = ao.IdArtObject
        ) AS "objectTypes",

        -- Subconsulta: título alternativo (1:1 o 1:N limitado)
        (
            SELECT json_agg(
                json_build_object(
                    'alternativeTitle', ot.alternativeTitle,
                    'titleType', ot.titleType
                )
            )
            FROM otherTitles ot
            WHERE ot.IdArtObject = ao.IdArtObject
        ) AS "otherTitles",

        -- Subconsulta: fechas de datación (1:1)
        (
            SELECT json_build_object(
                'presentingDate', d.presentingDate,
                'sortingDate', d.sortingDate,
                'period', d.period,
                'yearEarly', d.yearEarly,
                'yearLate', d.yearLate
            )
            FROM datings d
            WHERE d.IdArtObject = ao.IdArtObject
        ) AS "datings",

        -- Subconsulta: principal o primer autor (1:1)
        (
            SELECT json_build_object(
                'name', pm.name,
                'placeOfBirth', pm.placeOfBirth,
                'dateOfBirth', pm.dateOfBirth,
                'dateOfDeath', pm.dateOfDeath,
                'placeOfDeath', pm.placeOfDeath,
                'nationality', pm.nationality
            )
            FROM principalMakers pm
            WHERE pm.IdPrincipalMaker = ao.IdPrincipalMaker
        ) AS "principalOrFirstMaker",

        -- Subconsulta: imagen web (1:1)
        (
            SELECT json_build_object(
                'width', wi.width,
                'height', wi.height,
                'url', wi.url
            )
            FROM webImages wi
            WHERE wi.IdArtObject = ao.IdArtObject
        ) AS "webImage"

        FROM artObjects ao
        WHERE ao.hasImage = TRUE
        AND ao.objectNumber = $1;
    `;

	const data = await pool.query(consulta, [numeroObra]);
	return data.rows;
};

// Funcion para obtener el TOTAL de resultados
const getCantidadObras = async (artista = null) => {
	let consulta;
	let valores = [];

	if (artista) {
		consulta = `
			SELECT COUNT(*) 
			FROM artObjects ao
			JOIN principalMakers pm ON ao.IdPrincipalMaker = pm.IdPrincipalMaker
			WHERE ao.hasImage = TRUE
			AND pm.name = $1;
		`;
		valores = [artista];
	} else {
		consulta = `SELECT COUNT(*) FROM artObjects WHERE hasImage = TRUE;`;
	}
	const resultadoTotal = await pool.query(consulta, valores);
	return parseInt(resultadoTotal.rows[0].count);
};

// Funcion para obtener el TOTAL de resultados
const getTotalObrasArtista = async (idArtista) => {
	const query = `SELECT COUNT(*)::int AS total FROM artObjects ao
			JOIN principalMakers pm ON ao.IdPrincipalMaker = pm.IdPrincipalMaker WHERE pm.IdPrincipalMaker = $1`;
	const { rows } = await pool.query(query, [idArtista]);
	return rows[0].total;
};

export { getCantidadObras, getObraNumeroObjeto, getTotalObrasArtista };
