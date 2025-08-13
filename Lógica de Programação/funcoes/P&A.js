const saudarP = function(nome, mensagem) {

    return `${mensagem}, ${nome}!`;
    
}

const ex1 = saudarP('Alice', 'Bom rango aí ');

const ex2 = saudarP('Jão', 'Cê ta doido é? ');

console.log(`
    ${ex1}
    ${ex2}
    `)

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

function desconto(vT, dT) {
    const vD = (vT * dT) / 100;
    const vF = vT - vD;
    return vF;
}

const ex3 = desconto(3421, 20);

console.log("O valor final do desconto é", ex3);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

function formatacao(rua, numero, bairro, cidade, estado) {
    return `Você mora em ${cidade}, no ${estado}, no bairro de ${bairro}, na rua ${rua}, casa ${numero}. Certo?`
}

const endereco = formatacao('3', '6A', 'Sobradinho 2', "Brasília", "DF");

console.log(endereco);


