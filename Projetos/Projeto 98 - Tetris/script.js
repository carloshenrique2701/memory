const canvas = document.getElementById('tetris');
const contexto = canvas.getContext('2d');

const tamanhoBloco = 30;
const linhas = 20;
const colunas = 10;
const tabuleiro = [];

let pecaAtual;
let intervalo;
let pontuacao = 0;
let pecaX, pecaY;
let gameOver = false;

const pecas = [ //FORMATOS DAS PEÇAS 0 = VAZIO, 1 = BLOCO 

    {shape: [[1, 1, 1, 1]], name: 'I'},
    //🟦🟦🟦🟦
    {shape: [[1, 1], [1, 1]], name: 'O'},
    // [1,1]
    // [1,1]
    //🟦🟦
    //🟦🟦
    {shape: [[0, 1, 0], [1, 1, 1]], name: 'T'},
    //[0, 1, 0]
    //[1, 1, 1]
    //     🟪
    //  🟪🟪🟪
    {shape: [[1, 1, 0], [0, 1, 1]], name: 'S'},
    //[1, 1, 0]
    //[0, 1, 1]
    //  🟩🟩
    //🟩🟩
    {shape: [[0, 1, 0], [1, 1, 0]], name: 'Z'},
    //[0, 1, 0]
    //[1, 1, 0]
    //🟥🟥
    //  🟥🟥
    {shape: [[1, 1, 1], [1, 0, 0]], name: 'L'},
    //[1, 1, 1]
    //[1, 0, 0]
    //🟧
    //🟧
    //🟧🟧
    {shape: [[1, 1, 1], [0, 0, 1]], name: 'J'}
    //[1, 1, 1]
    //[0, 0, 1]
    //  🟦
    //  🟦
    //🟦🟦

];

function iniciarPontuacao() {
    
    const pontuacaoSalva = localStorage.getItem('pontuacao');

    if(pontuacaoSalva != null){

        pontuacao = parseInt(pontuacaoSalva);

    }

    document.getElementById('pontuacaoValor').textContent = pontuacao;

}

function salvarPontuacao() {
    
    localStorage.setItem('pontuacao', pontuacao);
    /*
    Comportamento do localStorage.setItem():

    Se a chave NÃO existe → Cria um novo par chave-valor

    Se a chave JÁ existe → Substitui o valor anterior pelo novo
    */

}

function inicializarTabuleiro() {
    
    for (let linha = 0; linha < linhas; linha++) {
        
        tabuleiro[linha] = [];

        for (let coluna = 0; coluna < colunas; coluna++) {
            
            tabuleiro[linha][coluna] = 0;
            
        }
        
    }

}

function desenharBloco(x, y, cor) {
    
    contexto.fillStyle = cor;//cor de preechimento

    //Desenha retangulo onde:
    //1° e 2° argumento calculam posição em pixels
    //3° e 4° argumento definem largura e altura
    contexto.fillRect(x * tamanhoBloco, y * tamanhoBloco, tamanhoBloco, tamanhoBloco);

    contexto.strokeStyle = 'black';

    //Desenha a borda do retangulo no canvas
    contexto.strokeRect(x * tamanhoBloco, y * tamanhoBloco, tamanhoBloco, tamanhoBloco);

}

function desenharTabuleiro() {
    
    for (let linha = 0; linha < linhas; linha++) {
        
        for (let coluna = 0; coluna < colunas; coluna++) {
            
            if (tabuleiro[linha][coluna]) {
                
                desenharBloco(coluna, linha, tabuleiro[linha][coluna])

            }
            
        }
        
    }

}

function gerarNovaPeca() {
    
    const indice = Math.floor(Math.random() * pecas.length);

    return pecas[indice].shape;//Após gerar o indice de uma peca aleatória, retorna a estrutura da peca 

}

function desenharPeca() {
    
    for (let linha = 0; linha < pecaAtual.length; linha++) {
        
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {
            
            if (pecaAtual[linha][coluna]) {
                
                desenharBloco(coluna + pecaX, linha + pecaY, 'blue')

            }
            
        }
        
    }

}

function moverPecaBaixo(){

    if (verificarColisao(0, 1)) {
        
        fixarPeca();

        pecaAtual = gerarNovaPeca();

        //Calcula a posição inicial em X da nova peca centralizando ela no meio do tabuleiro.
        pecaX = Math.floor(colunas/2) - Math.floor(pecaAtual[0].length / 2);

        pecaY = 0;

        if (verificarFimDeJogo()) {
            
            gameOver = true;

            alert('Fim de Jogo');

        }

    } else {
        
        pecaY++;//move a peça para baixo

    }

}

function verificarFimDeJogo() {
    
    for (let coluna = 0; coluna < colunas; coluna++) {
        
        if(tabuleiro[0][coluna]){

            return true;

        }
        
    }

    return false;

}

