const todasPalavras = [
    // Frutas
    ["BANANA", "MAÇÃ", "UVA", "PERA", "MELANCIA"], //-> LINHA 0
    /*  ↑        ↑       ↑       ↑       ↑
COLUNA: 0        1       2       3       4          */
    
    // Países
    ["BRASIL", "CANADA", "JAPAO", "EGITO", "ITALIA"], //LINHA 1  
    
    // Animais
    ["ELEFANTE", "GIRAFA", "TIGRE", "LEAO", "ZEBRA"], //LINHA 2
    
    // Profissões
    ["MEDICO", "ENGENHEIRO", "PROFESSOR", "BOMBEIRO", "ARTISTA"], //LINHA 3
    
    // Esportes
    ["FUTEBOL", "NATACAO", "TENIS", "BASQUETE", "CICLISMO"], //LINHA 4
    
    // Tecnologia
    ["COMPUTADOR", "INTERNET", "ROBOTICA", "ALGORITMO", "PROGRAMA"], //LINHA 5
    
    // Instrumentos Musicais
    ["VIOLAO", "PIANO", "FLAUTA", "BATERIA", "TROMPETE"], //LINHA 6
    
    // Corpo Humano
    ["CEREBRO", "CORACAO", "PULMAO", "RINS", "FIGADO"], //LINHA 7
    
    // Cores
    ["VERMELHO", "AZUL", "AMARELO", "ROXO", "LARANJA"], //LINHA 8
    
    // Transportes
    ["AVIAO", "TREM", "NAVIO", "CARRO", "BICICLETA"], //LINHA 9
    
    // Planetas
    ["MERCURIO", "VENUS", "MARTE", "JUPITER", "SATURNO"], //LINHA 10
    
    // Objetos Escolares
    ["LAPIS", "CADERNO", "BORRACHA", "ESTOJO", "MOCHILA"] //LINHA 11
];

//Mais para frente do código, veremos que para interagirmos entre as direções daspalavras usamos a linha para
    //cima e para baixo e a coluna para direita e para a esquerda. Isso se deve ao fato de como um array de 
    //arrays é estruturado, como pode ver no exemplo acima.

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÀÂÉÊÌÎÓÔÚÛÇ'.split('');
const grid = document.getElementById('caça-palavras');
const listaPalavras = document.getElementById('lista-palavras');
const mensagem = document.getElementById('mensagem');
const botaoDica = document.getElementById('botao-dica');
const modalDica = document.getElementById('modal-dica');
const caçaPalavrasDica = document.getElementById('caça-palavras-dica');
const valorPontuacao = document.getElementById('valor-pontuacao');
const totalFases = 11;
const tamanho = 15;

let palavras = [];
let fazeAtual = 0;
let pontos = 0;
let encontradas = 0;
let celulaInicial = null;
let celulaFinal = null;
let selecionado = false;

const criarGrid = (elementoGrid) => {

    elementoGrid.innerHTML = '';

    for (let linha = 0; linha < tamanho; linha++) {
        
        for (let coluna = 0; coluna < tamanho; coluna++) {
            
            const celula = document.createElement('div');

            celula.classList.add('celula');
            celula.dataset.linha = linha;
            celula.dataset.coluna = coluna;
            celula.dataset.letra = '';

            elementoGrid.appendChild(celula);
            
        }
        
    }

}

const colocarPalavras = (elementoGrid) => {

    palavras.forEach(palavra => {

        let colocado = false;

        while(!colocado) {

            const direcao = Math.floor(Math.random() * 8); //Gera direção aleatória para colocar a palavra
            const linhaInicial = Math.floor(Math.random() * tamanho);//Gera um número aleatório para a linha inicial
            const colunaInicial = Math.floor(Math.random() * tamanho);//Gera um número aleatório para a coluna inicial

            if (podeColocarPalavra(linhaInicial, colunaInicial, palavra, direcao, elementoGrid)) {
                //Verifica se a palavra pode ser colocada na posicao inicial e na direção especificada, sem
                    //ultrapassar os limites da grade ou sobrepor outras letras. 
                
                colocarPalavra(linhaInicial, colunaInicial, palavra, direcao, elementoGrid);

                colocado = true;
                //O loop continua até que encontre um local adequado para que a palavra seja colocada.

            }

        }

    });

}

