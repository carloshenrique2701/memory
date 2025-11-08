document.addEventListener('DOMContentLoaded', function () {
    
    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const jsonData = XLSX.utils.sheet_to_json(ws);

            const tabelaBody = document.querySelector('#tabelaProdutos tbody');

            carregarProdutos(jsonData)

            tabelaBody.innerHTML = '';

            jsonData.forEach(item => {
                
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${item['Produto']}</td>
                    <td>${item['Vendas']}</td>
                    <td>${item['Meta']}</td>
                `;

                tabelaBody.appendChild(tr)

            });

            document.getElementById('seletorProduto').addEventListener('change', function () {
                
                atualizarSemaforo(jsonData);

            });

        })
    .catch(erro => console.error('Erro ao carregar o arquivo: ', erro))

});

function carregarProdutos(dados) {

    var seletor = document.getElementById("seletorProduto");

    dados.forEach(function(item) {
        
        var opcao = document.createElement('option');

        opcao.value = item['Produto'];

        opcao.textContent = item['Produto'];

        seletor.appendChild(opcao);

    });

    atualizarSemaforo(dados);
    
}

function atualizarSemaforo(dados) {

    var produtoSelecionado = document.getElementById("seletorProduto").value;

    var produto = dados.find(item => item['Produto'] === produtoSelecionado);
    //Retorna a linha do produto selecionado

    var vendas = produto['Vendas'];
    var meta = produto['Meta'];

    var vermelho = document.getElementById('vermelho');
    var amarelo = document.getElementById('amarelo');
    var verde = document.getElementById('verde');

    vermelho.classList.remove('ativo');
    amarelo.classList.remove('ativo');
    verde.classList.remove('ativo');

    if(vendas < meta * 0.5) {

        vermelho.classList.add('ativo');

    } else if(vendas < meta * 0.75) {
        
        amarelo.classList.add('ativo');
    
    }else{

        verde.classList.add('ativo');

    }
    
}