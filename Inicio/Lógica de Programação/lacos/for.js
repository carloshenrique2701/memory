
/*
let g = 0;

for (i =0; i <= 10; i++){
    
    for(z=0; z<=10; z++){

        console.log(z, " X ", g , " = ", z*g);

    }   
    console.log();
    g++;
}


const cores= ['vermelho', 'verde', 'azul', 'branco'];

for (const cor of cores){
    console.log(cor);
}



const pessoa = {
    nome: 'Carlos',
    idade: 19,
    cidade: 'Sobral2'
}

for (const propriedade in pessoa){
    console.log(`${propriedade}: ${pessoa[propriedade]}`)
}


for (i=0; i<20;i++){

    if (i === 5){
        continue; //ele pula a iteração atual, no caso a 5
    }

    if (i === 15){
        break; //para na iteração atual
    }

    console.log(i);
}

let m=0;
for(i=0; i <101; i++){

    m+=i;//m= m+i;  

}
console.log(m);


let f=5, m =1;

for(i=1; i <= f; i++){
    
    m*=i;
    
}
console.log(m);


const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});

r1.question("Forneça um núme para saber sua tabuada: ", (resp)=>{
    resp =parseInt(resp);
    if(!isNaN(resp)){ //!isNaN() = verifica se é um número válido

        console.log(`A tabudada de ${resp} é:`);

    for(i=0; i<=10;i++){

        console.log(`${resp} x ${i} = ${resp*i}`);

    }
    }else{

        console.log("Número inválido.");

    }
    
    r1.close();
})






const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output:process.stdout

});

r1.question("Digite um número para saber seus divisores: ", (resp)=>{
    

    resp = parseInt(resp);

    if(!isNaN(resp)){

        console.log(`Os divisores do número ${resp} são:`);

        for(i = 1; i <= resp; i++){
        
            if(resp % i === 0)
            console.log(`${resp} / ${i} = ${resp/i}`)
        
        }

    }else{
        console.log("Número inválido");
    }
    r1.close();
});




const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output:process.stdout

});

r1.question("Digite uma sequencia de números separados por vírgulas: ", function(input){
    let resp = input.split(",");

    let soma =0;

    for (i =0; i < resp.length; i++){

        soma += Number(resp[i])

    }

    console.log("O valor da soma é: ",soma)

    r1.close();
})
*/


const readline = require("readline");

const r1 = readline.createInterface({
    
    input: process.stdin,

    output: process.stdout
});

r1.question("Digite uma frase: ", function(inputString){

    let resp = '';

    for(i= inputString.length - 1; i >= 0; i--){

        resp += inputString[i];

    }

    console.log(resp)

    r1.close();
})