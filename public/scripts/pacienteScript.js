const curp = localStorage.getItem('pacienteCURP'); // Assuming you have stored the patient's CURP in local storage

const tablaRecetas = document.getElementById('tablaRecetas');
const errorMessage = document.getElementById('errorMessage');

async function fetchPrescriptions() {
    try {
        const response = await fetch(`http://localhost:3000/api/prescriptions/paciente/${curp}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (response.status === 200) {
        if (data.length === 0) {
            errorMessage.textContent = 'No se encontraron recetas';
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        tablaRecetas.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        ${data.map(receta => `
            <tr>
                <td>${receta._id}</td>
                <td>${new Date(receta.date).toLocaleDateString()}</td>
                <td>${receta.status}</td>
                <td>
                    <button onclick="verRecetaDetails('${receta._id}')">Ver Detalles</button>
                </td>
            </tr>
            `).join('')}
            </tbody>
        `;
        } else {
            errorMessage.textContent = 'Error al cargar recetas';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al cargar recetas:', error);
        errorMessage.textContent = 'Error al cargar recetas';
        errorMessage.style.display = 'block';
    }
}

function verRecetaDetails(recetaId) {
  // Implement logic to display recipe details in a modal or new page
    console.log('Ver detalles de la receta:', recetaId);
  // You can fetch the recipe details using the recetaId and display them in a modal or new page
}

//fetchPrescriptions(); // Call the function to fetch prescriptions on page load
