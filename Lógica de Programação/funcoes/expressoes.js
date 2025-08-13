const quadrado = function (numero){
    return numero * numero
}

let resultado = quadrado(75);

console.log(resultado)

//-----------------------------------------------------------------------------------------------------------------------------


const juntar = function (s1, s2) {

    return s1+ ' '+ s2;
    
}

const string = juntar('Olá', 'Mundo!');

console.log(string);

//-----------------------------------------------------------------------------------------------------------------------------

const vSinal = function(numero) {

    if(numero > 0 ){
        return 'Positivo'
    } else if(numero < 0){
        return 'Negativo'
    } else{
        return 'Zero'
    }
    
}

let ex = vSinal(-213613);

console.log(ex);

//-----------------------------------------------------------------------------------------------------------------------------

const media = function(n1,n2, n3) {

    return (n1+n2+n3)/3;
    
}

let numbers = media(346, 54, 856);

console.log(`A mèdia é: ${numbers}`);