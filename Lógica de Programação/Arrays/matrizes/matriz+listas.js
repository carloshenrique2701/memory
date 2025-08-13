/*
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const alunos = [];
const numeroAlunos = 3;
let alunosIndex = 0;

function perguntarNome() {
    if (alunosIndex < numeroAlunos) {
        r1.question(`Digite o nome do aluno ${alunosIndex + 1}: `, function (nome) {
            const notas = [];
            alunos.push({ nome: nome, notas: notas });
            perguntarNotas(notas);
        });
    } else {
        imprimirResultados();
    }
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
                perguntarNotas(notas);
            }
        });
    } else {
        alunosIndex++;
        perguntarNome();
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

        console.log(`Nome: ${aluno.nome}, média: ${media.toFixed(2)}, situação: ${situacao}`);
    }
    r1.close();
}

perguntarNome();
*/





const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const votos = [];
let titulo = 0; // Corrigido para let
const candidatos = [
    { nome: 'A', votos: 0 },
    { nome: 'B', votos: 0 },
    { nome: 'C', votos: 0 }
];

function exibirMenu() {
    console.log('\nEscolha uma opção:');
    console.log('1. Para votar no candidato A.');
    console.log('2. Para votar no candidato B.');
    console.log('3. Para votar no candidato C.');
    console.log('0. Para finalizar a votação.');
}

function perguntaEleitor() {
    r1.question(`Digite o código do candidato: `, function (cod) {
        titulo += 1;
        computarVotos(cod);
    });
}

function computarVotos(cod) {
    const voto = parseInt(cod);

    if (isNaN(voto)) {
        console.log("Por favor, insira um comando válido.");
        perguntaEleitor(); // Pergunta novamente se a entrada não for válida
    } else {
        if (voto === 1) {
            candidatos[0].votos += 1; // Incrementa votos do candidato A
            console.log("Voto computado. PRÓXIMO...");
            perguntaEleitor();
        } else if (voto === 2) {
            candidatos[1].votos += 1; // Incrementa votos do candidato B
            console.log("Voto computado. PRÓXIMO...");
            perguntaEleitor();
        } else if (voto === 3) {
            candidatos[2].votos += 1; // Incrementa votos do candidato C
            console.log("Voto computado. PRÓXIMO...");
            perguntaEleitor();
        } else if (voto === 0) {
            console.log('Finalizando...');
            fechamento();
        } else {
            console.log('Por favor, insira um comando válido.');
            perguntaEleitor();
        }
    }
}

function fechamento() {

    console.log('\nResultados da votação:');
    console.log('-----------------------');
    console.log('Candidato | Votos');
    console.log('-----------------------');
    for (const candidato of candidatos) {
        console.log(`    ${candidato.nome}     |  ${candidato.votos}`);
    }
    console.log('-----------------------');
    
    let vencedor = candidatos[0];

    for (let i = 1; i < candidatos.length; i++) {
        if (candidatos[i].votos > vencedor.votos) {
            vencedor = candidatos[i];
        }
    }

    console.log(`Candidato vencedor: ${vencedor.nome} com ${vencedor.votos} votos.`);
    r1.close();
}

function executarPrograma() {
    exibirMenu();
    perguntaEleitor();
}

executarPrograma();