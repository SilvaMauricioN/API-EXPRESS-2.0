const calcularPaginacion = (total, pagina, limite) => {
	const totalPaginas = Math.ceil(total / limite);
	return {
		resultadoTotal: total,
		paginaActual: pagina,
		limite: limite,
		paginasTotales: totalPaginas
	};
};

export { calcularPaginacion };
