let expandido = false;

document.addEventListener('DOMContentLoaded', function () {
    
    fetch('tabela_exemplo.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            preencherTabela(dadosJson);

        })

});


function preencherTabela(dados) {
        
    const corpoTabela = document.getElementById('corpo-tabela');

    corpoTabela.innerHTML ='';

    dados.forEach(linha => {
        
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.textContent = linha.Nome;
        tr.appendChild(tdNome);
        
        const tdIdade = document.createElement('td');
        tdIdade.textContent = linha.Idade;
        tdIdade.classList.add('coluna-oculta');
        tr.appendChild(tdIdade);

        const tdCidade = document.createElement('td');
        tdCidade.textContent = linha.Cidade;
        tdCidade.classList.add('coluna-oculta');
        tr.appendChild(tdCidade);

        const tdProfissao = document.createElement('td');
        tdProfissao.textContent = linha.Profissão;
        tdProfissao.classList.add('coluna-oculta');
        tr.appendChild(tdProfissao);

        const tdSalario = document.createElement('td');
        tdSalario.textContent = formatarSalario(linha.Salário);
        tr.appendChild(tdSalario);

        corpoTabela.appendChild(tr);

    });

}

function formatarSalario(valor) {
    
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

}

function alterarColunas() {
    
    const colunasOcultas = document.querySelectorAll('.coluna-oculta');

    const botaoToggle = document.getElementById('toggle');

    colunasOcultas.forEach(coluna => {

        coluna.style.display = expandido ? 'none' : 'table-cell';

    });

    botaoToggle.textContent = expandido ? '+' : '-';

    expandido = !expandido;

}