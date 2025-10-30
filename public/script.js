//copiar texto json
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

//Copiar al portapapeles
const copyBtn = document.getElementById('btnCopiar');

copyBtn.addEventListener('click', async () => {
	await navigator.clipboard.writeText(apiKey.textContent).then(() => {
		copyBtn.textContent = '¡Copiado!';
		setTimeout(() => (copyBtn.textContent = 'Copiar'), 2000);
	});
});

const form = document.getElementById('requestForm');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const apiKey = document.getElementById('apiKey');
const closeSuccess = document.getElementById('closeSuccess');
const closeError = document.getElementById('closeError');

// Mostrar modal
function showModal(modal) {
	modal.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal(modal) {
	modal.classList.add('hidden');
	document.body.style.overflow = 'auto';
}

// Cerrar modales
closeSuccess.addEventListener('click', () => closeModal(successModal));
closeError.addEventListener('click', () => closeModal(errorModal));

const userError = document.getElementById('usuarioError');
const dataError = document.getElementById('errorDatos');

const listError = document.getElementById('listaErrores');

//peticion api key
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const dataForm = Object.fromEntries(new FormData(form));

	try {
		const res = await fetch('/peticion/key', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dataForm)
		});

		const datos = await res.json();
		console.log('Respuesta datos:', datos);
		console.log('Respuesta API valor data:', datos.data);
		console.log('res: ', res);

		//caso exito {
		if (res.ok && datos.status === 'success') {
			apiKey.textContent = datos.data;
			showModal(successModal);
			form.reset();
			setTimeout(() => {
				closeModal(successModal);
				apiKey.textContent = '';
			}, 5000);

			return;
		}
		//caso error
		if (datos.status === 'error') {
			listError.innerHTML = '';

			if (Array.isArray(datos.detalle) && datos.detalle.length > 0) {
				let listaErrores = datos.detalle;

				listaErrores.forEach((error) => {
					const li = document.createElement('li');
					li.textContent = error;
					listError.appendChild(li);
				});
				//errorModal.style.display = 'block';
				showModal(errorModal);
				showModal(dataError);
				form.reset();
				return;
			}
			if (datos.mensaje.includes('Ya existe una solicitud con ese email')) {
				showModal(errorModal);
				showModal(userError);
				form.reset();
				return;
			}
			alert(datos.mensaje || 'Error desconocido.');
			return;
		}
		alert('Respuesta inesperada del servidor.');
	} catch (err) {
		console.error('Error al conectar con el servidor 22:', err);
		alert('Error al conectar con el servidor.');
	}
});
