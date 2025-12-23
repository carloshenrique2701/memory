document.addEventListener('DOMContentLoaded', () =>{

    const containerQuebraCabeca = document.getElementById('container-quebra-cabeca');

    const entradaImagem = document.getElementById('entradaImagem');

    const selecaoTamanho = document.getElementById('selecaoTamanho');

    const pontuacaoDisplay = document.createElement('div');
    const containerMain = document.getElementById('container')

    containerMain.insertBefore(pontuacaoDisplay, containerQuebraCabeca);//Insere a pontuação antes do quebra-cabeça

    pontuacaoDisplay.style.fontSize = '20px';
    pontuacaoDisplay.style.marginTop = '10px';

    let urlImagem = '';
    let pecas = null;

    entradaImagem.addEventListener('change', function (e) {
        
        if (e.target.length === 0) return;//Verifica se nenhum arquivo foi selecionado

        const arquivo = e.target.files[0];//Obtem o primeiro arquivo selecionado

        const leitor = new FileReader();//Instância da classe FileReader

        leitor.onload = function (e) {
            
            urlImagem = e.target.result;//Armazena url da imagem selecionada

            iniciarQuebraCabeca();

        }

        leitor.readAsDataURL(arquivo);//Lê o conteúdo do arquivo como uma URL de dados.
        //Isso converte o arquivo de imagem em uma URL que pode ser usada como fonte de uma imagem no HTML.
        //O método 'readAsDataURL' é addíncrono e, quando a çeitura é concluída, o evento 'onload' é disparado.

    });

    function iniciarQuebraCabeca() {
        
        containerQuebraCabeca.innerHTML = '';

        const tamanho = parseInt(selecaoTamanho.value);

        const dimensao = Math.sqrt(tamanho);
        //Calcula a dimensão do quebra-cabeça a partir do tamanho, por exemplo, tamanho: 16, dismensão: 4
            //Assim, fazemos um grid 4x4 com a imagem dividida nessa proporção

        const tamanhoImagem = 450;

        const tamanhoPeca = tamanhoImagem / dimensao;
        //Divide a imagem para separação de peças

        containerQuebraCabeca.style.gridTemplateColumns = `repeat(${dimensao}, ${tamanhoPeca}px)`;
        containerQuebraCabeca.style.gridTemplateRows = `repeat(${dimensao}, ${tamanhoPeca}px)`;

        let posicoes = Array.from({length: tamanho}, (_, i) => i);
        //Cria um Array posições para as pecas. 'Array.from({length: tamanho}, (_, i) => i)' cria uma array com
            //'tamanho' como elementos, onde cada elemento é o seu próprio índice. Por exemplo, se o tamanho
            //do quebra-cabeça escolhido pelo usuário for 9, o array será [0, 1, 2, 3, 4, 5, 6, 7, 8].

        posicoes = embaralhar(posicoes);

        posicoes.forEach((posicao, index) => {

            const peca = document.createElement('div');

            peca.className = 'peca-quebra-cabeca';

            peca.style.backgroundImage = `url(${urlImagem})`;

            const x = -(posicao % dimensao) * tamanhoPeca; 
            //A pozição horizontal (x) da imagem de fundo é calculada com base na coluna em que a peca deveria estar,
                //multiplicada pelo tamanho da peca(centralizando ela) e negativa para mover a imagem na direção 
                //correta.
            const y = -Math.floor(posicao / dimensao) * tamanhoPeca;
            //A posição verticaal (y) é calculada com base na linha em que a peca deveria estar, multiplicada pelo 
                //tamanho(tambem para centralizar), arredondando para o menor mais próximo e negativa para mover
                //a imagem para direção correta.

            peca.style.width = `${tamanhoPeca}px`
            peca.style.height = `${tamanhoPeca}px`
            peca.style.backgroundPosition = `${x}px ${y}px`
            peca.style.backgroundSize = `${tamanhoImagem}px ${tamanhoImagem}px`;

            peca.setAttribute('data-posicao', posicao);
            peca.setAttribute('data-indice', index);

            peca.draggable = true;

            containerQuebraCabeca.appendChild(peca);

        });

        pecas = document.querySelectorAll('.peca-quebra-cabeca');
        aducionarOuvintesArrastar();

        atualizarPontuacao();

    }

    function embaralhar(array) {
        //intera sobre cada elemento do array começando pelo último
        for (let i = array.length - 1; i > 0; i--) {
            //Gera um indice aleatório entr 0 e 'i' (inclusive, ou seja, o próprio i ou o 0 pode ser gerado).
                //e arrendonda para baixo para ser usado como indice no novo array embralhado.
            const j = Math.floor(Math.random() * ( i + 1 ));//'( i + 1 )' responsável por gerar o intervalo [0, i].

            //Troca os elementos no índice 'i' e no índice 'j' utilizando desestruturação de array. 
            [array[i], array[j]] = [array[j], array[i]];
            
        }

        return array;

    }

    function aducionarOuvintesArrastar() {

        pecas.forEach(peca => {
            
            peca.addEventListener('dragstart', lidarInicioArrastar);//Evento ativado quando começa a arrastar
            peca.addEventListener('dragover', lidarSobreArrastar);//Evento para quando uma peça arrastada estiver sobre outra
            peca.addEventListener('drop', lidarSolta);//Evento para o momento em que a peca é solta sobre outra
            peca.addEventListener('dragend', lidarFimArrastar);//Evento para quando a peca não está sendo arrastada

        });
        
    }

    function lidarInicioArrastar(e) {
        
        pecaArrastada = this;

        setTimeout(() => this.classList.add('esconder'), 0);//Fica invisivel quando está sendo arrastada

    }

    function lidarSobreArrastar(e) {
        
        //Previne o comportamento padrão do evento.
        //Isso permite que a peça arrastada seja solta sobre um alvo válido.
        e.preventDefault();

    }

    function lidarSolta(e) {
        
        e.preventDefault();

        if (pecaArrastada) {
            
            const indiceArrastado = parseInt(pecaArrastada.getAttribute('data-indice'));
            const indiceAlvo = parseInt(this.getAttribute('data-indice'));

            trocarPeca(indiceArrastado, indiceAlvo);

        }

    }

    function trocarPeca(indiceArrastado, indiceAlvo) {

        const pecaAlvo = pecas[indiceAlvo];

        const posicaoArrastada = pecaArrastada.style.backgroundPosition;

        pecaArrastada.style.backgroundPosition = pecaAlvo.style.backgroundPosition;

        pecaAlvo.style.backgroundPosition = posicaoArrastada;

        const temPos = pecaArrastada.getAttribute('data-posicao');

        pecaArrastada.setAttribute('data-posicao', pecaAlvo.getAttribute('data-posicao'));

        pecaAlvo.setAttribute('data-posicao', temPos);
        
    }

    function lidarFimArrastar() {
        
        this.classList.remove('esconder');//Mostra a peça novamente

        verificarVitoria();

    }

    function verificarVitoria() {

        const estaResolvido = Array.from(pecas).every((peca, indice) => parseInt(peca.getAttribute('data-posicao')) === indice);
        //Cria uma array com as peças que o usuário movimentou e utiliza do .every() para verificar se o indice
            //de cada peça do quebra-cabeça é igual ao atributo 'data-posicao' que armazena a posição original
            //de cada peça.
        //✅ Retorna true: Se TODAS as peças tiverem data-posicao igual ao seu índice
        //❌ Retorna false: Se PELO MENOS UMA peça tiver data-posicao diferente do seu índice

        if (estaResolvido) {
            
            alert('Parabéns!!! Você resolveu o quebra-cabeça');

            incrementarPontuacao();

        }
        
    }

    function incrementarPontuacao() {
        
        let pontuacao = parseInt(localStorage.getItem('pontuacao') || 0);

        pontuacao++;

        localStorage.setItem('pontuacao', pontuacao.toString());

        atualizarPontuacao();

    }

    function atualizarPontuacao() {
        
        let pontuacao = parseInt(localStorage.getItem('pontuacao') || 0);

        pontuacaoDisplay.textContent = `Pontuação: ${pontuacao}`;

    }

});