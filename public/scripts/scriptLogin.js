document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const curp = document.getElementById('curp').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ curp, password })
    });

    const result = await response.json();

    if (response.status === 200) {
        if (result.userType === 'paciente') {
            localStorage.setItem('pacienteCURP', result.curp);
            window.location.href = 'paciente.html';
        } else if (result.userType === 'medico') {
            localStorage.setItem('doctorCURP', result.curp);
            window.location.href = 'medico.html';
        }
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = result.message;
    }
});
