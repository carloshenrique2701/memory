/*

">" maior que 
"<" menor que
"=>" "<=" moior/menor ou igual a
"===" igual a
"!==" diferente de 
"&&" e
"||" ou

 
const readline = require("readline").createInterface({

    input: process.stdin,

    output: process.stdout

})

let idade = null;

readline.question("Qual é a sua idade? ", (idade) =>{

    if (idade < 18){
        
        console.log("Você é de menor");

    } else { 
        if (idade < 65){

            console.log("Você é um adulto");

        } else { 
            
            console.log("Você é um idoso")
        }

    }

    readline.close();

});



const readline = require("readline").createInterface({

    input: process.stdin,

    output: process.stdout
});

let number = null;

readline.question("Digite um número: ", (number) => {
    if (number % 2 === 0 ){
        console.log("O número ", number, "é par.");
    } else {
        console.log("O número ", number, "é impar.")
    }

    readline.close();

})



const readline = require("readline").createInterface({  
    
    input: process.stdin,

    output: process.stdout
    
})

const n1 = parseFloat;
const n2 = parseFloat;

readline.question("Digite o primeiro número: ", (n1) =>{

    readline.question("Digite o segundo número: ", (n2) =>{

        if (n1 > n2){

            console.log(n1, " é maior que ", n2);

        } else {  

            if(n2 > n1){

                console.log(n2, " é maior que ", n1);

            } else {

                console.log(n1, " e ", n2, "são iguais");
            }
            
        }

        readline.close();
    }); 
    
    

})



const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let resp = null;

rl.question("Digite o número correspondente ao dia da semana: ", (resp) => {

    if (parseInt(resp) === 1) {
        console.log("Hoje é domingo");
    }   else if (parseInt(resp) === 2) {
        console.log("Hoje é segunda");
    } else if(parseInt(resp) === 3){
        console.log("Hoje é terça");
    } else if(parseInt(resp) === 4){    
        console.log("Hoje é quarta");
    }else if(parseInt(resp) === 5){  
        console.log("Hoje é quinta");
    } else if(parseInt(resp) === 6){   
        console.log("Hoje é sexta");
    } else if(parseInt(resp) === 7){                        
        console.log("Hoje é sábado");
    }  

    rl.close();

});


const readline = require("readline");

const r1= readline.createInterface({

    input: process.stdin,
    
    output:process.stdout
});

function fazerPergunta(pergunta) {
    return new Promise((resolve) => {
        r1.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function main() {
    const n1 = parseInt(await fazerPergunta("Digite o primeiro número da operação: "));
    const n2 = parseInt(await fazerPergunta("Digite o segundo número da operação: "));
    const sinal = await fazerPergunta("Digite o sinal da operação: ");

    if(sinal === "+") {
        console.log(n1, " + ", n2, " = ", n1 + n2)
    } else if ( sinal === "-") {
        console.log(n1, " - ", n2, " = ", n1 - n2)
    } else if (sinal === "*") {
        console.log(n1, " * ", n2, " = ", n1 * n2)
    } else if (sinal === "/") {
        if ( n2 !== 0){
            console.log(n1, " / ", n2, " = ", n1 / n2)
        }else{
            console.log("Esse número não pode ser dividido.");
        }       
    } else{
        console.log("Erro de digitação.");
    }
            
    r1.close();
}
main();
*/

const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});

var resp = parseFloat;

r1.question("Digite um número para saber se é negativo ou positivo, ímpar ou par:", (resp)=>{
    if (resp % 2 === 0){
        if (resp >  0){
            console.log("O número",resp, "é par e positivo.");
        } else {
            console.log("O número",resp, "é par e negativo.");
        }
    } else {
        if (resp >  0){
            console.log("O número",resp, "é ímpar e positivo.");
        } else {
            console.log("O número",resp, "é ímpar e negativo.");
        }
    } 

    r1.close();
})