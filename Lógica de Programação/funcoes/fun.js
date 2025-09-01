function soma(a, b){
    return a + b;
}

let resultado = soma(5, 9);

console.log(resultado);

//-----------------------------------------------------------------------------------------------------------------------------

function verifica(numero){

    if (numero % 2 === 0){

        return 'Par'

    }else{
        return 'Ímpar'
    }
}


let numero = verifica(8);

console.log(numero);

//-----------------------------------------------------------------------------------------------------------------------------

function saudar(nome){
    return `Olá, ${nome}`
}

let nome = saudar('Carlos')

console.log(nome)






