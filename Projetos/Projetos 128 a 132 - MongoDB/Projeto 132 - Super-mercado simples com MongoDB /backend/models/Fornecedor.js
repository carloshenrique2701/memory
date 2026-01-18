const mongoose = require('mongoose');

const FornecedorSchema = new mongoose.Schema({

    nome: String,
    telefone: String,
    email: { type: String, unique: true },

});

module.exports = mongoose.model('Fornecedor', FornecedorSchema);