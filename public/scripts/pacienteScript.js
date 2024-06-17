document.addEventListener('DOMContentLoaded', function() {
    const pacienteCURP = localStorage.getItem('pacienteCURP');
    if (!pacienteCURP) {
        alert('No se encontró CURP del paciente. Inicie sesión nuevamente.');
        window.location.href = 'login.html';
        return;
    }

    fetch(`http://localhost:3000/api/prescriptions/${pacienteCURP}`)// es un get 
        .then(response => response.json())
        .then(recetas => {
            const tablaRecetas = document.getElementById('tablaRecetas').getElementsByTagName('tbody')[0];
            if (recetas.length === 0) {
                document.getElementById('errorMessage').style.display = 'block';
                return;
            }

            recetas.forEach(receta => {
                const newRow = tablaRecetas.insertRow();

                const cellId = newRow.insertCell(0);
                cellId.textContent = receta._id;

                const cellFecha = newRow.insertCell(1);
                cellFecha.textContent = new Date(receta.date).toLocaleDateString();

                const cellEstado = newRow.insertCell(2);
                cellEstado.textContent = receta.status;

                const cellAcciones = newRow.insertCell(3);
                const viewButton = document.createElement('button');
                viewButton.textContent = 'Ver Detalles';
                viewButton.onclick = () => {
                    alert(`Medicamentos:\n${receta.medicamentos.map(med => `${med.nombre}: ${med.cantidad}`).join('\n')}`);
                };
                cellAcciones.appendChild(viewButton);
            });
        })
        .catch(error => {
            console.error('Error al obtener recetas:', error);
            document.getElementById('errorMessage').style.display = 'block';
        });
});

function logout() {
    localStorage.removeItem('pacienteCURP');
    window.location.href = 'login.html';
}
