import { pool } from '../db/conexion.js';

const postImagenWeb = async (datosImagen) => {
	const query = `INSERT INTO webImages(IdArtObject,width,height,url) VALUES ($1,$2,$3,$4) RETURNING*;`;
	const values = [datosImagen.IdArtObject, datosImagen.width, datosImagen.height, datosImagen.url];

	const { rows } = await pool.query(query, values);
	return rows[0];
};

const getImagenDeObra = async (obraId) => {
	const query = `SELECT * FROM webImages WHERE IdArtObject = $1`;
	const { rows } = await pool.query(query, [obraId]);
	return rows[0];
};

export { getImagenDeObra, postImagenWeb };
