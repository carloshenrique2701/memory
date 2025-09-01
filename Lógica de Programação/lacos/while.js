/*let contador =1;

while (contador <= 5){

    console.log(`
        `);

    contador ++;

}

let contador_2 = 1;

while (true) {
    
    console.log(`
        `);


    contador_2++;

    if(contador_2 === 2){
        break
    }

}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ConditionStop(value) {

    return value <= 5;
    
}

let contador_3 = 1;

while (ConditionStop(contador_3)) {

    console.log(`Contagem atual: ${contador_3}`);

    contador_3++;
}

console.log(`Contagem finalizada`);

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

contador = 0;

while (contador <= 10) {

    console.log(`Contagem atual: ${contador}`);

    contador ++;
    
}




const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout
    
});

let contador_2 = 0;


r1.question("Digite um número: ", resp =>{

    resp = parseInt(resp);

    if(isNaN(resp)){

        console.log('Favor digite um número válido')
        r1.close();
        return;

    }
    while(resp >= contador_2){
        console.log(`contagem atual: ${contador_2}`)

        contador_2++;
    }

    r1.close();
})



let contador = 0;
let soma = 0;

while(contador <= 100){

    if(contador % 2 === 0){

        soma += contador;

    }

    contador ++;

}

console.log(soma);


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let respCorreta = Math.floor(Math.random() * 101);

function perguntar() {

    readline.question('Tente acertar o número que estou pensando de 0 a 100: ', resp => {
        resp = parseInt(resp);

        if (isNaN(resp)) {
            console.log("Digite um número válido.");
        } else if (resp === respCorreta) {
            console.log('Parabéns, você acertou! Era ', respCorreta);
            readline.close();
            return;
        } else {
            console.log('Você errou, que pena. Tente novamente.');
        }
        
        perguntar();
    });
    
}

let continuar = true;

while (continuar) {
    perguntar();
    continuar = false;
}




const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array de palavras
const palavras = ["pedra", "papel", "tesoura"];
// Função para gerar um índice aleatório
function palavraAleatoria(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

function perguntar() {
    return new Promise((resolve, reject) => {
        readline.question('Vamos jogar! (Se quiser parar digite "pare") Digite "pedra", "papel" ou "tesoura": ', resp => {
            const palavraEscolhida = palavraAleatoria(palavras);

            if (resp === 'pare') {
                console.log("Jogo encerrado.");
                readline.close();
                resolve(false);
            } else if (resp === "pedra" && palavraEscolhida === "tesoura" ||
                       resp === "papel" && palavraEscolhida === "pedra" ||
                       resp === "tesoura" && palavraEscolhida === "papel") {
                console.log(`Parabéns, você ganhou! Você escolheu ${resp} e o computador escolheu ${palavraEscolhida}.`);
                resolve(true);
            } else if (resp === palavraEscolhida) {
                console.log(`Empate! Você escolheu ${resp} e o computador escolheu ${palavraEscolhida}.`);
                resolve(true);
            } else {
                console.log(`Você perdeu, que pena. Você escolheu ${resp} e o computador escolheu ${palavraEscolhida}. Tente novamente.`);
                resolve(true);
            }
        });
    });
}


async function iniciarJogo() {
    let continuar = true;

    while (continuar) {
        continuar = await perguntar();
    }
}

// Iniciar o jogo
iniciarJogo();

*/

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const palavras = ["javascript", "computador", "programacao", "internet", "desenvolvimento"];
const palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
let palavraEscondida = "_".repeat(palavraEscolhida.length).split("");
let tentativas = 6;
let letrasChutadas = [];

function mostrarPalavra() {
    console.log("\nPalavra: " + palavraEscondida.join(" "));
}

function perguntar() {
    return new Promise((resolve) => {
        readline.question(`\nVocê tem ${tentativas} tentativas restantes. Digite uma letra: `, (letra) => {
            resolve(letra);
        });
    });
}

// Função principal do jogo
async function iniciarJogo() {
    console.log("Bem-vindo ao jogo da forca!");
    mostrarPalavra();

    while (tentativas > 0 && palavraEscondida.includes("_")) {
        const letra = await perguntar();
        
        if (letrasChutadas.includes(letra)) {
            console.log("Você já tentou essa letra. Tente outra.");
        } else {
            letrasChutadas.push(letra);
            if (palavraEscolhida.includes(letra)) {
                for (let i = 0; i < palavraEscolhida.length; i++) {
                    if (palavraEscolhida[i] === letra) {
                        palavraEscondida[i] = letra;
                    }
                }
            } else {
                tentativas--;
                console.log(`Letra errada! Você perdeu uma tentativa.`);
            }
        }

        mostrarPalavra();
    }

    if (!palavraEscondida.includes("_")) {
        console.log("\nParabéns! Você acertou a palavra: " + palavraEscolhida);
    } else {
        console.log("\nQue pena! Você perdeu. A palavra era: " + palavraEscolhida);
    }

    readline.close();
}

// Iniciar o jogo
iniciarJogo();



