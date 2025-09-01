/*
const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});


r1.question("Digite um número de 1 a 12, que representa o mês do ano, e te direi estação do ano:", (dia)=>{
    dia = parseInt(dia);

    switch(dia) {
        case 1: 
        case 2: 
        case 3:
        case 12:
            console.log("É verão.");
            break;
        case 4: 
        case 5:
            console.log("É outono.");
            break;
        case 6: 
        case 7: 
        case 8:
            console.log("É inverno.");
            break;
        case 9: 
        case 10: 
        case 11:
            console.log("É primavera.");
            

        default: console.log("Número invalido. Digite de 1 a 12.");
    }

    r1.close();
});


const { match } = require("assert");
const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});

r1.question("Digite um número de 0 a 100, para que seja dada a nota:", (resp)=>{
    resp = parseInt(resp);
    const mat = Math.floor(resp / 10);
    switch(mat){
        case 10:
        case 9: console.log("Nota A"); break;
        case 8: 
        case 7: console.log("Nota B"); break;
        case 6: 
        case 5: console.log("Nota C"); break;
        case 4: 
        case 3: console.log("Nota D"); break;
        case 2:
        case 1:
        case 0:console.log("Nota E"); break;

        default: console.log("Número inválido.");
    }
    r1.close();
});
*/

const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});

r1.question(`Cardápio:
    1 - PIZZA
    2 - HAMBURGER
    3 - SALADA   
    Digite um número: 
    `, (resp)=>{
    resp = parseInt(resp);
    switch(resp){
        case 1: console.log("Seu pedido é uma pizza."); break;
        case 2: console.log("Seu pedido é um Hamburger."); break;
        case 3: console.log("Seu pedido é uma salada."); break;

        default: console.log("Isso não está em nosso cardápio");
    }

    r1.close();
})