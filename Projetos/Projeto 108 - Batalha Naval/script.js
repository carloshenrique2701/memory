const AGUA = false;//Identifica a àgua com false, o os navios pelos seus respectivos ids

const mapa = Array(15).fill().map(() => Array(15).fill(AGUA));

const gameContainer = document.getElementById('gameContainer');
const mostrarNaviosBtn = document.getElementById('mostrarNaviosBtn');
const vidasElement = document.getElementById('vidas');
const pontuacaoElement = document.getElementById('pontuacao');
const modal = document.getElementById('modal');
const fecharModal = document.getElementById('fecharModal');
const mensagem = document.getElementById('mensagem');
const titulo = document.getElementById('titulo');
const pontuacaoElementModal = document.getElementById('pontuacao');
const frota = [
    { id: 1, pontuacao: 100, tamanho: 5, vida: 5 },
    { id: 2, pontuacao: 200, tamanho: 4, vida: 4 },
    { id: 3, pontuacao: 300, tamanho: 3, vida: 3 },
    { id: 4, pontuacao: 400, tamanho: 2, vida: 2 },
    { id: 5, pontuacao: 400, tamanho: 2, vida: 2 },
    { id: 6, pontuacao: 400, tamanho: 2, vida: 2 },
    { id: 7, pontuacao: 400, tamanho: 2, vida: 2 },
    { id: 8, pontuacao: 400, tamanho: 2, vida: 2 },
    { id: 9, pontuacao: 300, tamanho: 3, vida: 3 },
    { id: 10, pontuacao: 300, tamanho: 3, vida: 3 },
    { id: 11, pontuacao: 300, tamanho: 3, vida: 3 },
    { id: 12, pontuacao: 300, tamanho: 3, vida: 3 },
    { id: 13, pontuacao: 300, tamanho: 3, vida: 3 },
];

let vidas = parseInt(localStorage.getItem('vidas')) <= 0 ? 15 : parseInt(localStorage.getItem('vidas')); 
let pontuacao = parseInt(localStorage.getItem('pontuacao')) || 0; 
let naviosAfundados = 0;
let totalNavios = frota.length;
let frotasColocadas = [];
let statusJogo = true;

function popularMapa() {
    // Limpa o mapa antes de popular
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            mapa[i][j] = AGUA;
        }
    }

    // Reset da frota colocada
    frotasColocadas = [];

    // Coloca cada navio da frota
    frota.forEach(navio => {
        let colocado = false;
        
        while (!colocado) {
            colocado = tentarColocarNavio(navio.id, navio.tamanho);
        }
    });
}

function tentarColocarNavio(idNavio, tamanho) {
    const direcao = Math.floor(Math.random() * 2); //Gera uma direção aleatória(direita, esquerda, cima ou baixo)
    let linha, coluna;

    //Define para qual angulo esta essa direção
    if (direcao === 0) { // Horizontal
        linha = Math.floor(Math.random() * 15);
        coluna = Math.floor(Math.random() * (15 - tamanho));
    } else { // Vertical
        linha = Math.floor(Math.random() * (15 - tamanho));
        coluna = Math.floor(Math.random() * 15);
    }

    // 1. Verifica se todas as células estão livres
    for (let i = 0; i < tamanho; i++) {
        let celulaLinha = linha + (direcao === 1 ? i : 0);
        let celulaColuna = coluna + (direcao === 0 ? i : 0);

        if (mapa[celulaLinha][celulaColuna] !== AGUA) {
            return false; // Posição ocupada
        }
    }

    // 2. Coloca o navio com seu ID
    for (let i = 0; i < tamanho; i++) {
        let celulaLinha = linha + (direcao === 1 ? i : 0);
        let celulaColuna = coluna + (direcao === 0 ? i : 0);

        // Em vez de apenas true, armazena o ID do navio
        mapa[celulaLinha][celulaColuna] = idNavio; // ID do navio
    }

    // Registra o navio colocado
    frotasColocadas.push({
        id: idNavio,
        vida: tamanho,
        tamanho: tamanho,
        pontuacao: frota.find(n => n.id === idNavio).pontuacao
    });

    return true;
}

function criarTabuleiro() {
    gameContainer.innerHTML = '';

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            const celula = document.createElement('div');
            
            // Se mapa[i][j] for false (AGUA) ou um número (ID do navio)
            const valor = mapa[i][j];
            
            if (valor === AGUA) {
                celula.dataset.navio = 'false';
                celula.dataset.idNavio = '0';
            } else {
                celula.dataset.navio = 'true';
                celula.dataset.idNavio = valor.toString(); // ID do navio
            }
            
            celula.classList.add('celula');
            gameContainer.appendChild(celula);
        }
    }
    
    // Mostra informações no console para debug
    console.log('Navios colocados:', frotasColocadas);
    console.log('Total de células de navio:', document.querySelectorAll('[data-navio="true"]').length);
}

