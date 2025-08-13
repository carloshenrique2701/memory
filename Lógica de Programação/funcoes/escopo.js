let nome = 'Maria';

function saudar() {

    let saudar1 = 'Olá, ';
    return saudar1 + nome;
    
}


console.log(saudar())

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

function cContador(params) {
    
    let contador = 0;
    function adcionar() {

        contador++;
        
        console.log(contador);
        
    }

    return adcionar;
}

const meuContador = cContador();
meuContador();
meuContador();
meuContador();
meuContador();
meuContador();
meuContador();
meuContador();

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

let estoque = {
    celulares: 5,
    fonesDEouvido: 4,
    capinhas: 2
};

function ajustarEstoque(nome, quantia) {

    if (estoque[nome] !== undefined){

        estoque[nome] += quantia;

        return estoque[nome];
    }

}

console.log(`Verificação de estoque,  capinhas: ${estoque.capinhas}`);
let aCestoque = ajustarEstoque('celulares',-2)
console.log(`Verificação de estoque,  celulares: ${aCestoque}`);
let aFestoque = ajustarEstoque('fonesDEouvido', +23)
console.log(`Verificação de estoque, fones de ouvido: ${aFestoque}`);




