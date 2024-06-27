const API_URL = 'http://localhost:4000';
async function buscarRecetas() {   //Funcion de busqueda de recetas por curp en la API
    const curp = document.getElementById('curp').value.trim();
    if (!curp) {
        alert('Por favor, ingrese un CURP.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/prescriptions/${curp}`);   //Llamada asincrona a la API
        const recetas = await response.json();

        if (response.status === 404) {  //Escenario recetas no encontradas 
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('patientNameGroup').style.display = 'none';
            document.getElementById('tablaRecetas').getElementsByTagName('tbody')[0].innerHTML = '';
            return;
        }

        document.getElementById('errorMessage').style.display = 'none';
        document.getElementById('patientNameGroup').style.display = 'block';

        const patientNameInput = document.getElementById('patientName');
        const primerReceta = recetas[0];
        patientNameInput.value = `${primerReceta.pacienteCURP}`;

        const tablaRecetas = document.getElementById('tablaRecetas').getElementsByTagName('tbody')[0];
        tablaRecetas.innerHTML = ''; //Limpiar tabla antes de añadir nuevas filas

        recetas.forEach(receta => {  //Llenado de elementos de la tabla con las recetas 
            const newRow = tablaRecetas.insertRow();

            const cellId = newRow.insertCell(0);
            cellId.textContent = receta._id;

            const cellFecha = newRow.insertCell(1);
            cellFecha.textContent = new Date(receta.date).toLocaleDateString();

            const cellEstado = newRow.insertCell(2);
            cellEstado.textContent = receta.status;

            const cellMedicamentos = newRow.insertCell(3);
            cellMedicamentos.textContent = receta.medicamentos.map(med => `${med.nombre}: ${med.cantidad} cajas`).join(', ');
        });
    } catch (error) {
        console.error('Error al obtener recetas:', error);
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function logout() {   //Funcion para cerrar sesion 
    localStorage.removeItem('adminCURP');
    window.location.href = 'login.html';
}
