const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class NovoAlunos {
    constructor(nome, curso, idade) {

        this.nome = nome;
        this.idade =idade;
        this.curso = curso;

    }
}

class Alunos {

    constructor(){

        this.alunos = []

    }

    adicionarAlunos(nome, curso, idade){

        const novoAluno = new NovoAlunos(nome, curso, idade);

        this.alunos.push(novoAluno);

        console.log(`\nAluno: ${nome} adicionado com sucesso.\n`);

    }

    adicionarNotas(indice, nota1, nota2){

        if(indice >= 0 && indice < this.alunos.length) {
            this.alunos[indice].notaA1 = nota1;
            this.alunos[indice].notaA2 = nota2;
            console.log(`\nNotas adicionadas com sucesso.\n`);
        } else {
            console.log(`\nÍndice inválido\n`);
        }
        
    }

    exibirListaDeAlunos(){
        

        this.alunos.forEach((aluno, index)=>{

            if (isNaN(aluno.notaA1) || isNaN(aluno.notaA2)) {
                situacao = 'Pendente';
            } else {
                let media = (aluno.notaA1 + aluno.notaA2) / 2;
                if (media > 6) {
                    situacao = 'Aprovado';
                } else {
                    situacao = 'Reprovado';
                }
                console.log(`Aluno ${index + 1}: ${aluno.nome} | curso:${aluno.curso} | idade: ${aluno.idade} | Média: ${media.toFixed(2)} (${situacao})`);
            }
        });
    }
}

const gerenciadorDeAlunos = new Alunos();

function menu() {
    console.log(' ===== MENU =====');
    console.log('1. Adicionar aluno;');
    console.log('2. Exibir lista;');
    console.log('3. Adicionar notas;');
    console.log('4. Sair.');

    r1.question('Digite uma opção: ', (comando)=>{

        switch (comando) {
            case '1':

                r1.question('Digite o nome do aluno: ', (nome)=>{
                    r1.question('Digite a idade do aluno: ', (idade)=>{
                        r1.question('Digite o curso do aluno: ', (curso)=>{
                            gerenciadorDeAlunos.adicionarAlunos(nome, curso, idade);
                            menu();
                        });
                    });
                });
                
                break;
        
            case '2':

                gerenciadorDeAlunos.exibirListaDeAlunos();
                menu();
                
                break;
        
            case '3':

                r1.question('Digite o índice do aluno: ', (index)=>{                       
                    r1.question('Digite a nota da AV1: ', (notaA1)=>{
                        r1.question('Digite a nota da AV2: ', (notaA2)=>{
                            gerenciadorDeAlunos.adicionarNotas(parseInt(index-1), parseFloat(notaA1), parseFloat(notaA2));
                            menu();
                        })
                    })
                })
                
                break;
        
            case '4':
                console.log('Saindo...');
                r1.close();
                break;
        
            default:
                console.log('Comando inválido. Tente novamente');
                menu();
                break;
        }

    })
}

menu();





