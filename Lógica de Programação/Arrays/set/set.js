let conjunto = new Set();

conjunto.add('a');
conjunto.add('b');
conjunto.add('c');
conjunto.add('d');
conjunto.add('e');

console.log('No conjunto há a letra "a". ',conjunto.has('a'));
console.log('No conjunto há a letra "w". ',conjunto.has('w'));
console.log('No conjunto há a letra "z". ',conjunto.has('z'));


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


conjunto.delete('a');

console.log('Tamanho do conjunto após remover o "a": ', conjunto.size);

conjunto.clear();

console.log('Tamanho do conjunto após limpar: ', conjunto.size);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


conjunto.add('z');
conjunto.add('x');
conjunto.add('c');
conjunto.add('y');
conjunto.add('p');

console.log('Elementos do conjunto:');
conjunto.forEach(valor=>{console.log(valor)})

let arrayConjunto = [...conjunto];

console.log('Transferido para um array:',arrayConjunto)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let outroConjunto = new Set(['y', 't','l','ç']);

let uniao =new Set([...conjunto, ...outroConjunto]);

console.log('União de dois conjuntos: ', uniao)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let interseção = new Set();

conjunto.forEach(valor=>{

    if (outroConjunto.has(valor)) {
        interseção.add(valor);
    }

})

console.log('Intersação dos conjuntos', interseção);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


let diferenca = new Set(conjunto);

outroConjunto.forEach(valor=>{

    if(diferenca.has(valor)){
        diferenca.delete(valor);
    }

});

console.log('Diferença entre os conjuntos: ', diferenca);


