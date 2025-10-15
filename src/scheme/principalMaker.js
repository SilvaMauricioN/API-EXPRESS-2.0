export const principalMakerScheme = {
	name: { required: true, type: String, minLength: 2, nullable: false },
	placeOfBirth: { required: true, type: String, nullable: false },
	dateOfBirth: { required: true, type: Date, nullable: false },
	dateOfDeath: { required: true, type: Date, nullable: true },
	placeOfDeath: { required: true, type: String, nullable: true },
	nationality: { required: true, type: String, nullable: false },
	occupations: { required: true, type: Array, itemsType: Number, nullable: true }
};
