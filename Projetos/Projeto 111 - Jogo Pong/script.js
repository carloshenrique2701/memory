const canvas = document.getElementById('pongCanvas');
const contexto = canvas.getContext('2d');

canvas.width  = 800;
canvas.height = 600;

const larguraRaquete = 10;
const alturaRaquete = 100;
const velocidadeRaquete = 8;
const jogador = {

    x: 0 + 7,
    y: canvas.height / 2 - alturaRaquete / 2,
    largura: larguraRaquete,
    altura: alturaRaquete,
    cor: '#fff',
    dy: 0,
    pontos: 0,
    vidas: 3

};
const computador = {

    x: canvas.width - larguraRaquete - 7,
    y: canvas.height / 2 - alturaRaquete / 2,
    largura: larguraRaquete,
    altura: alturaRaquete,
    cor: '#fff',
    dy: 4,
    pontos: 0

};
const bola = {

    x: canvas.width / 2,
    y: canvas.height / 2,
    raio: 7,
    dx: 5, 
    dy: 4,
    cor: '#fff',
    acelerada: false,
    velocidadeOriginal: {
        dx: 5,
        dy: 4
    }

};

let totalPontos = parseInt(localStorage.getItem('totalPontos')) || 0;
let jogoAtivo = true;

function desenharRaquete(x, y, largura, altura, cor) {
    
    contexto.fillStyle = cor;
    contexto.fillRect(x, y, largura, altura)

}
function desenharBola(x, y, raio, cor) {
    
    contexto.fillStyle = cor;
    contexto.beginPath();
    contexto.arc(x, y, raio, 0, Math.PI * 2, false);
    contexto.closePath();
    contexto.fill();

}

function desenharCampo() {
    
    contexto.fillStyle = '#fff';
    contexto.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);

}

function desenhar() {
    
    contexto.clearRect(0,0,canvas.width, canvas.height);
    desenharCampo();
    desenharRaquete(jogador.x, jogador.y, jogador.largura, jogador.altura, jogador.cor);
    desenharRaquete(computador.x, computador.y, computador.largura, computador.altura, computador.cor);
    desenharBola(bola.x, bola.y, bola.raio, bola.cor)

}

function loopJogo() {
    
    atualizar();
    desenhar();
    requestAnimationFrame(loopJogo)

}

function atualizar() {
    
    if (jogoAtivo) {
        moveRaquetes();
        moveBola();
    }

}

function moveRaquetes() {
    
    jogador.y += jogador.dy;

    if(jogador.y < 0) jogador.y = 0;
    if(jogador.y + jogador.altura >  canvas.height) jogador.y = canvas.height - jogador.altura;
    
    if (bola.y < computador.y + computador.altura / 2) {
        computador.y-= computador.dy;
    } else {
        computador.y += computador.dy;
    }

    if(computador.y < 0) computador.y = 0;
    if(computador.y + computador.altura >  canvas.height) computador.y = canvas.height - computador.altura;

}

function moveBola() {
    
    bola.x += bola.dx;
    bola.y += bola.dy;

    if (bola.y - bola.raio < 0 || bola.y + bola.raio > canvas.height) {
        //Verifica se a bola tocou na borda superior ou inferior do canvas
        bola.dy *= -1;
    }

    if (
        (bola.x - bola.raio < jogador.x + jogador.largura && bola.y > jogador.y && bola.y < jogador.y + jogador.altura)||
        (bola.x + bola.raio > computador.x && bola.y > computador.y && bola.y < computador.y + computador.altura)
    ) { //Verifica se a bola tocou na raquete do jogador ou do computador
        bola.dx *= -1;
    }

    if (bola.x - bola.raio < 0) {
        computador.pontos++;
        jogador.vidas--;
        atualizarPontuacao();
        verificarFimDeJogo();
        resetBola();
    } else if (bola.x + bola.raio > canvas.width) {
        jogador.pontos++;
        totalPontos++;

        localStorage.setItem('totalPontos', totalPontos);
        atualizarPontuacao();
        verificarFimDeJogo();
        resetBola();
    }
}

function atualizarPontuacao() {

    document.getElementById("pontuaçaoJogador").textContent = 'Jogador: ' + jogador.pontos;
    document.getElementById("pontuaçaoComputador").textContent = 'Computador: ' + computador.pontos;
    document.getElementById("vidasJogador").textContent = 'Vidas: ' + jogador.vidas;
    document.getElementById("totalPontos").textContent = 'Vidas: ' + jogador.totalPontos;
    
}

function verificarFimDeJogo() {
    if (jogador.vidas <= 0) {
        mostrarMensagem('Você perdeu...');

        document.getElementById('continuarJogo').style.display = 'inline-block';
        document.getElementById('jogarNovamente').style.display = 'none';

        jogador.vidas = 3;
        jogoAtivo = false;

    } else if (jogador.pontos >= 10) {
        mostrarMensagem('Você ganhou!');

        document.getElementById('continuarJogo').style.display = 'none';
        document.getElementById('jogarNovamente').style.display = 'inline-block';

        jogoAtivo = false;

    }
}

function mostrarMensagem(mensagem) {
    
    const modal = document.getElementById("modal");
    const mensagemElement = document.getElementById('mensagem');

    mensagemElement.textContent = mensagem;
    modal.style.display = 'flex'

}

function resetBola() {

    bola.x = canvas.width / 2;
    bola.y = canvas.height / 2;
    bola.dx = bola.velocidadeOriginal.dx * (Math.random() > 0.5 ? 1 : -1);
    bola.dy = bola.velocidadeOriginal.dy * (Math.random() > 0.5 ? 1 : -1);
    
    if (bola.acelerada) {
        bola.dx *= 2;
        bola.dy *= 2;
    }

}

document.addEventListener("keydown", function (event) {
    
    if (event.key === "ArrowUp") {
        jogador.dy = -velocidadeRaquete;
    } else if (event.key === "ArrowDown") {
        jogador.dy = velocidadeRaquete;
    } else if (event.key === "Shift" && !bola.acelerada) {
        bola.dx *= 2;
        bola.dy *= 2;
        bola.acelerada = true;
    } 

});

document.addEventListener("keyup", function (event) {
   if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        jogador.dy = 0;
   } else if (event.key === 'Shift' && bola.acelerada) {
        bola.dx /= 2;
        bola.dy /= 2;
        bola.acelerada = false;
   }
});

function reiniciaJogo() {
    
    jogador.pontos = 0;
    computador.pontos = 0;
    jogador.vidas = 3;
    jogoAtivo = true;
    atualizarPontuacao();
    resetBola();

    document.getElementById('modal').style.display = 'none';

}

function continuarJogo() {
    
    jogador.pontos = 0;
    computador.pontos = 0;
    jogador.vidas = 3;
    jogoAtivo = true;
    atualizarPontuacao();
    resetBola();

    document.getElementById('modal').style.display = 'none';

}

document.getElementById('jogarNovamente').addEventListener('click', reiniciaJogo);
document.getElementById('continuarJogo').addEventListener('click', continuarJogo);


reiniciaJogo();
loopJogo();
