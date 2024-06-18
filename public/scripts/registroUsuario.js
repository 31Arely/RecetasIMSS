document.getElementById('registroForm').addEventListener('submit', function(event) {   //Funcion que recopila los datos ingresados en el formulario para crear usuario
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
    xhr.open('POST', 'http://localhost:3000/api/users', true);  //Llamada POST a API para crear un nuevo usuario
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
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

