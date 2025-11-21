document.addEventListener('DOMContentLoaded', function () {
    iniciarJogo();
});

function iniciarJogo() {
    
    const imagens = [//Nomes das imagens

        'img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg',
        'img6.jpg','img7.jpg','img8.jpg','img9.jpg','img10.jpg'

    ];

    let imagensDuplicadas =[...imagens, ...imagens];
    //Duplica o array imagens utilizando o operador spread '...' para copiar os elementos duas vezes, pois,
        //em um jogo da memória, é preciso que cada imagem tenha um par.
    /*
                    **O operador spread (...) no JavaScript é usado para:**

        Expandir elementos de um array ou propriedades de um objeto.

        Copiar arrays/objetos de forma rasa (shallow copy).

        Concatenar arrays ou combinar objetos.

        Passar elementos de um array como argumentos de uma função.

        **Exemplos:

        // Copiar array
        const arr = [1, 2, 3];
        const copy = [...arr];

        // Concatenar arrays
        const arr1 = [1, 2];
        const arr2 = [3, 4];
        const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

        // Passar elementos como argumentos
        const nums = [1, 2, 3];
        Math.max(...nums); // Equivale a Math.max(1, 2, 3)

        // Copiar/combinar objetos
        const obj = { a: 1, b: 2 };
        const objCopy = { ...obj };
        const merged = { ...obj, c: 3 }; // { a: 1, b: 2, c: 3 }

        Basicamente, você passa os elementos do array e não o array inteiro.

    */

    let imagensEmbaralhadas = embaralhar(imagensDuplicadas);

    const tabuleiro = document.querySelector('.tabuleiro');

    tabuleiro.innerHTML = '';

    for (let i = 0; i < imagensDuplicadas.length; i++) {
        
        const carta = document.createElement('div');

        carta.classList.add('carta');

        carta.innerHTML = `<img src="imgs/verso.png" alt="Verso" data-imagem="imgs/${imagensEmbaralhadas[i]}">`;

        tabuleiro.appendChild(carta);
        
    }

    const cartas = document.querySelectorAll('.carta');

    let cartaVirada = null;

    let travarTabuleiro = true;

    let paresEncontrados = 0;

    mostrarImagens();
    

    // Função que utiliza o algoritmo de Fisher-Yates (Knuth Shuffle) para embaralhar o array.
    function embaralhar(array) {
        
        //Isso é uma declaração múltipla de variáveis em uma única linha usando let. Equivale a:
        /*
            let currentIndex = array.length;
            let temporaryValue;    // undefined
            let randomIndex;       // undefined
        */
        let currentIndex = array.length; // Índice que começa no final do array
        let temporaryValue;              // Variável temporária para armazenar valor durante troca
        let randomIndex;                 // Índice aleatório gerado a cada iteração

        // Enquanto ainda houver elementos para embaralhar...
        while (currentIndex !== 0) {

            // Gera um índice aleatório entre 0 e currentIndex-1
            randomIndex = Math.floor(Math.random() * currentIndex);

            // Move para o próximo elemento (de trás para frente)
            currentIndex -= 1;

            // Troca o elemento atual (currentIndex) com o elemento aleatório (randomIndex)
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    /*
    🔍 Lógica detalhada do algoritmo Fisher-Yates:
                    *****Conceito principal:*****

        Embaralhar de trás para frente, trocando cada elemento com outro elemento aleatório que ainda não foi embaralhado.
        Passo a passo:

            Inicialização:*****

                currentIndex = array.length → Começa pelo último elemento

            Loop while:*****

                Continua enquanto currentIndex != 0 → até embaralhar todos os elementos

            Geração do índice aleatório:*****

                randomIndex = Math.floor(Math.random() * currentIndex)

                Gera número entre 0 e currentIndex - 1

                Importante: Sempre pega entre os elementos NÃO embaralhados

            Decremento do currentIndex:*****

                currentIndex -= 1 → Move para a posição anterior

            Troca de valores (swap):*****

                Salva o valor atual em temporaryValue

                Coloca o elemento aleatório na posição atual

                Coloca o elemento salvo na posição aleatória

        🎯 Exemplo visual:

        Array inicial: [A, B, C, D]

        1ª iteração (currentIndex = 4):

            randomIndex entre 0-3 → digamos 2

            currentIndex vira 3

            Troca array[3] (D) com array[2] (C)

            Resultado: [A, B, D, C]

        2ª iteração (currentIndex = 3):

            randomIndex entre 0-2 → digamos 1

            currentIndex vira 2

            Troca array[2] (D) com array[1] (B)

            Resultado: [A, D, B, C]

        E assim por diante...
    */

    function mostrarImagens() {
        
        cartas.forEach(carta => {

            const imgElement = carta.querySelector('img');

            imgElement.src = imgElement.getAttribute('data-imagem');

        });

        setTimeout(() => {

            cartas.forEach(carta => {

                carta.querySelector('img').src = "imgs/verso.png";

            });

            travarTabuleiro = false;

            cartas.forEach(carta => {

                carta.addEventListener('click', virarCarta);

            });

        }, 10000);

    }

    function virarCarta() {
        
        if (travarTabuleiro || this === cartaVirada) return;//Se a carta clicada é a mesma que está virada;

        let imgElement = this.querySelector('img');

        imgElement.src = imgElement.getAttribute('data-imagem');

        if(!cartaVirada) {//Se não houver carta virada

            cartaVirada = this;

        } else {

            verificarPar(this, cartaVirada);

            cartaVirada = null;

        }

    }

    function verificarPar(carta1, carta2) {
        
        if (carta1.querySelector('img').getAttribute('data-imagem') === carta2.querySelector('img').getAttribute('data-imagem')) {
            
            carta1.removeEventListener('click', virarCarta);
            carta2.removeEventListener('click', virarCarta);

            paresEncontrados++;

            if (paresEncontrados === imagens.length) {
                
                fimDeJogo();

            }

        } else {

            travarTabuleiro = true;

            setTimeout(() => {

                carta1.querySelector('img').src = 'imgs/verso.png';
                carta2.querySelector('img').src = 'imgs/verso.png';

                travarTabuleiro = false
                
            }, 500);
            
        }

    }

    function fimDeJogo() {
        
        setTimeout(() => {

            alert('Parabéns! Você encontrou todos os pares. Clique em OK para recomeçar.');

            iniciarJogo()

        }, 2000)

    }

}