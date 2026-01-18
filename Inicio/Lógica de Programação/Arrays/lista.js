const readline = require('readline');

r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tarefas = ['estudar', 'comprar fone', 'caminhar com o dino'];

function exibirMenu() {
    console.log('\nEscolha uma opção:');
    console.log('1. adicionar tarefa.');
    console.log('2. alterar tarefa');
    console.log('3. excluir tarefa');
    console.log('4. exibir tarefas');
    console.log('5. sair');  
}


function adicionarTarefa() {
    
    r1.question('Digite a nova tarefa: ', (novaTarefa)=> {

        tarefas.push(novaTarefa);

        console.log('Tarefa adicionada com sucesso!');

        executarPrograma();

    });
}

function alterarTarefa() {
    
    r1.question('Digite o indicie da tarefa para alterar(0,1,2...)', (indicie)=>{
        indicie = parseInt(indicie);

        if(indicie >= 0 && indicie < tarefas.length){

            r1.question('Digite a nova descrição da tarefa: ', (novaTarefa)=>{

                tarefas[indicie] = novaTarefa;

                console.log("Tarefa alterada com sucesso!");

                executarPrograma();
            });

        }else{
            console.log('Indicie inválido.');

            executarPrograma();
        }
    });

}

function exibirTarefas() {
    
    console.log('         ');
    console.log('Tarefas: ');

    tarefas.forEach((tarefa, index) =>{

        console.log(`${index + 1}: ${tarefa};`);

    });

    executarPrograma();
}

function excluirTarefa() {
    
    r1.question('Qual tarefa deseja excluir (1,2,3)? ', (indicie)=>{

        indicie = parseInt(indicie);

        if(indicie >= 0 && indicie < tarefas.length){

            tarefas.splice(indicie - 1, 1);
            console.log('Tarefa excluida com sucesso!');

        }else{

            console.log('Indice inválido.');

        }

        executarPrograma();

    });

}


function executarPrograma() {
    
    exibirMenu();

    r1.question('Escolha uma opção: ', (opcao) =>{
        switch (opcao) {
            case '1':
                adicionarTarefa();
                break;
            case '2':
                alterarTarefa();
                break;
            case '3':
                excluirTarefa();
                break;
            case '4':
                exibirTarefas();
                break;
            case '5':
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
