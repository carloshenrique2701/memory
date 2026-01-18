const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//Importa a configuração do bd para que a conexão seja estabelecida
require('./config/bancoDados');

const Usuario = require ('./models/Usuario');
const Veiculo = require ('./models/Veiculo');
const Reserva = require ('./models/Reserva');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


/********************************************* ROTAS PARA USUÁRIOS *********************************************/

//Realizar cadastro 
app.post('/api/usuarios/cadastrar', async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        const existe = await Usuario.findOne({ email });

        if (existe) return res.status(400).json({ mensagem: 'Email já cadastrado!' });

        const novo = new Usuario({ nome, email, senha });

        await novo.save();

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
        
    } catch (error) {
        console.log('Erro ao cadastrar usuário: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao cadastrar usuário.'})
    }

});

//Realizar login 
app.post('/api/usuarios/logar', async (req, res) => {
    
    try {

        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });

        if (usuario.senha !== senha) return res.status(401).json({ mensagem: 'Email ou senha incorreto.' });

        return res.status(200).json({
            
            mensagem: 'Realizando login!',
            
            idUsuario: usuario._id,

            nome: usuario.nome,

            tipoUsuario: usuario.tipoUsuario
        });
        
    } catch (error) {
        console.log('Erro ao logar usuário: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao logar usuário.'});
    }


});

//Pega dados de todos os usuários
app.get('/api/usuarios', async (req, res) => {
   
    try {

        const usuarios = await Usuario.find();

        return res.status(200).json(usuarios)
        
    } catch (error) {
        console.log('Erro ao listar usuários: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao listar usuários.'})
    }

});

//Pega os dados de um usuario específico
app.get('/api/usuarios/:id', async (req, res) => {
   
    try {

        const id = req.params.id;

        const usuario = await Usuario.findById(id);

        if(!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        
        //O status de código 200 é implicito
        return res.json(usuario);

    } catch (error) {
        console.log('Erro ao buscar usuário: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar usuário.'})
    }

});

//Atualizar os dados de um usuário
app.put('/api/usuarios/:id', async (req, res) => {
   
    try {

        const { nome, email, senha, tipoUsuario } = req.body;

        const usuarioAtualizado = await Usuario.findByIdAndUpdate(

            req.params.id,
            { nome, email, senha, tipoUsuario },//Especifica os campos a serem atualizados
            { new: true }//Retorna o usuario atualizado e não o antigo

        );

        if(!usuarioAtualizado) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        
        return res.status(200).json({ mensagem: 'Usuário atualizado.', usuario: usuarioAtualizado});

    } catch (error) {
        console.log('Erro ao editar dados do usuário: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao editar dados do usuário.'})
    }

});

//Deleta um usuário
app.delete('/api/usuarios/:id', async (req, res) => {
   
    try {

        const del = await Usuario.findByIdAndDelete(req.params.id);

        if(!del) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        
        return res.status(200).json({ mensagem: 'Usuário excluido com sucesso!'});

    } catch (error) {
        console.log('Erro ao deletar dados do usuário: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao deletar dados do usuário.'})
    }

});


/********************************************* ROTAS PARA VEÍCULOS *********************************************/

//Realizar cadastro
app.post('/api/veiculos/cadastrar', async (req, res) => {

    try {

        const { placa, modelo, cor, proprietario } = req.body;

        const veiculoExiste = await Veiculo.findOne({ placa });

        if (veiculoExiste) return res.status(400).json({ mensagem: 'Já existe um veículo com esta placa!' });

        const novo = new Veiculo({ placa, modelo, cor, proprietario });

        await novo.save();

        return res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso!' });
        
    } catch (error) {
        console.log('Erro ao cadastrar veículo: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao cadastrar veículo.'})
    }

});

//Listar veículos
app.get('/api/veiculos', async (req, res) => {

    try {

        //Parametro caso o usuário tenha usado algum filtro 
        //req.query é usado para capturar parametros opcionais enviados pela URL
        const { placa } = req.query;

        let veiculos = [];

        //Usamos "new RegExp(placa, 'i' )" para criar uma expressão regular que faz a busca sem diferenciar
            //maiúsculas de minúsculas. Ex: abc-123 = ABC-123
            if (placa) {

                // Usamos "new RegExp(placa, 'i')" para criar uma expressão 
                //      regular que faz a busca sem diferenciar maiúsculas e minúsculas
                // Isso significa que "abc-1234" e "ABC-1234" serão 
                //      considerados iguais na pesquisa
                veiculos = await Veiculo.find({ placa: new RegExp(placa, 'i') });
          
              } else {
          
                // Se o usuário NÃO enviou um filtro de placa, 
                //      buscamos TODOS os veículos cadastrados
                veiculos = await Veiculo.find();
          
              }
        return res.status(200).json(veiculos);
        
    } catch (error) {
        console.log('Erro ao listar veículos: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao listar veículos.'})
    }

});

