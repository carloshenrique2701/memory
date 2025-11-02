document.addEventListener('DOMContentLoaded', function () {
    

    fetch('tabela_produtos.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, { type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            popularTabela(dadosJson);

        })
    .catch(error => console.error('Erro ao carregar o arquivo: ', error));

});

function popularTabela(dados) {

    const tabela = document.getElementById('tabela');
    
    const tbody = tabela.querySelector('tbody');
    
    const headers = Object.keys(dados[0]);

    dados.slice(0).forEach(linha => {

        const tr = document.createElement('tr');

        headers.forEach(header => {

            const td = document.createElement('td');

            td.innerHTML = linha[header] || '';

            if (header.toLowerCase().includes('semana') && header.toLowerCase().includes('mês 1')) {

                td.classList.add('coluna-oculta1');

            } else if (header.toLowerCase().includes('semana') && header.toLowerCase().includes('mês 2')) {

                td.classList.add('coluna-oculta2');

            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);

    });

    tabela.appendChild(tbody);

}
let expandidoMes1 = false;
let expandidoMes2 = false;
function trocarColuna(mes) {

    switch (mes) {
        case 'mes1':
            
            const colunas1 = document.querySelectorAll('.coluna-oculta1');

            const botao1 = document.getElementById('botao-toggle1');

            colunas1.forEach(coluna => {

                coluna.style.display = expandidoMes1 ? 'none' : 'table-cell';

            });

            botao1.textContent = expandidoMes1 ? '+' : '-';

            expandidoMes1 = !expandidoMes1;

        break;
        case 'mes2':
            
            const colunas2 = document.querySelectorAll('.coluna-oculta2');

            const botao2 = document.getElementById('botao-toggle2');

            colunas2.forEach(coluna => {

                coluna.style.display = expandidoMes2 ? 'none' : 'table-cell';

            });

            botao2.textContent = expandidoMes2 ? '+' : '-';

            expandidoMes2 = !expandidoMes2;

        break;
    
        default:
            break;
    }
    
}