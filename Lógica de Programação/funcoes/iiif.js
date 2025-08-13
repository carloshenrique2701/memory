/*
(function () {

    let contador = 0
    
    function incrmentar() {
        
        contador += 1;
        console.log(contador);

    }

    function zerar() {

        contador = 0;
        console.log(`Contador zerado`);
        
    }

    incrmentar();
    incrmentar();
    zerar();

})();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const gerenciadorDeTarefas = (function () {

    let tarefas = [];

    function adicionar(tarefa) {

        tarefas.push(tarefa);

        console.log(`Tarefa ${tarefa} adicionada.`);
        
    }

    function listar() {

        if(tarefas.length === 0){

            console.log(`Não há tarefas`);

            return;
        }

        console.log(`Tarefas: `)

        tarefas.forEach((tarefa,index)=>{ // forEach significa que passa por cada elemento do array

            console.log(`${index += 1}: ${tarefa}`);

        });
        
    }

    return{
        listar,
        adicionar
    }
    
})();

gerenciadorDeTarefas.adicionar("Cagar às 8")
gerenciadorDeTarefas.adicionar("Academia ás 9")
gerenciadorDeTarefas.adicionar("Faculdade ás 19:20")
gerenciadorDeTarefas.listar();
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------


const gerenciadorDeNotificacoes = (function () {

    let notificacoes = [];

    function adicionar(mensagem) {

        notificacoes.push(mensagem);

        console.log(`Sistema: 
            Nova notificação: ${mensagem}
             `);
        
    } //ok

    function listar() {

        if(notificacoes.length === 0){

            console.log(`Não há notificações no momento`);

            return;
        } //ok

        console.log(`Notificações: `)

        notificacoes.forEach((mensagem,index)=>{

            console.log(`${index += 1}: ${mensagem}`);

        });//ok
        
    }

    return{
        listar,
        adicionar
    }//ok
    
})();//ok

gerenciadorDeNotificacoes.adicionar("WhatsApp: 24 mensagens");
gerenciadorDeNotificacoes.adicionar("Clash of clas: construção finalizada");
gerenciadorDeNotificacoes.adicionar("Instagram: compartilhe seus stories");

gerenciadorDeNotificacoes.listar();



