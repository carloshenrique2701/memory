const palavras = [
    { palavra: 'Toalha', dica: 'É colocada molhada na cama' },
    { palavra: 'Amor', dica: 'Sentimento profundo entre pessoas' },
    { palavra: 'Rato', dica: 'Animal que come queijo' },
    { palavra: 'Casa', dica: 'Lugar onde as pessoas moram' },
    { palavra: 'Gato', dica: 'Animal domesticado que mia' },
    { palavra: 'Mesa', dica: 'Movével com quatro pernas' },
    { palavra: 'Pato', dica: 'Ave aquática que faz quack' },
    { palavra: 'Lago', dica: 'Corpo de água cercado por terra' },
    { palavra: 'Flor', dica: 'Parte colorida das plantas' },
    { palavra: 'Mar', dica: 'Grande extensão de água salgada' },
    { palavra: 'Sol', dica: 'Estrela que aquece nosso planeta' },
    { palavra: 'Lua', dica: 'Satélite natural da Terra' },
    { palavra: 'Noite', dica: 'Período escuro do dia' },
    { palavra: 'Dia', dica: 'Período de 24 horas' },
    { palavra: 'Fogo', dica: 'Resultado da combustão' },
    { palavra: 'Agua', dica: 'Líquido vital para a vida' },
    { palavra: 'Tempo', dica: 'Passagem de horas e dias' },
    { palavra: 'Livro', dica: 'Coisa com páginas para ler' },
    { palavra: 'Porta', dica: 'Abre e fecha a entrada' },
    { palavra: 'Chave', dica: 'Abre fechaduras' },
    { palavra: 'Janela', dica: 'Abertura para entrar luz' },
    { palavra: 'Cadeira', dica: 'Movével para sentar' },
    { palavra: 'Computador', dica: 'Máquina para processar dados' },
    { palavra: 'Telefone', dica: 'Aparelho para fazer ligações' },
    { palavra: 'Carro', dica: 'Veículo de quatro rodas' },
    { palavra: 'Aviao', dica: 'Meio de transporte que voa' },
    { palavra: 'Navio', dica: 'Embarcação para o mar' },
    { palavra: 'Trem', dica: 'Transporte sobre trilhos' },
    { palavra: 'Bicicleta', dica: 'Veículo com duas rodas e pedais' },
    { palavra: 'Relogio', dica: 'Mostra as horas' }
];

const botaoDica = document.getElementById('dica-btn');
const dicaElement = document.getElementById('dica');
const fecharModal = document.getElementById('fechar-modal');
const verificar = document.getElementById('verificar');
const pontuacaoElement = document.getElementById('pontuacao');
const anagramaElement = document.getElementById('anagrama');
const respostaJogadorElement = document.getElementById('respostaJogador');
const modalDica = document.getElementById('modal-dica');
const mensagem = document.getElementById('mensagem');

const parte1Teclado = document.getElementById('q-p');
const parte2Teclado = document.getElementById('a-l');
const parte3Teclado = document.getElementById('z-apagar');

const TECLADO_1 = ['Q', 'W', 'E', 'R', 'T', 'Y' , 'U', 'I', 'O', 'P'];
const TECLADO_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const TECLADO_3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Apagar'];

let pontuacao = parseInt(localStorage.getItem('pontuacao')) || 0;
let anagramaAtual;
let palavraDicaAtual;
let nivelAtual = parseInt(localStorage.getItem('nivelAtual')) || 0;


function criarTeclado() {
    
    const layoutTeclado = [
        {linha: parte1Teclado, teclas: TECLADO_1},
        {linha: parte2Teclado, teclas: TECLADO_2},
        {linha: parte3Teclado, teclas: TECLADO_3}
    ];
    
    layoutTeclado.forEach(({linha, teclas}) => {
        teclas.forEach(tecla => {
            const teclaElemt = document.createElement('div');
            teclaElemt.classList.add("tecla");
            teclaElemt.textContent = tecla;
            
            if (tecla === 'Apagar') {
                teclaElemt.classList.add("apagar");
                teclaElemt.id = 'apagar';
                teclaElemt.textContent = '🔙 ' + tecla;
            } else {
                teclaElemt.dataset.tecla = tecla;
            }
            
            linha.appendChild(teclaElemt);

        });
    });

    adicionarLeitoresDeClick();
}

