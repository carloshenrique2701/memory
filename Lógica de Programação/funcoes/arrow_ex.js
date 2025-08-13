const multi = (n1, n2) => n1 * n2;

const ex1 = multi(15,23);

console.log(ex1);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

const ex2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const impares = ex2.filter(ex2 => ex2 % 2 !== 0);

console.log(impares);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

const ex3 = ['cacau', ' céu', ' marte', 'selena'];

const letrasM = ex3.map(ex3 => ex3.toUpperCase());

console.log(letrasM);


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------


const people = [
    {nome: 'Carlos', idade:19},
    {nome: 'Tarcilla', idade: 24},
    {nome: 'Geovanna', idade: 110}
]

const calculo = (people) => {
    const soma = people.reduce((soma, people) => soma + people.idade, 0);
    return soma / people.length
}

const mediaIdade = calculo(people);

console.log(mediaIdade);