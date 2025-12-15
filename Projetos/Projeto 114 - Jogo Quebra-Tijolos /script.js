const CANVAS = document.getElementById('meuCanvas');
const CTX = CANVAS.getContext('2d');
CANVAS.width = 900;
CANVAS.height = 600;

const BARRA_ALTURA = 15;
const BARRA_LARGURA = 100;
const BARRA_HEIGHT = CANVAS.height - BARRA_ALTURA - 10;
let barraX = ((CANVAS.width - BARRA_LARGURA )/ 2);

const BOLA_RAIO = 10;
let x = CANVAS.width / 2;
let y = CANVAS.height - 45;
let dx = 3;
let dy = -3;

const TIJOLO_LINHA_COUNT = 5;
const TIJOLO_COLUNA_COUNT = 10;
const TIJOLO_LARGURA = 75;
const TIJOLO_ALTURA = 20;
const ESPACAMENTO_TIJOLO = 10;
const DESLOCAMENTO_SUPERIOR_TIJOLO = 30;
const DESLOCAMENTO_ESQUERDA_TIJOLO = 30;

let tijolos = [];
let direitaPrecionada = false;
let esquerdaPrecionada = false;

let pontos = localStorage.getItem('pontosTijolos') ? parseInt(localStorage.getItem('pontosTijolos')) : 0;
document.getElementById('pontos').innerText = pontos;

function criarTijolos() {
    
    for (let c = 0; c < TIJOLO_COLUNA_COUNT; c++) {
        
        tijolos[c] = [];

        for (let r = 0; r < TIJOLO_LINHA_COUNT; r++) {
           
            tijolos[c][r] = {x: 0, y:0, status: 1};
            /*  

            Array 2d comum

            let tijolos = [
                    coluna    coluna    coluna    coluna
                [  {tijolo}, {tijolo}, {tijolo}, {tijolo} ], linha
                [  {tijolo}, {tijolo}, {tijolo}, {tijolo} ], linha
                [  {tijolo}, {tijolo}, {tijolo}, {tijolo} ]  linha

            ];

            */
            
        }
        
    }

}

function desenharBarra() {
    
    CTX.beginPath();
    CTX.rect(barraX, CANVAS.height - BARRA_ALTURA - 10, BARRA_LARGURA, BARRA_ALTURA);
    CTX.fillStyle = '#0095dd';
    CTX.fill();
    CTX.closePath();

}

function desenharTijolos() {
    
    const cores = ["#FF5733", "#FFBD33", "#75FF33", "#33FF57", "#33FFBD", "#3375FF", "#8E33FF"];

    for (let c = 0; c < TIJOLO_COLUNA_COUNT; c++) {
        for (let r = 0; r < TIJOLO_LINHA_COUNT; r++) {
           
            if (tijolos[c][r].status == 1) {
                
                const tijolosX = c * (TIJOLO_LARGURA + ESPACAMENTO_TIJOLO) + DESLOCAMENTO_ESQUERDA_TIJOLO;
                const tijolosY = r * (TIJOLO_ALTURA + ESPACAMENTO_TIJOLO) + DESLOCAMENTO_SUPERIOR_TIJOLO;

                tijolos[c][r].x = tijolosX;
                tijolos[c][r].y = tijolosY;

                CTX.beginPath();
                CTX.rect(tijolosX,tijolosY, TIJOLO_LARGURA, TIJOLO_ALTURA);
                CTX.fillStyle = cores[r % cores.length];
                CTX.fill();
                CTX.closePath();

            }
            
        }
    }

}

function desenharBola() {
    
    CTX.beginPath();
    CTX.arc(x, y, BOLA_RAIO, 0, Math.PI * 2);
    CTX.fillStyle = '#0095dd';
    CTX.fill();
    CTX.closePath();

}

function colisoes() {
    
    for (let c = 0; c < TIJOLO_COLUNA_COUNT; c++) {
        for (let r = 0; r < TIJOLO_LINHA_COUNT; r++) {
            
            const b = tijolos[c][r];

            if (b.status == 1) {
                if (x > b.x && x < b.x + TIJOLO_LARGURA && y > b.y && y < b.y + TIJOLO_ALTURA) {
                    //Verifica colisão da bola e os tijolos

                    dy = -dy;//Ricochete da bola
                    b.status = 0;//status = 0 significa que o tijolo não é desenhado desenharTijolos()
                    pontos++;

                    localStorage.setItem('pontosTijolos', pontos);
                    document.getElementById('pontos').innerText = pontos;

                    if (todosTijolosQuebrados()) {
                        proximaFase();
                    }
                }
            }
        }
    }
}

function todosTijolosQuebrados() {
    
    for (let c = 0; c < TIJOLO_COLUNA_COUNT; c++) {
        for (let r = 0; r < TIJOLO_LINHA_COUNT; r++) {
            if (tijolos[c][r].status == 1) {
                return false;
            }
        }
    }

    return true;
}

function proximaFase() {
    
    criarTijolos();

    //Reseta a posição da bola e aumenta a velocidade da bola;
    x = CANVAS.width / 2;
    y = CANVAS.height - 45;
    dx += 1; 
    dy = dy > 0 ? dy + 1 : dy - 1;
    barraX = (CANVAS.width - BARRA_LARGURA) / 2;


}

document.addEventListener('keydown', manipuladorTeclaPressionada);
document.addEventListener('keyup', manipuladorTeclaSolta);
document.addEventListener('mousemove', manipuladorMovimentoMouse);

function manipuladorTeclaPressionada(e) {
    if (e.key == 'Right' || e.key === "ArrowRight") {
        direitaPrecionada = true;
    } else if (e.key == 'Left' || e.key === 'ArrowLeft') {
        esquerdaPrecionada = true;
    }
}

function manipuladorTeclaSolta(e) {
    if (e.key == 'Right' || e.key === "ArrowRight") {
        direitaPrecionada = false;
    } else if (e.key == 'Left' || e.key === 'ArrowLeft') {
        esquerdaPrecionada = false;
    }
}

function manipuladorMovimentoMouse(e) {

    const relativeX = e.clientX - CANVAS.offsetLeft;//Captura os movimentos do mouse no eixo x

    if (relativeX - BARRA_LARGURA / 2 > 0 && relativeX + BARRA_LARGURA / 2 < CANVAS.width) {
        //Verifica se o ponto do mouse estão nos limites laterais do canvas
        barraX = relativeX - BARRA_LARGURA / 2
    }

}

function loopPrincipal() {

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    desenharBola()
    desenharBarra();
    desenharTijolos();
    colisoes();

    if (x + dx > CANVAS.width - BOLA_RAIO || x + dx < BOLA_RAIO) dx = -dx;//Ricochete das laterais do canvas
    if (y + dy < BOLA_RAIO) {//Ricochete da parte superior do canvas
        dy = -dy;
    } else if (x > barraX && x < barraX + BARRA_LARGURA && y + dy >= BARRA_HEIGHT) {
        //Verifica se a bola esta dentro da largura da barra e na altura da barra
        dy = -dy;
    } else  if (y + dy > CANVAS.height - BOLA_RAIO + BARRA_ALTURA) { //Verifica se atingiu a borda inferior
        
        alert('Você perdeu!');
        document.location.reload()
        
    }

    //Controle de teclas
    if (direitaPrecionada && barraX < CANVAS.width - BARRA_LARGURA) {
        barraX += 7;
    } else if (esquerdaPrecionada && barraX > 0) {
        barraX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(loopPrincipal);
    
    
}

criarTijolos();
loopPrincipal();
