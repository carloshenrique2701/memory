document.addEventListener('DOMContentLoaded', function () {
    
    const excel = 'notas_estudantes.xlsx'

    console.log('Fazendo requisição HTTP do arquivo: ', excel)
    fetch(excel)

        .then(response => response.arrayBuffer())

        .then(data => {
            console.log('Tranformando o arquivo em JSON');
            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws, { header: 1 });

            processarDados(dadosJson);

        })

    .catch( error => console.error('Erro ao encontrar o arquivo excel: ', error));
        

    document.getElementById('filtro').addEventListener('input', aplicarFiltro);

});

let dadosAlunos = {};

function processarDados(data) {
    console.log('Fazendo o processamento de dados e a estruturação');
    
    const [cabecalhos, ...linhas] = data;

    dadosAlunos = {};

    linhas.forEach(linha => {
        
        const [nome, turma, n1, n2, n3, n4, faltas] = linha;

        if(!dadosAlunos[turma]){

            dadosAlunos[turma] = [];

        }

        dadosAlunos[turma].push({Nome: nome, Notas: {n1, n2, n3, n4,}, Faltas:faltas});

    });

    criarTurmas(dadosAlunos);

}

function criarTurmas(turmas) {

    const containerTurmas = document.getElementById('turmas'); // Você precisa ter este elemento no HTML
    
    // Limpa o container antes de adicionar os links
    containerTurmas.innerHTML = '';
    
    // Obtém todas as turmas únicas (as chaves do objeto)
    const turmasUnicas = Object.keys(turmas);
    
    console.log('Turmas encontradas:', turmasUnicas);
    
    // Cria um link para cada turma
    turmasUnicas.forEach(turma => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = turma;
        link.classList.add('link-turma');
        
        // Adiciona evento de clique para mostrar os alunos da turma
        link.addEventListener('click', function(e) {
            e.preventDefault();
            trocarClassAtiva(this);
            mostrarAlunosTurma(turma, turmas[turma]);
        });
        
        containerTurmas.appendChild(link);
        containerTurmas.appendChild(document.createElement('br')); // Quebra de linha
    });

    
}

function trocarClassAtiva(element) {
    console.log('Trocando a classe do link');
    const as = document.querySelectorAll('a.link-turma');

    as.forEach(a => a.classList.remove('active'));

    element.classList.add('active');

}

function mostrarAlunosTurma(turma, alunos) {

    console.log(`Mostrando alunos da turma: ${turma}`, alunos);
    
    const tabela = document.getElementById('tabela');

    tabela.innerHTML = '';
    
    const thead = document.createElement('thead');

    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Turma</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Nota 4</th>
            <th>Média</th>
            <th>Faltas</th>
            <th>Status</th>
        </tr>
    `;

    tabela.appendChild(thead)

    const tbody = document.createElement('tbody');

    alunos.forEach(aluno => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${aluno.Nome}</td>
            <td>${turma}</td>
        `;

        const notasAluno = aluno.Notas;
        const ordemNotas = ['n1', 'n2', 'n3', 'n4'];
        let mediaSoma = 0;

        ordemNotas.forEach(chave => {
            const td = document.createElement('td');
            const nota = parseFloat(notasAluno[chave]);
            mediaSoma += nota;
            td.textContent = notasAluno[chave]; // Mostra o valor original (string)
            row.appendChild(td);
        });


        let mediaFinal = (mediaSoma/4).toFixed(2);

        const tdMedia = document.createElement('td');

        tdMedia.textContent = mediaFinal;

        row.appendChild(tdMedia);

        ////////////////////

        const tdFaltas = document.createElement('td');

        tdFaltas.textContent = aluno.Faltas;

        row.appendChild(tdFaltas);

        ////////////////////

        const tdStatus = document.createElement('td');

        tdStatus.textContent = parseInt(aluno.Faltas) > 10 ? 'Reprovado por Faltas' :
                                mediaFinal > 6 ? 'Aprovado' : 'Reprovado por Nota';

        tdStatus.classList = 'status';

        row.appendChild(tdStatus);

        tbody.appendChild(row);

    });

    tabela.appendChild(tbody);

    
}

document.getElementById('exportarExcel').addEventListener('click', exportarParaExcel);

function exportarParaExcel() {
    
    const tabela = document.getElementById('tabela');

    const tabelaClone = tabela.cloneNode(true);

    const wb = XLSX.utils.table_to_book(tabelaClone, {

        sheet: 'Alunos',
        display: true

    })

    XLSX.writeFile(wb, 'alunos.xlsx');

}


function aplicarFiltro(event) {
    const termo = event.target.value.toLowerCase();
    const linhasAlunos = document.querySelectorAll('tbody tr'); 

    linhasAlunos.forEach(linha => {
        const statusTexto = linha.cells[8].textContent.toLowerCase(); // Supondo que status está na 2ª coluna (índice 1)
        
        if (statusTexto.includes(termo)) {
            linha.style.display = ''; 
        } else {
            linha.style.display = 'none';
        }
    });
}