//Listar veículos especificos
app.get('/api/veiculos/:id', async (req, res) => {

    try {

        const veiculo = await Veiculo.findById(req.params.id)

        if (!veiculo) return res.status(404).json({ mensagem: "Veículo não encontrado" });
        
        return res.json(veiculo);
        
    } catch (error) {
        console.log('Erro ao buscar veículo: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar veículo.'})
    }

});

//Editar veículo
app.put('/api/veiculos/:id', async (req, res) => {

    try {

        const { placa, modelo, cor, proprietario } = req.body;

        const atualizado = await Veiculo.findByIdAndUpdate(
            req.params.id,
            { placa, modelo, cor, proprietario },
            { new: true }
        )

        if (!atualizado) return res.status(404).json({ mensagem: "Veículo não encontrado" });
        
        return res.status(200).json({ mensagem: 'Veículo atualizado.' });
        
    } catch (error) {
        console.log('Erro ao editar veículo: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao editar veículo.'})
    }

});

//Excluir veículo
app.delete('/api/veiculos/:id', async (req, res) => {

    try {


        const del = await Veiculo.findByIdAndDelete(req.params.id);

        if (!del) return res.status(404).json({ mensagem: "Veículo não encontrado" });
        
        return res.status(200).json({ mensagem: 'Veículo excluido.' });
        
    } catch (error) {
        console.log('Erro ao excluir veículo: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao excluir veículo.'})
    }

});


/********************************************* ROTAS PARA RESERVAS *********************************************/


//Realizar cadastro de reservas
app.post('/api/reservas', async (req, res) => {

    try {

        const { 
            data,
            hora,
            vaga,
            placaVeiculo, 
            modeloVeiculo, 
            corVeiculo, 
            proprietarioVeiculo } = req.body;

        const [ year, month, day ] = data.split('-');
        const [ hour, minute] = hora.split(':');

        const dataHoraInicio = new Date(
            parseInt(year),
            parseInt(month) - 1,//Omês do js ele indexa em 0 (janeiro = 0). Ex: agosto éomês 8, mas no js é 7;
            parseInt(day),
            parseInt(hour),
            parseInt(minute || 0)
        );

        //Se a reserva ainda não foi finalizada, coloca uma +1 hora para não deixar em branco
        const dataHoraFim = new Date(dataHoraInicio);
        dataHoraFim.setHours(dataHoraInicio.getHours() + 1);

        //Verificamos se há alguma vaga 'reservada', nomesmohorário e na mesma data
        const reservasExistente = await Reserva.findOne({

            vaga,
            status: "reservada",

            //$lt (menor que) e $gt (maior que), definem se existe alguma vaga reservada que a hora inicio seja menor
                //que a hora final da nova reserva, e a data de fim seja maior que a data de inicio da nova reserva.
                //Criando assim um intervalo de tempo. ex: dtFim: 14h, dtIn: 13h. há alguma reserva que comece antes 
                // das 14hrs(e depois das 13hrs) ou que termine depois das 13hrs? 
            dataHoraInicio: { $lt: dataHoraFim },
            dataHoraFim: { $gt: dataHoraInicio},

        });

        if (reservasExistente) return res.status(400).json({ mensagem: 'Esta vaga já se encontra reservada' });

        const novaReserva = new Reserva({
            dataHoraInicio,
            dataHoraFim,
            vaga,
            placaVeiculo, 
            modeloVeiculo, 
            corVeiculo, 
            proprietarioVeiculo,
            status: 'reservada'
        });

        await novaReserva.save();

        return res.status(201).json({ mensagem: 'Reserva realizada com sucesso com sucesso!' });
        
    } catch (error) {
        console.log('Erro ao cadastrar reserva: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao cadastrar reserva.'})
    }

});

//Listar reservas
app.get('/api/reservas', async (req, res) => {

    try {

        //Parametro caso o usuário tenha usado algum filtro 
        //req.query é usado para capturar parametros opcionais enviados pela URL
        const { data } = req.query;

        if (!data) return res.status(400).json({ mensagem: 'É necessário fornecer a data (YYYY-MM-DD)' });

        //Cria uma string com uma data no formato: 'YYY-MM-DDT00:00:00' o 'T' éo separador da hora e data
        const inicioDia = new Date(`${data}T00:00:00`);
        const fimDia = new Date(`${data}T23:59:59`);
        
        //Busca por reservas durante o dia especificado no parametro
        //$lte (menor ou igual a) e $gte (maior ou igual a) são responsáveis pelo filtro de busca por data
            //e hora.
        const reservas = await Reserva.find({
            dataHoraInicio: { $gte: inicioDia, $lte: fimDia}
        });

        return res.status(200).json(reservas);
        
    } catch (error) {
        console.log('Erro ao listar reservas: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao listar reservas.'})
    }

});

