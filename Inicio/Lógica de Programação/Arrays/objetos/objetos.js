const pessoa = {
    nome: 'Carlos', //são sempre pares
    idade: 19 // muito parecidas com SQL (banco de dados)
};

pessoa.profissao = 'Programador'

console.log(pessoa);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


const pessoa2 = {
    nome: 'Gabriel', //são sempre pares
    idade: 26, // muito parecidas com SQL (banco de dados)
    profissao: 'Vagabundo'
};

delete pessoa2.idade;

console.log(pessoa2)


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


console.log(pessoa.nome);

console.log(pessoa['profissao']);//Tem que ter as ''
pessoa.nome = '?'
console.log(pessoa.nome);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


const obj1 = {a:1, b: 2};

const obj2 = {b:3, c: 4};

const junto = Object.assign({}, obj1, obj2);

console.log(junto);

const juntosComSpread = {...obj1, ...obj2};

console.log(juntosComSpread);


console.log('          ');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('          ');


const perfilUsuario = {
    usuario: 'Carlos',
    idade: 19,
    funcao: 'Design'
};

for(const propriedade of Object.keys(perfilUsuario)){
    console.log(`${propriedade}: ${perfilUsuario[propriedade]}`);
};

