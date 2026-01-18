const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({

    dataHoraInicio: {
        type: Date,
        required: true
    },

    dataHoraFim: {
        type: Date,
        default: null
    },

    vaga: {
        type: Number,
        required: true
    },

    placaVeiculo: {
        type: String,
        required: true
    },

    modeloVeiculo: {
        type: String
    },

    corVeiculo: {
        type: String
    },

    proprietarioVeiculo: {
        type: String
    },

    valorPago: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ['reservada', 'finalizada'],
        required: 'reservada'
    }

});

module.exports = mongoose.model('Reserva', reservaSchema);