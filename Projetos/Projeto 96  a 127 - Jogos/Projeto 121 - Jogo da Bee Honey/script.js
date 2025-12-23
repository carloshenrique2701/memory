const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d');
const menuInicial = document.getElementById("menuInicial");
const telaGameOver = document.getElementById("telaGameOver");
const botaoIniciar = document.getElementById("botaoIniciar");
const botaoReiniciar = document.getElementById("botaoReiniciar");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");
const exibirPontuacaoMenu = document.getElementById("exibirPontuacaoMenu");

const imagemAbelha = new Image();
imagemAbelha.src = 'abelha.png';

const imagemAranha = new Image();
imagemAranha.src = 'aranha.png';

const imagemFruta = new Image();
imagemFruta.src = 'fruta.png';

const imagemTeia = new Image();
imagemTeia.src = 'teia.png';

const AMARELO = '#FFDF5A';
const PRETO = '#000';

const LARGURA = canvas.width;
const ALTURA = canvas.height;

let abelha = {

    x: LARGURA / 2 - 25,
    y: ALTURA -80, 
    largura: 50,
    altura: 50,
    velocidade: 5,
    dx: 0,
    dy: 0

}

let aranhas = [];
let frutas = [];
let teias = [];

let pontuacao = 0;
let jogando = false;
let velocidadeAranhaBase = 2;
let velocidadeAbelha = 5;
let aranhaTimer = 0;
let frutaTimer = 0;

const maxAranhas = 5;
const teclasPressionadas = [];

function carregarPontuacao() {
    
    const pontuacaoSalva = localStorage.getItem('pontuacao');

    if (pontuacaoSalva) {
        pontuacao = parseInt(pontuacaoSalva);
    } else {
        pontuacao = 0;
    }

    salvarPontuacao();

}

function salvarPontuacao() {
    
    localStorage.setItem('pontuacao', pontuacao);

}

function mostrarMenuInicial() {
    
    menuInicial.classList.remove('oculto');

    telaGameOver.classList.add("oculto");
    canvas.classList.add("oculto");


}

function novaAranha() {

    if (aranhas.length < maxAranhas) {
        
        const x = Math.random() * (LARGURA - 60);
        const y = -60;

        const velocidadeY = velocidadeAranhaBase + Math.floor(pontuacao / 10);
        const velocidadeX = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2 + 1);
        const soltaTeia = Math.random() < 0.3;
        
        aranhas.push({
            x,
            y,
            velocidadeX,
            velocidadeY,
            largura: 80,
            altura: 60,
            soltaTeia
        });

    }
    
}
function novaFruta() {

    const x = Math.random() * (LARGURA - 20);
    const y = -20;

    frutas.push({x, y, largura: 20, altura: 20});
    
}
function novaTeia(x, y) {

    teias.push({x, y, largura: 100, altura: 100, velocidadeY: 4})
    
}

function verificarColisao(obj1, obj2) {
    
    return (
        obj1.x < obj2.x + obj2.largura &&
        obj1.x + obj1.largura > obj2.x  &&
        obj1.y < obj2.y + obj2.altura &&
        obj1.y + obj1.altura > obj2.y
    );

}

function mostrarTelaGameOver() {
    
    pontuacaoFinal.textContent = pontuacao;
    
    telaGameOver.classList.remove('oculto');
    menuInicial.classList.add('oculto');
    canvas.classList.add('oculto')

}

function exibirPontuacao() {
    
    ctx.fillStyle = PRETO;
    ctx.font = '24px Arial';
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30);
    exibirPontuacaoMenu.textContent = pontuacao;

}

function exibirTexto(texto, fonte, cor, x, y) {
    
    ctx.fillStyle = cor;
    ctx.font = fonte;
    ctx.textAlign = 'center';
    ctx.fillText(texto, x, y);

}

function iniciarJogo() {
    
    abelha.x = LARGURA / 2 - abelha.largura / 2;
    abelha.y = ALTURA - 80;
    abelha.dx = 0;
    abelha.dy = 0;
    pontuacao = 0;
    velocidadeAbelha = 5;

    aranhas = [];
    frutas = [];
    teias = [];

    aranhaTimer = 0;
    frutaTimer = 0;

    jogando = true;

    menuInicial.classList.add('oculto');
    telaGameOver.classList.add('oculto');

    canvas.classList.remove('oculto');

    requestAnimationFrame(loopJogo);

}

