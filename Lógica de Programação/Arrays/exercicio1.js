const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let convidados = ['Biel', 'Davi'];

function exibirComandos() {
    
    console.log(`
        Digite o comando que deja executar:

        1. Adicionar convidado
        2. Excluir convidado
        3. Exibir lista de convidados
        4. Alterar convidado
        5. Número de convidados
        6. Sair
        `) 

}

function adicionarConvidado() {
    
    r1.question('Digite o novo convidado: ', (novoConvidado)=> {

        if(!convidados.includes(novoConvidado)){

            convidados.push(novoConvidado);
    
            console.log('Convidado adicionado com sucesso!');
    
            executarPrograma();
            } else{
    
                console.log('Esse convidado já está na lista.')
    
                executarPrograma();
        }

    });
}

function alterarConvidado() {

    r1.question('Digite o indicie do convidado para alterar(1,2,3...)', (indicie)=>{
        indicie = parseInt(indicie -1);

        if(indicie >= 0 && indicie < convidados.length){

            r1.question('Digite o nome do novo convidado: ', (novoConvidado)=>{

            if(!convidados.includes(novoConvidado)){

                convidados[indicie] = novoConvidado;

                console.log("Convidado alterado com sucesso!");

                executarPrograma();

            } else{

                console.log('Esse nome já está na lista.');

                executarPrograma();
            }

                
            });

        }else{
            console.log('Indicie inválido.');

            executarPrograma();
        }
    });

}

function exibirConvidados() {
    
    console.log('         ');
    console.log('Convidados: ');

    convidados.forEach((convidados, index) =>{

        console.log(`- ${convidados};`);

    });

    executarPrograma();
}

function excluirConvidado() {
    
    r1.question('Qual Convidado deseja excluir (1,2,3)? ', (indicie)=>{

        indicie = parseInt(indicie - 1);

        if(indicie >= 0 && indicie < convidados.length){

            convidados.splice(indicie, 1);
            console.log('Convidado excluido com sucesso!');

        }else{

            console.log('Indice inválido.');

        }

        executarPrograma();

    });

}

function numeroDConvidados() {
    
    console.log(`O número total de convidados é: ${convidados.length}`)

    executarPrograma();

}


function executarPrograma() {
    
    exibirComandos();

    r1.question('Escolha uma opção: ', (opcao) =>{
        switch (opcao) {
            case '1':
                adicionarConvidado();
                break;
            case '2':
                excluirConvidado();
                break;
            case '3':
                exibirConvidados();
                break;
            case '4':
                alterarConvidado();
                break;
            case '5':
                numeroDConvidados();
                break;
            case '6':
                console.log('Saindo do programa...');
                r1.close();
                break;
        
            default:
                console.log('Opção inválida! Tente novamente.');
                executarPrograma();

                break;
        }
    })

}
executarPrograma();
