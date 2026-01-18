const tela = document.getElementById('canvasGame');
const contexto = tela.getContext('2d');

tela.width = 800;
tela.height = 600;

let jogoAtivo = false;
let pontuacao = 0;
let melhorPontuaacao = 0;
let obstaculosDestruidos = 0;
let posicaoXHelicoptero = 100;
let posicaoYHelicoptero = tela.height / 2;

const larguraHelicoptero = 60;
const alturaHelicoptero = 40;

let velocidadeY = 0;
const velocidadeX = 5;
const aceleracaoVertical = 0.5;
const velocidadeVerticalMaxima = 5;
const linhaFumaca = [];

const VERDE = '#00ff00';
const PRETO = '#000';
const COR_FUMACA = '#969696';
const VERMELHO = '#ff0000';
const AMARELO = '#FFFF00';

let deslocamentoTunel = 0;

const espacoTunelFixo = 300;
const larguraParedeTunel = 20;
const frequenciaTunel = 500;
const amplitudeTunel = 150;
const listaObstaculos = [];
const listaProjeteis = [];
const listaFumaca = [];

let tempoParaProximoObstaculo = 2000;
let colldownTiro = 0;
let cimaPressionado = false;
let baixoPressionado = false;
let tiroPressionado = false;

const menu = document.getElementById('menu');
const botaoJogar = document.getElementById('botaoJogar');
const pontuacaoDisplay = document.getElementById('pontuacao');
const imagemHelicoptero = new Image();
imagemHelicoptero.src = 'jogador.png';

botaoJogar.addEventListener('click', iniciarJogo);

function iniciarJogo() {

    jogoAtivo = true;
    pontuacao = 0;
    obstaculosDestruidos = 0;
    posicaoYHelicoptero = tela.height / 2;
    volocidadeY = 0;
    deslocamentoTunel = 0;
    
    listaObstaculos.length = 0;
    listaProjeteis.length = 0;
    listaFumaca.length = 0;
    
    menu.style.display = 'none';

    loopJogo();
    
}

function desenharTunel() {

    const centroTunel = tela.height / 2;

    for (let i = -1; i < tela.width / larguraParedeTunel + 2; i++) {
        
        //Calcula a posicao horizontal das paredes do tunel, levando em conta o deslocamento do tunel usando
            //a variavel 'i' que percorre em seguimentos, gerando uma efeito de movimento continuo do tunel
            //se movendo para esquerda ou direita;
        const paredeX = i * larguraParedeTunel - (deslocamentoTunel % larguraParedeTunel);

        //Calcula o offSet ondulado responsável por criara forma do tunel com uma ondulação.
        //O seno do offSet gera um valor entre -1 e 1. com o qual a altura da parede do tunel será ajustada
            //para criar a ondulação.
        //O valorde '(deslocamentoTunel + i * larguraParedeTunel)' garante que cada segmento do tunel tenha um movimento
            // próprio, enquando a frequencia controla a intensidade e a suavidade da ondulação.
        const offSet = (deslocamentoTunel + i * larguraParedeTunel) / frequenciaTunel;
        const sinOffset = Math.sin(offSet);
        
        //Calcula a altura da onda no centro do tunel levando em consideração a amplitude da ondulação.
        //O valor de 'centroTunel' representa o meio vertical da tela e a altura é ajustada pela função de seno
            //multiplicada pela amplitude, permitindo que cada onda varie para cima e para baixo ao longo da tela.
        const alturaOndulada = centroTunel + amplitudeTunel * sinOffset;
        
        //Determina as alturas do teto e do chao a partir dos calculos ja feitos para que possa desenhar o tunel.
            //Define o espaço fix que é necessário que tenha no tuneo e é dividido para determinar a posicao do
            //teto e do chao.
        const alturaTeto = alturaOndulada - espacoTunelFixo / 2;
        const alturaChao = alturaOndulada + espacoTunelFixo / 2;

        contexto.fillStyle = AMARELO;
        contexto.fillRect(paredeX, 0, larguraParedeTunel, alturaTeto);
        contexto.fillRect(paredeX, alturaChao, larguraParedeTunel, tela.height - alturaChao);
        
        if (
            (posicaoYHelicoptero < alturaTeto || posicaoYHelicoptero + alturaHelicoptero > alturaChao) &&
            posicaoXHelicoptero > paredeX && posicaoXHelicoptero < paredeX + larguraParedeTunel
        ) {
            fimDeJogo();
        }

    }
    
}

function desenharHelicoptero() {

    contexto.drawImage(
        imagemHelicoptero, 
        posicaoXHelicoptero, 
        posicaoYHelicoptero, 
        larguraHelicoptero, 
        alturaHelicoptero
    )
    
}

function desenharObstaculos() {

    listaObstaculos.forEach((obstaculo, index) => {

        obstaculo.x -= velocidadeX;

        contexto.fillStyle = VERMELHO;
        contexto.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);

        if (
            posicaoXHelicoptero < obstaculo.x + obstaculo.largura &&
            posicaoXHelicoptero + larguraHelicoptero > obstaculo.x &&
            posicaoYHelicoptero < obstaculo.y + obstaculo.altura &&
            posicaoYHelicoptero + alturaHelicoptero > obstaculo.y
        ) {
            fimDeJogo();            
        }

        if (
            obstaculo.x + obstaculo.largura < 0
        ) {
            listaObstaculos.splice(index, 1);
        }

    })
    
}

