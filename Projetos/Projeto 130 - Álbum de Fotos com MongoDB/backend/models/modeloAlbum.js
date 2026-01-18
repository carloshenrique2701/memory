const mongoose = require("mongoose");
const EsquemaFoto = new mongoose.Schema({

    caminho: { type: String, require: true },//Caminho da imagem Obrigatório
    descricao: { type: String, default: '' },//Descrição da imagem
    dataCriacao: { type: Date, default: Date.now } //Data em que foi armazenada no BD

});

const EsquemaAlbum = new mongoose.Schema({

    nome: { type: String, require: true },//Nome do alvo Obrigatório
    capa: { type: String, default: null }, //Imagem de capa
    fotos: [EsquemaFoto],//Quando é armazenado as fotos, elas são armazenadas no álbum específico
    dataCriacao: { type: Date, default: Date.now }//Data em que foi armazenada no BD

});

module.exports = mongoose.model("Album", EsquemaAlbum);//Exporta o modulo