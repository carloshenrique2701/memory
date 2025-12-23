let tabuleiro = ['','','','','','','','',''] // Cria o tabuleiro como um array com 9 posições vazias (jogo da velha 3x3)

let jogadorAtual = 'X'; // Define que o jogador X começa o jogo

let jogoAtivo = true; // Controla se o jogo ainda está em andamento

let pontuacaoJogador = 0; // Pontuação do jogador humano (X)

let pontuacaoComputador = 0; // Pontuação do computador (O)

let pontuacaEmpates = 0; // Contador de empates

const COMBINACOES_VITORIA = [ // Todas as combinações possíveis de vitória
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior

    [0, 3, 6], // Coluna esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna direita

    [0, 4, 8], // Diagonal principal
    [2, 4, 6] // Diagonal secundária
]
       
function fazerJogada(indiceCelula) { // Função chamada quando o jogador clica em uma célula

    if(!jogoAtivo || tabuleiro[indiceCelula] !== '') return; 
    // Impede jogada se o jogo já acabou ou a célula estiver ocupada

    tabuleiro[indiceCelula] = jogadorAtual; 
    // Marca X ou O na célula escolhida

    renderizarTabuleiro(); 
    // Atualiza o tabuleiro na tela

    if(verificarVitoria()){ 
        // Se ocorreu vitória...

        jogoAtivo = false; // Bloqueia novas jogadas

        atualizarPontuacoes(jogadorAtual); // Atualiza a pontuação correta

        setTimeout(() => { // Leve atraso para exibir mensagem

            alert(`${jogadorAtual} venceu!`); // Mostra o vencedor

            reiniciarJogo(); // Reinicia o jogo automaticamente

        }, 100);

        return; // Encerra a função
    }

    if(verificarEmpate()){ // Se ninguém ganhou e não há espaços vazios...

        jogoAtivo = false;

        atualizarPontuacoes('empate'); // Soma um empate

        setTimeout(() => {

            alert(`Empate!`);

            reiniciarJogo(); // Reinicia o tabuleiro

        }, 100);

        return;
    }

    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'; 
    // Alterna entre X e O

    if (jogadorAtual === 'O' && jogoAtivo) { 
        // Se agora é a vez do computador...

        setTimeout(()=> {

            movimentoComputador(); // Executa jogada do computador

        }, 500) // Atraso apenas para parecer humano
    }
}

function movimentoComputador() { // IA usando minimax

    let melhorPontuacao = -Infinity; // Maior pontuação possível para O
    /*
        -Infinity é uma constante numérica que representa o menor valor possível na
         matemática computacional. Não é uma string, é um número especial.
    */

    let movimento; // Armazena o melhor movimento

    for (let i = 0; i < tabuleiro.length; i++) { // Testa todas as posições
        
        if(tabuleiro[i] === ''){ // Se a posição está vazia

            tabuleiro[i] = 'O'; // Simula jogar O ali

            let pontuacao = minimax(tabuleiro, 0, false); 
            // Executa minimax para avaliar a jogada

            tabuleiro[i] = ''; // Desfaz a jogada simulada

            if(pontuacao > melhorPontuacao) { 
                // A primeira pontuação calculada SEMPRE será maior que -Infinity
                /*
                 ❌ PROBLEMA: se usarmos 0
                    let melhorPontuacao = 0;
                    E se todas as jogadas tiverem pontuação negativa? Nunca atualizaria!

                ❌ PROBLEMA: se usarmos null ou undefined
                    let melhorPontuacao = null;
                    if(pontuacao > melhorPontuacao) ← Isso daria erro!

                ✅ SOLUÇÃO: usar -Infinity
                    let melhorPontuacao = -Infinity;
                    Garante que QUALQUER pontuação real será maior

                    Essa técnica é muito comum em algoritmos de busca como minimax, 
                    onde precisamos de um valor inicial que não interfira na lógica de comparação!
                */

                melhorPontuacao = pontuacao;// Agora temos um valor real

                movimento = i;
            }
        }
    }

    fazerJogada(movimento); // Executa jogada real escolhida pela IA
}

