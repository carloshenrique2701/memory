document.addEventListener('DOMContentLoaded', function () {
    
    const tabelabody = document.querySelector('#tabela-estudantes tbody');

    function carregarDados() {

        fetch('notas_estudantes.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {

                const wb = XLSX.read(data, {type:'array'});

                const ws = wb.Sheets['Dados'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, { header: 1});

                popularTabela(dadosJson);

            })
        .catch(error => console.error('Erro ao carregar o arquivo: ', error));
        
    }

    function popularTabela(dados) {
        
        tabelabody.innerHTML = '';

        dados.slice(1).forEach(function (linha) {
            
            const tr = document.createElement('tr');

            linha.forEach(function (celula, indice) {

                const td = document.createElement('td');

                td.textContent = celula || '';

                if (indice === 0) {
                    
                    td.classList.add('nome-fixo');

                }

                tr.appendChild(td);
                
            });

            tr.addEventListener('click', function () {
                
                removerDestacarLinha();

                tr.classList.add('linha-destacada');

                tr.querySelector('.nome-fixo').classList.add('celula-destacada');

            });

            tabelabody.appendChild(tr);

        });

    }

    function removerDestacarLinha() {
        
        const linhas = tabelabody.querySelectorAll('tr');

        linhas.forEach(function (linha) {
            
            linha.classList.remove('linha-destacada');

            linha.querySelector('.nome-fixo').classList.remove('celula-destacada')

        })

    }

    carregarDados();

})