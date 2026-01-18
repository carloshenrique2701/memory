/*
function ciarContador(){

    let count = 0;

    return{

        incrementar: function() {
            
            count += 1;

            console.log(`Contagem atual: ${count}`);

        },

        mostrar: function () {
            
            console.log(`Contagem ${count}`)

        }

    };

}

const meuContador = ciarContador();

meuContador.mostrar();

meuContador.incrementar();
meuContador.incrementar();

meuContador.mostrar();

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function aplicadorDeDesconto(valorDesconto) {

    return function (preco) {
        
        const desconto = preco * valorDesconto

        const valorFinal = preco - desconto

        return valorFinal;
    };
    
}

const aplicarDesconto20 = aplicadorDeDesconto(0.20);

const aplicarDesconto10 = aplicadorDeDesconto(0.10);

console.log(aplicarDesconto20(100));

console.log(aplicarDesconto10(50));

*///---------------------------------------------------------------------------------------------------------------------------------------------------------------------

function criarCarrinho() {

    const itens = [];

    return{
        adicionarItens: function (nome, preco, quantidade) {

                itens.push({ nome, preco, quantidade }); 

        },    

        obterItens: function () { //aqui é so pra mostra os itens do array

            return itens;

        },

        removeProduct: function (nome) { 

            const index = itens.findIndex(item => item.nome === nome);  //aqui ele procura se tem algum item compativel
            if (index !== -1) { //se for > 1 é pq encontrou algo

                itens.splice(index, 1); //splice remove
                
            } 
            
        },

        listarItens: function () { 
            
            return itens.map(item => `\n Produto: ${item.nome} (quantidade: ${item.quantidade} e preço: ${item.preco})`); 
        }, 
        
        calcularTotal: function () { 
            
            return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0); //inicia a soma de 0, OBS:deve ter algo assim para funcionar

        } 
    };

}

const manager = criarCarrinho(); 

manager.adicionarItens("Caderno", 20, 5); 
manager.adicionarItens("Caneta", 3, 20); 
manager.adicionarItens("Livro", 34, 3); 
manager.adicionarItens("Tesoura", 5, 12); 
manager.adicionarItens("Lápis", 2, 10); 

//verificando se removeu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log("Antes de remover:", manager.obterItens());

manager.removeProduct("Lápis");

console.log("Depois de remover:", manager.obterItens());

//voltando pro codigo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
console.log(`Itens no carrinho:
${manager.listarItens()}`); 

console.log("Preço total: R$", manager.calcularTotal().toFixed(2));//.toFixed arredonda as casas decimais, no caso, 2
