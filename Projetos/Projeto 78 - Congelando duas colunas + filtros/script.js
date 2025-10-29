document.addEventListener('DOMContentLoaded', function () {
    
    const excel = 'notas_estudantes.xlsx';

    const tabelaBody = document.querySelector('#tabela-estudantes tbody')

    function carregarDados(arquivo) {

        console.log('Carregando arquivo...');
        
        fetch(arquivo)
            .then(response => response.arrayBuffer())
            .then(data => {

                const wb = XLSX.read(data, { type: 'array'});

                const ws = wb.Sheets['Dados'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, {header: 1});

                popularTabela(dadosJson);

            })
        .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    function popularTabela(dados) {
    
        console.log('Populando tabela...');

        tabelaBody.innerHTML = '';

        dados.slice(1).forEach(linha => {
            
            const tr = document.createElement('tr');

            linha.forEach((celula, index) => {

                const td = document.createElement('td');
                

                td.textContent = celula || '';

                if (index === 0 || index === 1) {
                    
                    td.classList.add('celula-fixa');

                } 

                tr.appendChild(td);

                tr.addEventListener('click', function (evento) {
                    
                    console.log('Mudando cor da linha... ');
                    removerMarcacao();
                    tr.classList.add('linha-destacada')

                })

            });

            tabelaBody.appendChild(tr);

        });


    }

    function removerMarcacao() {

        const linhas = tabelaBody.querySelectorAll('tr');
        
        linhas.forEach(linha => {

            linha.classList.remove('linha-destacada');

        })

    }

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {

        input.addEventListener('input', filtrarTabela);

    })

    function filtrarTabela() {

        console.log('Filtrando...')

        const termos =[

            [document.getElementById('filtrar-nome').value],
            [document.getElementById('filtrar-turma').value],
            [document.getElementById('filtrar-nota1').value],
            [document.getElementById('filtrar-nota2').value],
            [document.getElementById('filtrar-nota3').value],
            [document.getElementById('filtrar-nota4').value],
            [document.getElementById('filtrar-nota5').value],
            [document.getElementById('filtrar-nota6').value],
            [document.getElementById('filtrar-nota7').value],
            [document.getElementById('filtrar-nota8').value],
            [document.getElementById('filtrar-media').value],
            [document.getElementById('filtrar-faltas').value],
            [document.getElementById('filtrar-status').value]

        ]

        const linhas = tabelaBody.querySelectorAll('tr');

        linhas.forEach(linha => {

            const celulas = linha.querySelectorAll('td');
            let deveMostrar = true;
    
            for (let i = 0; i < termos.length; i++) {
                // Se há termo de filtro E a célula não contém esse termo
                if (termos[i] && celulas[i] && !celulas[i].textContent.toLowerCase().includes(termos[i])) {
                    deveMostrar = false;
                    break; // Já sabemos que não deve mostrar, pode parar
                }
            }
    
            linha.style.display = deveMostrar ? '' : 'none';

        })

    }

    document.getElementById("exportar-tabela").addEventListener('click', exportarParaExcel);

    function exportarParaExcel() {
        
        const tabela = document.getElementById('tabela-estudantes');

        const tabelaClone = tabela.cloneNode(true);

        const wb = XLSX.utils.table_to_book(tabelaClone, {sheet: 'Sheet1'});

        XLSX.writeFile(wb, 'estudantes.xlsx');

    }

    carregarDados(excel);


})