function adicionarLeitoresDeClick() {
    
    const todasTeclas = document.querySelectorAll(".tecla");

    todasTeclas.forEach(tecla => {

        if (tecla.id !== 'apagar') {

            tecla.addEventListener('click', digitar);
            
        } else {

            tecla.addEventListener('click', apagarUltimaLetra);

        }

    });

}

function digitar(e) {

    e.stopPropagation();

    const tecla = e.currentTarget;
    const letra = tecla.dataset.tecla;

    if (!letra) return;

    respostaJogadorElement.textContent += letra;

}

function apagarUltimaLetra() {
    
    let res = respostaJogadorElement.textContent.split('');

    res.pop();

    respostaJogadorElement.textContent = '';
    respostaJogadorElement.textContent = res.join('');

}

   
function embaralharPalavra(palavra) {
    
    let letras = palavra.split('');
    let anagrama;

    do {

        const copiaLetras = [...letras];

        for (let i = letras.length; i > 0 ; i--) {
            
            const j = Math.floor(Math.random() * (i+1));
            //Pega duas posições e troca o valor delas uma pela outra, ex: [0, 1] => [0, 1]
            [copiaLetras[i], copiaLetras[j]] = [copiaLetras[j], copiaLetras[i]]; //Atribuição por Desestruturação
            //Troca os valores de duas variáveis sem usar uma variável temporária.
        }

        anagrama = copiaLetras.join('');

    } while (palavra === anagrama && palavra.length > 1);//Evita retornar uma palavra que seja igual

    anagramaAtual = anagrama;
    palavraDicaAtual = palavras[nivelAtual].dica;

    return anagrama;

}

function abrirModalDica() {
    
    dicaElement.innerHTML = '';
    dicaElement.innerText = palavraDicaAtual;

    modalDica.style.display = 'flex';

}

function verificarAnagrama() {
    
    const res = respostaJogadorElement.textContent;
    const resCorreta = (palavras[nivelAtual].palavra).toUpperCase();
console.log(resCorreta)
    if (res !== resCorreta) {
        
        alert('Resposta incorreta❌❌❌, tente olhar a dica.');
        respostaJogadorElement.innerText = '';
        return;

    }

    mensagem.style.display = 'block';

    setTimeout(() => {

        mensagem.style.display = 'none';

    }, 1500);

    respostaJogadorElement.innerText = '';

    nivelAtual++;
    palavraDicaAtual = '';
    anagramaAtual = '';
    pontuacao += 10;

    salvarPontuacaoNivel();
    loopPrincipal();

}

function salvarPontuacaoNivel() {
    
    localStorage.setItem('pontuacao', pontuacao);
    localStorage.setItem('nivelAtual', nivelAtual);

}

function verificarFimDeJogo() {
    
    if (palavras.length === nivelAtual) {
        
        return true;

    }

    return false;

}

function reiniciarJogo() {
    
    localStorage.setItem('pontuacao', 0);
    localStorage.setItem('nivelAtual', 0);

    loopPrincipal();

}

botaoDica.addEventListener('click', abrirModalDica);
fecharModal.addEventListener('click', () => {

    modalDica.style.display = 'none';

});
verificar.addEventListener('click', verificarAnagrama);

function loopPrincipal() {

    if (verificarFimDeJogo()) {
        
        alert('Parabéns!!! QI + 8000!!! Você finalizou nosso jogo. Reiniciando...');
        reiniciarJogo();

    }

    pontuacaoElement.innerText = pontuacao;

    anagramaElement.textContent = embaralharPalavra(palavras[nivelAtual].palavra).toUpperCase();

}

loopPrincipal();
criarTeclado();

