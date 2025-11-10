document.addEventListener('DOMContentLoaded', function () {
   
    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {header: 1 });

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            var seletorProduto = document.getElementById('seletorProduto');

            dadosJson.forEach(linha => {
                
                var opcao = document.createElement('option');

                opcao.value = linha['Produto'];
                opcao.textContent = linha['Produto'];

                seletorProduto.appendChild(opcao);

            });

            seletorProduto.addEventListener('change', function () {
                
                var produtoSelecionado = this.value;

                var dadosProduto = dadosJson.find(item => item['Produto'] === produtoSelecionado);

                if(dadosProduto){

                    atualizarGrafico(dadosProduto);

                }

            });

            if(dadosJson.length > 0){
                //Verifica se oarray 'dadosJson' contém algum elemento, garantido que existam
                    //dados para serem processados.

                seletorProduto.value = dadosJson[0]['Produto'];
                //Define o valor do <select> para o primeiro produto no array 'dodosJson'. Isso
                    //configura o dropdown para mostrar o primeiro elemento como selecionado ao
                    //carregar a página.

                atualizarGrafico(dadosJson[0])

            }
        })
    .catch(error => console.error('Erro ao carregar o arquivo: ', error))

});

function atualizarGrafico(dadosProduto) {

    var meta = 100;

    var vendas = dadosProduto['Vendas'];

    var percentual = (vendas / meta) * 100;

    var imagemPreenchimento = document.getElementById('imagemPreechimento');

    var percentualDiv = document.getElementById('percentual');

    var descricaoProduto = document.getElementById('descricaoProduto');

    imagemPreenchimento.style.clipPath = `inset(${100 - percentual}% 0 0 0)`;

    percentualDiv.textContent = `${percentual.toFixed(2)}%`;

    descricaoProduto.textContent = `Produto: ${dadosProduto['Produto']} - Total de Vendas ${vendas}`;
    
}