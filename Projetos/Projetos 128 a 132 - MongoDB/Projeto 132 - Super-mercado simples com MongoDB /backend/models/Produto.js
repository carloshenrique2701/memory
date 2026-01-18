const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({

    codigo: { type: String, unique: true },
    nome: String,
    descricao: String,
    preco: Number,
    quantidadeEstoque: Number,
    fornecedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornecedor' }

});

/*
    O Mongoose utiliza um registro interno de modelos. Quando você define ref: 
'Fornecedor', o Mongoose não procura por uma variável no seu código, mas sim 
por um modelo que tenha sido registrado globalmente com esse exato nome através 
do comando mongoose.model('Fornecedor', FornecedorSchema). 

    Embora não precise importar o arquivo no Schema, você deve garantir que o 
modelo referenciado seja carregado pelo menos uma vez na sua aplicação antes de
tentar usar funções como .populate(). 
    A boa prática: No seu arquivo principal do servidor (ex: index.js ou 
server.js), você deve importar todos os seus modelos. Isso "registra" cada 
um deles no Mongoose. 

    Existem duas formas de fazer a referência, e a sua escolha (string) é 
geralmente a melhor para evitar dependências circulares:

    °Por String (Sua abordagem): ref: 'Fornecedor'
        Vantagem: Não precisa de import, evita erros se o Produto referencia o 
        Fornecedor e o Fornecedor referencia o Produto.
    
    °Por Objeto: ref: Fornecedor (onde Fornecedor é a variável do modelo importado)
        Desvantagem: Exige o import e pode causar erros de "circular dependency".
    */

module.exports = mongoose.model('Produto', ProdutoSchema);