const podeColocarPalavra = (linha, coluna, palavra, direcao, elementoGrid) => {

    const comprimento = palavra.length;

    for (let i = 0; i < comprimento; i++) {
        
        const r = linha + (direcao === 0 || direcao === 1 || direcao === 7 ? -i :  direcao === 3 || direcao === 4 || direcao === 5 ? i : 0);
        //Calcula a linha da célula com base na direção:
        // Direções: 0, 1 e 7 movem para cima(-i)
        // Direções: 3, 4 e 5 movem para baixo(+i)
        //Caso contráio a linha não muda
        const c = coluna + (direcao === 1 || direcao === 2 || direcao === 3 ? i :  direcao === 5 || direcao === 6 || direcao === 7 ? -i : 0);
        //Calcula a coluna da célula com base na direção:
        // Direções 1, 2 e 3 movem para a direita(+i)
        // Direções 5, 6 e 7 movem para a esquerda(-i)
        //Caso ontrário, a coluna não muda

        //Se tiver alguma duvida a respeito do porquê linhas vão para cima ou para baixo e colunas vão para a 
            //direita ou para a esquerda, suba no array la em cima e veja os ..comentários.

        if (r < 0 || r >= tamanho || c < 0 || c >= tamanho) return false; 
        //Verifica se a posição se encontra dentro dos limites da grade

        const celula = obterCelula(r, c, elementoGrid)//Obtem a célula dentro do grid

        if(celula.dataset.letra && celula.dataset.letra !== palavra[i]) return false;
        //Verifica se ja há alguma letra naquela celula pelo seu dataset
        
    }

    return true;//Caso não se encaixe nos critérios de eliminação, a palavra pode ser colocada

}

const colocarPalavra = (linha, coluna, palavra, direcao, elementoGid) => {

    for (let i = 0; i < palavra.length; i++) {
        
        const r = linha + (direcao === 0 || direcao === 1 || direcao === 7 ? -i :  direcao === 3 || direcao === 4 || direcao === 5 ? i : 0);
        //Calcula a linha da célula com base na direção:
        // Direções: 0, 1 e 7 movem para cima(-i)
        // Direções: 3, 4 e 5 movem para baixo(+i)
        //Caso contráio a linha não muda
        const c = coluna + (direcao === 1 || direcao === 2 || direcao === 3 ? i :  direcao === 5 || direcao === 6 || direcao === 7 ? -i : 0);
        //Calcula a coluna da célula com base na direção:
        // Direções 1, 2 e 3 movem para a direita(+i)
        // Direções 5, 6 e 7 movem para a esquerda(-i)
        //Caso ontrário, a coluna não muda

        const celula = obterCelula(r, c, elementoGid);

        celula.dataset.letra = palavra[i];
        celula.dataset.palavra = palavra;
        celula.textContent = palavra[i];
        
    }

}

const obterCelula = (linha, coluna, elementoGrid) => {

    return elementoGrid.querySelector(`.celula[data-linha='${linha}'][data-coluna='${coluna}']`);

}

const preencherCelulasVazias = (elementoGrid) => {

    const celulas = elementoGrid.querySelectorAll('.celula');

    celulas.forEach(celula => {
        if(!celula.dataset.letra) {//Se nãohouver nada na célula
            celula.dataset.letra = letras[Math.floor(Math.random() * letras.length)];
            celula.textContent = celula.dataset.letra;
        }
    });

}

const iniciarFase = () => {

    encontradas = 0;
    palavras = todasPalavras[faseAtual];

    listaPalavras.innerHTML = '';

    palavras.forEach(palavra => {

        const li = document.createElement('li');

        li.textContent = palavra;

        listaPalavras.appendChild(li);

    });

    criarGrid(grid);

    colocarPalavras(grid);

    preencherCelulasVazias(grid);

}

const iniciarJogo = () => {

    pontos = parseInt(localStorage.getItem('cacaPalavrasPontos')) || 0;
    faseAtual = parseInt(localStorage.getItem('cacaPalavrasFase')) || 0;

    valorPontuacao.textContent = pontos;

    iniciarFase();

}

iniciarJogo();

const mostrarDicas = () => {

    criarGrid(caçaPalavrasDica); //Cria um segundo grid

    for (let linha = 0; linha < tamanho; linha++) {
        
        for (let coluna = 0; coluna < tamanho; coluna++) {
           
            const celulaPrincipal = obterCelula(linha, coluna, grid); //Pega cada celula da grid principal
            const celulaDica = obterCelula(linha, coluna, caçaPalavrasDica); //Pega cada celula da grid secundaria

            //Copia os valores de dataset e o valor de cada celula do grid principal, fazendo assim 'clone'.
            celulaDica.dataset.letra = celulaPrincipal.dataset.letra;
            celulaDica.textContent = celulaPrincipal.textContent;

            if (celulaPrincipal.dataset.palavra) {
                //Verifica se a celula principal temum atributo de dados palavra, indicando que faz parte de 
                    //uma palavra no jogo.
                
                celulaDica.classList.add('dica');

            }

            if (celulaPrincipal.classList.contains('selecionada')) {
                //Se o jogador já tiver encontrado a palavra, ela fica marcada no painel das dicas
                
                celulaDica.classList.add('selecionada');

            }


            
        }
        
    }

    modalDica.style.display = 'block';

}

const fecharModal = () => {

    modalDica.style.display = 'none';

}
botaoDica.addEventListener('click', mostrarDicas);

