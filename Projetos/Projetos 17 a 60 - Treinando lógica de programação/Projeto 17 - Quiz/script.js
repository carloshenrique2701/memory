document.addEventListener('DOMContentLoaded', () =>{

    const perguntas = [

        {pergunta: "Qual é o maior animal terrestre?", opcoes: ["Elefante africano", "Rinoceronte branco", "Girafa", "Urso Polar"] , resposta: "Elefante africano"},
        {pergunta: "Qual é o único mamífero capaz de voar?", opcoes: ["Morcego", "Pinguim", "Esquilo voador", "Avestruz"], resposta: "Morcego"},
        {pergunta: "Qual é o animal mais rápido do mundo?", opcoes: ["Guepardo", "Falcão-peregrino", "Peixe-vela", "Leopardo"], resposta: "Falcão-peregrino"},
        {pergunta: "Qual é o maior animal do planeta?", opcoes: ["Tubarão-baleia", "Baleia-azul", "Elefante africano", "Lula-gigante"], resposta: "Baleia-azul"},
        {pergunta: "Qual é o único mamífero que põe ovos?", opcoes: ["Ornitorrinco", "Equidna", "Tatu", "Canguru"], resposta: "Ornitorrinco"},
        {pergunta: "Qual é o animal com o maior tempo de gestação?", opcoes: ["Elefante africano", "Baleia-azul", "Girafa", "Rinoceronte"], resposta: "Elefante africano"},
        {pergunta: "Qual é o menor mamífero do mundo?", opcoes: ["Musaranho-pigmeu", "Morcego-nariz-de-porco", "Rato-canguru", "Colibri"], resposta: "Musaranho-pigmeu"},
        {pergunta: "Qual é o único felino que vive em grupos?", opcoes: ["Leão", "Tigre", "Leopardo", "Onça-pintada"], resposta: "Leão"},
        {pergunta: "Qual é o animal que possui a mordida mais forte?", opcoes: ["Crocodilo", "Tubarão-branco", "Hiena", "Jaguar"], resposta: "Crocodilo"},
        {pergunta: "Qual é o único pássaro que consegue voar para trás?", opcoes: ["Beija-flor", "Pomba", "Águia", "Coruja"], resposta: "Beija-flor"}

    ];

    let perguntaAtual = 0;
    let pontuacao = 0;
    let respostasUsuario = [];

    const elementoPergunta = document.getElementById('pergunta');
    const elementoOpcoes = document.getElementById('opcoes');
    const botaoSubmeter = document.getElementById('submeter');
    const elementoResultado = document.getElementById('resultado');

    function mostrarPergunta(pergunta) {
        
        elementoPergunta.textContent = pergunta.pergunta;

        elementoOpcoes.innerHTML = '';

        pergunta.opcoes.forEach(opcao => {

            const label = document.createElement('label');
            const radio = document.createElement('input');

            radio.type = 'radio';//Define o tipo de radio, fazendo um botao de uma opcao
            radio.name = 'opcao';//Define um nome do grupo de botoes para que seja possível selecionar apenas uma opcao
            radio.value = opcao;//Define valor de opcao

            label.appendChild(radio);//adiciona o botao dentro do elemento label
            label.appendChild(document.createTextNode(opcao));//cria um nó de texto a opcao atual e adciona esse nó ao elemento label

            elementoOpcoes.appendChild(label)//adiciona no html pelo elementoOpcoes
        });

    }

    function verificarResposta() {
        
        const opcaoSelecionada = document.querySelector('input[name="opcao"]:checked');//Busca o primeiro elemento input do tipo radio que esta marcado e pertence ao grupo opcao
                                                    //NÃO DA ESPAÇOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!
        if (!opcaoSelecionada){

            alert("Por favor, selecione uma opção!");
            return;
            
        }

        respostasUsuario.push(opcaoSelecionada.value);

        if(opcaoSelecionada.value === perguntas[perguntaAtual].resposta){

            pontuacao++;

        }

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta(perguntas[perguntaAtual]);
            
        } else {

            mostrarResultado();
            
        }

    }

    function mostrarResultado() {

        elementoPergunta.style.display = 'none';
        elementoOpcoes.style.display = 'none';
        botaoSubmeter.style.display = 'none';

        const porcentagemPontuacao = (pontuacao / perguntas.length) * 100;

        let resultadoHTML = porcentagemPontuacao >= 70?
        `Parabéns! Você foi aprovado com ${pontuacao} de ${perguntas.length} acertos.`:
        `Você foi reprovado. Você acertou ${pontuacao} de ${perguntas.length}`;

        resultadoHTML += '<br><br><h2>Respostas: </h2>';

        perguntas.forEach((pergunta, index) =>{

            resultadoHTML += `<p><strong>Pergunta ${index + 1}: </strong> ${pergunta.pergunta}<br>`;
            resultadoHTML += `<strong>Resposta Correta: </strong> ${pergunta.resposta}<br>`;

            resultadoHTML += `<strong>Sua Resposta: </strong> ${respostasUsuario[index] ? respostasUsuario[index] : 'Não respondida'}</p><br>`;

        });

        elementoResultado.innerHTML = resultadoHTML;
        
    }

    mostrarPergunta(perguntas[perguntaAtual]);

    botaoSubmeter.addEventListener('click', verificarResposta);

});