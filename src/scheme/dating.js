export const datingScheme = {
	IdArtObject: { required: true, type: Number, nullable: false },
	presentingDate: { required: true, type: String, nullable: true },
	sortingDate: { required: true, type: Number, nullable: true },
	period: { required: true, type: Number, nullable: true },
	yearEarly: { required: true, type: Number, nullable: true },
	yearLate: { required: true, type: Number, nullable: true }
};
