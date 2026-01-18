//Importa o servidor Express, que é utilizado para criar e gerenciar o servidor web de forma simples e eficiente
const express = require('express');

//Importa o Mongoose, uma biblioteca que permite iteragir com o banco de dados MongoDB usando JS.
const mongoose = require('mongoose');

//Importa o CORS (Cross-Orign Resource Sharing), que permite que a API seja acessada po outros domínios diferentes
    //do servidor original.
const cors = require('cors');

//Cria uma instância da classe da biblioteca Express
const app = express();

//Configura o express para interpretar requisições JSON, assim, elepassa a compreender e manipular os dados
    //  enviados nesse formato
app.use(express.json());

//Habilita o uso do CORS, permitindo que a API aceiterequisições de diferentes origens (frontend ou mobile). Sem
    //essa configuração o navegador pode bloquear requisições de domínios diferentes por questões de segurança.
app.use(cors());

//usuarios é o nome do db (vai em data explorer e da um connect)
const url = "mongodb+srv://dbUser:123@main.zkvonga.mongodb.net/usuarios";

//Conecta com o banco de dados MongoDB local.
//O primeiro parâmetro é o endereço do banco de dados.
// 27017 é a porta padrão do DB
// 'cadastro_usuarios' é nome do BD
try {
    
    mongoose.connect(url, {serverSelectionTimeoutMS: 5000})
    .then(() => console.log('Conectado com sucesso ao MongoDB Atlas'))
    .catch(err => console.error('Erro na conexão: ', err));

} catch (e) {

    console.log(`Erro ao conectar com o BD: ${e}`);
    
}

//Define o esquema (modelo) do usuário no MongoDB.
//O esquema define como os dados serão armazenados no BD, ou seja, quais campos de informações um usuário terá.
const EsquemaUsuario = new mongoose.Schema({

    nome: String,
    email: String,
    idade: Number

});

//Cria um modelo de usuário baseado no esquema definido anteriormente.
//'Usuario' será o nome da coleção no BD (o Mongoose transforma automaticamente para 'usuarios' no plural).
//Esse modelo permite que iterajamos com o BD de forma mais fácil, como salvar, buscar e excluir usuários.
const Usuario = mongoose.model('Usuario', EsquemaUsuario)

//Cria uma rota HTTP do tipo POST para cadastrar um novo usuário. Quando um cliente (exemplo: frontend ou Postman)
    //enviar uma requisição POST para a URL '/usuarios', esta função será executada para processar os dados 
    // recebidos e salvar um novo usuário no BD.
app.post('/usuarios', async (req, res) => {
    
    //Extrai os valores enviados no corpo da requisição (JSON enviado pelo cliente) e armazena em variáveis.
    //No arquivo script.js: 'body: JSON.stringify({nome: nomeUsuario, email: emailUsuario, idade: idadeUsuario})'
    const {nome, email, idade} = req.body;

    //Cria um novo objeto da classe Usuario que foi feita usando o EsquemaUsuario e passa os dados para o construtor.
    const novoUsuario = new Usuario({nome, email, idade});

    //Salva o usuário no BD com o Mongoose e o código espera o MongoDB terminar esse processo para continuar.
    await novoUsuario.save();

    //Retorna uma resposta em formato JSON informando que o usuário fo cadastrado com sucesso. 
    res.json({mensagem: 'Usuário cadastrado com sucesso!'});

});

//Cria uma rota HTTP do tipo GET para listar todos os usuários cadastrados no BD.
app.get('/usuarios', async (req, res) => {

    //Usa o modelo Usuario para buscar todos os registros dentro da coleção 'usuarios' no MongoDB.
    //A função find(), sem parametros, retorna todos os registros encontrados. 
    const usuarios = await Usuario.find();

    res.json(usuarios);//Retorna em formato JSON

});

