const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let posX_mao = 0;
let posY_mao = 100;
let velocidade_mao = 2;

let objetoSolto = false;
let posX_objeto = posX_mao + 20;
let posY_objeto = posY_mao + 50;
let velocidade_objeto = 5;

let pontos = 0;

let posX_cesta = canvas.width / 2 - 35;
let posY_cesta = canvas.height - 80;

let jogoAtivo = true;

const imagemMao = new Image();
imagemMao.src = 'mao.png';

const imagemObjeto = new Image();
imagemObjeto.src = 'nuvem.png';

const imagemCesta = new Image();
imagemCesta.src = 'lixeira.png';

function carregarPontuacaoAcumulada() {
    return parseInt(localStorage.getItem('pontuacaoAcumulada')) || 0;
}
function salvarPontuacaoAcumulada(pontos) {
    
    let pontuacaoAtual = carregarPontuacaoAcumulada();

    if (pontuacaoAtual < pontos) {
        
        pontuacaoAtual = pontos;

        localStorage.setItem('pontuacaoAcumulada', pontuacaoAtual);

        document.getElementById('recorde').textContent = pontuacaoAtual;

    }

}

function desenhar() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(imagemMao, posX_mao, posY_mao, 80, 80);
    ctx.drawImage(imagemCesta, posX_cesta, posY_cesta, 70, 70);
    ctx.drawImage(imagemObjeto, posX_objeto, posY_objeto, 40, 40);

    document.getElementById('pontuacao').textContent = pontos;

}

function jogo() {
    
    if (!jogoAtivo) return;

    if (!objetoSolto) {//Verifica se o não objeto foi solto

        posX_mao += velocidade_mao;

        if (posX_mao > canvas.width - 80 || posX_mao < 0) {//Verifica se a mão atingiu os limites laterais do canvas
            velocidade_mao *= -1;
        }

        posX_objeto = posX_mao + 20;
        posY_objeto = posY_mao + 50;

    } else {//Se o objeto foi solto

        posY_objeto += velocidade_objeto;

        if (//Verifica colisão do objeto com a cesta
            posY_objeto + 40 >= posY_cesta &&
            posX_objeto + 40 > posX_cesta && 
            posX_objeto < posX_cesta + 70
        ) {

            pontos++;

            velocidade_mao += 0.5;
            velocidade_objeto += 0.5;
            
            objetoSolto = false;

            posY_objeto = posY_mao + 50;//Deixa o objeto na mão novamente
            posX_mao = 0;

            posX_cesta = Math.floor(Math.random() * (canvas.width - 70)); //Reposiciona a cesta
            
        } else if (posY_objeto > canvas.height) { //Verifica se errou a cesta
            fimDeJogo();
        }
        
    }

    desenhar();
    requestAnimationFrame(jogo);
    
}

canvas.addEventListener('click', () => {

    //Verifica se o objeto pode ser solto
    if (!objetoSolto && posX_objeto <= posX_mao + 80 && posY_objeto <= posY_mao + 50) {
        objetoSolto = true;
    }

})

function fimDeJogo() {
    
    jogoAtivo = false;

    salvarPontuacaoAcumulada();

    document.getElementById('fim-jogo').style.display = 'block';
    document.getElementById('pontuacao-final').textContent = pontos;


}

function reiniciarJogo() {
    
    jogoAtivo = true;
    pontos = 0;

    posX_mao = 0;
    velocidade_mao = 2;

    objetoSolto = false;
    velocidade_objeto = 5;
    
    document.getElementById('fim-jogo').style.display = 'none';
    document.getElementById('recorde').style.display = carregarPontuacaoAcumulada();
    
    requestAnimationFrame(jogo);

}

document.getElementById('recorde').textContent = carregarPontuacaoAcumulada();

imagemMao.onload = () => {
    imagemObjeto.onload = () => {
        imagemCesta.onload = () => {

            console.log('Começando o jogo...');
            desenhar();
            requestAnimationFrame(jogo);

        }
    }
}