function loopJogo() {
    
    if(!jogando) return;

    ctx.fillStyle = AMARELO;
    ctx.fillRect(0, 0, LARGURA, ALTURA-2);//2px da borda do canvas

    //Atualiza a movimentação da abalha a todo instante
    abelha.x += abelha.dx;
    abelha.y += abelha.dy;

    //Impede que a abelha passe das bordas do canvas
    if (abelha.x < 0) abelha.x = 0;
    if (abelha.x + abelha.largura > LARGURA) abelha.x = LARGURA - abelha.largura;

    if (abelha.y < 0) abelha.y = 0;
    if (abelha.y + abelha.altura > ALTURA) abelha.y = ALTURA - abelha.altura;

    //Timer para adição de aranhas e frutas no jogo
    aranhaTimer++;
    frutaTimer++;

    //Limite de tempo para acrescentar uma nova aranha ou uma nova fruta com base na pontuacao
        //deixando assim, a dificuldade intercalada com a pontuacao.
    const limiteAranha = 200 - pontuacao;

    if (aranhaTimer > limiteAranha) {
        novaAranha()
        aranhaTimer = 0;
    }

    const limiteFruta = 300 - pontuacao;

    if (frutaTimer > limiteFruta) {
        novaFruta();
        frutaTimer = 0;
    }

    aranhas.forEach((aranha, index) => {

        //Atualiza as posições de cada aranha
        aranha.y += aranha.velocidadeY;
        aranha.x += aranha.velocidadeX;

        //Verifica se a aranha esta dentro da largura do canvas
        if (aranha.x <= 0 || aranha.x >= LARGURA - aranha.largura) aranha.velocidadeX *= -1;
        //Se ultrapassar a altura do canvas é removida
        if (aranha.y > ALTURA) aranhas.splice(index, 1);
        //Chance de 2% para soltar uma teia na frente da aranha
        if (aranha.soltaTeia && Math.random() < 0.005) 
            novaTeia(aranha.x + aranha.largura / 2 - 20, aranha.y + aranha.altura);
        //Verifica colisão de jogador e aranha
        if (verificarColisao(aranha, abelha)) {

            jogando = false;

            salvarPontuacao();
            mostrarTelaGameOver();

        }

        ctx.drawImage(imagemAranha, aranha.x, aranha.y, aranha.largura, aranha.altura);

    });

    //O mesmo que as aranhas
    frutas.forEach((fruta, index) => {

        fruta.y += 3;

        if (fruta.y > ALTURA) frutas.splice(index, 1);

        if (verificarColisao(abelha, fruta)) {
             
            frutas.splice(index, 1);
            pontuacao += 1;
            velocidadeAranhaBase += 0.01;

        }
        
        ctx.drawImage(imagemFruta, fruta.x, fruta.y, fruta.largura, fruta.altura);

    });

    //O mesmo que as aranhas
    teias.forEach((teia, index) => {

        teia.y += teia.velocidadeY;

        if (teia.y > ALTURA) teias.splice(index, 1);

        if (verificarColisao(abelha, teia)) {
            
            jogando = false;

            salvarPontuacao();
            mostrarTelaGameOver();

        }

        ctx.drawImage(imagemTeia, teia.x, teia.y, teia.largura, teia.altura);

    });

    ctx.drawImage(imagemAbelha, abelha.x, abelha.y, abelha.largura, abelha.altura);

    exibirPontuacao();

    requestAnimationFrame(loopJogo)

}

window.addEventListener('keydown', function (e) {
    
    teclasPressionadas[e.key] = true;

    //Movimento da abelha nas duas partes do teclado
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        abelha.dx = -velocidadeAbelha;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        abelha.dx = velocidadeAbelha;
    }
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        abelha.dy = -velocidadeAbelha;
    }
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        abelha.dy = velocidadeAbelha;
    }

});
window.addEventListener('keyup', function (e) {
    
    teclasPressionadas[e.key] = false;
    //Remove o movimento da abelha qndo uma dessas teclas não estiverem sendo pressionadas
    if (
        (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') ||
        (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D')
    ) {
        abelha.dx = 0;
    }
    
    if (
        (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W')  ||
        (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S')
    ) {
        abelha.dy = 0;
    }

});

botaoIniciar.addEventListener('click', function () {
    
    carregarPontuacao();
    iniciarJogo();

});
botaoReiniciar.addEventListener('click', function () {
    carregarPontuacao();
    iniciarJogo();
});

mostrarMenuInicial();
