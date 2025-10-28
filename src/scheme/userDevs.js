export const userDevsScheme = {
	developerName: {
		required: true,
		type: String,
		minLength: 3,
		maxLength: 50,
		nullable: false,
		pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 _-]+$/
	},
	developerEmail: {
		required: true,
		type: String,
		minLength: 6,
		maxLength: 120,
		nullable: false,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	}
};
