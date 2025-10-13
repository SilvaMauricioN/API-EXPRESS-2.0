export const artObjectsSchema = {
	title: { required: true, type: 'string', minLength: 4 },
	longtitle: { type: 'string' },
	idprincipalmaker: { required: true, type: 'number' },
	hasimage: { type: 'boolean' },
	productionplaces: { type: 'array' },
	description: { type: 'string' },
	plaquedescription: { type: 'string' },
	materials: { type: 'array' },
	techniques: { type: 'array' },
	physicalmedium: { type: 'string' },
	scLabelline: { type: 'string' },
	historicaldescription: { type: 'string' }
};
