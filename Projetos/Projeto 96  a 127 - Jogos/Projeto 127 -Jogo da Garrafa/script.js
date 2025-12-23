const LARGURA_TELA = 850;
const ALTURA_TELA = 650;

const tela = document.getElementById('tela');
const contexto = tela.getContext('2d');

const BRANCO = '#FFF';
const PRETO = '#000';
const CINZA = '#C8C8C8';
const AZUL_CLARO = '#ADD8E6';

contexto.font = '36px Arial';

const garrafaImgOriginal = new Image();
garrafaImgOriginal.src = 'garrafa.png';

let garrafaImg;

garrafaImgOriginal.onload = function () {
    
    garrafaImg = garrafaImgOriginal;
    iniciarJogo();

}

const TAMANHO_GARRAFA = {largura: 100, altura: 200};
const CENTRO_X = LARGURA_TELA / 2;
const CENTRO_Y = ALTURA_TELA / 2;
const RAIO = 250;
const setores = {
    0: 'Pergunta',
    60: 'Perdeu Ponto',
    120: 'Pergunta',
    180: 'Perdeu Ponto',
    240: 'Pergunta',
    300: 'Perdeu Ponto'
}

let angulo = 0;
let girando = false;
let pontuacao = 0;
let respostaUsuario = '';
let setorParado = null;
let perguntaAtual = '';
let respostaCorreta = null;
let estado = 'principal';
let aguardando = false;
let tempoEsperaInicio = null;
let anguloAlvo = 0;
let rotacoes = 0;
let totalRotation = 0
let totalFrames = 0;
let frame = 0;
let anguloInicial = 0;
let velocidadeAngular = 0;

function atualizarTela() {

    contexto.clearRect(0, 0, LARGURA_TELA, ALTURA_TELA);

    if (estado === 'principal') {//Verifica o estado do jogo
        
        let startAngle = 0;

        for (let i = 0; i < 6; i++) {//Iterage sobre cada setor

            const anguloSetor = i * 60;
            const textoSetor = setores[anguloSetor];

            contexto.beginPath();
            contexto.moveTo(CENTRO_X, CENTRO_Y);
            contexto.arc(//Desenha o circulo
                CENTRO_X,
                CENTRO_Y,
                RAIO,
                (startAngle * Math.PI) / 180,
                ((startAngle + 60) * Math.PI) / 180
            );
            contexto.closePath();
            contexto.stroke();//Aplica contorno no circulo
            
            //Posições e estilos do nome de cada setor
            const anguloTexto = startAngle + 30;
            const xTexto = CENTRO_X + (RAIO + 40) * Math.cos((anguloTexto * Math.PI) / 180);
            const yTexto = CENTRO_Y + (RAIO + 40) * Math.sin((anguloTexto * Math.PI) / 180);

            contexto.fillStyle = PRETO;
            contexto.font = '24px Arial';
            contexto.textAlign = 'center';
            contexto.fillText(textoSetor, xTexto, yTexto);
            startAngle += 60;

        }

        //Posicionando a garrafa
        contexto.save();
        contexto.translate(CENTRO_X, CENTRO_Y);
        contexto.rotate((-angulo * Math.PI) / 180);
        contexto.drawImage(
            garrafaImg,
            -TAMANHO_GARRAFA.largura / 2,
            -TAMANHO_GARRAFA.altura / 2,
            TAMANHO_GARRAFA.largura,
            TAMANHO_GARRAFA.altura
        );

        contexto.restore();//Restaura o estado anterior do contexto reversento a translação e rotação

        //Desenha a pontuação
        contexto.fillStyle = PRETO;
        contexto.font = '24px Arial';
        contexto.textAlign = 'left';
        contexto.fillText(`Pontuação: ${pontuacao}`, 10, 30);

    } else if (estado === 'pergunta') {//Verifica o estado do jogo
        
        //Cor de preenchimento
        contexto.fillStyle = AZUL_CLARO;
        contexto.fillRect(0, 0, LARGURA_TELA, ALTURA_TELA);
        
        //Titulo
        contexto.fillStyle = PRETO;
        contexto.fillStyle = '36px Arial';
        contexto.textAlign = 'center';
        contexto.fillText('Tela de Pergunta', LARGURA_TELA / 2, 50);

        //Pergunta
        contexto.font = '30px Arial';
        contexto.fillText(perguntaAtual, LARGURA_TELA / 2, 100);
        
        //Caixa de resposta do usuário
        contexto.fillStyle = CINZA;
        contexto.fillRect( LARGURA_TELA / 2 - 150, 150, 300, 50);
        contexto.fillStyle = PRETO;
        contexto.font = '30px Arial';
        contexto.textAlign = 'left';
        contexto.fillText(respostaUsuario, LARGURA_TELA / 2 - 140, 185);

        //Botão responder
        contexto.fillStyle = 'green';
        contexto.fillRect(LARGURA_TELA / 2 - 75, 220, 150, 50);
        contexto.fillStyle = BRANCO;
        contexto.font = '24px Arial';
        contexto.textAlign = 'center';
        contexto.fillText('Responder', LARGURA_TELA / 2, 255);

        //Pontuação
        contexto.fillStyle = PRETO;
        contexto.font = '24px Arial';
        contexto.textAlign = 'left';
        contexto.fillText(`Pontuação: ${pontuacao}`,10, 30);

    }
    
}

