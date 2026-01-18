//Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");//Trabalha com caminho de arquivos e diretórios

//Assim como 'cors' é um middleware, e é usado para manipulação de 'multipart/form-data', principalmente usado
    //para o upload de arquivos.
const multer = require("multer");

const app = express();//Instância

app.use(cors());//Permite que a API acieite solicitações de diferentes origens
app.use(express.json());//Analisa e converte o corpo das solicitações entrantes como JSON para objetos do JS

//Adiciona um middleware que analisa corpos de solicitações com payloads codificados em URL.
//O 'extended: true' especifica que o parser deve usar a biblioteca "qs" que permite aninhar objetos, oferecendo
    //mais capacidades do que quando 'false', que acaba usando a biblioteca "querystring".
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://dbUser:123@main.zkvonga.mongodb.net/blog_simples")
    .then(() => console.log('Conectado com sucesso ao MongoDB Atlas'))
    .catch(err => console.error('Erro na conexão: ', err));
  
//Importa o esquema em Post.js 
const Post = require('./models/Post');

//Confira o armazenamento de arquivos no disco utilizando o "multer".
//O objeto "multer.diskStorage" permite configurar onde e como os arquivos devem ser armazenados no servidor.
const storage = multer.diskStorage({
    //Determina o diretório onde os arquivos devem ser salvos.
    destination: function (req, file, cb) {
        //"callback" é usado para especificar o destino dos arquivos.
        //O primeiro parâmetro é um possível erro (null se não houver erro), e o segundo é o caminho do diretório
        cb(null, "uploads");
    },

    //Determina o nome do arquivo dentro do diretório de destino.
    //Também é chamada sempre que um arquivo é recebido.
    filename: function (req, file, cb) {
        //Gera um sufixo único no arquifo para evitar asobreposição de nomes.
        // Data atual - numero aleatório entre 0 e 1bi
        //1e9 é conotação para 1 x 10^9 = 1bi
        //Math.round => arredonda para o inteiro mais próximo.
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)

        //Primeiro parâmetro define um possível erro, o segundo o m=nome do arquivo.
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
});

//Instâcia com a configuração especificada acima. Será usada em rotas que recebem arquivos
const upload = multer({ storage });

app.post("/api/posts", upload.single("image"), async (req, res) => {
    
    try {

        console.log("Recebendo post... Infos: ", req.body, req.file);

        const { text } = req.body;//Extrai a propriedade 'text' do corpo da solicitação, assumindo que ela é obrigatória
        if (!text) return res.status(400).json({message: "Texto é obrigatório."});

        //Se existir um arquivo e ele foi analisado pelo Multer, usa o nome do arquivo; caso contrario, define 
            //como null para o caminho do arquivo
        let imagePath = req.file ? req.file.filename : null;

        const newPost = new Post({ text, image: imagePath });//Instancia um modelo "Post"

        //Salva opost no banco de dados de forma assíncrona
        await newPost.save();

        console.log("Post salvo: ", newPost);

        return res.status(201).json({message: "Erro ao criar post."});

    } catch (error){
        console.log('Erro ao criar post: ', error);
        return res.status(500).json({message: "Erro ao criar post.", post: newPost});
    }

});

app.get("/api/posts", async (req, res) => {

    try {

        //Busca todas as postagens no banco de dados e elas são ordenadas pela data de criação com o mais
            //  recente primeiro(-1 indica a ordem decrescente)
        const posts = await Post.find().sort({createdAt: - 1});

        return res.json(posts);//Retorna como uma json
        
    } catch (error) {
        console.log('Erro ao procurar pelos posts: ', error);
        return res.status(500).json({message: "Erro ao buscar pelos posts. ", post: newPost});
    }

});

//Configura um diretório estático para servir arquivos.
//Nesse caso, confiigura a pasta 'uploads' para ser acessível publicamente.
//'express.static' serve os arquivos de forma estática.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.delete("/api/posts/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await Post.findByIdAndDelete(id);

        return res.json({ message: "Post deletado com sucesso!" });
        
    } catch (error) {
        console.log('Erro ao deletar post: ', error);
        return res.status(500).json({message: "Erro ao deletar post. ", post: newPost});
    }

});

//Primeiramente, essa constante busca o valor da variável de ambiente 'PORT' ou, se não estiver definida,usa 3000
    //como padrão.
const PORT = process.env.PORT || 3000;

//O método listen inicia o servidor http do express e fica aguardando por conexões
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

