const canvas = document.getElementById('canvasJogo');
const ctx = canvas.getContext('2d');

const larguraTela = canvas.width;
const alturaTela = canvas.height;
const larguraCano = 70;

let gravidade = 0.25;
let movimentoPassaro = 0;
let jogoAtivo = false;
let pontuacao = 0;
let velocidadeCanos = 2;
let limitePontuacao = 5;
let pontuacaoMaxima = parseInt(localStorage.getItem('pontuacaoMaxima') || '0', 10);
let passaroY = alturaTela / 2;
let passaroX = 100;
let listaDeCanos = [];

const imagemFundo = new Image();
imagemFundo.src = 'fundo.png';

const imagemPassaro = new Image();
imagemPassaro.src = 'passaro.png';

const imagemCano = new Image();
imagemCano.src = 'cano.png';

const botaoComecar = document.getElementById("botaoComecar");

function iniciarJogo() {
    
    jogoAtivo = true;
    listaDeCanos = [];

    passaroY = alturaTela/2;

    movimentoPassaro = 0;
    pontuacao = 0;
    gravidade = 0.25;
    velocidadeCanos = 2;
    limitePontuacao = 5;

    botaoComecar.style.display = 'none';

    loopJogo();

}

function criarCano() {
    
    const tamanhoGap = Math.floor(Math.random() * 50) + 100;//Tamanho dos espaço entre o cano inferior e superior
    const posicaoGap = Math.floor(Math.random() * (alturaTela - tamanhoGap - 100)) + 50;//Posicao vertical

    listaDeCanos.push({x: larguraTela, y:posicaoGap, gap: tamanhoGap});


}

function desenharFundo() {
    
    ctx.drawImage(imagemFundo, 0, 0, larguraTela, alturaTela);

}
function desenharPassaro() {
    
    ctx.drawImage(imagemPassaro, passaroX, passaroY, 34, 23);

}
function desenharCanos() {
    
    listaDeCanos.forEach(cano => {

        ctx.save();
        ctx.translate(cano.x + larguraCano / 2, cano.y - imagemCano.height / 2);
        ctx.rotate(Math.PI);//Gira o posicionamento do proximo cano em 180°
        ctx.drawImage(imagemCano, -larguraCano / 2, -imagemCano.height / 2, larguraCano, imagemCano.height);//Cano superior
        ctx.restore();//Restaura o estado para evitar interferencias posteriorer
        ctx.drawImage(imagemCano, cano.x, cano.y + cano.gap, larguraCano, imagemCano.height);//Cano inferior

    });

}

function moverCanos() {
    
    listaDeCanos.forEach(cano => {

        cano.x -= velocidadeCanos;

    });

    listaDeCanos = listaDeCanos.filter(cano => cano.x > -larguraCano);

}

function verificarColisoes() {
    
    for (const cano of listaDeCanos) {
        
        if (
            (passaroY + 35 < cano.y || passaroY -12 > cano.y + cano.gap) &&
            (passaroX + 17 > cano.x && passaroX < cano.x + larguraCano)
        ) {
          
            jogoAtivo = false;

            botaoComecar.textContent = 'Tentar Novamente';
            botaoComecar.style.display = 'block';
            atualizarPontuacaoMaxima();
            return;

        } 

    }

    if (passaroY <= 0 || passaroY >= alturaTela - 24) {
        
        jogoAtivo = false;
        botaoComecar.textContent = 'Tentar Novamente';
        botaoComecar.style.display = 'block';
        atualizarPontuacaoMaxima();

    } 

}

function exibirPontuacao() {
    
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(`Pontuação: ${Math.floor(pontuacao)}`, 10, 30);
    ctx.fillText(`Recorde: ${pontuacaoMaxima}`, larguraTela - 150, 30);

}

function atualizarPontuacaoMaxima() {
    
    if (pontuacao > pontuacaoMaxima) {
        
        pontuacaoMaxima = Math.floor(pontuacao);

        localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima)

    }

}

function loopJogo() {
    
    if(!jogoAtivo) return;

    ctx.clearRect(0, 0, larguraTela, alturaTela);

    desenharFundo();
    desenharPassaro();
    desenharCanos();

    movimentoPassaro += gravidade;
    passaroY += movimentoPassaro;

    moverCanos();
    verificarColisoes();

    pontuacao += 0.01;
    exibirPontuacao();

    if (pontuacao >= limitePontuacao) {
        velocidadeCanos += 0.05;
        gravidade += 0.005;
        limitePontuacao += 5;
    }

    if (listaDeCanos.length === 0 || listaDeCanos[listaDeCanos.length - 1].x < larguraTela - 300) {
        criarCano();
    }

    requestAnimationFrame(loopJogo);

}

document.addEventListener('keydown', (evento) => {

    if (evento.code === 'Space' && jogoAtivo) {
        movimentoPassaro = -6;
    } else if (evento.code === 'Space' && !jogoAtivo) {
        iniciarJogo();
    }

})

botaoComecar.onclick =() =>  iniciarJogo();