//Rota para gerar relatorio de reservas com filtros opcionais
app.get('/api/reservas/relatorio', async (req, res) => {

    try {

        let { dataInicio, dataFim, placa, proprietario } = req.query;

        const filtro = {};

        //Se não forem passadas as datas do relatório requisitado, usa os útimos 7 dias
        if (!dataInicio || !dataFim) {
            
            const hoje = new Date();//Objeto com a data de hoje
            const seteDiasAtras = new Date();//Objeto com a data de hoje que será ajustado para 7 dias atrás

            seteDiasAtras.setDate(hoje.getDate() - 7);//Ajuste

            /*
            toISOString() retorna YYYY-MM-DDTHH:mm:ss.sssZ

            oString() retorna algo como Wed Jan 01 2025 00:00:00 GMT+0000
            */
            dataInicio = seteDiasAtras.toISOString().split('T')[0]//Pega a data de 7d atras a partir do separador (YYY-MM-DDT00:00:00)
            dataFim = hoje.toISOString().split('T')[0]//Pega a data de hoje a partir do separador (YYY-MM-DDT00:00:00)

        }

        //Objetos de calculo para o intervalo de data e hora 
        const inicio = new Date(`${dataInicio}T00:00:00.000Z`);
        const fim = new Date(`${dataFim}T23:59:59.999Z`);

        filtro.dataHoraInicio = { $gte: inicio, $lte: fim};//Define o filtro de busca no BD

        //Se houver uma placa ou o proprietario (passadas na url), adicionamos no filtro para que tenham essas
            //informações mais específicas no retorno
        if (placa) filtro.placaVeiculo = new RegExp(placa, 'i');
        if (proprietario) filtro.proprietarioVeiculo = new RegExp(proprietario, 'i');

        const reservas = await Reserva.find(filtro);
        
        return res.status(200).json(reservas);
        
    } catch (error) {
        console.error('Erro ao gerar relatório: ', error);
        return res.status(500).json({ 
            mensagem: 'Erro interno do servidor ao gerar relatório.',
            erroDetalhado: error.message
        });
    }

});

//Busca reserva por id
app.get('/api/reservas/:id', async (req, res) => {

    try {

        const reserva = await Reserva.findById(req.params.id);

        if (!reserva) return res.status(404).json({ mensagem: "Reserva não encontrada." });
        
        return res.status(200).json(reserva);
        
    } catch (error) {
        console.error('Erro ao buscar reserva: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar reserva.' });
    }

});

//Editar reserva 
app.put('/api/reservas/finalizar/:id', async (req, res) => {

    try {

        const { dataFim, horaFim } = req.body;

        const reserva = await Reserva.findById(req.params.id);

        if (!reserva) return res.status(404).json({ mensagem: "Reserva não encontrada." });
        if (reserva.status === 'finalizada') return res.status(400).json({ mensagem: "Reserva já finalizada." });
        
        const dataHoraFim = new Date(`${dataFim}T${horaFim}:00`);//Objeto com data e hora de término da reserva

        //Diferença de tempo etre a dataHorFim e inicio (essa operação resulta em milissegundos)
        const msDiff = dataHoraFim - reserva.dataHoraInicio;
        //Transaforma de milissegundos para horas(1000->segundos)(60-> minutos)(60-> hora).
        let horas = msDiff / (1000 * 60 * 60);
        //Arredonda o número de horas para cima garantindo que qualquer fração de hora seja contabilizada como 
            // inteira
        horas = Math.ceil(horas);
        //5 unidades monetárias por hora
        const valor = horas * 5;

        reserva.dataHoraFim = dataHoraFim;
        reserva.valorPago = valor;
        reserva.status = 'finalizada';

        await reserva.save();

        return res.status(200).json({
            mensagem: 'Reserva finalizada com sucesso.',
            horas,
            valor
        });
        
    } catch (error) {
        console.error('Erro ao finalizar reserva: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao finalizar reserva.' });
    }

});

//Excluir reserva
app.delete('/api/reservas/:id', async (req, res) => {

    try {


        const del = await Reserva.findByIdAndDelete(req.params.id);

        if (!del) return res.status(404).json({ mensagem: "Reserva não encontrado" });
        
        return res.status(200).json({ mensagem: 'Reserva excluido.' });
        
    } catch (error) {
        console.log('Erro ao excluir reserva: ', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao excluir reserva.'})
    }

});


/********************************************* PORTA PARA REQUISIÇÕES *********************************************/

const PORTA = 3000;

app.listen(PORTA, () => console.log('Servidor rodando na porta: ', PORTA));