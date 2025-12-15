document.addEventListener('DOMContentLoaded', function () {
    
    const palavras5 = [
        "TERMO", "CARRO", "LAPIS", "CASAL", "FLOR",
        "TEMPO", "JOGAR", "FESTA", "SOMAR", "VALOR",
        "PULAR", "CORDA", "MUSICA", "LIVRO", "VIDRO",
        "PORTA", "CHAVE", "NOITE", "VERDE", "AZUL", "PRETO"
    ];
    
    const palavras8 = [
        "AVENTURA", "BALANCAR", "COMPUTER", "ELEFANTE", "FESTIVAL",
        "GIRASSOL", "HARMONIA", "IMPERIAL", "JARDIM", "LUMINOSO",
        "MONTANHA", "NATURAL", "ORQUESTA", "PAISAGEM", "QUADRADO",
        "RADIANTE", "SABEDORIA", "TRIANGULO", "UNIVERSO", "VITORIA",
        "XADREZ", "ZANGADO", "ABACAXI", "BANHEIRA", "CACHORRO",
        "DORMITOR", "ELEGANTE", "FABRICA", "GARRAFA", "HOSPEDAR"
    ];
    
    const palavras12 = [
        "DOCUMENTARIO", "EXPERIMENTAL", "FANTASIOSO", "GIRATORIO",
        "HABILIDOSO", "IMPRESSIONAR", "JUSTAMENTE", "LABORATORIO",
        "MAGNIFICENTE", "NATURALMENTE", "ORGANIZACAO", "PENINSULA",
        "QUADRILHA", "RECONHECER", "SATISFACAO", "TRANQUILO",
        "ULTIMAMENTE", "VEGETARIANO", "XENOFOBICO", "ZELADORIA",
        "ANTROPOLOGIA", "BIBLIOTECA", "CALEIDOSCOPO", "DESENVOLVER",
        "ELETRICIDADE", "FOTOGRAFIA", "GEOMETRIA", "HIDROELETRICA",
        "INTERNACIONAL", "JORNALISMO"
    ];

    let palavraCorreta = "";
    let tentativaAtual = "";
    let linhaAtual = 0;
    let pontos = localStorage.getItem('pontos') ? parseInt(localStorage.getItem('pontos')) : 0;
    let dificuldade = 5;
    
    const tabuleiro = document.getElementById('tabuleiro');
    const tecladoDiv = document.getElementById('teclado');
    const botaoApagar = document.getElementById('apagar');
    const botaoEnviar = document.getElementById('enviar');
    const botaoVerPalavra = document.getElementById('ver-palavra');
    const botaoDificuldade = document.getElementById('dificuldade');
    const botaoRegras = document.getElementById('regras');
    const mensagemDiv = document.getElementById('mensagem');
    const fimJogoDiv = document.getElementById('fim-jogo');
    const modalRegras = document.getElementById('modal-regras');
    const botaoProximaPalavra = document.getElementById('proxima-palavra');
    const botaoTentarNovamente = document.getElementById('tentar-novamente');
    const botaoFecharRegras = document.getElementById('fechar-regras');
    const pontosSpan = document.getElementById('pontos');

    pontosSpan.textContent = pontos;
    
    function criarTabuleiro() {
        
        tabuleiro.innerHTML = '';
        tabuleiro.style.gridTemplateColumns = `repeat(${dificuldade}, 1fr)`;

        for (let i = 0; i < dificuldade; i++) {
            
            for (let j = 0; j < dificuldade; j++) {
                
                const letra = document.createElement('div');
                letra.classList.add('letra');
                tabuleiro.appendChild(letra);
                
            }
            
        }

    }

    function criarTeclado() {
        
        tecladoDiv.innerHTML = '';

        const teclado = [

            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'

        ];

        teclado.forEach(letra => {

            const tecla = document.createElement('div');
            tecla.classList.add('tecla');
            tecla.textContent = letra;
            tecla.addEventListener('click', () => adicionarLetra(letra, tecla));
            tecladoDiv.appendChild(tecla);

        });

    }

    function adicionarLetra(letra, tecla) {
        
        try {
            if(tecla.classList.contains('errada')) return;
            if (tentativaAtual.length < dificuldade) {//Se o comprimento da tentativa atual é menorque a dificudade
                //Essa verificação barra caso o jogador tente colocar mais letras que o permitido;
                
                tentativaAtual += letra;
                atualizarTentativa();

            }
        } catch (error) {

            console.log(error)
            
        }

    }

    function atualizarTentativa() {
        
        const letras = tabuleiro.children;
        /*
        letras = tabuleiro.children retorna um HTMLCollection linear (não um array 2D) com todos os elementos
         .letra na ordem em que foram criados.
         Tipo um .querySelectorAll() porem, retorna todos os elementos filhos do tabuleiro.
        */

        for (let i = 0; i < dificuldade; i++) {
            
            const letraDiv = letras[linhaAtual * dificuldade + i];
            //Aqui temos um calculo para decobrirmos qual div vamos colocar a letra, ele funciona assim:
            /*
                letras recebe um array linear, porem ele é guardado na memória assim:

                                Índices na memória:      Layout visual:
                                0  1  2  3  4  5  6  7      Linha 0
                                8  9 10 11 12 13 14 15      Linha 1
                                16 17 18 19 20 21 22 23     Linha 2
                                24 25 26 27 28 29 30 31     Linha 3
                                32 33 34 35 36 37 38 39     Linha 4
                                40 41 42 43 44 45 46 47     Linha 5
                                48 49 50 51 52 53 54 55     Linha 6
                                56 57 58 59 60 61 62 63     Linha 7

                linhaAtual, é a tentativa em que o jogador está, caso seja a primeira 0, a segunda 2...
                
                Sabendo disso, vemos que, pegar a linha a tual e multiplicar pela dificuldade = 5 || 8 || 12,
                cai exatamente na célulaDiv que precisamos, mudando somente os valores de dificuldade e 
                linha atual.

                    linhaAtual * dificuldade: Pula para o início da linha atual

                    + i: Move para a coluna específica dentro da linha
            */
            letraDiv.textContent = tentativaAtual[i] || "";
            
        }

    }

    function apagarLetra() {
        
        if (tentativaAtual.length > 0) {
            tentativaAtual = tentativaAtual.slice(0, -1);
            atualizarTentativa()
        }

    }

    function validarTentativa() {

        if (tentativaAtual.length === dificuldade) {//Somente é possivel verificar tentativa se colocou todas as letras
                
            const letras = tabuleiro.children;

            let acertos = 0;

            for (let i = 0; i < dificuldade; i++) {
                
                const letra = tentativaAtual[i];
                const letraDiv = letras[linhaAtual * dificuldade + i];

                if (letra === palavraCorreta[i]) {
                    letraDiv.classList.add('correta');
                    acertos++;
                } else if(palavraCorreta.includes(letra)) {

                    letraDiv.classList.add('incerta');

                } else {

                    letraDiv.classList.add('errada');

                }

                marcarTecla(letra, letraDiv.classList);
                
            }

            if (acertos === dificuldade) {
                
                mensagemDiv.classList.remove('hidden');
                pontos++;
                pontosSpan.textContent = pontos;
                localStorage.setItem('pontos_termo', pontos);

            } 

            linhaAtual++;
            tentativaAtual = '';

            if (linhaAtual >= dificuldade) {
                fimJogoDiv.classList.remove('hidden');
            } 
        }
    }

    function marcarTecla(letra, classes) {
        
        const teclas = document.getElementsByClassName('tecla');

        for (let tecla of teclas) {
            
            if (tecla.textContent === letra) {

                tecla.classList.remove('correta');

                if (classes.contains('correta')) {
                    tecla.classList.add('correta');
                } else if (classes.contains('incerta')) {
                    tecla.classList.add('incerta');
                }else if (classes.contains('errada')) {
                    tecla.classList.add('errada');
                }
                break;
                
            }
            
        }

    }

    function verPalavra() {
        alert('A palavra atual é: ' + palavraCorreta)
    }

    function proximaPalavra() {
        
        linhaAtual = 0;
        tentativaAtual = "";

        mensagemDiv.classList.add('hidden');
        fimJogoDiv.classList.add('hidden');

        criarTabuleiro();
        escolherPalavra();
        criarTeclado();

    }

    function aumentarDificuldade() {
        
        let novaDificuldade = parseInt(prompt("Escolha a dificuldade: 5, 8 ou 12 Letras"));

        if (novaDificuldade === 8 || novaDificuldade === 12 || novaDificuldade === 5) {
            dificuldade = parseInt(novaDificuldade);
            proximaPalavra();
        }

    }

    function tentarNovamente() {
        
        linhaAtual = 0;
        tentativaAtual = "";

        mensagemDiv.classList.add('hidden');
        fimJogoDiv.classList.add('hidden');

        criarTabuleiro();
        escolherPalavra();
        criarTeclado();

    }

    function mostrarRegras() {
        modalRegras.classList.remove('hidden')
    }
    function fecharRegras() {
        modalRegras.classList.add('hidden')
    }

    botaoApagar.addEventListener('click', apagarLetra);
    botaoEnviar.addEventListener('click', validarTentativa);
    botaoVerPalavra.addEventListener('click', verPalavra);
    botaoProximaPalavra.addEventListener('click', proximaPalavra);
    botaoDificuldade.addEventListener('click', aumentarDificuldade);
    botaoTentarNovamente.addEventListener('click', tentarNovamente);
    botaoRegras.addEventListener('click', mostrarRegras);
    botaoFecharRegras.addEventListener('click', fecharRegras);

    function escolherPalavra() {
        
        let palavras;

        if (dificuldade === 5) {
            palavras = palavras5
        } else if (dificuldade === 8) {
            palavras = palavras8
        } else {
            palavras = palavras12;
        }

        let indicePalavra =  Math.floor(Math.random() * palavras.length);
        
        palavraCorreta = palavras[indicePalavra];
    }

    document.addEventListener("keydown", (e) => {
        const letra = e.key.toUpperCase();
        const teclado = [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ];
        
        if (teclado.includes(letra)) {
            // Simula o clique na tecla virtual correspondente
            const teclas = document.querySelectorAll('.tecla');
            for (let tecla of teclas) {
                if (tecla.textContent === letra) {
                    adicionarLetra(letra, tecla);
                    break;
                }
            }
        } else if (e.key === 'Enter') {
            validarTentativa();
        } else if (e.key === 'Backspace') { // CORREÇÃO: === em vez de =
            
            apagarLetra();
        }
    });

    criarTabuleiro();
    criarTeclado();
    escolherPalavra();

});

