let pontuacaoJogador = parseInt(localStorage.getItem('pontuacaoJogador')) || 0;
let pontuacaoComputador = parseInt(localStorage.getItem('pontuacaoComputador')) || 0;

document.getElementById('jogador-pontuacao').innerText = pontuacaoJogador;
document.getElementById('computador-pontuacao').innerText = pontuacaoComputador;

function jogar(escolhaDoJogador) {
    
    const opcoes = ['Pedra', 'Papel', 'Tesoura', 'Lagarto', 'Spock']

    const escolhaDoComputador = opcoes[Math.floor(Math.random() * opcoes.length)];

    let resultado;

    if (escolhaDoJogador === escolhaDoComputador) {
        resultado = 'Empate';
    } else if (
        (escolhaDoJogador === 'Pedra' && (escolhaDoComputador === 'Tesoura' || escolhaDoComputador === 'Lagarto')) || 
        (escolhaDoJogador === 'Papel' && (escolhaDoComputador === 'Pedra' || escolhaDoComputador === 'Spock')) || 
        (escolhaDoJogador === 'Tesoura' && (escolhaDoComputador === 'Papel' || escolhaDoComputador === 'Lagarto')) || 
        (escolhaDoJogador === 'Lagarto' && (escolhaDoComputador === 'Spock' || escolhaDoComputador === 'Papel')) || 
        (escolhaDoJogador === 'Spock' && (escolhaDoComputador === 'Tesoura' || escolhaDoComputador === 'Pedra'))
    ) {
        // JOGADOR VENCEU
        let mensagem = '';
        
        if (escolhaDoJogador === 'Pedra' && escolhaDoComputador === 'Tesoura') mensagem = 'Pedra quebra Tesoura';
        else if (escolhaDoJogador === 'Pedra' && escolhaDoComputador === 'Lagarto') mensagem = 'Pedra esmaga Lagarto';
        else if (escolhaDoJogador === 'Papel' && escolhaDoComputador === 'Pedra') mensagem = 'Papel cobre Pedra';
        else if (escolhaDoJogador === 'Papel' && escolhaDoComputador === 'Spock') mensagem = 'Papel refuta Spock';
        else if (escolhaDoJogador === 'Tesoura' && escolhaDoComputador === 'Papel') mensagem = 'Tesoura corta Papel';
        else if (escolhaDoJogador === 'Tesoura' && escolhaDoComputador === 'Lagarto') mensagem = 'Tesoura decapita Lagarto';
        else if (escolhaDoJogador === 'Lagarto' && escolhaDoComputador === 'Spock') mensagem = 'Lagarto envenena Spock';
        else if (escolhaDoJogador === 'Lagarto' && escolhaDoComputador === 'Papel') mensagem = 'Lagarto come Papel';
        else if (escolhaDoJogador === 'Spock' && escolhaDoComputador === 'Tesoura') mensagem = 'Spock quebra Tesoura';
        else if (escolhaDoJogador === 'Spock' && escolhaDoComputador === 'Pedra') mensagem = 'Spock vaporiza Pedra';
        
        resultado = `Você venceu!!! ${mensagem} +1 Ponto`;
        pontuacaoJogador++;
        
    } else {
        // COMPUTADOR VENCEU
        let mensagem = '';
        
        if (escolhaDoComputador === 'Pedra' && escolhaDoJogador === 'Tesoura') mensagem = 'Pedra quebra Tesoura';
        else if (escolhaDoComputador === 'Pedra' && escolhaDoJogador === 'Lagarto') mensagem = 'Pedra esmaga Lagarto';
        else if (escolhaDoComputador === 'Papel' && escolhaDoJogador === 'Pedra') mensagem = 'Papel cobre Pedra';
        else if (escolhaDoComputador === 'Papel' && escolhaDoJogador === 'Spock') mensagem = 'Papel refuta Spock';
        else if (escolhaDoComputador === 'Tesoura' && escolhaDoJogador === 'Papel') mensagem = 'Tesoura corta Papel';
        else if (escolhaDoComputador === 'Tesoura' && escolhaDoJogador === 'Lagarto') mensagem = 'Tesoura decapita Lagarto';
        else if (escolhaDoComputador === 'Lagarto' && escolhaDoJogador === 'Spock') mensagem = 'Lagarto envenena Spock';
        else if (escolhaDoComputador === 'Lagarto' && escolhaDoJogador === 'Papel') mensagem = 'Lagarto come Papel';
        else if (escolhaDoComputador === 'Spock' && escolhaDoJogador === 'Tesoura') mensagem = 'Spock quebra Tesoura';
        else if (escolhaDoComputador === 'Spock' && escolhaDoJogador === 'Pedra') mensagem = 'Spock vaporiza Pedra';
        
        resultado = `Você perdeu... ${mensagem} +1 Ponto para o computador`;
        pontuacaoComputador++;
    }
    
    document.getElementById('escolha-jogador-imagem').src = escolhaDoJogador.toLocaleLowerCase() + '.png';
    document.getElementById('escolha-jogador-nome').innerText = escolhaDoJogador;

    document.getElementById('escolha-computador-imagem').src = escolhaDoComputador.toLocaleLowerCase() + '.png';
    document.getElementById('escolha-computador-nome').innerText = escolhaDoComputador;

    document.getElementById('resultado').innerText = resultado;

    localStorage.setItem('pontuacaoJogador', pontuacaoJogador);
    localStorage.setItem('pontuacaoComputador', pontuacaoComputador);

    document.getElementById('jogador-pontuacao').innerText = pontuacaoJogador;
    document.getElementById('computador-pontuacao').innerText = pontuacaoComputador;

}

const modal = document.getElementById('modal');
const btn = document.getElementById('regras-btn');
const closeBtn = document.getElementById('close-btn');

btn.onclick = function () {
    console.log('Abrindo modal')
    modal.style.display = 'flex';

}

closeBtn.onclick = function () {
    
    modal.style.display = 'none';

}

window.onclick = function (event) {
    
    if (event.target === modal) {
        modal.style.display = 'none';
    }

}
