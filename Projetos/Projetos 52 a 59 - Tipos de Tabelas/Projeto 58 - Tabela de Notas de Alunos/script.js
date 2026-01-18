document.addEventListener('DOMContentLoaded', function () {
    
    var alunos = [

        {nome: 'Ana', notas: [8, 9, 7, 6]},
        {nome: 'Bruno', notas: [7, 6, 8, 9]},
        {nome: 'Carla', notas: [9, 8, 9, 7]},
        {nome: 'Daniel', notas: [6, 7, 6, 8]},
        {nome: 'Eduardo', notas: [8, 8, 7, 9]},
        {nome: 'André', notas: [4, 5, 3, 4]},
        {nome: 'Beatriz', notas: [3, 4, 2, 5]},
        {nome: 'Carlos', notas: [5, 3, 4, 2]},
        {nome: 'Fernanda', notas: [7, 9, 8, 7]},
        {nome: 'Gabriel', notas: [9, 7, 6, 8]},
        {nome: 'Helena', notas: [8, 6, 9, 7]},
        {nome: 'Igor', notas: [7, 8, 7, 6]},
        {nome: 'Juliana', notas: [6, 9, 8, 9]},
        {nome: 'Kaique', notas: [9, 6, 7, 8]},
        {nome: 'Gustavo', notas: [4, 3, 2, 4]},
        {nome: 'Larissa', notas: [8, 7, 9, 6]},
        {nome: 'Marcos', notas: [7, 8, 6, 9]},
        {nome: 'Natália', notas: [6, 7, 8, 7]},
        {nome: 'André', notas: [4, 5, 3, 4]},
        {nome: 'Beatriz', notas: [3, 4, 2, 5]},
        {nome: 'Carlos', notas: [5, 3, 4, 2]},
        {nome: 'Otávio', notas: [9, 9, 7, 8]},
        {nome: 'Patrícia', notas: [8, 6, 8, 7]},
        {nome: 'Rafael', notas: [7, 9, 6, 8]},
        {nome: 'Sofia', notas: [6, 8, 9, 7]},
        {nome: 'Thiago', notas: [9, 7, 8, 6]},
        {nome: 'Vanessa', notas: [8, 8, 7, 9]},
        {nome: 'William', notas: [7, 6, 9, 8]},
        {nome: 'Hellen', notas: [3, 2, 4, 3]},
        {nome: 'Ivan', notas: [5, 4, 3, 2]},
        {nome: 'Yasmin', notas: [6, 9, 7, 8]},
        {nome: 'Zé', notas: [9, 8, 6, 7]},
        {nome: 'Jaqueline', notas: [4, 3, 2, 3]},
        {nome: 'Kleber', notas: [3, 4, 2, 2]},
        {nome: 'Luciana', notas: [2, 3, 4, 2]},
        {nome: 'Matheus', notas: [4, 2, 3, 3]},
        {nome: 'Nadia', notas: [3, 3, 2, 4]},
        {nome: 'Osvaldo', notas: [2, 4, 3, 2]},
        {nome: 'Alice', notas: [8, 7, 9, 6]},
        {nome: 'Breno', notas: [7, 8, 7, 9]},
        {nome: 'Camila', notas: [6, 6, 8, 7]},
        {nome: 'Diego', notas: [9, 9, 7, 8]},
        {nome: 'Elisa', notas: [8, 7, 6, 9]},
        {nome: 'Fábio', notas: [7, 8, 9, 6]},
        {nome: 'Giovanna', notas: [6, 9, 8, 7]},
        {nome: 'Henrique', notas: [9, 7, 8, 9]},
        {nome: 'Isabela', notas: [8, 6, 7, 8]},
        {nome: 'Priscila', notas: [4, 3, 2, 1]},
        {nome: 'Quirino', notas: [3, 2, 1, 4]},
        {nome: 'João', notas: [7, 9, 6, 7]},
        {nome: 'Kelly', notas: [6, 8, 9, 8]},
        {nome: 'Leonardo', notas: [9, 7, 8, 6]},
        {nome: 'Mariana', notas: [8, 8, 7, 9]},
        {nome: 'Nicolas', notas: [7, 6, 9, 7]},
        {nome: 'Olivia', notas: [6, 9, 7, 8]},
        {nome: 'Paulo', notas: [9, 8, 6, 9]},
        {nome: 'Quezia', notas: [8, 7, 9, 6]},
        {nome: 'Ricardo', notas: [7, 8, 7, 8]},
        {nome: 'Sabrina', notas: [6, 6, 8, 9]},
        {nome: 'Tiago', notas: [9, 9, 7, 7]},
        {nome: 'Ursula', notas: [8, 7, 6, 8]},
        {nome: 'Renata', notas: [2, 3, 4, 1]},
        {nome: 'Sérgio', notas: [4, 2, 2, 3]},
        {nome: 'Tatiane', notas: [3, 3, 3, 2]},
        {nome: 'Vitor', notas: [7, 8, 9, 6]},
        {nome: 'Wesley', notas: [6, 9, 8, 7]},
        {nome: 'Xavier', notas: [9, 7, 8, 9]},
        {nome: 'Yara', notas: [8, 6, 7, 8]},
        {nome: 'Zélia', notas: [7, 9, 6, 7]},
        {nome: 'Arthur', notas: [6, 8, 9, 8]}

    ]

    var tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

    function exibirAlunos(alunosFiltrados) {
        
        tabela.innerHTML = '';

        alunosFiltrados.forEach(aluno =>{

            var media = aluno.notas.reduce((a, b) => a + b, 0) / aluno.notas.length;

            var status;

            var statusClass;

            var icon;

            if(media >= 7){

                status = "Aprovado";

                statusClass = 'aprovado';

                icon = '✅';

            } else if(media >= 5){

                status = 'Exame';

                statusClass = 'exame';

                icon = '⚠️';

            } else{

                status = 'Reprovado';

                statusClass = 'reprovado';

                icon = '❌'

            }

            var linha = document.createElement('tr');

            linha.innerHTML = `
            
                <td>${aluno.nome}</td>
                <td>${aluno.notas[0]}</td>
                <td>${aluno.notas[1]}</td>
                <td>${aluno.notas[2]}</td>
                <td>${aluno.notas[3]}</td>
                <td>${media.toFixed(2)}</td>
                <td class="${statusClass}"><span class="icon">${icon}</span> ${status}</td>
            `;

            tabela.append(linha);

        });

    }

    exibirAlunos(alunos);

    document.getElementById('filtroNome').addEventListener('input', function() {
        
        var filtro = this.value.toLowerCase();

        var alunosFiltrados = alunos.filter(aluno => aluno.nome.toLowerCase().includes(filtro));

        exibirAlunos(alunosFiltrados);

    })

});