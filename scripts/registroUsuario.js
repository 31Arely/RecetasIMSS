document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        curp: document.getElementById('curp').value,
        password: document.getElementById('password').value,
        name: document.getElementById('nombre').value,
        fLastName: document.getElementById('apellido1').value,
        lLastName: document.getElementById('apellido2').value,
        userType: document.getElementById('tipo_usuario').value
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            alert(xhr.status)
            console.log(xhr.status)
            if (xhr.status === 201) {
                alert('Usuario creado')
                window.location.href = 'login.html'; // Redirige al usuario al login después del registro
            } else {
                console.error('Error al crear el usuario:', xhr.status, xhr.statusText);
                alert('Error al crear el usuario.');
            }
        }
    };
    xhr.send(JSON.stringify(formData));
});

/*document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        curp: document.getElementById('curp').value,
        password: document.getElementById('password').value,
        name: document.getElementById('nombre').value,
        fLastName: document.getElementById('apellido1').value,
        lLastName: document.getElementById('apellido2').value,
        userType: document.getElementById('tipo_usuario').value
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/login'; // Redirige al usuario al login después del registro
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => {
        console.error('Error al crear el usuario:', error);
        alert('Error al crear el usuario: ' + error.message);
    });
});*/