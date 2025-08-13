const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const produtos = [];

function menu() {
    
    console.log(`Comandos:
1. Adicionar Produto;
2. Alterar preço do Produto;
3. Alterar quantidade do produto;
4. Remover um produto;
5. Exibir lista de produtos salvos;
6. sair;`)

    r1.question('Digite um comando: ', (comando)=>{

        let comandoFinal = parseInt(comando);
        if(isNaN(comandoFinal)){
            console.log('Comando inválido. Digite um comando válido...');
            menu();
        } else{
            switch (comandoFinal) {
                case 1:
                    adicionarProduto();    
                    break;
                case 2:
                    alterarPreco();
                    break;
                case 3:
                    alterarEstoque();
                    break;
                case 4:
                    removerProduto();
                    break;
                case 5:
                    ExibirListaDeProdutos();
                    break;
                case 6:
                    console.log('Finalizando tarefa...');
                    r1.close();
                    break;
            
                default:
                    console.log('Comando inválido. Digite um comando válido...');
                    menu(); 
                    break;
            }
        }
    })
}


function fazerPergunta(pergunta) {
    return new Promise((resolve) => {
        r1.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function adicionarProduto() {

    const nome = await fazerPergunta("Qual o nome do produto? ");
    const preco = parseFloat(await fazerPergunta(`Qual o preço desse produto? `));
    const quantidade = parseInt(await fazerPergunta("Qual a quantidade desse produto em estoque? "));

    // Verifica se o preço ou a quantidade são inválidos
    if (isNaN(preco) || isNaN(quantidade)) {

        console.log(`Preço ou quantidade inválidos. Por favor, insira números adequados...`);
        menu();

    } else {
        const produto = { nome: nome, preco: preco, quantidade: quantidade };

        produtos.push(produto); // Armazena o produto no array

        console.log(`${nome} foi adicionado à lista de estoque.`);
        menu(); 
    }
}

function alterarPreco() {
    
    r1.question('Qual o indice do produto você deseja alterar o preço? ', (indice)=>{

        if(produtos[indice - 1]){

            r1.question(`Qual o novo valor do produto? `, (newValue)=>{

                produtos[indice - 1].preco = newValue;
                console.log('Atualização efetuada com sucesso.');
                menu();
            })

        }else{
            console.log('Produto não encontrado.')
            menu();
        }
    });
}

function alterarEstoque() {
    r1.question('Qual o indice do produto você deseja alterar a quantidade em estoque? ', (indice)=>{

        if (produtos[indice - 1]) {

            r1.question(`Qual o novo valor do produto? `, (newValue) => {

                produtos[indice - 1].preco = parseFloat(newValue); 
                console.log('Atualização efetuada com sucesso.');
                menu();
                
            });

        }else{
            console.log('Produto não encontrado.')
            menu();
        }

    })
}

function removerProduto() {
    
    r1.question('Qual o indice do produto você deseja remover? ', (indice)=>{

        if(produtos[indice - 1]){

            produtos.splice(indice - 1, 1);
            console.log('Remoção efetuada com sucesso.');
            menu();

        }else{
            console.log('Produto não encontrado.')
            menu();
        }

    })

}

function ExibirListaDeProdutos() {
    
    console.log(`Produtos listados:
    `);

    for (let i = 0; i < produtos.length; i++) {
        
        console.log(`${i+1}. Nome: ${produtos[i].nome}| Preço: ${produtos[i].preco}| Quantidade no estoque:${produtos[i].quantidade}
            `);
        
    }

    menu();
}
menu();