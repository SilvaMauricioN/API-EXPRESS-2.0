function copiarTexto(id, btn) {
	const texto = document.getElementById(id).innerText;
	navigator.clipboard
		.writeText(texto)
		.then(() => {
			let urlToCopy = texto.replace(/^http:\/\/localhost:8080/, '');
			navigator.clipboard.writeText(urlToCopy || texto).then(() => {
				btn.textContent = '¡Copiado!';
				setTimeout(() => (btn.textContent = 'Copiar'), 2000);
			});
		})
		.catch((err) => {
			console.error('Error al copiar: ', err);
			btn.textContent = 'Error';
			setTimeout(() => (btn.textContent = 'Copiar'), 2000);
		});
}

document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.getElementById('menu-toggle');
	const menuLista = document.getElementById('menu-lista');

	if (menuToggle && menuLista) {
		menuToggle.addEventListener('click', () => {
			menuToggle.classList.toggle('abierto');
			menuLista.classList.toggle('visible');
		});
	}
});
