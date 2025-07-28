const calcularPaginacion = (total, pagina, limite) => {
	const totalPaginas = total > 0 ? Math.ceil(total / limite) : 0;
	return {
		resultadoTotal: total,
		paginaActual: total === 0 ? 1 : pagina,
		limite: limite,
		paginasTotales: totalPaginas
	};
};

export { calcularPaginacion };
