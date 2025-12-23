const tela = document.getElementById('jogo');
const contexto = tela.getContext('2d');

const tamanhoCelula = 20;

let cabecaCobra = {x: 0, y: 10};
let fruta = {x:15, y: 15};

let direcaoX = 0;
let direcaoY = 0;

let pontuacao = parseInt(localStorage.getItem('pontuacaoAcumulada') || '0');
let jogoRodando = true; // flag para controlar o estado do jogo

atualizarPontuacao();

const cobra = [{x:10, y:10}];

function loopJogo() {
    if (jogoRodando) { // Só atualiza se o jogo estiver rodando
        atualizar();
        desenhar();
    }
    setTimeout(loopJogo, 100);
}

function desenhar() {
    
    contexto.clearRect(0, 0, tela.width, tela.height);

    //Desenha a Fruta
    contexto.fillStyle = '#ff0000';
    contexto.fillRect(fruta.x * tamanhoCelula, fruta.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
    
    //Desenha a cobra
    contexto.fillStyle = '#000';
    cobra.forEach(celula => {
        contexto.fillRect(celula.x * tamanhoCelula, celula.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
    })
}

function atualizar() {
    
    cabecaCobra.x += direcaoX;
    cabecaCobra.y += direcaoY;

    if (cabecaCobra.x < 0 || cabecaCobra.x >= tela.width / tamanhoCelula ||
        cabecaCobra.y < 0 || cabecaCobra.y >= tela.height / tamanhoCelula
    ) {
        reiniciarJogo();
        return; // Importante: evita que o código continue executando após a colisão
    } 

    if (cabecaCobra.x === fruta.x && cabecaCobra.y === fruta.y) {
        
        fruta.x = Math.floor(Math.random() * (tela.width / tamanhoCelula));
        fruta.y = Math.floor(Math.random() * (tela.height / tamanhoCelula));

        const novaCelula = {x: cobra[cobra.length - 1].x, y: cobra[cobra.length - 1].y};
        cobra.push(novaCelula);
        pontuacao++;
        atualizarPontuacao();
    }

    for (let i = cobra.length - 1; i > 0; i--) {
        cobra[i] = {...cobra[i - 1]};
    }

    cobra[0] = {...cabecaCobra};

    for (let i = 1; i < cobra.length; i++) { // Começa do 1 para não verificar a cabeça contra ela mesma
        if (cabecaCobra.x === cobra[i].x && cabecaCobra.y === cobra[i].y) {
            reiniciarJogo();
            return; // Importante: evita que o código continue executando após a colisão
        }
    }
}

function reiniciarJogo() {
    jogoRodando = false; // Pausa o jogo
    
    // Salva a pontuação antes de resetar
    localStorage.setItem('pontuacaoAcumulada', pontuacao.toString());
    
    alert('Você perdeu... Clique em OK para começar novamente');
    
    // Reseta as variáveis do jogo
    cabecaCobra = {x: 10, y: 10};
    fruta = {x: 15, y: 15};
    direcaoX = 0;
    direcaoY = 0;
    cobra.length = 1;
    cobra[0] = {x: 10, y: 10};
    
    jogoRodando = true; // Reinicia o jogo
}

function atualizarPontuacao() {
    document.getElementById('pontuacao').textContent = 'Pontuação: ' + pontuacao;
    localStorage.setItem('pontuacaoAcumulada', pontuacao.toString());
}

document.addEventListener('keydown', function (e) {
    if(e.key === 'ArrowUp' && direcaoY !== 1) {
        direcaoX = 0;
        direcaoY = -1;
    } else if(e.key === 'ArrowDown' && direcaoY !== -1) {
        direcaoX = 0;
        direcaoY = 1;
    } else if(e.key === 'ArrowLeft' && direcaoX !== 1) {
        direcaoX = -1;
        direcaoY = 0;
    } else if(e.key === 'ArrowRight' && direcaoX !== -1) {
        direcaoX = 1;
        direcaoY = 0;
    }
})

loopJogo();