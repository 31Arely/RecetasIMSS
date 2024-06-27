const API_URL = 'http://localhost:4000';

async function validarCURP() {   //Valida la curp de un paciente
    const curp = document.getElementById('curp').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch(`${API_URL}/api/validateCurp`, {  //Llamada asincrona a la API 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ curp })
        });

        const result = await response.json();

        if (response.status === 200) {  //Construccion de seccion de datos del paciente
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

function addMedicamento() {  //Funcion para agregar opciones de un nuevo medicamento en la receta 
    medicineCount++;
    const listaMedicamentos = document.getElementById('listaMedicamentos');

    const newMedicine = document.createElement('div');
    newMedicine.className = 'form-group';
    newMedicine.innerHTML = `
        <label for="medicamento${medicineCount}">Medicamento ${medicineCount}</label>
        <select id="medicamento${medicineCount}" name="medicamento${medicineCount}" required>
            <option value="">Selecciona un medicamento</option>
                <option value="01-PA Paracetamol">Paracetamol</option>
                <option value="02-IB Ibuprofeno">Ibuprofeno</option>
                <option value="03-AMO Amoxicilina">Amoxicilina</option>
                <option value="04-MTF Metformina">Metformina</option>
                <option value="05-LOR Loratadina">Loratadina</option>
                <option value="06-NAP Naproxeno">Naproxeno</option>
                <option value="07-KET Ketorolaco">Ketorolaco</option>
                <option value="08-DLO Diclofenaco">Diclofenaco</option>
                <option value="09-AMP Ampicilina">Ampicilina</option>
                <option value="10-DXC Dicloxacilina">Dicloxacilina</option>
                <option value="11-AMX Ambroxol">Ambroxol</option>
                <option value="12-MFD Metilfenidato">Metilfenidato</option>
                <option value="13-DZP Diazepam">Diazepam</option>
                <option value="14-LST Losartan">Losartán</option>
                <option value="15-AMT Amantadina">Amantadina</option>
            <!-- Opciones de medicamentos -->
        </select>
        <input type="number" id="quantity${medicineCount}" name="quantity${medicineCount}" placeholder="Cantidad" min="1" required>
    `;

    listaMedicamentos.appendChild(newMedicine);
    
}

document.getElementById('recetaForm').addEventListener('submit', async function(event) {  //Recopilacion de datos ingresados por el medico
    event.preventDefault();  //Previene el comportamiento por default de un formulario con submit

    const curp = document.getElementById('curp').value;
    const address = document.getElementById('address').value;
    const colonia = document.getElementById('colonia').value;
    const ciudad = document.getElementById('ciudad').value;
    const estado = document.getElementById('estado').value;
    const cp = document.getElementById('cp').value;
    const status = document.getElementById('status').value;

    const medicines = [];
    for (let i = 1; i <= medicineCount; i++) {
        const medicineElement = document.getElementById(`medicamento${i}`);
        const quantityElement = document.getElementById(`quantity${i}`);
        if (medicineElement && quantityElement) {
            const medicineName = medicineElement.value;
            const quantity = quantityElement.value;
            if(medicineName && quantity){
            medicines.push({ nombre: medicineName, cantidad: parseInt(quantity) });
            }
        }
    }

    console.log(medicineCount); 
    const doctorCURP = localStorage.getItem('doctorCURP');
    const data = {
        pacienteCURP: curp,
        medicoCURP: doctorCURP,
        direccion: address,
        colonia,
        ciudad,
        estado,
        cp,
        medicamentos: medicines,
        status,
        date: new Date()
    };
    console.log(data);
    try {
        const response = await fetch(`${API_URL}/api/prescriptions`, {  //Llamada a API para crear una receta con los datos recopilados 
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
    localStorage.removeItem('doctorCURP');
    window.location.href = 'login.html';
    alert('Sesión cerrada');
}