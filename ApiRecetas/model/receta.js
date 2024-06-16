const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
    pacienteCURP: {
        type: String,
        required: true
    },
    medicoCURP: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cp: {
        type: String,
        required: true
    },
    medicamentos: [{
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Receta', recetaSchema);