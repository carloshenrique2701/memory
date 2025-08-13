let lista = ['maçã', 'banana', 'acerola'];

lista.push('laranja');

console.log('Lista das frutas que eu gosto: ', lista);

lista[0]='uva';

console.log('Lista das frutas que eu gosto(depois de atualizada): ', lista);

lista.splice( 2,1);

console.log('Lista das frutas que eu gosto(depois de atualizada): ', lista);


console.log('Tamanho da lista: ', lista.length);

const temBanana = lista.includes('banana')

console.log('Tem banana? ', temBanana);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let numeros=[1, 2, 4, 5];
// 1° argumento = posição
// 2° argumento = numero de elementos a serem removidos
// 3° argumento = elemento a ser adicionado, no loca do 1° argumento
numeros.splice(2, 0,3);

console.log('Lista de números atualizada: ', numeros);

numeros.splice(1,2)

console.log('Lista de números com elementos removidos: ', numeros);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let frutas = ['maçã', 'banana', 'laranja', 'uva', 'goiaba', 'acerola'];

//coloque ao contrario q o index e os elementos ficam do jeito certo, buga mesmo
frutas.forEach(function(index, item) {
    console.log(item, index);      
});

console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');

let numeros2 = [1, 2, 3, 4, 5, 6, 7];

let numerosPares = numeros2.filter(n => n % 2 === 0);

console.log(numerosPares)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');

let numeros3 = [1, 2, 3, 4, 5, 6]

let quadrados = numeros3.map(n => n * n);

console.log(quadrados)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let numeros4 = [1, 2, 3, 4, 5, 6];

let soma = numeros4.reduce((som, prox) => som+ prox, 0);//Lembrete: pode ser usado qualquer nome, o importante é o codigo entender a ideia 

console.log("Soma: ", soma)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let numeros5 = [5, 27, 48, 39, 1002, 444, 210, 4682]

let maiorQuequarenta = numeros5.find(n => n > 40);
let maiorQue400 = numeros5.find(n => n > 400);
let menorQueCem = numeros5.find(n => n < 100);

console.log("Primeiro numero Maior que 40: ",maiorQuequarenta);
console.log('Primeiro numero Maior que 400: ',maiorQue400);
console.log('Primeiro numero Menor que 100: ', menorQueCem);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let idades = [12, 18, 48, 52, 93, 27]

let TodosOsAdultos = idades.every(idade => idade >=18)

console.log('Todos são adultos?', TodosOsAdultos) // Se todos forem adultos retorna: true, se não, False


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');
let frutas2 = ['banana', 'maçã', 'amora'];

frutas2.sort();

console.log(frutas2);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let frutas3 = ['banana', 'maçã', 'amora'];

frutas3.reverse();

console.log(frutas3);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let uno = ['a', 'b', 'c']
let dos =['d', 'e', 'f']

let ArrayConcatenado = uno.concat(dos);

console.log('Array concatenado/juntado: ',ArrayConcatenado)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let idade2 = [16, 21, 48, 52, 33, 98, 7, 56]

let algumAdulto = idade2.some(idade => idade >= 18)

console.log('Tem algum aduto? ',algumAdulto)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let frutas4 = ['banana', 'maçã', 'acerola', 'goiaba', 'laranja']

let algumasFrutas = frutas4.slice(1,4)//a ultima não sera incluida

console.log('Algumas frutas: ', algumasFrutas)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let palavras = 'Olá, mundo!';

let frase = palavras.split(' ');

console.log(frase);

let palavras2 = ['Olá', 'mundo!'];

let frase2 = palavras2.join(' ');

console.log('Frase juntada: ', frase2)









































