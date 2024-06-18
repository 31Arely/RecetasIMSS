document.getElementById('loginForm').addEventListener('submit', async function(event) {  //Funcion que recupéra los datos de curp y password para hacer login 
    event.preventDefault();
    
    const curp = document.getElementById('curp').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    const response = await fetch('http://localhost:3000/api/login', {  //Llamada asincrona a la API para iniciar sesion  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ curp, password })
    });

    const result = await response.json();

    if (response.status === 200) {  //Manejo de login para diferentes tipos de usuarios 
        if (result.userType === 'paciente') {
            localStorage.setItem('pacienteCURP', result.curp);
            window.location.href = 'paciente.html';
        } else if (result.userType === 'medico') {
            localStorage.setItem('doctorCURP', result.curp);
            window.location.href = 'medico.html';
        } else if (result.userType ==='administrador'){
            localStorage.setItem('adminCURP', result.curp);
            window.location.href = 'administrador.html';
        }
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = result.message;
    }
});
