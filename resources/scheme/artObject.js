export const artObjectsScheme = {
	title: { required: true, type: String, minLength: 4, nullable: false },
	longTitle: { required: true, type: String, nullable: true },
	IdPrincipalMaker: { required: true, type: Number, nullable: false },
	hasImage: { required: true, type: Boolean, nullable: false },
	productionPlaces: { required: true, type: Array, itemsType: String, nullable: true },
	description: { required: true, type: String, nullable: false },
	plaqueDescription: { required: true, type: String, nullable: true },
	materials: { required: true, type: Array, itemsType: String, nullable: true },
	techniques: { required: true, type: Array, itemsType: String, nullable: true },
	physicalMedium: { required: true, type: String, nullable: true },
	scLabelLine: { required: true, type: String, nullable: true },
	historicalDescription: { required: true, type: String, nullable: true }
};