function virarPeça(e) {
    let celula = e.target;

    if(!celula.classList.contains('celula')) return;
    if(celula.classList.contains('virada')) return;

    celula.classList.add('virada');
    
    if (celula.dataset.navio === 'true') {
        celula.classList.add('navio');
        console.log('Acertou um navio!');
        
        const idNavio = parseInt(celula.dataset.idNavio);
        
        // Encontra o navio na frota colocada
        const navio = frotasColocadas.find(n => n.id === idNavio);
        
        if (navio) {
            navio.vida--; // Reduz a vida do navio
            pontuacao += 20; // Pontuação por acerto
            
            // Se navio foi destruído
            if (navio.vida <= 0) {
                pontuacao += navio.pontuacao; // Bônus por destruir
                naviosAfundados++;
                
                console.log(`Navio ${idNavio} destruído! +${navio.pontuacao} pontos`);
                
                animarDestruicaoNavio(idNavio).then(() => {
                    // Após animação, atualiza pontuação
                    atualizarDadosJogador();
                    
                    // Verifica vitória (só depois da animação)
                    if (naviosAfundados === totalNavios) {
                        // Pequeno delay para a última animação terminar
                        setTimeout(() => {
                            fimDeJogo('ganhou');
                        }, 1000);
                    }
                });
            }
        }
    } else {
        celula.classList.add('agua');
        console.log('Água!');
        vidas--;
        
        if (vidas <= 0) {
            fimDeJogo('perdeu');
            return;
        }
    }

    atualizarDadosJogador();
}

function animarDestruicaoNavio(idNavio) {
    // Encontra todas as células que fazem parte deste navio
    const celulasNavio = document.querySelectorAll(`.celula[data-id-navio="${idNavio}"]`);
    
    // Aplica a animação em cada célula do navio
    celulasNavio.forEach((celula, index) => {
        // Delay escalonado para criar efeito de onda
        setTimeout(() => {
            // Adiciona classe de animação
            celula.classList.add('destruindo');
            
            // Quando a animação terminar
            setTimeout(() => {
                // Remove a animação e adiciona classe final
                celula.classList.remove('destruindo');
                celula.classList.add('destruido');
                
                // Retorna a cor original
                celula.style.backgroundColor = 'red';
                
                // Remove eventos de hover/click
                celula.style.cursor = 'default';
                celula.style.pointerEvents = 'none';
                
            }, 1500); // Tempo da animação
        }, index * 200); // Delay entre cada célula (efeito de onda)
    });
    
    return new Promise(resolve => {
        // Resolve após todas as animações terminarem
        setTimeout(() => resolve(), celulasNavio.length * 200 + 1500);
    });
}

function fimDeJogo(status) {

    atualizarDadosJogador();
    console.log('fim de jogo')
    
    if (status === 'perdeu') {

        localStorage.removeItem('pontuacao');

        mensagemF('Você perdeu...😢😢😢', 
            'Infelismente o jogo acabou para você meu amigo. Mas não se preocupe, tente jogar denovo😁', )

    } else {

        mensagemF('🎉Você Ganhou!!!🎉', 
            'Você detonou todos os navios! Mas achaque acabou? NÃO! A GUERRA NÃO ACABOU! Continue a aumentar sua pontuação!'
        );

    }

}

function mensagemF(tituloM, mensagemM, ) {
    
    titulo.innerText = '';
    mensagem.innerHTML = '';
    pontuacaoElementModal.innerHTML = '';

    titulo.innerText = tituloM;
    mensagem.innerHTML = mensagemM;
    pontuacaoElementModal.innerHTML = "Pontuação: " + pontuacao;

    modal.style.display = 'flex';

}

function atualizarDadosJogador() {
    
    localStorage.setItem('pontuacao', pontuacao);
    localStorage.setItem('vidas', vidas);

    const vidasSalvas = parseInt(localStorage.getItem('vidas'));
    const pontuacaoSalva = parseInt(localStorage.getItem('pontuacao'));


    vidasElement.innerText = 'Vidas: ' + (isNaN(vidasSalvas) ? 15 : vidasSalvas);
    pontuacaoElement.innerText = 'Pontuação: ' + (isNaN(pontuacaoSalva) ? 0 : pontuacaoSalva);

}

gameContainer.addEventListener('click', virarPeça)

popularMapa()
criarTabuleiro();
atualizarDadosJogador();

fecharModal.addEventListener('click', () => {

    modal.style.display = 'none';

    window.location.reload();

})

mostrarNaviosBtn.addEventListener('click', function() {
    const celulas = document.querySelectorAll('.celula');
    
    celulas.forEach(celula => {
        if (celula.dataset.navio === 'true') {
            celula.style.backgroundColor = '#666'; // Cinza para navios
            celula.innerText = celula.dataset.idNavio; // Mostra ID do navio
        }
    });
    
    // Restaura após 3 segundos
    setTimeout(() => {
        celulas.forEach(celula => {
            celula.style.backgroundColor = '';
            celula.innerText = '';
        });
    }, 2000);
});