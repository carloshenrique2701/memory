let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let elemento = matriz[1][2];

console.log(elemento);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


matriz[0][0] = 10;

console.log(matriz);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


matriz.push([10, 11, 12]);

console.log(matriz);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


matriz.forEach(linha => {

    linha.push(13)

});

console.log(matriz);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


matriz.forEach(linha=>{

    linhaFormatada = linha.join(' ');

    console.log(linhaFormatada);

});


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let matriz1 = [
    [1, 2],
    [3, 4],
    [5,6]
];

let soma = 0;

/*for (let i = 0; i < matriz1.length; i++) {
    for (let j = 0; j < matriz1.length; j++) {

        soma += matriz1[i][j];

    }
    
}*/
matriz1.forEach(linha=> linha.forEach(valor=> soma += valor))

console.log('Asomas dos elementos da matriz1 é igual a: ',soma);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let matriz2 = [
    [1,2,3],
    [4,5,6]
]

let transposta = [];

for (let i = 0; i < matriz2[0].length; i++) {

    transposta[i] = [];
    
}

for (let i = 0; i < matriz2.length; i++) {
    for (let j = 0; j < matriz2[i].length; j++) {
        transposta[j][i] =matriz2[i][j];
    }
}

console.log('Matriz transposta: ');
transposta.forEach(linha=> console.log(linha.join(' ')));


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let matriz3= [
    [1,2,3],
    [9,6,3],
    [2,43,6]
];

let max = - Infinity;

//Duas formas de fazer esse processo

/*for (let i = 0; i < matriz3.length; i++) {
    for (let j = 0; j < matriz3.length; j++) {
        
        if(matriz3[i][j] > max)
        max = matriz3[i][j]
    }
    
}*/

max = Math.max(...matriz3.flat())

console.log('O maior número da matriz 3 é: ', max)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let matriz5 = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 9]
];

let rotacionada = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

for (let i = 0; i < matriz5.length; i++) {
    for (let j = 0; j < matriz5[i].length; j++) {
        
        rotacionada[j][matriz5.length - 1 -i] = matriz5[i][j];

    } 
}

console.log('Matriz Rotacionada em 90° sentido horário: ');

rotacionada.forEach(linha=>{

    console.log(linha.join(' '));

});


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let matriz6 = new Array(3);

for (let i = 0; i < matriz6.length; i++) {
    
    matriz6[i] = new Array(3);

    for (let j = 0; j < matriz6[i].length; j++) {
        
        matriz6[i][j] = 0;
        
    }
}

console.log('Preenchimento de array com zeros: ');

matriz6.forEach(linha=>{

    console.log(linha.join(' '))

})


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let matriz7 = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 9]
];

let diagonalPrincipal = [];

for (let i = 0; i < matriz7.length; i++) {
    
    diagonalPrincipal.push(matriz7[i][i]);
    
}

console.log('Diagonal da matriz: ', diagonalPrincipal);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let C =[
    [1, 2],
    [3, 4]
];

let D = [
    [5, 6],
    [7, 8]
];

let somaM = [
    [0,0],
    [0,0]
];

for (let i = 0; i < C.length; i++) {
    for (let j = 0; j < C[i].length; j++) {
        
        somaM[i][j] = C[i][j] + D[i][j];

    }
}

console.log('Soma de duas Matrizes: ');

somaM.forEach(linha=>{

    console.log(linha.join(' '))

})


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let bidimencional = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 9]
];

console.log(bidimencional[1][2]);

bidimencional[2][0] = 0;

bidimencional.forEach(linha=>{

    console.log(linha.join(' '))

})


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let tridimencional =[

    [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ],

    [
        [10,11,12],
        [13,14,15],
        [16,17,18],
    ]
];

console.log(tridimencional[1][2][0]);

tridimencional[1][2][0] = 100;

tridimencional.forEach(blocos=>{
    
    console.log('Matriz: ');
    console.log(' ');

    blocos.forEach(linhas=>{

        console.log(linhas.join(' '))

    })
    console.log(' ');
})






