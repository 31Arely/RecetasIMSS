
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
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
        name: String,
        quantity: Number
    }]
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
