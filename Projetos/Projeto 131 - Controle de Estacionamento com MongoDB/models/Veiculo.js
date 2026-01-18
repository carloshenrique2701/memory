const mongoose = require('mongoose');

const veiculoSchema = new mongoose.Schema({

    placa: {
        type: String,
        require: true,
        unuque: true
    },

    modelo: {
        type: String,
        require: true
    },

    cor: {
        type: String,
        require: true
    },

    proprietario: {
        type: String,
        require: true
    },

    historico: [
        {
            entrada: Date,
            saida: Date,

            pagamentoEfetuado: {
                type: Boolean,
                default: false
            },

            valorPago: {
                type: Number,
                default: 0
            }
        }
    ]

});

module.exports = mongoose.model('Veiculo', veiculoSchema);