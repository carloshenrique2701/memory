document.addEventListener('DOMContentLoaded', function () {
    
    const listaProdutos = document.getElementById('lista-produtos');

    const detalhesProduto = document.getElementById('detalhes-produto');

    const filtroProduto = document.getElementById('filtro-produto');

    const filtroVendedor= document.getElementById('filtro-vendedor');
    
    const mostrarTodosBtns = document.getElementById('mostrar-todos');

    const totalVendas = document.getElementById('total-vendas');

    let dadosTabela = [];

    let produtosUnicos = [];

    let vendedorersUnicos = [];

    function carrgarArquivo() {
        
        fetch('Vendedor.xlsx')

            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const ws = wb.Sheets[wb.SheetNames[0]];

                const json = XLSX.utils.sheet_to_json(ws);

                dadosTabela = json;

                criarListaProdutos();

                criarListaVendedores();

                calcularTotalVendas(dadosTabela);

            })

            .catch(error => console.error('Erro ao encontrar o arquivo: ', error));

    }

    function criarListaProdutos() {
        
        const produtosMap = new Map();

        dadosTabela.forEach(linha => {

            if (!produtosMap.has(linha.Produto)) {
                
                produtosMap.set(linha.Produto, {

                    ...linha,
                    total: 0

                })

            }

            produtosMap.get(linha.Produto).total += linha.Total
            //Acessa o produto correspondente no Map e soma o valor 'Total' da linha 
            // atual ao total acumulado do produto, agregando as vendas de multiplas
            // entradas que podem existir para o mesmo produto

        });

        produtosUnicos = Array.from(produtosMap.values());
        //Converte os valores do Map para um array que contem as representações 
        // únificadas de cada produto com seus totais de vendas agregados. Será 
        // usado para imprimir os dados limpos sem repetições

        preencherListaProdutos(produtosUnicos);
        exibirMiniaturasProdutos(produtosUnicos);

    }

    function preencherListaProdutos(produtos) {
        
        listaProdutos.innerHTML ='';

        produtos.forEach(produto => {

            const li = document.createElement('li');

            li.textContent = produto.Produto;

            li.addEventListener('click', () => exibirDetalhesProduto(produto));

            listaProdutos.appendChild(li);

        });

    }

    function exibirDetalhesProduto(produto) {
        
        detalhesProduto.innerHTML = `
            <img src="imagemProduto/${produto.Produto}.jpg" alt="${produto.Produto}">
            <h2>${produto.Produto}</h2>
            <p>Total de Vendas: ${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(produto.Total)}</p>
            `;

    }

    function exibirMiniaturasProdutos(produtos) {
        
        detalhesProduto.innerHTML = '<div class="miniaturas"></div>';

        const miniaturasDiv = detalhesProduto.querySelector('.miniaturas');

        produtos.forEach(produto => {
            
            const img = document.createElement('img');

            img.src = `imagemProduto/${produto.Produto}.jpg`;

            img.alt = produto.Produto;

            img.addEventListener('click', () => exibirDetalhesProduto(produto));

            miniaturasDiv.appendChild(img);

        });

    }

    function criarListaVendedores() {
        
        const vendedoresSet = new Set(dadosTabela.map(linha => linha.Vendedor));

        vendedorersUnicos = Array.from(vendedoresSet);

        vendedorersUnicos.forEach(vendedor => {

            const option = document.createElement('option');

            option.value = vendedor;

            option.textContent = vendedor;

            filtroVendedor.appendChild(option);

        })

    }

    function calcularTotalVendas(produtos) {

        const total = produtos.reduce((sum, produto) => 
            
            sum + (produto.Total || 0),

        0);

        totalVendas.textContent = `Total de Vendas: ${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(total)}`;
        
    }

    filtroProduto.addEventListener('input', filtrarListaProdutos);

    function filtrarListaProdutos() {

        const filtro = filtroProduto.value.toLowerCase();

        const filtroVend = filtroVendedor.value;

        const produtosFiltrados = dadosTabela.filter(linha => {

            const produtoMatch = linha.Produto.toLowerCase().includes(filtro);

            const vendedoresMatch = filtroVend === "" || linha.Vendedor === filtroVend;

            return produtoMatch && vendedoresMatch;

        });
        
        const produtosMap = new Map();

        produtosFiltrados.forEach(linha => {

            if (!produtosMap.has(linha.Produto)) {
                
                produtosMap.set(linha.Produto, {

                    ...linha,
                    Total: 0


                });

                produtosMap.get(linha.Produto).Total += linha.Total;

            }

        });

        const produtosUnicosFiltrados = Array.from(produtosMap.values());

        preencherListaProdutos(produtosUnicosFiltrados);

        exibirMiniaturasProdutos(produtosUnicosFiltrados);

        calcularTotalVendas(produtosFiltrados);

    }

    mostrarTodosBtns.addEventListener('click', () => {

        preencherListaProdutos(produtosUnicos);

        exibirMiniaturasProdutos(produtosUnicos);

        calcularTotalVendas(dadosTabela);

    })

    carrgarArquivo();

})