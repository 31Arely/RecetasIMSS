const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./model/user');
const Receta = require('./model/receta');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.post('/api/users', (req, res) => {
    console.log(req.body, "body");
    let datos = req.body;

    const newUser = new User(datos);
    newUser.save((err, resultado) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Error al crear el usuario.');
        }
        console.log(resultado, "Resultado");
        console.log('Usuario creado');
        res.status(201).json({ message: 'Usuario creado' });
        //res.redirect('../public/login');
    });
});

app.post('/api/login', async (req, res) => {
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

        res.status(200).json({ message: 'Inicio de sesión exitoso', userType: user.userType });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

app.post('/api/prescriptions', async (req, res) => {
    const { pacienteCURP, medicoCURP, direccion, colonia, ciudad, estado, cp, medicamentos, status } = req.body;
    
    try {
        const newReceta = new Receta({
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

app.post('/api/validateCurp', async (req, res) => {
    const { curp } = req.body;
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


mongoose.connect('mongodb://localhost:27017/RecetasIMSS', {
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