function limparLinhasCompletas() {
    
    let linhasEliminadas = 0;

    for (let linha = linhas - 1; linha >= 0; linha--) {
        
        if(tabuleiro[linha].every(bloco => bloco)){//Verifica se todos os bloco da linha atual estam preenchidos

            tabuleiro.splice(linha, 1);

            tabuleiro.unshift(Array(colunas).fill(0));//Insere uma nova linha vazia no topo do tabuleiro

            linhasEliminadas++;

            linha++

        }
        
    }

    pontuacao += linhasEliminadas;

    document.getElementById('pontuacaoValor').textContent = pontuacao;

    salvarPontuacao()

}

function desenhar() {
    
    contexto.clearRect(0, 0, canvas.width, canvas.height);//Remove qualquer desenho anterior

    desenharTabuleiro();
    desenharPeca();

}

function loopJogo() {
    
    moverPecaBaixo();
    desenhar();

    if(!gameOver){

        intervalo = setTimeout(loopJogo, 500);

    }

}

function inicializarPecasDisponiveis() {
    
    const pecasDiv = document.getElementById('pecas');
    
    pecas.forEach((peca, indice) => {

        const pecaDiv = document.createElement('div');

        pecaDiv.classList.add('peca');

        pecaDiv.dataset.indice = indice;
        pecaDiv.dataset.shape = pecas[indice].name;

        peca.shape.forEach(linha => {
            
            linha.forEach(bloco =>{

                const blocoDiv = document.createElement('div');

                blocoDiv.style.backgroundColor = bloco ? 'blue' : '#e9e9e9';
                                              //Valor:     1    :    0

                pecaDiv.appendChild(blocoDiv);

            });

        });

        pecasDiv.appendChild(pecaDiv);

        pecaDiv.addEventListener('click', () => {
            
            pecaAtual = pecas[indice].shape;

            pecaX = Math.floor(colunas/2) - Math.floor(pecaAtual[0].length / 2);

            pecaY = 0;

        })

    })

}

function verificarColisao(deslocX, deslocY) {
    
    for (let linha = 0; linha < pecaAtual.length; linha++) {
        
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {
            
            if(pecaAtual[linha][coluna]){

                const novoX = coluna + pecaX + deslocX;

                const novoY = linha + pecaY + deslocY;

                //Verifica se esta dentro do tabuleiro ou abaixo ou se a célula do tabuleiro na nova posição 
                    // está ocupada por um bloco.
                if(novoX < 0 || novoX >= colunas || novoY>= linhas || tabuleiro[novoY][novoX]){

                    return true;//Se qualquer uma for verdadeira, há uma colisão

                }

            }
            
        }
        
    }

    return false;

}

function fixarPeca() {
    
    for (let linha = 0; linha < pecaAtual.length; linha++) {
        
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {
            
            //Verifica se há um bloco na célula atual da peça
            //Se o valor for 1, significa que essa celula da peça está ocupada por um bloco
            if(pecaAtual[linha][coluna]){

                //Calcula a posição no tabuleiro onde o bloco da peça atual será fixado e atribui uma cor para 
                    // marca-la como fixada.
                tabuleiro[linha + pecaY][coluna + pecaX] = 'blue';

            }
            
        }
        
    }

    limparLinhasCompletas();

    //Basicamente, essa função é responsável para verificar se a peça atingiu o ponto final do tabuleiro.
        //Ela vai desenhar no tabuleiro de cor azul, onde a peça chegou. Logo em seguida, ele apaga a peça
        //dando a impressão que ela fixou-se no tabuleiro. 

}

function rotacionarPeca() {
    
    const novaPeca = [];

    for (let coluna = 0; coluna < pecaAtual[0].length; coluna++) {
        
        const novaLinha = [];

        for (let linha = pecaAtual.length - 1; linha >= 0; linha--) {//Percorre cada linha de baixo pra cima
            
            novaLinha.push(pecaAtual[linha][coluna])
            
        }

        novaPeca.push(novaLinha);
        
    }

    if(!verificarColisao(0, 0, novaPeca)){

        pecaAtual = novaPeca;

    }

}

document.addEventListener('keydown', function (event) {
    
    if(event.key === 'ArrowLeft' && !verificarColisao(-1, 0)){

        pecaX--;

    } else if(event.key === 'ArrowRight' && !verificarColisao(1, 0)){

        pecaX++;

    } else if(event.key === 'ArrowDown'){

        moverPecaBaixo()

    }else if(event.key === 'ArrowUp'){

        rotacionarPeca();

    }

    desenhar();

})

inicializarTabuleiro();
iniciarPontuacao();

pecaAtual = gerarNovaPeca();

pecaX = Math.floor(colunas/2) - Math.floor(pecaAtual[0].length / 2);

pecaY = 0

inicializarPecasDisponiveis();
loopJogo();