/*                 //'numeros', 'ePar' ou 'maiorQ10'  
function filtrarArrey(arrey, funcaoFiltro) {

    let arreyFiltrado = [];

    for (let elemento of arrey){ //interage sobre cada elemento do arrey

        if(funcaoFiltro(elemento)){//functions 'ePar' ou 'maiorQ10'

            arreyFiltrado.push(elemento);//pega os elementos filtrados e guarda em 'arreyFiltrado'
        }
    }

    return arreyFiltrado;
    
}

function ePar(numero) {

    return numero % 2 === 0;
    
}

function maiorQ10(numero) {

    return numero>10
    
}

let numeros1 = [1, 2, 3, 4, 5, 11, 15, 14, 20, 22];

let numerosPares = filtrarArrey(numeros1, ePar);

console.log(numerosPares);

let numerosMaiorQ10 = filtrarArrey(numeros1, maiorQ10);

console.log(numerosMaiorQ10);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

function aplicarOperação(numeros, operacao){

    let resultado= [];

    for (numero of numeros){

        resultado.push(operacao(numero));

    }

    return resultado;
}

function dobrar(numero) {

    return numero * 2;
    
}

function adicionar(numero) {

    return numero + 23
    
}

let numeros2 = [1, 3, 6, 8, 5, 35, 32, 12, 43];

const numerosDobrados = aplicarOperação(numeros2, dobrar)

console.log(numerosDobrados);

const numerosAdicionados = aplicarOperação(numeros2, adicionar)

console.log(numerosAdicionados);
*/
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

const produto = [
    {nome: 'Caderno', categoria: 'Papelaria', preco: 20},
    {nome: 'Lápis', categoria: 'Papelaria', preco: 2},
    {nome: 'Teclado', categoria: 'Eletrônicos', preco: 100},
    {nome: 'Mouse', categoria: 'Eletrônicos', preco: 45}

]

function filtroProdutos(produtos, valorMinimo) {

    return produtos.filter(produto => produto.preco > valorMinimo);
    
}

function adicionarPreco(produtos, porcentagem) {

    return produtos.map(produto =>({
        ...produto, //O operador de espalhamento (...) é usado para copiar todas as propriedades do objeto produto para o novo objeto. Isso garante que todas as propriedades existentes do produto original sejam incluídas no novo objeto.
        preco: produto.preco * (1 + porcentagem /100)

    }));
    
}


const protutosPosfiltros = filtroProdutos(produto, 20)


const produtosCmaisValor = adicionarPreco(protutosPosfiltros, 10)

console.log(produtosCmaisValor)