const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // Para parsear JSON

require('./config/dataBase');

const Usuario = require ('./models/Usuario');
const Fornecedor = require ('./models/Fornecedor');
const Venda = require ('./models/Vendas');
const Cliente = require ('./models/Cliente');
const Produto = require ('./models/Produto');

/**************************************************RELATÓRIO**************************************************/
app.get('/relatorio/vendas', async (req, res) => {
    try {
        let { dataInicial, dataFinal, fornecedorNome, produtoNome, cpfCliente } = req.query;
        
        // CORREÇÃO 1: Datas com lógica correta
        if (!dataInicial || !dataFinal) {
            const hoje = new Date();
            const seteDiasAtras = new Date();
            
            seteDiasAtras.setDate(hoje.getDate() - 7);
            
            // Data inicial deve ser a MAIS ANTIGA
            dataInicial = seteDiasAtras.toISOString().split('T')[0];
            // Data final deve ser a MAIS RECENTE
            dataFinal = hoje.toISOString().split('T')[0];
        }

        // Validação adicional: garantir que dataInicial <= dataFinal
        if (new Date(dataInicial) > new Date(dataFinal)) {
            return res.status(400).json({
                message: 'Data inicial não pode ser maior que data final'
            });
        }

        const filtro = {
            data: {
                $gte: new Date(`${dataInicial}T00:00:00.000Z`),
                $lte: new Date(`${dataFinal}T23:59:59.999Z`)
            }
        };

        if (cpfCliente) {
            filtro.clienteCpf = cpfCliente.trim();
        }

        // CORREÇÃO 2: Abordagem diferente para filtrar itens
        // Primeiro busca as vendas, depois filtra os itens
        let vendas = await Venda.find(filtro);

        // Filtra os itens dentro de cada venda
        const vendasFiltradas = vendas.map(venda => {
            const itensFiltrados = venda.itens.filter(item => {
                const matchFornecedor = !fornecedorNome || 
                    item.nomeFornecedor?.match(new RegExp(fornecedorNome, 'i'));
                
                const matchProduto = !produtoNome || 
                    item.nomeProduto?.match(new RegExp(produtoNome, 'i'));
                
                return matchFornecedor && matchProduto;
            });

            // Retorna uma cópia da venda apenas se houver itens que atendem ao filtro
            if (itensFiltrados.length === 0) {
                return null;
            }

            // Usa toObject() ao invés de _doc (mais seguro)
            const vendaObj = venda.toObject ? venda.toObject() : venda;
            return {
                ...vendaObj,
                itens: itensFiltrados
            };
        }).filter(venda => venda !== null);

        return res.status(200).json(vendasFiltradas);

    } catch (error) {
        console.error('Erro ao gerar relatório: ', error);
        return res.status(500).json({
            message: 'Erro interno do servidor',
            erroDetalhado: error.message
        });
    }
});



