const API_URL = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', function() {  //Funcion que carga el contenido de la pagina al renderizar 
    const pacienteCURP = localStorage.getItem('pacienteCURP');
    if (!pacienteCURP) {
        alert('No se encontró CURP del paciente. Inicie sesión nuevamente.');
        window.location.href = 'login.html';
        return;
    }

    fetch(`${API_URL}/api/prescriptions/${pacienteCURP}`)  //Llamada a la API para obtener las recetas del paciente actual mediante su curp  
        .then(response => response.json())
        .then(recetas => {
            const tablaRecetas = document.getElementById('tablaRecetas').getElementsByTagName('tbody')[0];
            if (recetas.length === 0) {
                document.getElementById('errorMessage').style.display = 'block';
                return;
            }

            recetas.forEach(receta => {  //Se agregan las recetas y sus detalles a la tabla
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
                viewButton.onclick = () => {  //Se crea un boton para visuallizar los detalles de cada receta
                    alert(`Medicamentos:\n${receta.medicamentos.map(med => `${med.nombre}: ${med.cantidad} cajas`).join('\n')}`);
                };
                cellAcciones.appendChild(viewButton);
            });
        })
        .catch(error => {
            console.error('Error al obtener recetas:', error);
            document.getElementById('errorMessage').style.display = 'block';
        });
});

function logout() {  //Funcion para cerrar sesion 
    localStorage.removeItem('pacienteCURP');
    window.location.href = 'login.html';
}
