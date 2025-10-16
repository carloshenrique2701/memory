document.addEventListener('DOMContentLoaded', function () {
    
    const tabela = document.getElementById('tabela-vendedores').getElementsByTagName('tbody')[0];

    const tooltip = document.getElementById('tooltip');

    let dadosTabela = [];

    function carrgarExcel() {
        
        fetch('Vendedor.xlsx')

            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const ws = wb.Sheets[wb.SheetNames[0]];

                const json = XLSX.utils.sheet_to_json(ws);

                dadosTabela = json;

                preencherTabela(json);

            })

            .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    function preencherTabela(dados) {
        
        tabela.innerHTML = '';

        dados.forEach(linha => {
            
            const novaLinha = tabela.insertRow();

            const celularImagem = novaLinha.insertCell();

            const imagem = document.createElement('img');

            imagem.src = `imagens/${linha.Vendedor}.jpg`;

            imagem.alt = linha.Vendedor;

            imagem.width = 50;
            imagem.height = 50;

            celularImagem.appendChild(imagem);


            const celulaVendedor = novaLinha.insertCell();

            celulaVendedor.textContent = linha.Vendedor;


            const celulaProduto = novaLinha.insertCell();     
            
            celulaProduto.textContent = linha.Produto;


            const totalFormatado = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(linha.Total);

            const celulaTotal = novaLinha.insertCell();

            celulaTotal.textContent = totalFormatado;


            novaLinha.addEventListener('mouseover', () => {

                tooltip.innerHTML = `
                    <img src="imagemProduto/${linha.Produto}.jpg" alt="${linha.Produto}" class="produto-imagem">
                    <div class="produto-nome">${linha.Produto}</div>
                    <div class="total">${totalFormatado}</div>
                `

                tooltip.style.display = 'block';

            });

            novaLinha.addEventListener('mouseover', (event) => {

                tooltip.style.left = `${event.pageX + 10}px`;

                tooltip.style.top = `${event.pageY + 10}px`;

            });

            novaLinha.addEventListener('mouseout', () => {

                tooltip.style.display = 'none';

            });

        });

    }

    function filtrarTabela() {
        
        const filtroVendedor = document.getElementById('filtro-vendedor').value.toLowerCase();

        const filtroProduto = document.getElementById('filtro-produto').value.toLowerCase();

        const filtroPreco = document.getElementById('filtro-preco').value;

        const dadosFiltrados = dadosTabela.filter(linha => {

            const vendedorMatch = linha.Vendedor.toLowerCase().includes(filtroVendedor);

            const produtoMatch = linha.Produto.toLowerCase().includes(filtroProduto);

            const precoMatch = filtroPreco ? Intl.NumberFormat('pt-BR', {styles: 'currency', currency: 'BRL'}).format(linha.Total).includes(filtroPreco) : true;

            return vendedorMatch && produtoMatch && precoMatch;

        });

        preencherTabela(dadosFiltrados);

    }

    document.getElementById('filtro-vendedor').addEventListener('input', filtrarTabela);
    document.getElementById('filtro-produto').addEventListener('input', filtrarTabela);
    document.getElementById('filtro-preco').addEventListener('input', filtrarTabela);

    carrgarExcel();

});