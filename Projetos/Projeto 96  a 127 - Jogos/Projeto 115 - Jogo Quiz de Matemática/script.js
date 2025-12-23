let vidas = 3;
let pontos = 0;
let acertos = 0;
let tempoRestante = 10;
let timerId = null;
let respostaCorreta = null;

const questaoDisplay = document.getElementById('questao');
const respostaInput = document.getElementById('resposta');
const btnResponder = document.getElementById('btn-responder');
const pontosDisplay = document.getElementById('pontos');
const acertosDisplay = document.getElementById('acertos');
const vidasDisplay = document.getElementById('vidas');
const tempoDisplay = document.getElementById('tempo');

vidasDisplay.textContent = `Vidas: ${vidas}`;

function novaPergunta() {
    
    pararTempo();

    const operacoes = ['+', '-', '*', '/'];

    const num1 = Math.floor(Math.random() * 20) + 1;//+1 garante que apareçam números entre 1 e 21
    let num2 = Math.floor(Math.random() * 20) + 1;
    const operador = operacoes[Math.floor(Math.random() * operacoes.length)];

    let questaoTexto = '';

    switch (operador) {
        case '+':
            questaoTexto = `${num1} + ${num2}`;
            respostaCorreta = num1 + num2;
            break;
        case '-':
            questaoTexto = `${num1} - ${num2}`;
            respostaCorreta = num1 - num2;
            break;
        case '*':
            questaoTexto = `${num1} * ${num2}`;
            respostaCorreta = num1 * num2;
            break;
        case '/':

            num2 = Math.floor(Math.random() * 10) + 1;
            //Ajustamos o valor do num2 para que nenhum numero seja dividido por 0 e que o resultado da divisão
                //seja inteiro.

            questaoTexto = `${num1 * num2} / ${num2}`;
            respostaCorreta = (num1 * num2) / num2;
            //Ajustamos para que num1 seja um multiplo do num2 
                // ex: num1 = 9; num2 = 5;
                // (9 * 5) / 5;
                // 45 / 5 = 9;
            //Assim não há perigo caso seja escolhido randomicamente um número primo para ser dividido;
            break;
    
        default:
            console.log('Operador não encontrado.');
            break;
    }

    questaoDisplay.textContent = questaoTexto;

    tempoRestante = 20;
    tempoDisplay.textContent = `Tempo: ${tempoRestante}`;

    contarTempo();

}

function contarTempo() {
    
    timerId = setInterval(() => {

        if (tempoRestante > 0) {
            tempoRestante--;
            tempoDisplay.textContent = `Tempo: ${tempoRestante}`;
        } else {
            perdeuVida();
        }

    }, 1000);

}
function pararTempo() {
    
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }

}

function verificarResposta() {
    
    const respostaUsuario = parseFloat(respostaInput.value);

    if (!isNaN(respostaUsuario) && respostaUsuario === respostaCorreta) {
        
        pontos += 10;
        acertos++;
        pontosDisplay.textContent = `Pontos: ${pontos}`;
        acertosDisplay.textContent = `Acertos: ${acertos}`;

        novaPergunta();

    } else {
        perdeuVida();
    }

    respostaInput.value = '';

}

function perdeuVida() {
    
    vidas--;

    vidasDisplay.textContent = `Vidas: ${vidas}`;

    if (vidas === 0) {
        gameOver()
    } else {
        novaPergunta();
    }

}

function gameOver() {
    
    pararTempo();

    questaoDisplay.textContent = `Fim de Jogo! Pontuação final: ${pontos}. Acertos: ${acertos}`;

    respostaInput.disabled = true;
    btnResponder.disabled = true;

    tempoDisplay.textContent = `Jogo encerrado!`;

}
novaPergunta();

btnResponder.addEventListener('click', verificarResposta);

document.addEventListener('keydown', function (e) {
   
    if (e.key === 'Enter') {
        verificarResposta();
    }

});