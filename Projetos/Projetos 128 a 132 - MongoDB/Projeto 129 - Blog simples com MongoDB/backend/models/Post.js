const mongoose = require("mongoose");

//Cria um novo esquema Mongoose para definir a estrutura dos documentos dentro da coleção 'posts' no BD.
//O esquema funciona como um molde para garantir que os documentosarmazenados sigam um formato predefinido.
const PostSchema = new mongoose.Schema(

    {
        text: {//Aramazena o conteudo de texto dopost
            type:String,
            require: [true, "O campo de texto é obrigatório."]//Define que este campo é obrigatório + mensagem de erro
        },
        image: {
            type: String,
            default:null
        }
    },
    {
        //Cria de forma automática os campos de 'creatAt' e 'updatedAt' no BD.
        //Armazenam a data e hora que a postagem foi criada e a data e hora da última modificação.
        //Muito mais últil do que usar o new Date();
        timestamps: true
    }

);

//Exporta o modelo permitindo que a aplicação interaja com a coleção de 'posts' no BD, fornecendo métodos para 
    //criar, ler, atualizar e deletar as postagens.
module.exports = mongoose.model("Post", PostSchema);