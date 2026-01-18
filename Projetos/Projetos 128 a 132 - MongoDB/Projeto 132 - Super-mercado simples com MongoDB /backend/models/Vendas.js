const mongoose = require('mongoose');

const ItensVendaSchema = new mongoose.Schema({

    produtoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },//Chave estrangeira de um produto
    nomeProduto: String,
    quantidade: Number,
    precoUnitario: Number,
    subtotal: Number,//Valor totalreferente a esse item em uma venda
    fornecedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornecedor' },
    nomeFornecedor: String

});

const VendasSchema = new mongoose.Schema({

    //Data e hora em q a venda foi registrada. Se não informada, armazena automaticamente data ehora atuais 
    data: { type: Date, default: Date.now },
    itens: [ItensVendaSchema],//Lista de produtos dessa venda específica
    total: Number,
    clienteCpf: { type: String, default: '' }

});

module.exports = mongoose.model('Vendas', VendasSchema);
