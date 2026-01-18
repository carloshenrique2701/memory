document.addEventListener('DOMContentLoaded', function () {
    
    let dadosVendedores =[]; 

    fetch('Vendedor.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, { type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            dadosVendedores = XLSX.utils.sheet_to_json(ws);

            const vendas = {};

            dadosVendedores.forEach(item => {
                
                const vendedor = item.Vendedor;

                const total = parseFloat(item.Total);

                if (vendas[vendedor]) {
                    
                    vendas[vendedor] += total;

                } else {

                    vendas[vendedor] = total;
                    
                }

            });

            const vendasOrdenadas = Object.entries(vendas) 
                .map(([vendedor, total]) => ({vendedor, total}))
                //'Object.entries(vendas)' converte o objeto 'vendas' em um array de arrays,
                    //onde cada sub-array contém [chave, valor], ou seja, [nome do vendedor, total de vendas].
                //O método '.map()' transforma cada sub-array em um objeto com as propriedades 'vendedor'
                    // e 'total.
                //Isto é útil para manipulações subsequentes, como ordenação, que são mais intuitivas
                    //quando os dados estão em formato de objeto.

                .sort((a, b) => b.total - a.total);
                //Afunção '.sort()' é usada para ordenar o array de objetos baseado no total de vendas.
                //A função de comparação toma dois objetos, 'a' e 'b', e subtrai o 'total' de 'b' do 
                    // 'total' de 'a'.
                //A ordenação é feita em ordem decrescente.

            const topVendedores = vendasOrdenadas.slice(0, 3);//Pega o top 3

            const containerVendedores = document.querySelector('#top-3-vendedores');

            containerVendedores.innerHTML = topVendedores.map((vendedor, index) => `
                <div class="vendedor">
                
                    <img src="images/${vendedor.vendedor}.jpg" alt="${vendedor.vendedor}">

                    <div class="podio">

                        <div class="posicao posicao-${index+1}">
                        
                            <p>${index + 1}</p>

                        </div>

                        <h3>${vendedor.vendedor}</h3>

                        <p>${vendedor.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>

                    </div>
                
                </div>
            `).join('');

            const containerRankingVendedores = document.querySelector('#ranking-vendedores');

            containerRankingVendedores.innerHTML = vendasOrdenadas.map((vendedor, index) => `
            
                <div class="item-ranking" data-vendedor="${vendedor.vendedor}">
                
                    <img src="images/${vendedor.vendedor}.jpg" alt="${vendedor.vendedor}">

                    <div class="info">
                    
                        <p>${index + 1} - ${vendedor.vendedor}</p>

                        <p>${vendedor.total.toLocaleString('pr-BR', {style: 'currency', currency: 'BRL'})}</p>

                    </div>
                
                </div>

            `).join('');

            const containerResumoVendas = document.querySelector('#tabela-resumo tbody');

            containerResumoVendas.innerHTML = dadosVendedores.map(venda => `

                <tr>
                
                    <td>${venda.Vendedor}</td>
                    <td>${venda.Produto}</td>
                    <td>${venda.Total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>

                </tr>
                
            `).join('');
            

        })

    .catch(error => console.error('Erro ao caregar o arquivo: ', error));

    document.getElementById('mostrar-top-3').addEventListener('click', () => {

        document.getElementById('titulo-principal').innerHTML = 'Melhores vendedores do mês';

        document.getElementById('top-3-vendedores').style.display = 'flex';
        document.getElementById('resumo-vendas').style.display = 'none';
        document.getElementById('ranking-vendedores').style.display = 'none';
        document.getElementById('detalhes-vendedor').style.display = 'none';

    });
    document.getElementById('mostrar-ranking').addEventListener('click', () => {

        document.getElementById('titulo-principal').innerHTML = 'Ranking de Vendas';

        document.getElementById('top-3-vendedores').style.display = 'none';
        document.getElementById('resumo-vendas').style.display = 'none';
        document.getElementById('ranking-vendedores').style.display = 'flex';
        document.getElementById('detalhes-vendedor').style.display = 'none';

    });
    document.getElementById('mostrar-resumo').addEventListener('click', () => {

        document.getElementById('titulo-principal').innerHTML = 'Resumo de Vendas';

        document.getElementById('top-3-vendedores').style.display = 'none';
        document.getElementById('resumo-vendas').style.display = 'block';
        document.getElementById('ranking-vendedores').style.display = 'none';
        document.getElementById('detalhes-vendedor').style.display = 'none';

    });

    document.querySelector('#ranking-vendedores').addEventListener('click', (event) => {

        const item = event.target.closest('.item-ranking');

        if (item) {
            
            const vendedorNome = item.getAttribute('data-vendedor');

            const detalhesVendedor = dadosVendedores.filter(venda => venda.Vendedor === vendedorNome);

            const tabelaDetables = document.querySelector('#tabela-detalhes tbody');

            tabelaDetables.innerHTML = detalhesVendedor.map(venda => `
                
                <tr>
                
                    <td>${venda.Vendedor}</td>
                    <td>${venda.Produto}</td>
                    <td>${parseFloat(venda.Total).toFixed(2)}</td>

                </tr>

            `).join('');

            document.getElementById('titulo-principal').innerHTML = `Detalhes de Vendas - ${vendedorNome}`;

            document.getElementById('top-3-vendedores').style.display = 'none';
            document.getElementById('resumo-vendas').style.display = 'nome';
            document.getElementById('ranking-vendedores').style.display = 'none';
            document.getElementById('detalhes-vendedor').style.display = 'block';

        } 

    });

    document.getElementById('voltar-ranking').addEventListener('click', () => {

        document.getElementById('titulo-principal').innerHTML = `Ranking de Vendas`;

        document.getElementById('top-3-vendedores').style.display = 'none';
        document.getElementById('resumo-vendas').style.display = 'nome';
        document.getElementById('ranking-vendedores').style.display = 'flex';
        document.getElementById('detalhes-vendedor').style.display = 'none';

    });

    document.querySelectorAll('.filtros input').forEach(input => {

        input.addEventListener('input', filtrarTabelaResumo);

    });

    function filtrarTabelaResumo() {
        
        const filtroVendedor = document.getElementById('filtrar-vendedor').value.toLowerCase();
        const filtroProduto = document.getElementById('filtrar-produto').value.toLowerCase();
        const filtroTotal = document.getElementById('filtrar-total').value.toLowerCase();

        const linhas = document.querySelectorAll('#tabela-resumo tbody tr');

        linhas.forEach(linha => {

            const vendedor = linha.children[0].innerHTML.toLowerCase();
            const produto = linha.children[1].innerHTML.toLowerCase();
            const total = linha.children[2].innerHTML.toLowerCase();

            const correspondeVendedor = vendedor.includes(filtroVendedor);
            const correspondeProduto = produto.includes(filtroProduto);
            const correspondeTotal = total.includes(filtroTotal);

            if (correspondeProduto && correspondeTotal && correspondeVendedor) {
                
                linha.style.display = '';

            } else {
                
                linha.style.display = 'none';

            }
            

        });

        document.getElementById('exportar-resumo').addEventListener('click', () => {
            console.log('passei aqui')
            exportarTabelaExcel('tabela-resumo', 'resumo_vendas.xlsx');

        });
        document.getElementById('exportar-detalhes').addEventListener('click', () => {
            console.log('passei aqui')
            exportarTabelaExcel('tabela-detalhes', 'detalhes_vendas.xlsx');

        });

        function exportarTabelaExcel(tabelaid, nomeArquivo) {
            console.log('exportando')
            const tabela = document.getElementById(tabelaid);


            const tabelaClone = tabela.cloneNode(true);


            const wb = XLSX.utils.table_to_book(tabelaClone, {sheet: 'Sheet1'});

            XLSX.writeFile(wb, nomeArquivo);

        }



    }

});