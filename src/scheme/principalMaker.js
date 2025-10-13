const artistsSchema = {
	name: { required: true, type: 'string', minLength: 2 },
	placeOfBirth: { required: true, type: 'string' },
	dateOfBirth: { type: 'date' },
	dateOfDeath: { type: 'date' },
	placeOfDeath: { required: true, type: 'string' },
	nationality: { required: true, type: 'string' }
};

export { artistsSchema };
