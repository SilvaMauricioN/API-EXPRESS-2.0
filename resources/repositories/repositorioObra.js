import { pool } from '../db/conexion.js';
import { artObjectsScheme } from '../scheme/artObject.js';
import { construirQueryActualizar } from './construirQuery.js';

const getObraPorId = async (obraId) => {
	const query = 'SELECT * FROM artObjects WHERE IdArtObject = $1';
	const { rows } = await pool.query(query, [obraId]);
	return rows[0];
};
// Funcion para obtener detalles de una obra especifica
const getObraDetalladaPorId = async (numeroObra) => {
	const query = `
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
                'IdPrincipalMaker', pm.IdPrincipalMaker,
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

	const data = await pool.query(query, [numeroObra]);

	if (data.rows[0] == null) {
		return null;
	}
	return data.rows;
};

const getObraPorNumeroObjeto = async (numeroObjeto) => {
	const query = 'SELECT * FROM artObjects WHERE objectNumber = $1';
	const { rows } = await pool.query(query, [numeroObjeto]);
	return rows[0];
};

const getObrasArtista = async (offset, limite, artistaId) => {
	const safeOffset = offset < 0 ? 0 : offset;
	const query = `
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
                FROM artobjects ao
                LEFT JOIN principalMakers pm ON ao.IdPrincipalMaker = pm.IdPrincipalMaker
                LEFT JOIN webImages wi ON ao.IdArtObject = wi.IdArtObject
                WHERE ao.hasImage = TRUE AND
                pm.IdPrincipalMaker = $3
                OFFSET $1
                LIMIT $2; `;

	const data = await pool.query(query, [safeOffset, limite, artistaId]);
	return data.rows;
};

const getColeccionObras = async (offset, limite) => {
	const query = `
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

	const data = await pool.query(query, [offset, limite]);
	return data.rows;
};
// Funcion para obtener el TOTAL de resultados
const getCantidadObras = async (artista = null) => {
	let query;
	let valores = [];

	if (artista) {
		query = `
			SELECT COUNT(*) 
			FROM artObjects ao
			JOIN principalMakers pm ON ao.IdPrincipalMaker = pm.IdPrincipalMaker
			WHERE ao.hasImage = TRUE
			AND pm.name = $1;
		`;
		valores = [artista];
	} else {
		query = `SELECT COUNT(*) FROM artObjects WHERE hasImage = TRUE;`;
	}
	const resultadoTotal = await pool.query(query, valores);
	return parseInt(resultadoTotal.rows[0].count);
};

// Funcion para obtener el numero de obras de un artista
const getTotalObrasArtista = async (artistaId) => {
	const query = `SELECT COUNT(*)::int AS total FROM artObjects ao
			JOIN principalMakers pm ON ao.IdPrincipalMaker = pm.IdPrincipalMaker WHERE pm.IdPrincipalMaker = $1`;
	const { rows } = await pool.query(query, [artistaId]);
	return rows[0].total;
};

const getObraPorTitulo = async (titulo, artistaId) => {
	const query = `
        SELECT 1
        FROM artObjects
        WHERE LOWER(TRIM(title)) = LOWER(TRIM($1)) AND IdPrincipalMaker = $2;
    `;
	const values = [titulo, artistaId];
	const result = await pool.query(query, values);

	return result.rows.length > 0;
};

const getObraDifNumeroObjeto = async (numeroObjeto, titulo, artistaId) => {
	const query = ` SELECT * FROM artObjects WHERE objectNumber <> $1   
      AND LOWER(title) = LOWER($2) 
      AND IdPrincipalMaker = $3`;

	const valores = [numeroObjeto, titulo, artistaId];
	const { rows } = await pool.query(query, valores);

	return rows[0] || null;
};

const postObra = async (datosObra) => {
	const query = `
    INSERT INTO artObjects (
      objectNumber, title, longTitle, IdPrincipalMaker, hasImage,
      productionPlaces, description, plaqueDescription,
      materials, techniques, physicalMedium, scLabelLine, historicalDescription
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *;
  `;

	const values = [
		datosObra.objectNumber,
		datosObra.title,
		datosObra.longTitle,
		datosObra.IdPrincipalMaker,
		datosObra.hasImage,
		datosObra.productionPlaces,
		datosObra.description,
		datosObra.plaqueDescription,
		datosObra.materials,
		datosObra.techniques,
		datosObra.physicalMedium,
		datosObra.scLabelLine,
		datosObra.historicalDescription
	];

	const { rows } = await pool.query(query, values);
	return rows[0];
};

const actualizarObra = async (numeroObjeto, datosObra) => {
	const NOMBRE_TABLA = 'artobjects';
	const COLUMNA_ID = 'objectnumber';
	const { query, valores } = construirQueryActualizar(
		NOMBRE_TABLA,
		COLUMNA_ID,
		numeroObjeto,
		datosObra,
		artObjectsScheme
	);

	const { rows } = await pool.query(query, valores);
	return rows[0];
};

const generateNumeroObjeto = async (prefijo = 'OA-N-') => {
	const resultado = await pool.query(`SELECT nextval('seq_objectNumber') AS numero_siguiente;`);

	const numeroSiguiente = resultado.rows[0].numero_siguiente;
	const numberoFormateado = numeroSiguiente.toString();
	const numberoObjeto = `${prefijo}${numberoFormateado}`;

	return numberoObjeto;
};

export {
	actualizarObra,
	generateNumeroObjeto,
	getCantidadObras,
	getColeccionObras,
	getObraDetalladaPorId,
	getObraDifNumeroObjeto,
	getObraPorId,
	getObraPorNumeroObjeto,
	getObraPorTitulo,
	getObrasArtista,
	getTotalObrasArtista,
	postObra
};