function desenharProjeteis() {

    listaProjeteis.forEach((projetil, projetilIndex) => {

        projetil.x += projetil.velocidade;

        contexto.fillStyle = AMARELO;
        contexto.beginPath();
        contexto.arc(projetil.x, projetil.y, 5, 0, Math.PI * 2);
        contexto.fill();

        listaObstaculos.forEach((obstaculo, obstaculoIndex) => {

            if (
                projetil.x < obstaculo.x + obstaculo.largura &&
                projetil.x > obstaculo.x  && 
                projetil.y > obstaculo.y &&
                projetil.y < obstaculo.y + obstaculo.altura
            ) {

                listaObstaculos.splice(obstaculoIndex, 1);
                listaProjeteis.splice(projetilIndex, 1);

                pontuacao++;
                obstaculosDestruidos++;

                pontuacaoDisplay.textContent = pontuacao;
                
            }

        })

    })
    
}

function desenharFumaca() {

    listaFumaca.forEach((fumaca, index) => {

        fumaca.x -= velocidadeX * 0.5;
        fumaca.tamanho *= 0.98;
        fumaca.opacidade -= fumaca.velocidadeDissipacao;

        contexto.fillStyle = `rgba(150, 150, 150, ${fumaca.opacidade})`;
        contexto.beginPath()
        contexto.arc(fumaca.x, fumaca.y, fumaca.tamanho, 0, Math.PI * 2);
        contexto.fill();

        if (fumaca.opacidade <= 0 || fumaca.tamanho < 1) {
            linhaFumaca.splice(index, 1);
        }

    });
    
}

function gerarObstaculo() {

    const obstaculoX = tela.width;
    const centroTunel = tela.height / 2;
    
    const offSet = (deslocamentoTunel + obstaculoX) / frequenciaTunel;
    const sinOffset = Math.sin(offSet);
    const alturaOndulada = centroTunel + amplitudeTunel * sinOffset;
    const alturaTeto = alturaOndulada - espacoTunelFixo / 2;
    const alturaChao = alturaOndulada + espacoTunelFixo / 2;

    const obstaculoY = Math.random() * (alturaChao - alturaTeto - 60) + alturaTeto;

    const larguraObstaculo = obstaculosDestruidos >= 5? 20 : 30;
    const alturaObstaculo = obstaculosDestruidos >= 5 ? 50 : 60;

    listaObstaculos.push({
        x: obstaculoX,
        y: obstaculoY,
        largura: larguraObstaculo,
        altura: alturaObstaculo
    });

}

function gerarFumaca() {

    listaFumaca.push({
        x: posicaoXHelicoptero - 10,
        y: posicaoYHelicoptero + alturaHelicoptero / 2 + (Math.random() * 10 - 5),
        tamanho: Math.random() * 8 + 4,
        opacidade: 1,
        velocidadeDissipacao: Math.random() * 0.02 + 0.01
    });
    
}

function gerarProjetil() {


    listaProjeteis.push({

        x: posicaoXHelicoptero + larguraHelicoptero,
        y: posicaoYHelicoptero + alturaHelicoptero / 2,
        velocidade: 10

    });
    
}

function atualizarHelicoptero() {
    
    if (cimaPressionado) {
        //A aceleração aqui tem o valor de -0.5, isso significa que o helicoptero vai subindo até atingir o limite
            //máximo da aceleração, que no caso, é -5;
        velocidadeY -= aceleracaoVertical;

        //-0.5 > -5 => O contrário disso, esse if é acionado
        if (velocidadeY < -velocidadeVerticalMaxima) velocidadeY = -velocidadeVerticalMaxima;

    } else if (baixoPressionado) {
        
        //O mesmo vale nesse caso, porem é positivo
        velocidadeY += aceleracaoVertical;

        //0.5 < 5 => O contrário disso, esse if é acionado
        if (velocidadeY > velocidadeVerticalMaxima) velocidadeY = velocidadeVerticalMaxima;

    }

    posicaoYHelicoptero += velocidadeY;

    //Limites de tela
    if (posicaoYHelicoptero < 0) posicaoYHelicoptero = 0;
    if (posicaoYHelicoptero > tela.height - alturaHelicoptero) posicaoYHelicoptero = tela.height - alturaHelicoptero;
    
    
}

function loopJogo() {
 
    if (!jogoAtivo) return;

    contexto.clearRect(0, 0, tela.width, tela.height);
    deslocamentoTunel += velocidadeX;

    desenharTunel();
    atualizarHelicoptero();
    desenharHelicoptero();
    desenharObstaculos();
    desenharProjeteis();
    desenharFumaca();
    gerarFumaca();

    tempoParaProximoObstaculo -= 16;

    if (tempoParaProximoObstaculo <= 0 ) {

        gerarObstaculo();

        tempoParaProximoObstaculo = 2000;
    }

    if (tiroPressionado && colldownTiro <= 0) {
        
        gerarProjetil();

        colldownTiro = 300;

    } else if (colldownTiro > 0) colldownTiro -= 16;
    

    requestAnimationFrame(loopJogo);

}

document.addEventListener('keydown', (e) => {

    if (e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') cimaPressionado = true;
    if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') baixoPressionado = true;
    if (e.key === 'a' || e.code === 'Space') tiroPressionado = true;

});
document.addEventListener("keyup", (e) => {

    if (e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') cimaPressionado = false;
    if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') baixoPressionado = false;
    if (e.key === 'a' || e.code === 'Space') tiroPressionado = false;

});


function fimDeJogo() {

    jogoAtivo = false;
    melhorPontuaacao = Math.max(melhorPontuaacao, pontuacao);

    velocidadeY = 0;

    pontuacaoDisplay.textContent = melhorPontuaacao;
    menu.style.display = 'block';
    
}