const selecionarPalavra = (inicio, fim) => {

    const linhaInicial = parseInt(inicio.dataset.linha);
    const colunaInicial = parseInt(inicio.dataset.coluna);
    const linhaFinal = parseInt(fim.dataset.linha);
    const colunaFinal = parseInt(fim.dataset.coluna);
    const palavra = [];
    let direcao = null;

    //Linhas: 
    // Direções: 0, 1 e 7 movem para cima(-i)
    // Direções: 3, 4 e 5 movem para baixo(+i)
    //Colunas:
    // Direções 1, 2 e 3 movem para a direita(+i)
    // Direções 5, 6 e 7 movem para a esquerda(-i)

    /*

7 ↑↖    0 ↑    1 ↑↗
6 ←       •      2 →
5 ↓↙    4 ↓    3 ↘↓

    */
    if(linhaInicial === linhaFinal) {

        direcao = colunaInicial < colunaFinal ? 2 : 6; //direita ou esquerda

    } else if (colunaInicial === colunaFinal) {
        
        direcao = linhaInicial < linhaFinal ? 4 : 0; //baixo ou cima

    } else if (linhaInicial < linhaFinal && colunaInicial < colunaFinal) {
        
        direcao = 3; //Diagonal baixo direita

    } else if (linhaInicial < linhaFinal && colunaInicial > colunaFinal) {
        
        direcao = 5;//Diagonal baixo esquerda

    } else if (linhaInicial > linhaFinal && colunaInicial < colunaFinal) {
        
        direcao = 1;//Diagonal emcima direita

    }  else if (linhaInicial > linhaFinal && colunaInicial > colunaFinal) {
        
        direcao = 7;//Diagonal emcima esquerda

    }  

    if (direcao !== null) {
        
        let r = linhaInicial;
        let c = colunaInicial;

        while(r !== linhaFinal || c !== colunaFinal) {

            const celula = obterCelula(r, c, grid);

            palavra.push(celula);

    /*

7 ↑↖    0 ↑    1 ↑↗
6 ←       •      2 →
5 ↓↙    4 ↓    3 ↘↓

    */
            if (direcao === 0 || direcao === 1 || direcao === 7) r--;//sobe
            if (direcao === 3 || direcao === 4 || direcao === 5) r++;//desce
            if (direcao === 1 || direcao === 2 || direcao === 3) c++;//direita
            if (direcao === 5 || direcao === 6 || direcao === 7) c--;//esquerda

        }

        palavra.push(fim);

        if (verificarPalavraValida(palavra)) {
            
            palavra.forEach(celula => celula.classList.add('selecionada'));
            riscarPalavra(palavra[0].dataset.palavra);

            encontradas++;

            verificarConclusao();

        }

    }
 
}

const riscarPalavra = (palavra) => {

    const itens = listaPalavras.querySelectorAll('li');

    itens.forEach(item => {

        if (item.textContent === palavra) {
            
            item.style.textDecoration = 'line-through';

        }

    });

}

const verificarPalavraValida = (palavra) => {

    const texto = palavra.map(celula => celula.dataset.letra).join('');
    //Usa o metodo map para criar um novo array contendo as letras das células, extraindo o atributo 'letra' de
        //cada célula. Em seguida, usa 'join' para concatenar essas letras em uma única string. Por exemplo: 
        //Array palavra = ['U', 'V', 'A'] => texto = ['U', 'V', 'A'] => texto = 'UVA';

    return palavras.includes(texto);
    //palavras contem todas as palavras da fase atual que foram declaradas na função 'iniciarFase'.
    //Retorna true, se a palavra selecionada estiver entres as palavras da fase atual.


}

const verificarConclusao = () => {

    if (encontradas === palavras.length) {
        
        pontos += 10;

        localStorage.setItem('cacaPalavrasPontos', pontos);
        localStorage.setItem('cacaPalavrasFase', faseAtual);

        valorPontuacao.textContent = pontos;
        mensagem.style.display = 'block';

    }

}

const aoPressionarMouse = (e) => {
    
    selecionado = true;

    celulaInicial = e.target;

}

const aoSoltarMouse = (e) => {

    if (selecionado) {
        
        celulaFinal = e.target;

        selecionarPalavra(celulaInicial, celulaFinal);

    }

    selecionado = false;
    celulaInicial = null;
    celulaFinal = null

}

grid.addEventListener('mousedown', aoPressionarMouse);
grid.addEventListener('mouseup', aoSoltarMouse);

const continuar = () => {

    faseAtual++;

    if (faseAtual >= totalFases) {
        
        alert('Parbéns! Voĉe completou todas as fases!');

        faseAtual = 0;
        pontos = 0;

        localStorage.removeItem('cacaPalavrasPontos');
        localStorage.removeItem('cacaPalavrasFase');

    }

    mensagem.style.display = 'none';
    iniciarFase();

}

window.onclick = (event) => {

    if (event.target === modalDica) {
        
        mensagem.style.display = 'none';

    }

}