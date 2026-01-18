const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://dbUser:123@main.zkvonga.mongodb.net/supermercado';

mongoose.set('strictQuery',false);

mongoose.connect(mongoURI)
    .then(() => console.log('Conectado com sucesso ao Banco de dados'))
    .catch((erro) => console.error("Erro ao conectar ao MongoDB Atlas", erro));

module.exports = mongoose;