//Cria uma rota HTTP do tipo PUT para atualizar o um dado já cadastrado no BD.
//A URL "/usuarios/:id" significa que o ID do usuário será passadocomo um parametro na URL.
//Exemplo: PUT http://localhost:3000/usuarios/65a13123jbdsbhabj323423
app.put('/usuarios/:id', async (req, res) => {

    try {
        
        //Obtém Id apartir da url. O "/:id" no URL significa que qualqur valor passado nessa url será armazenado aqui
        const {id} = req.params;
        const { nome, email, idade } = req.body;

        //Usa o modelo para localizar o usuário pelo id e atualizar seus dados.
        await Usuario.findByIdAndUpdate(id, {nome, email, idade});

        res.json({mensagem: 'Usuário atualizado com sucesso!'});

    } catch (error) {
        
        res.status(500).json({mensagem: 'Erro ao atualizar usuário: ', error});

    }

});

//Cria uma rota HTTP do tipo DELETE para exclui o registro correspondente no BD
app.delete('/usuarios/:id', async (req, res) => {

    try {
        
        const {id} = req.params
        
        await Usuario.findByIdAndDelete(id);

        res.json({mensagem: 'Usuário excluido com sucesso!'});

    } catch (error) {

        res.status(500).json({mensagem: 'Erro ao deletar usuário: ', error});
        
    }

});

//Roda para pegar os usuários ja com os filtros aplicados.
//Cria uma rota HTTP do tipo GET para buscar usuários com base em um termo de pesquisa (nome ou email).
//O método GET é utilizado para buscar informações no Bd sem modificar nada.
//A URL '/usuarios/filtro/:termo' significa que o cliente enviará um termo de busca como parte da URL.
//Exemplo: GET http://localhost:3000/usuarios/filtro/carlos
app.get('/usuarios/filtro/:termo', async (req, res) => {

    try {

        const {termo} = req.params;//Obtem parametro da URL
        const usuaiosFiltrados = await Usuario.find({//Procura pelos usuários que detem o termo

            //O operador '$or' significa que a busca retornará usuários que atendam a pelo monos um do critérios
            $or: [
                // O operador $regex no MongoDB busca documentos onde um campo de texto corresponde a um padrão 
                    // de expressão regular, permitindo buscas flexíveis como "começa com", "contém" ou padrões 
                    // complexos, usando sintaxe compatível com PCRE (Perl Compatible Regular Expressions) para 
                    // localizar strings que se ajustam a um formato específico, sendo útil para encontrar 
                    // substrings ou correspondências parciais.
                {nome: {$regex: termo, $options: 'i'}},
                //Quando usado com $regex, o campo options (ou, de forma abreviada, $options) especifica modificadores
                    //  de expressão regular (flags) para alterar como a correspondência de padrão é realizada. 
                //As opções comuns incluem:
                    // i (insensível a maiúsculas e minúsculas): Permite que a correspondência ignore a 
                        // capitalização.
                    // m (multilinha): Altera o comportamento de ^ e $ para corresponder ao início e fim de linhas,
                        //  em vez de apenas o início e fim da string completa.
                    // x (comentários): Permite o uso de espaços em branco e comentários estendidos dentro da 
                        // expressão regular.
                    // s (ponto corresponde a nova linha): Permite que o meta-caractere de ponto (.) corresponda a 
                        // caracteres de nova linha. 
                {email: {$regex: termo, $options: 'i'}}
                //Não confunda $regex com reject. regex significa REGular EXpressions e reject é rejeitar. Para que 
                    //seja feito um reject, precisamos combinar (nome: {$regex: termo, $not}).
            ]

        });
        
        res.json(usuaiosFiltrados);

    } catch (error) {
        
        res.status(500).json({mensagem: 'Erro ao capturar dados dos usuários: ', error});

    }

});

//Inicia o servidor na porta 3000.
//A função listen() faz com que o servidor fique ativo e pronto para aceitar requsições dos clientes(Postman, 
    // navegadores, etc.). 
app.listen(3000, () => {

    console.log('Servidor rodando na porta 3000');

});