function verificarResposta() {
    
    try {
        
        if (parseFloat(respostaUsuario) === respostaCorreta) {
            pontuacao += 10;
        } else {
            pontuacao = Math.max(pontuacao - 10, 0);
        }

    } catch (e) {
        
        pontuacao = Math.max(pontuacao - 10, 0);

    }

    respostaUsuario = '';
    estado = 'principal';
    
}

function iniciarJogo() {
    
    tela.addEventListener('click', function () {
        
        if (estado === 'principal') {//Verifica o estado do jogo
            
            if (!girando && !aguardando) {//Verifica se a garrafaes ta girando ou se aguardando é falso
                
                girando = true;

                const setoresAngulos = Object.keys(setores).map(Number);

                anguloAlvo = setoresAngulos[Math.floor(Math.random() * setoresAngulos.length)];
                rotacoes = (Math.floor(Math.random() * 3) + 3) * 360;
                totalRotation = rotacoes + ((parseInt(anguloAlvo) - angulo) % 360);
                totalFrames = 120;
                frame = 0;
                anguloInicial = angulo % 360;
                velocidadeAngular = totalRotation / totalFrames;

            } 

        } 
    });

    document.addEventListener('keydown', function (evento) {
        
        if (estado === 'pergunta') {//Verifica o estado do jogo
            
            if (evento.key === 'Backspace') {//Apaga o último caractere

                respostaUsuario = respostaUsuario.slice(0, -1);
                atualizarTela();
                
            } else if (evento.key === 'Enter') {//Verifica a resposta
                
                verificarResposta()

            } else if (/^[0-9,-]$/.test(evento.key)) {
                //Verifica se a tecla pressionada é um numero, ponto ou hífen, que são validos em uma resposta
                    //numérica
                
                respostaUsuario += evento.key;
                atualizarTela();

            }

        }

    });

    loop();

}

function loop() {

    if (estado === 'principal') {//Verifica o estado do jogo

        if (girando) {//Verifica se a garrafa está girando
            
            if (frame < totalFrames) { //Verifica se o frame atual é menor que o total
                
                //Calcula o novo angulo da garrafa
                angulo = (anguloInicial + velocidadeAngular * frame) % 360;
                frame++;

            } else {

                //Se todos os frames forem processados, define o angulo da garrafa
                angulo = anguloAlvo;
                girando = false;
                setorParado = anguloAlvo;
                aguardando = true;
                tempoEsperaInicio = Date.now();
                
            }

        }

        if (aguardando) {//Verifica se o jogo esta em pausa
            
            //Verifica se passou 2000milisegundos desde que a garrafa parou de girar
            if (Date.now() - tempoEsperaInicio >= 2000) {
                
                aguardando = false;
                if ([0, 120, 240].includes(parseInt(setorParado))) {//Verifica o setor que caiu;
                    
                    estado = 'pergunta';
                    let perguntaObj = gerarPergunta();
                    perguntaAtual = perguntaObj.pergunta;
                    respostaCorreta = perguntaObj.pergunta;
                    respostaCorreta = perguntaObj.resposta;
                    respostaUsuario = '';

                } else {
                    pontuacao = Math.max(pontuacao - 10, 0);
                }

            }

        } 
    
    } 

    atualizarTela();
    requestAnimationFrame(loop);
    
}

function gerarPergunta() {

    const operadores = ['+', '-', '*', '/'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];

    let a, b, pergunta, resposta;

    if (operador === '+') {
        
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;

        pergunta = `${a} + ${b} = ?`;
        resposta = a + b;

    } else if (operador === '-'){
        
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * a) + 1;

        pergunta = `${a} - ${b} = ?`;
        resposta = a- b;

    } else if (operador === '*'){
        
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;

        pergunta = `${a} * ${b} = ?`;
        resposta = a* b;

    } else if (operador === '/'){
        //Evita divisão por zero
        b = Math.floor(Math.random() * 9) + 1;

        resposta = Math.floor(Math.random() * 10) + 1;

        a = b * resposta;

        pergunta = `${a} / ${b} = ?`;

    }

    return {pergunta, resposta};
    
}

tela.addEventListener('click', function (evento) {
    
    if (estado === 'pergunta') {
        
        const rectBotao = {

            x: LARGURA_TELA / 2 - 75,
            y: 220,
            width: 150,
            height: 50

        }

        const rectCanvas = tela.getBoundingClientRect();
        const mouseX = evento.clientX - rectCanvas.left;
        const mouseY = evento.clientY - rectCanvas.top;

        if (
            mouseX >= rectBotao.x &&
            mouseX <= rectBotao.x + rectBotao.width &&
            mouseY >= rectBotao.y &&
            mouseY <= rectBotao.y + rectBotao.height
        ) {

            verificarResposta();
            
        }

    }

})