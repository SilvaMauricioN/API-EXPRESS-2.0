const calcularPaginacion = (total, pagina, limite) => {
	const totalPaginas = total > 0 ? Math.ceil(total / limite) : 0;
	return {
		resultadoTotal: total,
		paginaActual: total === 0 ? 1 : Math.max(1, parseInt(pagina)),
		limite: parseInt(limite),
		paginasTotales: totalPaginas
	};
};

const getPaginacion = async (getCantidadFun, getDatosPaginadosFun, page = 1, limit = 20) => {
	const cantidad = await getCantidadFun();
	const hayResultado = cantidad > 0;

	if (!hayResultado) {
		const paginacion = calcularPaginacion(cantidad, page, limit);
		return { hayResultado, datos: [], paginacion };
	}

	const offset = (page - 1) * limit;
	const datos = await getDatosPaginadosFun(offset, limit);
	const paginacion = calcularPaginacion(cantidad, page, limit);

	return { hayResultado, datos, paginacion };
};

export { calcularPaginacion, getPaginacion };
