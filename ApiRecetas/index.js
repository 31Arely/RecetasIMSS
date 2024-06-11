const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./model/user");

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.post('/api/users', (req, res) => {
    console.log(req.body);
    let datos = req.body;
    usuarios.create(datos)
    .then(resultado => {
        console.log(resultado);
        console.log('usuario creado');
        res.redirect('/login');
    })
    .catch(err => {console.log('Error: ' + err)});
    res.send('Usuario creado.');
})

app.listen(port, () => {
    console.log(`La api esta escuchando en http://localhost:${port}`);
});

mongoose.connect('mongodb://localhost:27017/RecetasIMSS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
    console.log('Conectado a la base de datos');
});