/***********************************************ROTAS DE USUÁRIOS***********************************************/
//Login
app.post('/login', async (req, res) => {

    try {

        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email, senha });

        if (!usuario) return res.status(401).json({ message: 'Senha ou email incorretos.' });

        return res.status(200).json({ message: 'Login efetuado com sucesso!' });
        
    } catch (error) {
        console.error('Erro ao fazer o login: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Cadastro
app.post('/usuarios', async (req, res) => {

    try {

        const { nome, email, senha, idade } = req.body;

        //Verifica se já existe um usuário que detém desse email, evitando que existam multiplos usuários com
            //o mesmo email.
        const usuario = await Usuario.findOne({ email });
        if (usuario) return res.status(401).json({ message: 'Já existe um usuário com esse email.' });
        
        const novoUsuario = new Usuario({ nome, email, senha, idade });

        await novoUsuario.save();

        return res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
        
    } catch (error) {
        console.error('Erro ao cadastrar o usuário: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }

});

//Encontrar usuários
app.get('/usuarios', async (req, res) => {

    try {

        
        const usuarios = await Usuario.find();

        return res.status(200).json(usuarios);
        
    } catch (error) {
        console.error('Erro ao buscar usuários: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Encontrar um usuário específico
app.get('/usuarios/:id', async (req, res) => {

    try {

        
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) return res.status(404).json({message: 'Usuário não encontrado.'});

        return res.status(200).json(usuario);
        
    } catch (error) {
        console.error('Erro ao buscar usuários: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Atualizar informações de um usuário específico
app.put('/usuarios/:id', async (req, res) => {

    try {

        const { nome, email, senha, idade, emailAntigo } = req.body;

        const verificacao = await Usuario.findOne({ email });
        if (verificacao && !emailAntigo) return res.status(401).json({ message: 'Já existe um usuário com esse email.' });
        
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, { nome, email, senha, idade });

        if (!usuario) return res.status(404).json({message: 'Usuário não encontrado.'});

        return res.status(200).json({message: 'Usuário atualizado.'});
        
    } catch (error) {
        console.error('Erro ao editar usuário: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }

});

//Busca usuários filtrados
app.get('/usuarios/filtro/:termo', async (req, res) => {

    try {

        const { termo } = req.params.termo;
        
        const usuarios = await Usuario.find({
            $or: [//Utiliza do operador lógico $or para realizar uma filtragem nos usuário que detém um termo de filtro
                {nome: {$regex: termo, $options: 'i'}}, //Regular Expression do tipo 'i'
                {email: {$regex: termo, $options: 'i'}}
            ]
        });

        if (!usuarios) return res.status(404).json({message: 'Usuários não encontrados.'});

        return res.status(200).json(usuarios);
        
    } catch (error) {
        console.error('Erro ao buscar usuários: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }

});

//Deleta um usuário específico
app.delete('/usuarios/:id', async (req, res) => {

    try {

        const usuario = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuario) return res.status(404).json({message: 'Usuário não encontrado.'});

        return res.status(200).json({ message: 'Usuário excluido com sucesso!' });
        
    } catch (error) {
        console.error('Erro ao excluir usuário: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }

});


/*********************************************ROTAS DE FORNECEDORES*********************************************/
//Cadastro de fornecedor
app.post('/fornecedor', async (req, res) => {

    try {

        const { nome, telefone, email } = req.body;

        const fornecedores = await Fornecedor.findOne({ nome });
        if (fornecedores) return res.status(404).json({message: 'Já há um fornecedor com esse nome.'});

        const novoFornecedor = new Fornecedor({ nome, telefone, email });

        await novoFornecedor.save();

        return res.status(200).json({ message: 'Fornecedor cadastrado com sucesso' });
        
    } catch (error) {
        console.error('Erro ao cadastrar fornecedor: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Buscar fornecedores
app.get('/fornecedor', async (req, res) => {

    try {

        const fornecedores = await Fornecedor.find();

        if (!fornecedores) return res.status(404).json({message: 'Fornecedores não encontrados.'});

        return res.status(200).json(fornecedores);
        
    } catch (error) {
        console.error('Erro ao buscar fornecedores: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Buscar fornecedor específico
app.get('/fornecedor/:id', async (req, res) => {

    try {

        const fornecedor = await Fornecedor.findById(req.params.id);

        if (!fornecedor) return res.status(404).json({message: 'Fornecedor não encontrado.'});

        return res.status(200).json(fornecedor);
        
    } catch (error) {
        console.error('Erro ao buscar fornecedor: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Atualizar fornecedor específico
app.put('/fornecedor/:id', async (req, res) => {

    try {

        const { nome, email, telefone, nomeFornecedorAntigo } = req.body;

        const verificacao = await Fornecedor.findOne({ nome });
        if (verificacao && !nomeFornecedorAntigo) return res.status(404).json({message: 'Já há um fornecedor com esse nome.'});

        const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, { nome, email, telefone });

        if (!fornecedor) return res.status(404).json({message: 'Fornecedor não encontrado.'});

        return res.status(200).json({message: 'Fornecedor atualizado.'});
        
    } catch (error) {
        console.error('Erro ao atualizar fornecedor: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Exclui fornecedor específico
app.delete('/fornecedor/:id', async (req, res) => {

    try {

        const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);

        if (!fornecedor) return res.status(404).json({message: 'Fornecedor não encontrado.'});

        return res.status(200).json({message: 'Fornecedor excluido com sucesso.'});
        
    } catch (error) {
        console.error('Erro ao excluir fornecedor: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});


/*********************************************ROTAS DE CLIENTES*********************************************/
//Cadastro de clientes
app.post('/clientes', async (req, res) => {

    try {

        const { cpf, nome, telefone, endereco } = req.body;

        const cliente = await Cliente.findOne({ cpf });
        if (cliente) return res.status(404).json({message: 'Já há um cliente com esse cpf.'});

        const novoCliente = new Cliente({ cpf, nome, telefone, endereco });

        await novoCliente.save();

        return res.status(200).json({ message: 'Cliente cadastrado com sucesso!' });
        
    } catch (error) {
        console.error('Erro ao cadastrar cliente: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Buscar clientes
app.get('/clientes', async (req, res) => {

    try {

        const clientes = await Cliente.find();

        if (!clientes) return res.status(404).json({message: 'Não foi possível encontrar os cliente no Banco de Dados.'});

        return res.status(200).json(clientes);
        
    } catch (error) {
        console.error('Erro ao buscar clientes: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Buscar cliente específico
app.get('/clientes/:id', async (req, res) => {

    try {

        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) return res.status(404).json({message: 'Cliente não encontrado.'});

        return res.status(200).json(cliente);
        
    } catch (error) {
        console.error('Erro ao buscar cliente: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Atualizar cliente específico
app.put('/clientes/:id', async (req, res) => {

    try {

        const { cpf, nome, telefone, endereco, cpfAntigo } = req.body;

        const verificacao = await Cliente.findOne({ cpf });
        if (verificacao && !cpfAntigo) return res.status(404).json({message: 'Já há um cliente com esse cpf.'});

        const cliente = await Cliente.findByIdAndUpdate(req.params.id, { cpf, nome, telefone, endereco });

        if (!cliente) return res.status(404).json({message: 'Cliente não encontrado.'});

        return res.status(200).json({message: 'Cliente atualizado.'});
        
    } catch (error) {
        console.error('Erro ao atualizar cliente: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Exclui cliente específico
app.delete('/clientes/:id', async (req, res) => {

    try {

        const cliente = await Cliente.findByIdAndDelete(req.params.id);

        if (!cliente) return res.status(404).json({message: 'Cliente não encontrado.'});

        return res.status(200).json({message: 'Cliente excluido com sucesso.'});
        
    } catch (error) {
        console.error('Erro ao excluir cliente: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});


/*********************************************ROTAS DE PRODUTOS*********************************************/
//Cadastro de produtos
app.post('/produtos', async (req, res) => {

    try {

        const { codigo, nome, descricao, preco, quantidadeEstoque, fornecedor } = req.body;

        //Verifica se já há um nome ou código de algum produto identi ao que o usuário deseja e caso exista,
            //impede que o procedimento de cadastro continue
        const produtoNome = await Produto.findOne({ nome }).populate('fornecedor');
        const produtoCodigo = await Produto.findOne({ codigo }).populate('fornecedor');

        if (produtoNome) return res.status(404).json({message: 'Já há um produto com esse nome.'});
        if (produtoCodigo) return res.status(404).json({message: 'Já há um produto com esse código.'});

        const novoProduto = new Produto({ codigo, nome, descricao, preco, quantidadeEstoque, fornecedor });

        await novoProduto.save();

        return res.status(200).json({ message: 'Produto cadastrado com sucesso!' });
        
    } catch (error) {
        console.error('Erro ao cadastrar produto: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Buscar produtos
app.get('/produtos', async (req, res) => {

    try {

        //Busca todos os produtos cadastrados no banco de dados, depois, utiliza do método .populate() para 
            //preencher os dadosdo campo 'fornecedor' com os os detalhes de cada fornecedor, tudo de acordo 
            //com o Schema de Produto. 
        const produtos = await Produto.find().populate('fornecedor');

        if (!produtos) return res.status(404).json({message: 'Produtos não encontrados.'});

        return res.status(200).json(produtos);
        
    } catch (error) {
        console.error('Erro ao buscar produtos: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Buscar produto específico
app.get('/produtos/:id', async (req, res) => {

    try {

        const produto = await Produto.findById(req.params.id).populate('fornecedor');

        if (!produto) return res.status(404).json({message: 'Produto não encontrado.'});

        return res.status(200).json(produto);
        
    } catch (error) {
        console.error('Erro ao buscar produto: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Buscar produto específico pelo código
app.get('/produtos/codigo/:codigo', async (req, res) => {

    try {

        const { codigo } = req.params;

        const produto = await Produto.findOne({ codigo }).populate('fornecedor');

        if (!produto) return res.status(404).json({message: 'Produto não encontrado.'});

        return res.status(200).json(produto);
        
    } catch (error) {
        console.error('Erro ao buscar produto: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Atualizar produto específico
app.put('/produtos/:id', async (req, res) => {

    try {

        const { codigo, nome, descricao, preco, quantidadeEstoque, fornecedor, nomeAntigo, codigoAntigo } = req.body;

        const verificacaoNome = await Produto.findOne({ nome }).populate('fornecedor');
        const verificacaoCodigo = await Produto.findOne({ codigo }).populate('fornecedor');

        if (verificacaoNome && !nomeAntigo) return res.status(404).json({message: 'Já há um produto com esse nome.'});
        if (verificacaoCodigo && !codigoAntigo) return res.status(404).json({message: 'Já há um produto com esse código.'});

        const produto = await Produto.findByIdAndUpdate(req.params.id, { codigo, nome, descricao, preco, quantidadeEstoque, fornecedor });

        if (!produto) return res.status(404).json({message: 'Produto não encontrado.'});

        return res.status(200).json({message: 'Produto atualizado.'});
        
    } catch (error) {
        console.error('Erro ao atualizar produto: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});

//Exclui produto específico
app.delete('/produtos/:id', async (req, res) => {

    try {

        const produto = await Produto.findByIdAndDelete(req.params.id);

        if (!produto) return res.status(404).json({message: 'Produto não encontrado.'});

        return res.status(200).json({message: 'Produto excluido com sucesso.'});
        
    } catch (error) {
        console.error('Erro ao excluir produto: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});



/*********************************************ROTAS DE VENDAS*********************************************/
//Cadastro de vendas
app.post('/vendas', async (req, res) => {
   
    try {

        const { itens, clienteCpf } = req.body;

        if (!itens || itens.length === 0) return res.status(400).json({ message: 'Nenhum produto no carrinho.' });

        let total = 0; //Valor total da venda

        //Processa cada item, buscando informações do produto e fornecedor.
        //A constante armazena o resultado de todas as operções assíncronas.
        //"Promise.all" é utilizado para aguardar a conclusão de todas as promessas geradas dentro do map.
        const itensProcessados = await Promise.all(

            //'map' percorre cada item presente na lista de itens enviada na requisicao
            itens.map(async (item) => {
                
                //Procura o produto de cada item na lista
                const produto = await Produto.findById(item.produtoId).populate('fornecedor');

                if (!produto) return res.status(400).json({ message: `Produto ${item.produtoId} não encontrado` });
                
                if (produto.quantidadeEstoque < item.quantidade) 
                    return res.status(400).json({ message: `O produto: ${item.nome} com estoque insuficiente para realizar essa venda` });

                produto.quantidadeEstoque -= item.quantidade;//Reduz a quantidade do produto no estoque

                await produto.save(); //Salva a quantidade atual

                const subtotal = produto.preco * item.quantidade;//Calcula o subtotal da venda para cada item

                total += subtotal;//Adiciona o subtotal no total da venda

                return {//Retorna um objeto representando um item processado da venda

                    produtoId: produto._id,
                    nomeProduto: produto.nome,
                    quantidade: item.quantidade,
                    precoUnitario: produto.preco, 
                    subtotal,
                    fornecedorId: produto.fornecedor ? produto.fornecedor._id : null,
                    nomeFornecedor: produto.fornecedor? produto.fornecedor.nome : ''

                }

            })

        )

        //Cria um novo registro de venda e salva no BD
        const novaVenda = new Venda({
            itens: itensProcessados,
            total,
            clienteCpf: clienteCpf || '',
            data: new Date()
        });
        await novaVenda.save();

        return res.status(200).json({ message: 'Venda realizada com sucesso!', vendaId: novaVenda._id });
        
    } catch (error) {
        console.error('Erro ao processar a venda: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });        
    }

});

//Buscar vendas
app.get('/vendas', async (req, res) => {

    try {

        const vendas = await Venda.find();

        return res.status(200).json(vendas);
        
    } catch (error) {
        console.error('Erro ao buscar vendas: ',error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

});


const PORTA = 3000;

app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
