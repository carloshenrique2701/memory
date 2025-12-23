let pontuacaoJogador = parseInt(localStorage.getItem('pontuacaoJogador')) || 0;
let pontuacaoComputador = parseInt(localStorage.getItem('pontuacaoComputador')) || 0;

document.getElementById('pontuacao-jogador').innerHTML = pontuacaoJogador;
document.getElementById('pontuacao-computador').innerHTML = pontuacaoComputador;

function jogar(escolhaDoJogador) {
    
    const opcoes = ['pedra', 'papel', 'tesoura'];

    const escolhaDoComputador = opcoes[Math.floor(Math.random() * opcoes.length)];
    /*
        Math.random() gera um número aleatório entre 0(inclusivo) e 1(exclusivo). Quando multiplicamos ele pelo 
        comprimento do array 'opcoes', obtemos um número aleatório entre 0 e 3 (ex. 0.29556876843784397). 
        Math.floor arredonda esse número para baixo, esultando em um índice válido para o array 'opcoes' (0, 1, 2)
        para acessar seus elementos.
    */
    console.log(Math.random() * opcoes.length)

    let resultado;

    if (escolhaDoJogador === escolhaDoComputador) {
        
        resultado = 'empate';

    } else if (
        (escolhaDoJogador === 'pedra' && escolhaDoComputador === 'tesoura') ||
        (escolhaDoJogador === 'papel' && escolhaDoComputador === 'pedra') ||
        (escolhaDoJogador === 'tesoura' && escolhaDoComputador === 'papel') 
    ) {
        
        resultado = 'Você ganhou!!';
        pontuacaoJogador++;

    } else {

        resultado = 'Você perdeu!';
        pontuacaoComputador++;

    }

    document.getElementById('resultado').innerText = resultado;

    document.getElementById('pontuacao-jogador').innerHTML = pontuacaoJogador;
    document.getElementById('pontuacao-computador').innerHTML = pontuacaoComputador;

    localStorage.setItem('pontuacaoJogador', pontuacaoJogador);
    localStorage.setItem('pontuacaoComputador', pontuacaoComputador);

    document.getElementById('escolha-jogador-imagem').src = escolhaDoJogador + '.png';
    document.getElementById('escolha-jogador-imagem').alt = escolhaDoJogador;
    document.getElementById('escolha-jogador-nome').innerText = escolhaDoJogador.charAt(0).toUpperCase() + escolhaDoJogador.slice(1);
    
    document.getElementById('escolha-computador-imagem').src = escolhaDoComputador + '.png';
    document.getElementById('escolha-computador-imagem').alt = escolhaDoComputador;
    document.getElementById('escolha-computador-nome').innerText = escolhaDoComputador.charAt(0).toUpperCase() + escolhaDoJogador.slice(1);

}

const modal = document.getElementById('regras-modal');
const btn = document.getElementById('regras-btn');
const span = document.getElementById('close-btn');

btn.onclick = function () {
    modal.style.display = 'block';
}

span.onclick = function () {
    modal.style.display = 'none';
}
window.onclick = function (event) {
    
    if (event.target === modal) {
        
        modal.style.display = 'none';

    }

}



