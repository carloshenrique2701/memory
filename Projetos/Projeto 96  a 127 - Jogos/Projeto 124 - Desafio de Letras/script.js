const problemaElement = document.getElementById('problema');
const questaoElement = document.getElementById('questao');
const respostaElement = document.getElementById('resposta');
const mensagemElement = document.getElementById('mensagem');
const pontuacaoElement = document.getElementById('pontuacao');
const verificarRespostaElement = document.getElementById('verificarResposta');
const btnVerRespostaElement = document.getElementById('btnVerResposta');
const modalRespostaElement = document.getElementById('modalResposta');

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let letrasValores = [];

let pontuacao = 0;
let respostaAtual;

function getLetraAleatoriaComValores() {
    for (let i = 0; i < 3; i++) {
        if (letrasValores.length < 3) {
            
            letrasValores.push({
                letra: LETRAS[Math.floor(Math.random() * LETRAS.length)],
                valor: Math.floor(Math.random() * 25)
            });

        }
    }
}

function encaixarProblema() {

    questaoElement.innerHTML = '';
    problemaElement.innerHTML = '';

    getLetraAleatoriaComValores();

    let letra1 = letrasValores[0].letra;
    let letra2 = letrasValores[1].letra;
    let letra3 = letrasValores[2].letra;

    let valor1 = parseInt(letrasValores[0].valor);
    let valor2 = parseInt(letrasValores[1].valor);
    let valor3 = parseInt(letrasValores[2].valor);
  
    const p1 = document.createElement('p');
    p1.textContent = `${letra1} + ${letra1} + ${letra1} = ${valor1 * 3}`;
    problemaElement.appendChild(p1);
  
    const p2 = document.createElement('p');
    p2.textContent = `${letra1} + ${letra2} + ${letra2} = ${valor1 + valor2 * 2}`;
    problemaElement.appendChild(p2);
  
    const p3 = document.createElement('p');
    p3.textContent = `${letra2} * ${letra3} = ${valor2 * valor3}`;
    problemaElement.appendChild(p3);
  
    const p4 = document.createElement('p');
    p4.textContent = `${letra3} - ${letra1} + ${letra2} = ?`;
    problemaElement.appendChild(p4);

    questaoElement.textContent = `${letra3} - ${letra1} + ${letra2} = ?`;
    
    respostaAtual = valor2 - valor1 + valor3;

}

function verificar() {
    
    const respostaJogador = parseInt(respostaElement.value);
    console.log('verificando resposta')
    if (respostaJogador === respostaAtual) {
        console.log('resposta correta')

        mensagemElement.textContent = 'Parabéns! Você acertou +1 ponto!';
        mensagemElement.style.color = 'green';
        btnVerRespostaElement.classList.add('oculto');
        pontuacao++;
        pontuacaoElement.textContent = pontuacao;
        letrasValores = [];
        respostaElement.value = '';
        encaixarProblema();

    } else {
        console.log('resposta incorreta')

        mensagemElement.textContent = 'Você errou! Se não for capaz, pode dar uma olhada na resposa. rsrsrs';
        mensagemElement.style.color = 'red';
        btnVerRespostaElement.classList.remove('oculto');
        respostaElement.value = '';

    }

}

function verResposta() {
    
    modalRespostaElement.innerHTML = '';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const spanFechar = document.createElement('span');
    spanFechar.textContent = 'X';
    spanFechar.id = 'fecharModal';
    modalContent.appendChild(spanFechar)

    const h1 = document.createElement('h1');
    h1.textContent = 'Respostas';
    modalContent.appendChild(h1);

    let valor1 = parseInt(letrasValores[0].valor);
    let valor2 = parseInt(letrasValores[1].valor);
    let valor3 = parseInt(letrasValores[2].valor);
  
    const p1 = document.createElement('p');
    p1.textContent = `${valor1} + ${valor1} + ${valor1} = ${valor1 * 3}`;
    modalContent.appendChild(p1);
  
    const p2 = document.createElement('p');
    p2.textContent = `${valor1} + ${valor2} + ${valor2} = ${valor1 + valor2 * 2}`;
    modalContent.appendChild(p2);
  
    const p3 = document.createElement('p');
    p3.textContent = `${valor2} * ${valor3} = ${valor2 * valor3}`;
    modalContent.appendChild(p3);
  
    const p4 = document.createElement('p');
    p4.textContent = `${valor3} - ${valor1} + ${valor2} = ${valor3 - valor1 + valor2}`;
    modalContent.appendChild(p4);

    modalRespostaElement.appendChild(modalContent)
    modalRespostaElement.style.display = 'flex';
    
    spanFechar.onclick = () => modalRespostaElement.style.display = 'none'

}

encaixarProblema();

verificarRespostaElement.addEventListener('click', verificar);