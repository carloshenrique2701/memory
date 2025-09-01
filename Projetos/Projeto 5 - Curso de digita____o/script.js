const textos = [
    "A casa é grande.",
    "O cachorro corre rápido no parque.",
    "Os livros estão espalhados pela sala de estudo.",
    "Durante a tempestade, as árvores balançavam violentamente sob o vento forte.",
    "A complexidade das relações humanas é um tema explorado com profundidade pelos filósofos ao longo da história."
];

let contadorCerto = 0;

let contadorErrado = 0;

let intervaloTempo;

let tempoRestante = 60;

let textoAtual = '';

function iniciarContadorTempo() {

    if (intervaloTempo) clearInterval(intervaloTempo);//verifica se ja ossui um valor atribuido, se sim, é limpado esse valor, para que multiplos valores não se sobreponham

    tempoRestante = 60;

    document.getElementById('contadorTempo').textContent = tempoRestante;

    intervaloTempo = setInterval(() => {

        tempoRestante--;

        document.getElementById('contadorTempo').textContent = tempoRestante;

        if (tempoRestante <= 0) {

            clearInterval(intervaloTempo);

            verificarResultado();

        }
    }, 1000);
}

function verificarResultado() {
    
    const porcentagemCerta = contadorCerto / textoAtual.length;

    if (porcentagemCerta >= 0.8) {
        
        alert(`Parabéns! Você foi aprovado.`)

    } else{

        alert(`Tente novamente!`)

    }

    resetar();

}

function resetar() {
    
    const elementoEntrada = document.getElementById('entrada');

    elementoEntrada.value = '';

    elementoEntrada.disabled = true;

    clearInterval(intervaloTempo);

    document.getElementById('contadorCerto').textContent = '0';
    document.getElementById('contadorErrado').textContent = '0';
    document.getElementById('contadorTempo').textContent = '60';

    tempoRestante = 60;

    contadorCerto = 0;

    contadorErrado = 0;

    //essa ação limpa os efeitos visiais que indicavam se o usuário havia digitado certo ou errado na tentativa anterior
    [...document.getElementById('texto').children].forEach(span =>{

        span.classList.remove('certo', 'errado');

    });

}

function mudarNivel(nivel) {

    resetar();

    textoAtual = textos[nivel - 1];

    const elementoTexto = document.getElementById('texto');

    elementoTexto.innerHTML = textoAtual.split('').map(char => `<span>${char}</span>`).join('');//o join permite q todos os elementos do array fiquem juntos numa única string HTML. Permitindo q cada caractere seja estilizado individualmente.
                                                                // o span é para ajudar na estilização mais tarde
    document.getElementById('entrada').disabled = false;

}

document.getElementById('entrada').addEventListener('input', function(){
    
    if (tempoRestante == 60) iniciarContadorTempo();

    const entradaTexto = this.value;

    if(entradaTexto.length > textoAtual.length){

        this.value = entradaTexto.substring(0, textoAtual.length);

        return;

    }

    contadorCerto = 0;

    contadorErrado = 0;

    [...document.getElementById('texto').children].forEach((span, index) =>{

        if(index < entradaTexto.length){

            if(entradaTexto[index] === span.textContent){

                span.classList.add('certo');
                span.classList.remove('errado');

                contadorCerto++;

            }else{

                span.classList.add('errado');
                span.classList.remove('certo');

                contadorErrado++;

            }

        }else{

            span.classList.remove('certo', 'errado');

        }
    });

    document.getElementById('contadorCerto').textContent = contadorCerto;
    document.getElementById('contadorErrado').textContent = contadorErrado;

    if(entradaTexto.length === textoAtual.length) {verificarResultado();}


});


