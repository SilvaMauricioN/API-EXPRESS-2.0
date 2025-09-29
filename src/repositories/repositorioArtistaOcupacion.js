import { pool } from '../db/conexion.js';

//Relacionar el artista con la ocupación
const asignarOcupacionArtista = async (idArtista, idOcupacion) => {
	const query = `
    INSERT INTO makersOccupations (IdPrincipalMaker, IdOccupation)
    VALUES ($1, $2) ON CONFLICT DO NOTHING;
  `;
	const { rows } = await pool.query(query, [idArtista, idOcupacion]);
	console.log(rows[0]);
	return rows[0];
};

const eliminarRelacionOcupacionArt = async (idArtista) => {
	await pool.query(`DELETE FROM makersOccupations WHERE "idprincipalmaker" = $1`, [idArtista]);
};
//elimina viculo de una ocupacion y artista 1  sola
const deleteOcupacionDeArtista = async (idArtista, idOcupacion) => {
	return await pool.query(`DELETE FROM makersOccupations WHERE IdPrincipalMaker = $1 AND IdOccupation = $2`, [
		idArtista,
		idOcupacion
	]);
};

// Verifica si una ocupación ya está asignada a un artista (retorna TRUE O FALSE)
const ocupacionAsignadaAArtista = async (idArtista, idOcupacion) => {
	const query = `
		SELECT * FROM makersOccupations 
		WHERE IdPrincipalMaker = $1 AND IdOccupation = $2
	`;
	const { rows } = await pool.query(query, [idArtista, idOcupacion]);
	return rows.length > 0;
};

export { asignarOcupacionArtista, eliminarRelacionOcupacionArt };
