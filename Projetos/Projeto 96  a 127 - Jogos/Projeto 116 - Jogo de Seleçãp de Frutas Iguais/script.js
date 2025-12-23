const vidasE1 = document.getElementById('vidas');
const pontuacaoE1 = document.getElementById('pontuacao');
const faseE1 = document.getElementById('fase');
const tempoE1 = document.getElementById('tempo');
const coletadasE1 = document.getElementById('coletadas');

let vidas = 3;
let pontuacao = 0;
let fase = 1;
let objetivoFase = 20;
let coletadasNaFase = 0;
let tempoLimite = 60;
let tipoAtual = null;
let frutas =["fruta1.png", "fruta2.png", "fruta3.png", "fruta4.png", "fruta5.png"];
let frutasNaTela = [];
let jogoEmAndamento = true;

function gerarFrutas() {

    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    frutasNaTela = [];

    for (let i = 0; i < 8 * 8; i++) {//Executa 64 vezes (8X8)
        
        const tipo = Math.floor(Math.random() * frutas.length);
        const fruta = document.createElement('img');

        fruta.src = frutas[tipo];
        fruta.classList.add('fruta');
        fruta.dataset.tipo = tipo;
        fruta.addEventListener('click', selecionarFruta);

        frutasNaTela.push({fruta, tipo, selecionada: false});

        grid.appendChild(fruta);
        
    }

}

function selecionarFruta(event) {
    
    if(!jogoEmAndamento) return;

    const fruta = event.target;
    const tipo = parseInt(fruta.dataset.tipo, 10);//Base decimal

    if (tipoAtual === null) {
        tipoAtual = tipo;
    }

    if (tipo === tipoAtual) {
        
        fruta.classList.add('fruta-selecionada');

        const frutaInfo = frutasNaTela.find(f => f.fruta === fruta);
        //Procura a fruta no array para mudar seu atributo de selecionada para 'true';

        if (frutaInfo) frutaInfo.selecionada = true;

        pontuacao += 1;
        coletadasNaFase += 1;

        atualizarHUB()

        if (coletadasNaFase >= objetivoFase) {
            avancarFase();
            return;
        }


        const todasSelecionadas = frutasNaTela.every(f => f.tipo !== tipoAtual || f.selecionada);
        //Verifica se todas as frutas de mesmo tipo foram selecionadas;

        if (todasSelecionadas) {
            substituirFrutasSelecionadas(tipoAtual);
            tipoAtual = null;
        }
    } else {

        vidas -= 1;

        atualizarHUB();
        alert('Você selecionou uma fruta diferente!');

        if (vidas <= 0) {
            
            finalizarJogo();
            return;

        }

        recarregarFrutas();

    }

}
function substituirFrutasSelecionadas(tipo) {

    frutasNaTela.forEach(item => {
        if (item.tipo === tipo && item.selecionada) {

            const novoTipo = (Math.floor(Math.random() * frutas.length));

            item.tipo = novoTipo;
            item.fruta.src = frutas [novoTipo];
            item.fruta.dataset.tipo = novoTipo;
            item.fruta.classList.remove('fruta-selecionada');
            item.selecionada = false;

        }
    });

    atualizarHUB()
    
}

function avancarFase() {

    exibirMansagem('Fase Completa!');

    fase += 1;
    objetivoFase += 10;
    tempoLimite = 60;
    tipoAtual = null;
    coletadasNaFase = 0;

    gerarFrutas();
    atualizarHUB();
    
}

function atualizarHUB() {
    
    vidasE1.textContent = vidas;
    pontuacaoE1.textContent = pontuacao;
    faseE1.textContent = fase;
    tempoE1.textContent = tempoLimite;
    coletadasE1.textContent = `${coletadasNaFase}/${objetivoFase}`;

}

function exibirMansagem(texto) {

    alert(texto);
    
}

function recarregarFrutas() {
    
    //Remove o status de selecionada de cada elemento para que possam ser recarregados
    frutasNaTela.forEach(item => {

        item.fruta.classList.remove('fruta-selecionada');
        item.selecionada = false;

    });

    tipoAtual = null;
    gerarFrutas();
    
}

function finalizarJogo() {
    
    if (jogoEmAndamento) {
        jogoEmAndamento = false;

        exibirMansagem('Fim de Jogo! Sua Pontuação:' + pontuacao);
    }

}

function iniciarJogo() {
    
    vidas = 3;
    pontuacao = 0;
    fase = 1;
    objetivoFase = 20;
    tempoLimite = 60;
    tipoAtual = null;
    jogoEmAndamento = true;

    gerarFrutas();
    atualizarHUB();
    setInterval(() => {

        if (jogoEmAndamento && tempoLimite > 0) {

            tempoLimite -= 1;
            atualizarHUB();

        } else if (jogoEmAndamento && tempoLimite === 0) {

            vidas -= 1;
            atualizarHUB();

            if (vidas > 0) {
                
                exibirMansagem("TempoEsgotado");
                tempoLimite = 60;
                recarregarFrutas();

            } else {

                finalizarJogo();
                
            }

        }

    }, 1000);

}


iniciarJogo();
