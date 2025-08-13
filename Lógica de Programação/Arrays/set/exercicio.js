const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let listaDeFilmes = new Set();

function menu() {
    
    console.log('\nEscolha uma das opções:')
    console.log(`
1. Adicionar filme aos favoritos;
2. Remover filme dos favoritos;
3. Listar filmes;
4. Sair.`)

    r1.question('Opção: ', (comando)=>{

        let action = parseInt(comando);

        if(isNaN(action)){

            console.log('Opção inválida. Digite uma opção válida...');
            menu();

        }else{

            switch (action) {
                case 1:
                    adicionarFilme();    
                    break;
            
                case 2:
                    removerFilme();
                    break;
            
                case 3:
                    listarFilmes();
                    break;
            
                case 4:
                    console.log('Finalizando...');
                    r1.close();
                    break;
    
                default:
                    console.log('Opção inválida. Digite uma opção válida...');
                    menu();
                    break;
            }
        }
    });
}

function adicionarFilme() {
    
    r1.question('Digite o nome do filme que deseja adicionar a lista: ', (nome)=>{

        if (listaDeFilmes.has(nome)) {
            
            console.log(`\n${nome} já está na lista de favoritos.`);
            menu();

        } else {
            
            listaDeFilmes.add(nome);
            console.log(`\n${nome} foi adicionado a lista de favoritos!`);
            menu();

        }
    });
}

function removerFilme() {
    
    r1.question('Qual o nome do filme que deseja remover? ', (nome)=>{

        if (!listaDeFilmes.has(nome)) {

            console.log(`\n${nome} não encontrado.`);
            menu();

        }else{

            listaDeFilmes.delete(nome);
            console.log('\nFilme deletado com sucesso.');
            menu();

        }
    });
}

function listarFilmes() {
    
    console.log('Lista de Filmes:\n')
    listaDeFilmes.forEach(nome=>{console.log(nome)});
    menu();

}
menu();


