const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let contatos = new Map();

function menu() {
    
    console.log(`\n
Escolha uma opção:
1. Adicionar contato;
2. Remover coontato;
3. Exibir lista de contatos;        
4. Sair.
`)

    r1.question('Opção: ', (acao)=>{

        let action = parseInt(acao);

        if(isNaN(action)){

            console.log('\nComando inválido, favor digite um comando válido.');
            menu();

        } else {

            switch (action) {
                case 1:
                    adicionarContato();
                    break;
            
                case 2:
                    removerContato();
                    break;
            
                case 3:
                    exibirContato();
                    break;
            
                case 4:
                    console.log('Encerrando...');
                    r1.close();
                    break;
            
                default:
                    console.log('\nComando inválido, favor digite um comando válido.');
                    menu();
                break;
            }
        }
    });
}

function adicionarContato() {
    
    r1.question('Digite o número do contato: ', (number)=>{

        r1.question('Digite o nome desse contato: ', (name)=>{

            let numero = parseInt(number);

            if(isNaN(numero)){

                console.log('\nNúmero de telefone inválido.')
                menu();

            }else{

                contatos.set(numero, name);
                console.log('Contato adicionado a lista com sucesso!');
                menu();

            }        
        });
    });
}

function removerContato() {

    r1.question('Digite o nome do contato para ser removido: ', (name)=>{

        if(contatos.has(name)){

            contatos.delete(name);
            console.log(`\n${name} deletado com sucesso!`);
            menu();

        }else{

            console.log('\nContato não encontrado na lista.');
            menu();

        }

    })
    
}

function exibirContato() {
    
    contatos.forEach((name, number)=>{

        console.log(`\n${name} - ${number}`);

    })
    menu();
}

menu();
