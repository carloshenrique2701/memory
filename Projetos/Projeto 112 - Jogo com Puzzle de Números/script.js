document.addEventListener('DOMContentLoaded', function () {
   
    const containerPuzzle = document.getElementById('containerPuzzle');
    const botaoTestar = document.getElementById('testar');
    const tamanhoTabuleiro = document.getElementById('tamanho-tabuleiro');
    const modalVitoria = document.getElementById('modal-vitoria');
    const fecharModal = document.getElementById('fechar-modal');
    const pontuacao = document.getElementById('pontos');
    
    let pontos = localStorage.getItem('pontos_puzzle') ? parseInt(localStorage.getItem('pontos_puzzle')) : 0;
    let ordemPecas;
    let tamanhoAtual = 3;

    pontuacao.innerText = pontos;
    fecharModal.onclick = () => {
        modalVitoria.style.display = 'none'; 
        window.location.reload();
    };
    window.onclick = (event) => {

        if (event.target === modalVitoria) {
            modalVitoria.style.display = 'none';
            window.location.reload();
        }

    }

    function inicializerJogo() {
        
        ordemPecas = criarOrdemInicial(tamanhoAtual);
        embaralharPecas(ordemPecas);
        criarTabuleiro(tamanhoAtual);
        renderizar();

    }

    function criarOrdemInicial(tamanho) {
        
        const ordem = [];

        for (let i = 1; i < tamanho * tamanho; i++) {
            //Inicia um loop que itera enquanto i atinge o valor de  'tamanho * tamanho', ou seja, tamanho com
                //valor de 3, que basicamente significa 3 colunas, precisa ser multiplicado por ele mesmo para
                //que possa passar por todas as 9 peças (3*3 = 9).
            //Assim, é criada a ordemInicial do tabuleiro onde se torna flexivel com o tamanho que o jogador
                //escolher.
            
            ordem.push(i);
            
        }

        ordem.push(null);//Adiciona mais uma Peça na ordem com o valor de null, representando a peça faltante.

        return ordem;

    }

    function embaralharPecas(array) {//Algoriitimo de Fisher-Yates para embaralahar o array

        for (let i = array.length - 1; i > 0; i--) {
            
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
            //Utiliza da sintaxe de atribuição de desestruturação, que torna a troca de valordes entre as 
                //posições do array(escolhidas de forma aleatoria pelo j), movendo-se sistematicamente do
                //final do array para o inicio
            
        }

        //Essa função não retorna nada, pois ela modifica o array passado diretamente(embaralhamento local)

    }

    function criarTabuleiro(tamanho) {
        
        containerPuzzle.style.gridTemplateColumns = `repeat(${tamanho}, 100px)`;
        containerPuzzle.style.gridTemplateRows = `repeat(${tamanho}, 100px)`;
        containerPuzzle.innerHTML = ''; 

        for (let i = 1; i <= tamanho * tamanho; i++) {
            
            const peca = document.createElement('div');
            peca.classList.add('peca');

            if (i === tamanho * tamanho) {
                //A peça com o index = 0 precisa ser inexistente para que o jogador possa mover as outras
                peca.id = 'peca-vazia';
            } else {

                peca.id = `peca-${i}`;//Marca cada peça no tabuleiro
                peca.innerHTML = i;

            }

            containerPuzzle.appendChild(peca);
            
        }

    }

    function renderizar() {
        
        const pecas = Array.from(document.querySelectorAll('.peca'));

        ordemPecas.forEach((valor, index) => {
            
            if (valor !== null) {
                pecas[valor - 1].style.order = index;
                pecas[valor - 1].style.backgroundColor = '#ffdab9';

            } else {

                const pecaVazia = document.getElementById('peca-vazia');
                pecaVazia.style.order = index;
                pecaVazia.style.backgroundColor = '#8b5a2b';

            }

        });

        verificarVitoria();

    }

    function verificarVitoria() {

        const ordemCorreta = criarOrdemInicial(tamanhoAtual);

        if (ordemPecas.every((val, index) => val === ordemCorreta[index])) {
            //Verifica se todos os elementos em 'ordemPecas' correspondem aos elementos em 'ordemCorreta', se 
                //um elemento não estiver na ordem correta, retorna false e esse bloco de código não é 
                //executado.
            
            pontos += 10;
            localStorage.setItem('pontos_puzzle', pontos);

            pontuacao.innerText = pontos;
            modalVitoria.style.display = 'flex';

        }
        
    }

    document.addEventListener('click', (event) => {

        if (event.target.classList.contains('peca')) {

            const indexPeca = ordemPecas.indexOf(parseInt(event.target.innerText));
            const indexVazio = ordemPecas.indexOf(null);

            if (jogadaValida(indexPeca, indexVazio)) {

                [ordemPecas[indexPeca], ordemPecas[indexVazio]] = [ordemPecas[indexVazio], ordemPecas[indexPeca]];

                renderizar();
            }
            
        }

    });

    function jogadaValida(indexOrigem, indexDestino) {
        
        const colunas = tamanhoAtual; //Representa o número de colunas no tabuleiro.
        //É usado para calcular os posições de linha e coluna das peças.

        const linhaOrigem = Math.floor(indexOrigem / colunas);//Ex: 0
        ;//Determina a linha do tabuleiro a qual a peça de origem está localizada

        const colunaOrigem = indexOrigem % colunas;//Ex: 1
        //Determina a coluna do tabuleiro a qual a peça de origem está localizada

        const linhaDestino = Math.floor(indexDestino / colunas);//Ex: 1
        //Determina a linha do tabuleiro a qual a peça de vazia está localizada

        const colunaDestino = indexDestino % colunas;//Ex: 1
        //Determina a coluna do tabuleiro a qual a peça de vazia está localizada

        const distancia = Math.abs(linhaOrigem - linhaDestino) + Math.abs(colunaOrigem - colunaDestino);
        //Math.abs retorna um número desconsiderando seu sinal ex: Math.abs(-5) = 5 || Math.abs(5) = 5
        //Ex: (0 - 1) + (1 - 1) ==== 1 => posição válida;

        return distancia === 1;

    }

    botaoTestar.addEventListener('click', () => {

        ordemPecas = criarOrdemTeste(tamanhoAtual);
        renderizar();

    });

    function criarOrdemTeste(tamanho) {

        const ordem = [];

        for (let i = 1; i < tamanho * tamanho - 1; i++) {
            //Diferente mente de 'criarOrdemInicial' ele deixa 1 peça de fora
                //  para q possa ser completado com uma única movimentação
            
            ordem.push(i);
            
        }

        ordem.push(null);
        ordem.push(tamanho * tamanho - 1);

        return ordem;
        
    }

    tamanhoTabuleiro.addEventListener('change', () => {

        tamanhoAtual = parseInt(tamanhoTabuleiro.value);
        inicializerJogo();

    });

    inicializerJogo()

});