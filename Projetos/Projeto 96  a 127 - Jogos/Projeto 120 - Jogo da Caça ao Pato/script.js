const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const fundoImg = new Image();
fundoImg.src = 'fundo.png';

const patoImg1 = new Image();
patoImg1.src = 'pato_voando1.png';

const patoImg2 = new Image();
patoImg2.src = 'pato_voando2.png';

const bolaImg = new Image();
bolaImg.src = 'bola.png';

let carregando = false;
let posMouseInicial = null;
let bola = null;
let pontuacao = 0;
let clicouErrado = false;
let jogando = false;

let pato = {

    x: canvas.width,
    y: getRandomY(),
    dx: -3,
    alterna: false,
    contador: 0

}

const estilingue = {

    x: canvas.width / 2,
    y: canvas.height - 120

}


let pontuacaoAcumulada = carregarPontuacao();

function getRandomY() {
    return Math.floor(Math.random() * (canvas.height / 2 - 50)) + 50;
}

function carregarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoAcumulada', 10)) || 0;
}

function salvarPontuacao(pontos) {
    
    if (pontuacao > pontuacaoAcumulada) {
        pontuacaoAcumulada = pontos;
        localStorage.setItem('pontuacaoAcumulada', pontuacaoAcumulada);
    }

}

function desenharFundo() {
    ctx.drawImage(fundoImg, 0, 0, canvas.width, canvas.height)
}

function desenharPontuacao() {

    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';

    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 20);
    ctx.fillText(`Record: ${pontuacaoAcumulada}`, 10, 50);
    
}

function desenharBola() {

    if (bola) {
        
        ctx.drawImage(bolaImg, bola.x, bola.y, 40, 40);

        bola.x += bola.vx;
        bola.y += bola.vy;

        if (bola.x < 0 || bola.x > canvas.width || bola.y < 0 || bola.y > canvas.height) clicouErrado = true;

        //Verifica colisões da bola com o bato e os limites do canvas
        const patoRect = {

            x: pato.x,
            y: pato.y,
            width: 60,
            height: 60

        }

        const bolaRect = {

            x: bola.x,
            y: bola.y,
            width: 40,
            height: 40

        }

        if (
            bolaRect.x < patoRect.x + patoRect.width &&
            bolaRect.x + patoRect.width > patoRect.x &&
            bolaRect.y < patoRect.y + patoRect.height &&
            bolaRect.y + patoRect.height > patoRect.y
        ) {

            pontuacao++;
            salvarPontuacao(pontuacao);

            bola = null;
            pato.x = canvas.width;
            pato.y = getRandomY();
            
        }

    }
    
}

function desenharEstilingue() {

    if (carregando && posMouseInicial) {
        //Se está carregando e existir uma posicao no mouse
        
        //Pega as coordenadas do mouse
        const mouseX = posMouseInicial.x;
        const mouseY = posMouseInicial.y;

        ctx.beginPath();
        ctx.moveTo(estilingue.x, estilingue.y);//Ponto inicial do estilingue
        ctx.lineTo(mouseX, mouseY);//Desenha a linha até a posicao do mouse

        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

    }

    //Posicao inicial da bola
    ctx.drawImage(bolaImg, estilingue.x - 20, estilingue.y - 20, 40, 40)
    
}

function desenharPato() {
    
    pato.contador++;

    if (pato.contador % 15 === 0) pato.alterna = !pato.alterna;

    const img = pato.alterna ? patoImg1 : patoImg2;

    ctx.drawImage(img, pato.x, pato.y, 60, 60);

}

function moverPato() {

    pato.x += pato.dx;

    if (pato.x < - 60) {
        pato.x = canvas.width;
        pato.y = getRandomY();
    }
    
}

function telaGameOver() {
    
    console.log('Game Over');
    desenharFundo();

    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';
    let titulo = 'Game Over';
    let tamanhoTitulo = ctx.measureText(titulo).width / 2
    ctx.fillText(titulo, 200 - tamanhoTitulo, 200);

    ctx.font = '20px Arial'
    let msg1 = `Pontuação Final: ${pontuacao}`;
    let tamanhoMsg1 = ctx.measureText(msg1).width / 2
    ctx.fillText(msg1, 200 - tamanhoMsg1, 250);

    let msg2 = `Recorde: ${pontuacaoAcumulada}`;
    let tamanhoMsg2 = ctx.measureText(msg2).width / 2
    ctx.fillText(msg2, 200 - tamanhoMsg2, 300);

    let msg3 = `Clique aqui para reiniciar.`;
    let tamanhoMsg3 = ctx.measureText(msg3).width / 2
    ctx.fillText(msg3, 200 - tamanhoMsg3, 350);

}

function telaInicial() {

    desenharFundo();

    ctx.fillStyle = '#000';
    ctx.font = ' 30px Arial';
    let titulo = 'Caça ao Pato';
    let tamanhoTitulo = ctx.measureText(titulo).width / 2
    ctx.fillText(titulo, 200 - tamanhoTitulo, 200);

    ctx.font = '20px Arial';
    let acaoTxt = 'Clique aqui para iniciar.';
    let tamanhoAcaoTxt = ctx.measureText(acaoTxt).width / 2
    ctx.fillText(acaoTxt, 200 - tamanhoAcaoTxt, 300);

}

canvas.addEventListener('mousedown', (e) => {

    if (!jogando && !clicouErrado) jogando = true; //Começa o jogo

    else if (clicouErrado) {
        //Verifica se o jogador clicou após errar um disparo

        pontuacao = 0;
        clicouErrado = false;
        jogando = false;//Pausa o jogo até outra iteração aconteça
        bola = null;
        pato.x = canvas.width;
        pato.y = getRandomY();

    }

    else if (!carregando && jogando && !clicouErrado) {
        //Caso o jogo esteja ativo, não errou um tiro, mas o estilingue 
            // não está carregado.

        carregando = true;
        posMouseInicial = {x: e.offsetX, y: e.offsetY};

        bola = {

            x: estilingue.x,
            y: estilingue.y,
            vx: 0,
            vy: 0

        }

    }

});

canvas.addEventListener('mousemove', (e) => {

    if (carregando) { //Atualiza a pontuação atual do mouse para o estilingue
        posMouseInicial = {
            x: e.offsetX,
            y: e.offsetY
        }
    }

});

canvas.addEventListener('mouseup', (e) => {

    if (carregando) {//Verifica se o estilingue está carregando

        //Diferença do estiligue e a posição atual do mouse
        const dx = estilingue.x - e.offsetX;
        const dy = estilingue.y - e.offsetY;

        //Distancia entre dois pontos, usando o Teorema de Pitágoras
        const dist = Math.sqrt(dx * dx + dy * dy);

        //Limita a potência para 20, evitando valores excessivos
        const potencia = Math.min(dist / 5, 20);

        bola.vx = (dx / dist) * potencia;//Velocidade X
        bola.vy = (dy / dist) * potencia;//Velocidade Y

        carregando = false;

    }

})

function jogo() {
    
    ctx.clearRect(0, 0, canvas.width,canvas.height);

    if (clicouErrado) telaGameOver();
    
    else if(!jogando) telaInicial();

    else {

        desenharFundo();
        desenharPontuacao();
        desenharPato();
        moverPato();
        desenharEstilingue();
        desenharBola();

    }

    requestAnimationFrame(jogo)

}

jogo();