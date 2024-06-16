async function validarCURP() {
    const curp = document.getElementById('curp').value;
    const errorMessage = document.getElementById('errorMessage');

    

    try {
        const response = await fetch('http://localhost:3000/api/validateCurp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ curp })
        });

        const result = await response.json();

        if (response.status === 200) {
            document.getElementById('patientName').value = result.name;
            document.getElementById('patientNameGroup').style.display = 'block';
            document.getElementById('addressSection').style.display = 'block';
            document.getElementById('seccionMedicinas').style.display = 'block';
            document.getElementById('submitBtn').style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            errorMessage.textContent = result.message;
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Error al validar CURP';
        errorMessage.style.display = 'block';
    }
}

let medicineCount = 1;

function addMedicamento() {
    medicineCount++;
    const listaMedicamentos = document.getElementById('listaMedicamentos');

    const newMedicine = document.createElement('div');
    newMedicine.className = 'form-group';
    newMedicine.innerHTML = `
        <label for="medicine${medicineCount}">Medicamento ${medicineCount}</label>
        <select id="medicine${medicineCount}" name="medicine${medicineCount}" required>
            <option value="">Selecciona un medicamento</option>
                <option value="01-PA">Paracetamol</option>
                <option value="02-IB">Ibuprofeno</option>
                <option value="03-AMO">Amoxicilina</option>
                <option value="04-MTF">Metformina</option>
                <option value="05-LOR">Loratadina</option>
                <option value="06-NAP">Naproxeno</option>
                <option value="07-KET">Ketorolaco</option>
                <option value="08-DLO">Diclofenaco</option>
                <option value="09-AMP">Ampicilina</option>
                <option value="10-DXC">Dicloxacilina</option>
                <option value="11-AMX">Ambroxol</option>
                <option value="12-MFD">Metilfenidato</option>
                <option value="13-DZP">Diazepam</option>
                <option value="14-LST">Losartán</option>
                <option value="15-AMT">Amantadina</option>
            <!-- Opciones de medicamentos -->
        </select>
        <input type="number" id="quantity${medicineCount}" name="quantity${medicineCount}" placeholder="Cantidad" min="1" required>
    `;

    listaMedicamentos.appendChild(newMedicine);
    
}

document.getElementById('recetaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const curp = document.getElementById('curp').value;
    const address = document.getElementById('address').value;
    const colonia = document.getElementById('colonia').value;
    const ciudad = document.getElementById('ciudad').value;
    const estado = document.getElementById('estado').value;
    const cp = document.getElementById('cp').value;

    const medicines = [];
    for (let i = 1; i <= medicineCount; i++) {
        const medicineName = document.getElementById(`medicine${i}`).value;
        const quantity = document.getElementById(`quantity${i}`).value;
        medicines.push({ name: medicineName, quantity: parseInt(quantity) });
    }

    const doctorCURP = 'CURP_DEL_DOCTOR'; // Debes reemplazar esto con la CURP del doctor logueado

    const data = {
        patientCURP: curp,
        doctorCURP,
        address,
        colonia,
        ciudad,
        estado,
        cp,
        medicines
    };

    try {
        const response = await fetch('http://localhost:3000/api/prescriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.status === 201) {
            alert('Receta creada exitosamente');
            window.location.reload();
        } else {
            document.getElementById('errorMessage').textContent = result.message;
            document.getElementById('errorMessage').style.display = 'block';
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = 'Error al crear la receta';
        document.getElementById('errorMessage').style.display = 'block';
    }
});

function logout() {
    // Implementa la lógica de cierre de sesión si es necesario
    alert('Sesión cerrada');
}