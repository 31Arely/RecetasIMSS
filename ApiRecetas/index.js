//Declaracion de constantes necesarias para el API
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./model/user');
const Receta = require('./model/receta');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;  //Puerto de API

app.use(express.static(path.join(__dirname, 'public')));  //Configuracion de rutas publicas 
app.use(cors())  //Configuracion de CORS
app.use(express.json());  //Traduccion a JSON de bodys

app.get('/', (req, res) => {   //Hola mundo de API (prueba de funcionamiento) 
    res.send('Hola mundo');
});

app.post('/api/users', (req, res) => {  //URI para POST de usuarios (crear usuarios)
    console.log(req.body, "body");
    let datos = req.body;

    const newUser = new User(datos);
    newUser.save((err, resultado) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Error al crear el usuario.');
        }
        console.log(resultado, "Resultado");   //
        console.log('Usuario creado');
        res.status(201).json({ message: 'Usuario creado' });
    });
});

app.post('/api/login', async (req, res) => {  //URI para iniciar sesion 
    const { curp, password } = req.body;
    try {
        const user = await User.findOne({ curp });
        if (!user) {
            return res.status(401).json({ message: 'CURP o contraseña incorrectos' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'CURP o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', curp: user.curp, userType: user.userType });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

app.post('/api/prescriptions', async (req, res) => {  //URI POST crear recetas
    const { pacienteCURP, medicoCURP, direccion, colonia, ciudad, estado, cp, medicamentos, status } = req.body;
    console.log('Datos recibidos:', req.body);
    try {
        const newReceta = new Receta({  //
            pacienteCURP,
            medicoCURP,
            direccion,
            colonia,
            ciudad,
            estado,
            cp,
            medicamentos,
            status
        });

        await newReceta.save();
        res.status(201).json({ message: 'Receta creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la receta' });
    }
});

app.post('/api/validateCurp', async (req, res) => {  //URI para validar que el usuario existe 
    const { curp } = req.body;                       //Se usa en diferentes pantallas (login, medico, paciente) 
    try {
        const user = await User.findOne({ curp });
        if (!user) {
            return res.status(404).json({ message: 'CURP no encontrado' });
        }
        res.status(200).json({ message: 'CURP válido', name: `${user.name} ${user.fLastName} ${user.lLastName}` });
    } catch (error) {
        console.error('Error al validar CURP:', error);
        res.status(500).json({ message: 'Error al validar CURP' });
    }
});

app.get('/api/prescriptions/:curp', async (req, res) => {  //URI  para obtener las recetas basadas en la curp de un paciente.
    const pacienteCURP = req.params.curp;

    try {
        const recetas = await Receta.find({ pacienteCURP });
        if (recetas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron recetas para este paciente' });  //la busqueda puede hacerse por la curp de un 
        }                                                                                              //medico pero sino tine recetas como paciente muestra recetas no encontradas
        res.status(200).json(recetas);
    } catch (error) {
        console.error('Error al obtener recetas:', error);
        res.status(500).json({ message: 'Error al obtener recetas' });
    }
});

mongoose.connect('mongodb://localhost:27017/RecetasIMSS', {   //Conexion a base de datos
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
    } else {
        console.log('Conectado a la base de datos');
        app.listen(port, () => {
            console.log(`La API está escuchando en http://localhost:${port}`);
        });
    }
});

