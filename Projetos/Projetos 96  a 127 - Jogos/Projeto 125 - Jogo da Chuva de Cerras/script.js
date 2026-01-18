const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menuInicial = document.getElementById('menuInicial');
const exibirPontuacaoMenu = document.getElementById('exibirPontuacaoMenu');
const botaoIniciar = document.getElementById('botaoIniciar');

const telaGameOver = document.getElementById('telaGameOver');
const pontuacaoFinal = document.getElementById('pontuacaoFinal');
const botaoReiniciar = document.getElementById('reiniciarJogo');

const imagemFundo = new Image();
imagemFundo.src = 'fundo.png';

const imagemJogador = new Image();
imagemJogador.src = 'jogador.png';

const imagemObstaculo = new Image();
imagemObstaculo.src = 'obstaculo.png';

const LARGURA_TELA = canvas.width;
const ALTURA_TELA = canvas.height;
const LARGURA_JOGADOR = 50;
const ALTURA_JOGADOR = 50;
const LARGURA_OBSTACULO = 50;
const ALTURA_OBSTACULO = 50;
const LARANJA = '#FF8C00';
const FONTE = '24px Arial';

let posXJogador = LARGURA_TELA / 2 - LARGURA_JOGADOR / 2;
const posYJogador = ALTURA_TELA - ALTURA_JOGADOR - 85;
let velocidadeJogador = 7;
let velocidadeObstaculo = 5;
let intervaloObstaculo = 30;
let obstaculos = [];
let pontos = 0;
let tempoJogo = 0;
let jogoRodadndo = false;
let jogador = {};

const teclaPressionadas = {};

function criarObstaculo() {

    const x = Math.floor(Math.random() * (LARGURA_TELA - LARGURA_OBSTACULO));
    const y = -ALTURA_OBSTACULO;

    const obstaculo = {

        x: x,
        y: y,
        largura: LARGURA_OBSTACULO,
        altura: ALTURA_OBSTACULO

    }

    obstaculos.push(obstaculo);
    
}

function aturalizarObstaculos() {

    for (let i = 0; i < obstaculos.length; i++) {

        const obstaculo = obstaculos[i];

        obstaculo.y += velocidadeObstaculo;

        if (colisao(jogador, obstaculo)) {

            jogoRodadndo = false;
            salvarPontuacao()
            mostrarTelaGameOver();
            
        }

        if (obstaculo.y > ALTURA_TELA) {
            
            obstaculos.splice(i, 1);
            pontos++;
            velocidadeObstaculo += 0.05;

        }

    }
    
}

function colisao(jogador, obstaculo) {

    return (
        jogador.x < obstaculo.x + obstaculo.largura &&
        jogador.x + jogador.largura > obstaculo.x &&
        jogador.y < obstaculo.y + obstaculo.altura &&
        jogador.y + jogador.altura > obstaculo.y
    )
    
}

function mostrarTelaGameOver() {
    
    pontuacaoFinal.textContent = pontos;

    menuInicial.classList.add('oculto');
    telaGameOver.classList.remove('oculto');
    canvas.classList.add('oculto');

}

function carregarPontuacao() {
    
    const salvarPontuacao = localStorage.getItem('pontuacao');

    return salvarPontuacao ? parseInt(salvarPontuacao) : 0;

}

function salvarPontuacao() {
    
    const recordeAnterior = carregarPontuacao();

    if (recordeAnterior < pontos) {
        
        localStorage.setItem('pontuacao', pontos);
        console.log('Novo Recorde.');
        
    } else {

        localStorage.setItem('pontuacao', recordeAnterior);
        console.log('O Recorde permanece inalterável.');

    }

}

function exibirPontuacao() {
    
    ctx.fillStyle = LARANJA;
    ctx.font = FONTE;
    ctx.fillText(`Pontos: ${pontos}`,10, 30);
    exibirPontuacaoMenu.textContent = carregarPontuacao();

}

function mostrarMenuInicial() {
    
    menuInicial.classList.remove('oculto');
    telaGameOver.classList.add('oculto');
    canvas.classList.add('oculto');

    exibirPontuacaoMenu.textContent = carregarPontuacao();

}

function iniciarJogo() {

    pontos = 0;
    velocidadeObstaculo = 5;
    obstaculo = [];
    tempoJogo = 0;
    jogoRodadndo = true;
    posXJogador = LARGURA_TELA / 2 - LARGURA_JOGADOR / 2;

    menuInicial.classList.add('oculto');
    telaGameOver.classList.add('oculto');
    canvas.classList.remove('oculto');
    
    loopJogo();

}

function loopJogo() {
    
    if (!jogoRodadndo) return;

    ctx.clearRect(0, 0, LARGURA_TELA, ALTURA_TELA);
    ctx.drawImage(imagemFundo, 0, 0, LARGURA_TELA, ALTURA_TELA);

    if (teclaPressionadas['ArrowLeft'] || teclaPressionadas['a'] || teclaPressionadas['A']) {
        posXJogador -= velocidadeJogador;
        if (posXJogador < 0) posXJogador = 0;
    }

    if (teclaPressionadas['ArrowRight'] || teclaPressionadas['d'] || teclaPressionadas['D'] ) {
        posXJogador += velocidadeJogador;
        if (posXJogador > LARGURA_TELA - LARGURA_JOGADOR) posXJogador = LARGURA_TELA - LARGURA_JOGADOR;
    }

    jogador = {

        x: posXJogador,
        y: posYJogador,
        largura: LARGURA_JOGADOR,
        altura: ALTURA_OBSTACULO

    }

    if (tempoJogo % intervaloObstaculo === 0) criarObstaculo();
    
    aturalizarObstaculos();

    obstaculos.forEach(obstaculo => {

        ctx.drawImage(imagemObstaculo, obstaculo.x, obstaculo.y, LARGURA_OBSTACULO, ALTURA_OBSTACULO);

    });

    ctx.drawImage(imagemJogador, jogador.x, jogador.y, LARGURA_JOGADOR, ALTURA_JOGADOR);

    exibirPontuacao();

    tempoJogo+= 1;
    setTimeout(() => {
        loopJogo();
    }, 1000 / 30); // 30 FPS

}

window.addEventListener('keydown', function (e) {
    teclaPressionadas[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    teclaPressionadas[e.key] = false;
});

mostrarMenuInicial();

botaoIniciar.addEventListener('click', () => {

    carregarPontuacao();
    iniciarJogo();

    menuInicial.classList.add('oculto');
    telaGameOver.classList.add('oculto');
    canvas.classList.remove('oculto');

});
botaoReiniciar.addEventListener('click', () => {

    carregarPontuacao();
    iniciarJogo();
    console.log('reiniciando o jogo');

});