const palavras = [
    { palavra: 'abacaxi', dica: 'Fruta tropical espinhosa por fora.' },
    { palavra: 'bicicleta', dica: 'Veículo de duas rodas movido a pedal.' },
    { palavra: 'computador', dica: 'Máquina eletrônica para processar dados.' },
    { palavra: 'dicionario', dica: 'Livro que contém palavras e seus significados.' },
    { palavra: 'elefante', dica: 'Grande mamífero com tromba e presas de marfim.' },
    { palavra: 'floresta', dica: 'Grande área coberta por árvores e vegetação.' },
    { palavra: 'guitarra', dica: 'Instrumento musical de cordas.' },
    { palavra: 'helicoptero', dica: 'Aeronave que decola verticalmente.' },
    { palavra: 'internet', dica: 'Rede mundial de computadores.' },
    { palavra: 'janela', dica: 'Abertura em parede para entrada de luz e ar.' },
    { palavra: 'kiwi', dica: 'Fruta marrom e peluda por fora, verde por dentro.' },
    { palavra: 'lampada', dica: 'Objeto que produz luz artificial.' },
    { palavra: 'montanha', dica: 'Grande elevação natural do terreno.' },
    { palavra: 'navio', dica: 'Embarcação de grande porte para transporte marítimo.' },
    { palavra: 'oculos', dica: 'Acessório com lentes para correção visual.' },
    { palavra: 'piano', dica: 'Instrumento musical de teclas e cordas.' },
    { palavra: 'queijo', dica: 'Alimento derivado do leite.' },
    { palavra: 'robo', dica: 'Máquina programável que executa tarefas.' },
    { palavra: 'sorvete', dica: 'Sobremesa gelada à base de leite ou frutas.' },
    { palavra: 'tigre', dica: 'Grande felino com listras pretas.' },
    { palavra: 'urso', dica: 'Grande mamífero peludo que hiberna.' },
    { palavra: 'violao', dica: 'Instrumento musical de cordas dedilhadas.' },
    { palavra: 'xadrez', dica: 'Jogo de tabuleiro para duas pessoas.' },
    { palavra: 'yoga', dica: 'Prática física e mental originária da Índia.' },
    { palavra: 'zebra', dica: 'Animal africano com listras pretas e brancas.' },
    { palavra: 'aviao', dica: 'Aeronave mais pesada que o ar.' },
    { palavra: 'bola', dica: 'Objeto esférico usado em esportes.' },
    { palavra: 'cachorro', dica: 'Animal doméstico conhecido como melhor amigo do homem.' },
    { palavra: 'dinossauro', dica: 'Réptil pré-histórico extinto.' },
    { palavra: 'escola', dica: 'Instituição para ensino e aprendizagem.' }
];

const pontuacaoKey = 'jogoDaForcaPontuacao';

let palavraSecreta = '';
let dica = '';
let erros = 0;
let acertos = 0;
let pontuacao = localStorage.getItem(pontuacaoKey) ? parseInt(localStorage.getItem(pontuacaoKey)) : 0;
let indicePalavra = localStorage.getItem('indicePalavra') ? parseInt(localStorage.getItem('indicePalavra')) : 0;

document.getElementById('pontos').textContent = pontuacao;

function escolherPalavraSecreta() {

    if (indicePalavra < palavras.length) {
        palavraSecreta = palavras[indicePalavra].palavra;
        dica = palavras[indicePalavra].dica;
    } else {
        const indiceAleatorio = Math.floor(Math.random() * palavras.length);
        palavraSecreta = palavras[indiceAleatorio].palavra;
        dica = palavras[indiceAleatorio].dica;
    }

}

function montarPalavraNaTela() {
    
    const container = document.getElementById('palavraSecreta')
    container.innerHTML = '';

    for (let letra of palavraSecreta) {

        const span = document.createElement('span');
        span.textContent = '_';
        span.classList.add('letra');
        container.appendChild(span);
        
    }

    const dicaElement = document.getElementById('dica');
    dicaElement.innerHTML = '';
    dicaElement.textContent = 'Dica: ' + dica;

}

function montarAlfabeto() {
    
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    const container = document.getElementById('alfabeto');

    container.innerHTML = '';

    for (const letra of alfabeto) {
        
        const button = document.createElement('button');
        button.textContent = letra.toUpperCase();
        button.onclick = () => escolherLetra(letra);
        container.appendChild(button);

    }

}

function escolherLetra(letra) {
    
    const spans = document.querySelectorAll('#palavraSecreta span');
    
    let acertou = false;

    palavraSecreta.split('').forEach((char, index) => {

        if (char === letra) {
            spans[index].textContent = char.toUpperCase();
            acertou = true;
            acertos++;
        }

    });

    document.querySelectorAll('#alfabeto button').forEach(button => {

        if (button.textContent.toLowerCase() === letra) {
            
            button.disabled = true;

        }

    });

    if (!acertou) {
        erros++;
        mostrarParteDoBoneco(erros);
    }

    verificarFimDeJogo();

}

function mostrarParteDoBoneco(erros) {
    
    const partes = ['corda', 'cabeça', 'corpo', 'braçoEsquerdo', 'braçoDireito', 'pernaEsquerda', 'pernaDireita'];

    if (erros <= partes.length) {
        
        const parte = document.getElementById(partes[erros -1]);
        parte.style.display = 'block';

    }

}

function verificarFimDeJogo() {
    
    const mensagem = document.getElementById('mensagemFinal');

    if (erros === 7) {
        mensagem.textContent = 'Você perdeu.';
        mensagem.style.color = 'red';
        document.querySelectorAll('#alfabeto button').forEach(button => button.disabled = true);
    } else if (acertos === palavraSecreta.length) {
        mensagem.textContent = 'Você venceu!'
        mensagem.style.color = 'green';
        document.querySelectorAll('#alfabeto button').forEach(button => button.disabled = true);

        pontuacao ++;
        indicePalavra++;

        localStorage.setItem('indicePalavra', indicePalavra);
    }

    localStorage.setItem(pontuacaoKey, pontuacao);
    document.getElementById('pontos').textContent = pontuacao;

}

function resetGame() {
    
    escolherPalavraSecreta()
    montarPalavraNaTela();
    montarAlfabeto();

    document.getElementById('mensagemFinal').textContent = '';

    erros = 0;
    acertos = 0;

    document.querySelectorAll('.parte').forEach(parte => parte.style.display = 'none');
}

escolherPalavraSecreta();
montarPalavraNaTela();
montarAlfabeto()