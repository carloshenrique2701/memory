/*Crie um programa que implemente um jogo de "forca".

Escolha uma palavra aleatória de uma lista de palavras e
permita que o usuário adivinhe letras até que ele acerte a
palavra ou exceda o número máximo de tentativas usando um loop while.*/



// Importa o módulo 'readline' do Node.js, que é usado para criar uma interface de entrada e saída no terminal.
// Isso permite que o programa interaja com o usuário, solicitando entradas (como letras) e exibindo mensagens.
const readline = require('readline').createInterface({
    input: process.stdin, // Define o stream de entrada como o terminal do usuário (stdin).
    output: process.stdout // Define o stream de saída como o terminal do usuário (stdout).
});

// Define uma lista de possíveis palavras que podem ser escolhidas para o jogo.
const palavras = ['javascript', 'nodejs', 'programacao', 'computador', 'internet'];

// Escolhe uma palavra aleatoriamente da lista anterior. O método `Math.random()` gera um número aleatório
// entre 0 e 1, que é multiplicado pelo tamanho da lista `palavras` para escolher um índice válido.
// `Math.floor()` é usado para arredondar o número para baixo, resultando em um índice inteiro.
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

// Cria uma string composta por '_' para cada letra da palavra secreta, servindo como representação visual
// do progresso do usuário em adivinhar a palavra.
let palavraDisplay = '_'.repeat(palavraSecreta.length);

// Define o número máximo de tentativas que o usuário pode fazer antes de perder o jogo.
const maxTentativas = 6;

// Inicializa um contador para rastrear o número de tentativas erradas feitas pelo usuário.
let tentativasErradas = 0;

// Declara a função `solicitarLetra` que pede ao usuário para adivinhar uma letra da palavra secreta.
function solicitarLetra() {
    
    // Exibe o estado atual da palavra, com letras adivinhadas reveladas.
    console.log(`Palavra: ${palavraDisplay}`); 
    
    // Verifica se o usuário ainda tem tentativas restantes.
    if (tentativasErradas < maxTentativas) { 

        // Pede ao usuário para inserir uma letra.
        readline.question('Adivinhe uma letra: ', letra => { 

            // Chama `processarJogada` com a letra inserida, convertida para minúscula.
            processarJogada(letra.toLowerCase()); 

        });

    // Caso o usuário exceda o número máximo de tentativas...
    } else { 

        // Informa ao usuário que o jogo terminou.
        console.log('Você excedeu o número máximo de tentativas. Game over!'); 

        // Revela qual era a palavra secreta.
        console.log(`A palavra era: ${palavraSecreta}`); 

        // Fecha a interface de entrada e saída, encerrando a interação com o terminal.
        readline.close(); 

    }
}

// Declara a função `processarJogada` para avaliar se a letra inserida pelo usuário está na palavra secreta.
function processarJogada(letra) {

    // Se a palavra secreta contém a letra...
    if (palavraSecreta.includes(letra)) { 

        // Atualiza a representação visual da palavra para incluir a letra correta.
        atualizarPalavraDisplay(letra); 

    // Se a letra não está na palavra...
    } else { 

        // Incrementa o contador de tentativas erradas.
        tentativasErradas++; 

        // Informa ao usuário que a letra está incorreta e quantas tentativas restam.
        console.log(`Letra incorreta. Você tem ${maxTentativas - tentativasErradas} tentativa(s) restante(s).`);
    }

    // Verifica se o usuário adivinhou todas as letras corretamente.
    if (palavraDisplay === palavraSecreta) {

        // Parabeniza o usuário por vencer.
        console.log('Parabéns! Você adivinhou a palavra!'); 

        // Fecha a interface de entrada e saída.
        readline.close(); 

    } else {

        // Se a palavra não foi completamente adivinhada, solicita outra letra.
        solicitarLetra(); 
    }
}

// Declara a função `atualizarPalavraDisplay` para revelar as letras corretamente
// adivinhadas na representação visual da palavra.
function atualizarPalavraDisplay(letra) {

    // Inicia uma string vazia para construir a nova representação da palavra.
    let resultado = ''; 

    // Inicialização
    let i = 0;

    // Itera sobre cada letra de palavra secreta usando while
    while (i < palavraSecreta.length){

        // Se a letra atual corresponde à letra adivinhe...
        if (palavraSecreta[i] === letra){
            
            // Adicione a letra ao resultado.
            resultado += letra;

        }else{

            // Caso contrário, mantém o caractere atual de `palavraDisplay`
            // (seja '_' ou uma letra já adivinhada).
            resultado += palavraDisplay[i];

        }

        // Atualização
        // i = i + 1
        i++;

    }

    // Atualiza `palavraDisplay` com o resultado após adicionar a letra adivinhada.
    palavraDisplay = resultado; 
    
}

// Inicia o jogo chamando a função `solicitarLetra`.
solicitarLetra();


