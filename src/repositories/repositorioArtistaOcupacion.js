import { pool } from '../db/conexion.js';

//Relacionar el artista con la ocupación
const asignarOcupacionArtista = async (artistaId, ocupacionId) => {
	const query = `
    INSERT INTO makersOccupations (IdPrincipalMaker, IdOccupation)
    VALUES ($1, $2) ON CONFLICT DO NOTHING;
  `;
	const resultado = await pool.query(query, [artistaId, ocupacionId]);
	return resultado.rowCount;
};

const deleteRelacionPorArtistaId = async (artistaId) => {
	await pool.query(`DELETE FROM makersOccupations WHERE idprincipalmaker = $1`, [artistaId]);
};

const deleteRelacionPorOcupacionId = async (ocupacionId) => {
	await pool.query(`DELETE FROM makersOccupations WHERE  IdOccupation = $1`, [ocupacionId]);
};
//elimina viculo de una ocupacion y artista 1  sola
const deleteRelacionEspecifica = async (artistaId, ocupacionId) => {
	return await pool.query(`DELETE FROM makersOccupations WHERE IdPrincipalMaker = $1 AND IdOccupation = $2`, [
		artistaId,
		ocupacionId
	]);
};

// Verifica si una ocupación ya está asignada a un artista (retorna TRUE O FALSE)
const ocupacionAsignadaAArtista = async (artistaId, ocupacionId) => {
	const query = `
		SELECT * FROM makersOccupations 
		WHERE IdPrincipalMaker = $1 AND IdOccupation = $2
	`;
	const { rows } = await pool.query(query, [artistaId, ocupacionId]);
	return rows.length > 0;
};

export {
	asignarOcupacionArtista,
	deleteRelacionEspecifica,
	deleteRelacionPorArtistaId,
	deleteRelacionPorOcupacionId,
	ocupacionAsignadaAArtista
};
