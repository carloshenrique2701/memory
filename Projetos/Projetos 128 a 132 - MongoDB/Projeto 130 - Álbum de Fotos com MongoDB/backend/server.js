const mongoose = require("mongoose");
const expressao = require("express");
const cors = require("cors");
const caminho = require("path");
const multer = require("multer");

const Album = require("./models/modeloAlbum");//Importe do modelo

const app = expressao();

app.use(cors());

app.use(expressao.json());//Permite o envio e recebimento de dados em JSON

//Permite o envio de dados codificados em URLs(podemos manupular objetos aninhados dentro dos dados recebidos,
    //  ex: formularios complexos)
app.use(expressao.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://dbUser:123@main.zkvonga.mongodb.net/albumFotos")
    .then(() => console.log('Conectado com sucesso no DataBase'))
    .catch((err) => console.error("Erro ao conectar com o DataBase: ",err));

const armazenamento = multer.diskStorage({

    destination: (req, arquivo, cb) => {//Onde os arquivos enviados são armazenadaos
        cb(null, "uploads");
    },

    filename: (req, arquivo, cb) => {//Define o nome do arquivo a ser salvo no servidor
        
        const sufixoUnico = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, sufixoUnico + '-' + arquivo.originalname);

    }

});

const upload = multer({ storage: armazenamento });//Instância do modelo de armazenamento

//Configura o express para servir arquivos estaticos na pasta "uploads"
app.use('/uploads', expressao.static(caminho.join(__dirname, 'uploads')));

app.post("/api/albuns", upload.single("capa"), async (req, res) => {

    try {

        const { nome } = req.body;

        if (!nome.trim()) return res.status(400).json({ mensagem: "O nome do álbum é obrigatório! "});

        let capa = req.file ? req.file.filename : null; //Há algum file, se sim nome do arquivo, se não Null

        const novoAlbum = new Album({ nome, capa});//Novo registro no BD

        await novoAlbum.save();

        return res.status(201).json({ mensagem: "Álbum criado!", album: novoAlbum });
        
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao criar álbum." });
    }

});

app.get("/api/albuns", async (req, res) => {

    try {
        
        const albuns = await Album.find().sort({ dataCriacao: - 1 });//busca os albuns e organiza em decrescente

        return res.json(albuns)

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar álbum." });
    }

});

app.get("/api/albuns/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const album = await Album.findById(id);

        if (!album) return res.status(404).json({ mensagem: "Álbum não encontrado." });

        res.json(album);
        
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar álbum." });
    }

});


app.post("/api/albuns/:id/fotos", upload.single("imagem"), async (req, res) => {

    try {
        
        const { id } = req.params;

        const { descricao } = req.body;

        const album = await Album.findById(id);

        if (!album) return res.status(404).json({ mensagem: "Álbum não encontrado." });
        if (!req.file) return res.status(404).json({ mensagem: "Imagem é obrigatória." }); 

        album.fotos.push({

            caminho: req.file.filename,

            descricao: descricao || ''

        });

        await album.save();

        return res.status(201).json({ mensagem: "Foto adicionadao", album });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao adicionar foto ao álbum." });
    }

});

app.delete("/api/albuns/:id", async (req, res) => {

    try {
        
        const { id } = req.params;

        await Album.findByIdAndDelete(id);

        return res.status(201).json({ mensagem: "Álbum excluído." })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao excluir álbum." });
    }

});

app.delete("/api/albuns/:id/fotos/:fotoId", async (req, res) => {

    try {
        
        const { id, fotoId } = req.params;

        const album = await Album.findById(id);

        if (!album) return res.status(404).json({ mensagem: "Álbum não encontrado." });

        album.fotos = album.fotos.filter((foto) => foto._id.toString() !== fotoId);

        await album.save();

        return res.status(201).json({ mensagem: "Foto excluída.", album });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao excluir foto." });
    }

});

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});