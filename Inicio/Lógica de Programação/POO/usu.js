const readline = require("readline");

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Usuario{

    constructor(nome, email){

        this.nome = nome;
        this.email = email;

    }

}

class GerenciadorDeUsuarios{

    constructor(){

        this.usuarios = [];

    }

    adicionarUsuarios(nome, email){

        const novoUsuario = new Usuario(nome, email);

        this.usuarios.push(novoUsuario);

        console.log("\nUsuário adicionado com sucesso!\n");

    }

    exibirUsuarios(){

        console.log("\n ====== LISTA DE USUÁRIOS ======\n");

        this.usuarios.forEach((usuario, index)=>{

            console.log(`Usuário ${index + 1}: ${usuario.nome} (${usuario.email})`);

        })

        console.log("==============================\n");

    }

    alterarEmail(indice, novoEmail){

        if (indice >= 0 && indice < this.usuarios.length) {
            
            this.usuarios[indice].email = novoEmail;

            console.log(`\nEmail do usuário ${this.usuarios[indice].nome} foi alterado com sucesso.\n`);

        } else {
            
            console.log('\nÍndice inválido.\n');

        }

    }

    deletarUsuario(indice){

        if (indice >= 0 && indice < this.usuarios.length) {

            console.log(`\nUsuário ${this.usuarios[indice].nome} foi deletado com sucesso.\n`);

            this.usuarios.splice(indice, 1);
            
        } else {
            
            console.log('\nÍndice inválido\.n');

        }
    }
}

function exibirMenu() {
    
    console.log(" === MENU === ");
    console.log("1. Adicionar usuário;");
    console.log("2. Exibir usuário;");
    console.log("3. Alterar email de usuário;");
    console.log("4. Deletar usuário;");
    console.log("5. Sair.");

}

const gerenciador = new GerenciadorDeUsuarios();

function pocessarOpcao(opicao) {
    
    switch (opicao) {
        case '1':

            r1.question('Digite o nome do usuário: ', (nome)=>{

                r1.question('Digite o email do usuário: ', (email)=>{

                    gerenciador.adicionarUsuarios(nome, email);
                    exibirMenu();

                });

            });
            
            break;
        case '2':

            gerenciador.exibirUsuarios();
            exibirMenu();
            
            break;
        case '3':
            
            r1.question('Digite o indice do usuário: ', (indice)=>{

                r1.question('Digite o novo email do usuário: ', (novoEmail)=>{

                    gerenciador.alterarEmail(parseInt(indice) - 1, novoEmail);

                    exibirMenu();

                });

            });

            break;
        case '4':

            r1.question('Digite o indice do usuário que deseja deletar: ', (indice)=>{

                gerenciador.deletarUsuario(parseInt(indice) - 1);
                exibirMenu();

            });
            
            break;
        case '5':

            console.log("Saindo...")
            r1.close();
            break;
    
        default:

            console.log('Comando inválido. Tente novamente');
            exibirMenu();

            break;
        

    }

}

r1.on('line', (input) =>{

    pocessarOpcao(input.trim())

});

exibirMenu();