function minimax(tabuleiro, profundidade, estaMaximizando) { 
    // Algoritmo de IA que decide o melhor movimento
    
    let resultado = verificaVencedor(); 
    // Verifica se alguém venceu nessa simulação

    if(resultado !== null){ // Se houve vencedor...

        return resultado === 'O' ? 10 - profundidade : profundidade - 10
        // Pontuações positivas favorecem O e negativas favorecem X
    }

    if(verificarEmpate()) return 0; // Empate retorna 0

    if(estaMaximizando){ // Turno do computador (O) - maximizador

        let melhorPontuacao = -Infinity;

        for (let i = 0; i < tabuleiro.length; i++) {
        
            if(tabuleiro[i] === ''){

                tabuleiro[i] = 'O'; // Simula jogada do computador

                let pontuacao = minimax(tabuleiro, profundidade + 1, false); 
                // Agora é turno do jogador
                //Ele simula qual seria a próxima jogada do jogador

                tabuleiro[i] = ''; // Desfaz simulação

                melhorPontuacao = Math.max(pontuacao, melhorPontuacao);
            }
        }

        return melhorPontuacao;

    } else { // Turno do jogador humano (X) - minimizador

        let melhorPontuacao = Infinity;

        for (let i = 0; i < tabuleiro.length; i++) {
            
            if(tabuleiro[i] === ''){

                tabuleiro[i] = 'X'; // Simula jogada do jogador

                let pontuacao = minimax(tabuleiro, profundidade + 1, true); 
                // Volta o turno para O
                //Simula se fosse o computador

                tabuleiro[i] = ''; // Desfaz simulação

                melhorPontuacao = Math.min(pontuacao, melhorPontuacao);
                console.log(melhorPontuacao)
            }
        }

        return melhorPontuacao;
    }
}

function atualizarPontuacoes(vencedor) { 
    // Soma pontos conforme o resultado
    
    if(vencedor === 'empate'){

        pontuacaEmpates++;

    } else if(vencedor === 'X'){

        pontuacaoJogador++;

    } else {

        pontuacaoComputador++;
    }

    renderizarPontuacoes(); // Atualiza pontuações na tela
}

function renderizarPontuacoes() { 
    // Atualiza os valores do HTML
    
    document.getElementById('pontuacao-jogador').textContent = pontuacaoJogador
    document.getElementById('pontuacao-computador').textContent = pontuacaoComputador
    document.getElementById('pontuacao-empates').textContent = pontuacaEmpates
}

function verificaVencedor() { // Verifica se há um vencedor
    
    for (let combinacao of COMBINACOES_VITORIA) { // Percorre todas as combinações
        
        const [a, b, c] = combinacao; // Desestrutura os 3 índices

        if(tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]){
            // Se todas as três posições têm o mesmo símbolo (e não estão vazias)

            return tabuleiro[a]; // Retorna X ou O
        }
    }

    return null; // Ninguém venceu ainda
}

function verificarVitoria() {
    
    return verificaVencedor() !== null; // Se há vencedor, retorna true
}

function verificarEmpate() {
    
    return !tabuleiro.includes(''); // Se não há espaços vazios, é empate
}

function renderizarTabuleiro() { 
    // Atualiza o tabuleiro no HTML
    
    for (let i = 0; i < tabuleiro.length; i++) {
        
        const celula = document.getElementsByClassName('celula')[i];

        celula.textContent = tabuleiro[i]; // Define X, O ou vazio na tela
    }
}

function reiniciarJogo() { // Restaura o jogo

    tabuleiro = ['','','','','','','','','']; // Limpa o tabuleiro

    jogadorAtual = 'X'; // Jogador humano começa

    jogoAtivo = true; // Libera jogadas

    renderizarTabuleiro(); // Atualiza tela
}

renderizarPontuacoes(); // Renderiza as pontuações ao carregar o jogo


/*
===========================================
        COMO FUNCIONA A LÓGICA DO JOGO
===========================================

1. O tabuleiro é representado por um array com 9 posições,
   cada uma correspondendo a uma célula do jogo da velha.

2. O jogador humano sempre começa como 'X'.
   O computador joga como 'O'.

3. Quando o jogador clica em uma célula:
   - Se ela estiver vazia, coloca 'X'.
   - Atualiza o tabuleiro na tela.
   - Verifica se houve vitória ou empate.
   - Se o jogo continua, troca para o jogador 'O'.

4. Quando é a vez do computador:
   - Ele executa o algoritmo MINIMAX.
   - O minimax simula TODAS as jogadas possíveis.
   - Avalia cada jogada com pontuações:
        Vitória do computador → pontuação positiva
        Vitória do jogador → pontuação negativa
        Empate → 0
   - Escolhe a jogada com melhor pontuação.
   - Faz a jogada real no tabuleiro.

5. Após qualquer jogada:
   - Verifica novamente vitória ou empate.
   - Atualiza pontuações.
   - Reinicia o tabuleiro automaticamente após mostrar um alerta.

6. A interface HTML é atualizada sempre que:
   - O tabuleiro muda
   - A pontuação muda
   - O jogo reinicia

7. O jogo roda em ciclos:
   Jogador → Verifica → Computador → Verifica → repetição...

===========================================
O RESULTADO: 
Um jogo da velha onde o computador joga perfeitamente
e nunca perde, graças ao algoritmo MINIMAX.
===========================================
*/
