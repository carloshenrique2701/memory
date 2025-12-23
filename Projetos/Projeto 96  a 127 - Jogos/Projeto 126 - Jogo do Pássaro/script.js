const canvas = document.getElementById('gameCanvas');
const ctx= canvas.getContext('2d');

const LARGURA = 400;
const ALTURA = 600;

const imagemFundo = new Image();
imagemFundo.src = 'fundo.png';

const imagemPassaro1 = new Image();
imagemPassaro1.src = 'passaro_voando1.png';

const imagemPassaro2 = new Image();
imagemPassaro2.src = 'passaro_voando2.png';

const imagemPassaroCaindo = new Image();
imagemPassaroCaindo.src = 'passaro_caindo.png';

const BRANCO = '#FFF';
const PRETO = '#000';
const FONTE = '30px Arial';
const FONTE_MENU = '40px Arial';
const totalImagens = 4;

let direcaoPassaro;
let posicaoPassaro;
let velocidade;
let pontuacao;
let pontuacaoAcumulada;
let clicadoIncorretamente;
let passaroAtingido;
let imagemAtual;
let contadorAsa;
let rodando;
let imagensCarregadas = 0;

function inicilizarVariaveis() {
   
    posicaoPassaro = [
        Math.floor(Math.random() * (LARGURA - 50)),
        Math.floor(Math.random() * (ALTURA - 50))
    ];
    direcaoPassaro = [
        Math.random() < 0.5 ? -1 : 1,
        Math.random() < 0.5 ? -1 : 1
    ];

    velocidade = 2;
    pontuacao = 0;
    clicadoIncorretamente = false;
    passaroAtingido = false;
    imagemAtual = imagemPassaro1
    contadorAsa = 0;
    rodando = false;

}

function carregarPontuacao() {
    
    let pontuacaoStr = localStorage.getItem('pontuacao');
    let pontuacaoNum = parseInt(pontuacaoStr);

    return !isNaN(pontuacao) ? pontuacaoNum : 0; 

}

function salvarPontuacaoAcumulada(pontos) {
    
    if (pontos > pontuacaoAcumulada) {
        localStorage.setItem('pontuacao', pontos)
    }

}

function telaInicial() {

    ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);
    mostrarTexto('Jogo do Pássaro', FONTE_MENU, PRETO, LARGURA/ 2, ALTURA / 2 - 150);
    mostrarTexto(`Recorde: ${carregarPontuacao()}`, FONTE, PRETO, LARGURA/ 2, ALTURA / 2 +100);
    mostrarTexto('Clique para Começar.', FONTE, PRETO, LARGURA/ 2, ALTURA / 2 + 150);
    mostrarTexto('Clique no pássaro,', FONTE, PRETO, LARGURA/ 2, ALTURA / 2 - 50);
    mostrarTexto('se errar voce perde!', FONTE, PRETO, LARGURA/ 2, ALTURA / 2);
    
}

function main() {
    
    inicilizarVariaveis();
    telaInicial();

    canvas.addEventListener('mousedown', iniciarJogo);

}

function iniciarJogo() {
    
    canvas.removeEventListener('mousedown', iniciarJogo);

    jogo();

}

function jogo() {
    
    rodando = true

    canvas.addEventListener('mousedown', verificarClick);

    function loop() {
        
        if (!rodando) return;

        ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);

        mostrarTexto(`Pontuação: ${pontuacao}`, FONTE, PRETO, 10, 30, 'left');

        if (!passaroAtingido) {
            moverPassaro();

            ctx.drawImage(imagemAtual, posicaoPassaro[0], posicaoPassaro[1], 50, 50);
        }

        requestAnimationFrame(loop);

    }

    loop();
}

function mostrarTexto(texto, fonte, cor, x, y, align = 'center') {

    ctx.font = fonte;
    ctx.fillStyle = cor;
    ctx.textAlign = align;
    ctx.fillText(texto, x, y);
    
}

