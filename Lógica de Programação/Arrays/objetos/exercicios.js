const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const alunos = [];

function perguntarNome() {
    r1.question(`Digite o nome do aluno: `, function (nome) {
        const notas = [];
        const aluno = { nome: nome, notas: notas };
        alunos.push(aluno);
        perguntarIdade(aluno);
        
    });
}

function perguntarIdade(aluno) {
    r1.question(`Digite a idade do aluno: `, function (idade) {
        const Idade = parseInt(idade);
        if (isNaN(Idade)) {
            console.log("Por favor, insira um número válido para a idade.");
            perguntarIdade(aluno);
            
        } else{
            aluno.idade = idade; 
            perguntarCurso(aluno)
        }
    });
}


function perguntarCurso(aluno) {
    r1.question(`Digite o nome do curso do aluno: `, function (cursoq) {
        aluno.curso = cursoq; // Atualiza o curso do aluno
        perguntarNotas(aluno.notas); // Passa o array de notas do aluno
    });
}

function perguntarNotas(notas) {
    if (notas.length < 3) {
        r1.question(`Digite a nota ${notas.length + 1}: `, function (nota) {
            const notaNumerica = parseFloat(nota);
            if (isNaN(notaNumerica)) {
                console.log("Por favor, insira um número válido para a nota.");
                perguntarNotas(notas); // Pergunta novamente se a entrada não for válida
            } else {
                notas.push(notaNumerica);
                perguntarNotas(notas); // Pergunta pela próxima nota
            }
        });
    } else {
        imprimirResultados();
    }
}

function imprimirResultados() {
    console.log('\nResultados: ');
    for (let i = 0; i < alunos.length; i++) {
        let aluno = alunos[i];
        let somaNotas = 0;

        for (let j = 0; j < aluno.notas.length; j++) {
            somaNotas += aluno.notas[j];
        }

        let media = somaNotas / aluno.notas.length;
        let situacao = media >= 7 ? 'Aprovado' : 'Reprovado';

        console.log(`Nome: ${aluno.nome}, idade: ${aluno.idade}, curso: ${aluno.curso}, média: ${media.toFixed(2)},  situação: ${situacao}`);
    }
    r1.close();
}

perguntarNome();