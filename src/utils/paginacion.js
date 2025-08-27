const calcularPaginacion = (total, pagina, limite) => {
	const totalPaginas = total > 0 ? Math.ceil(total / limite) : 0;
	return {
		resultadoTotal: total,
		paginaActual: total === 0 ? 1 : Math.max(1, parseInt(pagina)),
		limite: parseInt(limite),
		paginasTotales: totalPaginas
	};
};

export { calcularPaginacion };