function moverPassaro() {

    //Atualiza a posicao do passaro de acordo com sua direção e velocidade
    posicaoPassaro[0] += direcaoPassaro[0] * velocidade;
    posicaoPassaro[1] += direcaoPassaro[1] * velocidade;
    
    contadorAsa += 1;

    if (contadorAsa > 10) {//Verifica se o contador atingiu o ponto paramudar a imagem do passaro
        
        if (imagemAtual === imagemPassaro1) {
            imagemAtual = imagemPassaro2;
        } else {
            imagemAtual = imagemPassaro1;
        }

        contadorAsa = 0;
    }

    if (posicaoPassaro[0] <= 0 || posicaoPassaro[0] >= LARGURA - 50) {
        direcaoPassaro[0] *= -1;
    }

    if (posicaoPassaro[1] <= 0 || posicaoPassaro[1] >= ALTURA - 50) {
        direcaoPassaro[1] *= -1;
    }

}

function animarQueda(callback) {
    
    function queda() {
        
        if (posicaoPassaro[1] < ALTURA - 50) {
            
            ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);
            mostrarTexto(`Pontuação: ${pontuacao}`, FONTE, PRETO, 10, 30, 'left');
            posicaoPassaro[1] += 10;
            ctx.drawImage(imagemPassaroCaindo, posicaoPassaro[0], posicaoPassaro[1], 50, 50);
            requestAnimationFrame(queda);

        } else {

            passaroAtingido = false;
            posicaoPassaro = [
                Math.floor(Math.random() * (LARGURA - 50)),
                Math.floor(Math.random() * (ALTURA - 50))
            ];

            if (callback) callback();
            
        }

    }

    queda();

}

function verificarClick(event) {

    if (!rodando || passaroAtingido) return;

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (
        posicaoPassaro[0] <= x &&
        posicaoPassaro[0] + 50 >= x &&
        posicaoPassaro[1] <= y &&
        posicaoPassaro[1] + 50 >= y
    ) {

        pontuacao++;
        salvarPontuacaoAcumulada(pontuacao);
        passaroAtingido = true;

        animarQueda(function() {
            passaroAtingido = false;
        });
        velocidade += 0.5;

    } else {
        
        clicadoIncorretamente = true;
        rodando = false;
        telaGameOver();

    }
    
}

function telaGameOver() {

    ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);
    mostrarTexto('Game Over!', FONTE_MENU, PRETO, LARGURA/ 2, ALTURA / 2 -50);
    mostrarTexto(`Pontuação: ${pontuacao}`, FONTE, PRETO, LARGURA/ 2, ALTURA / 2 +100);
    mostrarTexto('Clique para voltar ao menu.', FONTE, PRETO, LARGURA/ 2, ALTURA / 2 + 60);

    setTimeout(() => {
        canvas.addEventListener('mousedown', voltarMenu);
    }, 1000);
    
}

function voltarMenu() {
    
    canvas.removeEventListener('mousedown', voltarMenu);
    main();

}

function verificarCarregamento() {
    
    imagensCarregadas++;

    if (imagensCarregadas === totalImagens) {
        
        pontuacaoAcumulada = carregarPontuacao();
        main();

    }

}

function erroCarregamento(e) {
    console.error(`Erro ao carregar a imagem: ${e.target.src}`);
}

imagemFundo.onload = verificarCarregamento;
imagemPassaro1.onload = verificarCarregamento;
imagemPassaro2.onload = verificarCarregamento;
imagemPassaroCaindo.onload = verificarCarregamento;

imagemFundo.onerror = erroCarregamento;
imagemPassaro1.onerror = erroCarregamento;
imagemPassaro2.onerror = erroCarregamento;
imagemPassaroCaindo.onerror = erroCarregamento;

window.onload = function () {
    
    if (imagemFundo.complete) verificarCarregamento();
    if (imagemPassaro1.complete) verificarCarregamento();
    if (imagemPassaro2.complete) verificarCarregamento();
    if (imagemPassaroCaindo.complete) verificarCarregamento();

}



