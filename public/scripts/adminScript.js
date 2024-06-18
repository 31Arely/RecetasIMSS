async function buscarRecetas() {
    const curp = document.getElementById('curp').value.trim();
    if (!curp) {
        alert('Por favor, ingrese un CURP.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/prescriptions/${curp}`);
        const recetas = await response.json();

        if (response.status === 404) {
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
        tablaRecetas.innerHTML = ''; // Limpiar tabla antes de añadir nuevas filas

        recetas.forEach(receta => {
            const newRow = tablaRecetas.insertRow();

            const cellId = newRow.insertCell(0);
            cellId.textContent = receta._id;

            const cellFecha = newRow.insertCell(1);
            cellFecha.textContent = new Date(receta.date).toLocaleDateString();

            const cellEstado = newRow.insertCell(2);
            cellEstado.textContent = receta.status;

            const cellMedicamentos = newRow.insertCell(3);
            cellMedicamentos.textContent = receta.medicamentos.map(med => `${med.nombre}: ${med.cantidad}`).join(', ');
        });
    } catch (error) {
        console.error('Error al obtener recetas:', error);
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function logout() {
    localStorage.removeItem('adminCURP');
    window.location.href = 'login.html';
}
