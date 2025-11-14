document.addEventListener('DOMContentLoaded', function () {
    
    const seletorProduto = document.getElementById('produto');

    const infoProduto = document.getElementById('produtoInfo');

    const infoMeta = document.getElementById('metaInfo');
    
    const infoVenda = document.getElementById('vendaInfo');

    const contextoGrafico = document.getElementById('graficoKPI').getContext('2d');

    let dados = [];

    let grafico;

    function lerArquivoExcel() {
        
        fetch('dados.xlsx')
            .then(res => res.arrayBuffer())
            .then(data => {

                const wb = XLSX.read(data, {header: 1});

                const ws = wb.Sheets[wb.SheetNames[0]];

                const dadosJson = XLSX.utils.sheet_to_json(ws);

                preencherSeletor(dadosJson)

                dados = dadosJson;

            })
        .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

    }

    function preencherSeletor(dados) {

        dados.forEach(item => {
            
            const option = document.createElement('option');

            option.value = item['Produto'];
            option.textContent = item['Produto'];

            seletorProduto.appendChild(option)

        });

        seletorProduto.addEventListener('change', function () {
            
            const produtoSelecionado = this.value;

            const dadosProduto = dados.find(item => item['Produto'] === produtoSelecionado);
            
            if (dadosProduto) {
                
                criarGrafico(dadosProduto['Produto'], dadosProduto['Vendas'], dadosProduto['Meta']);   

            } else{

                contextoGrafico.clearRect(0, 0, contextoGrafico.canvas.width, contextoGrafico.canvas.height);

            }

        })

    }

    function criarGrafico(produto, venda, meta) {
        
        let data, backgroundColor;

        if(venda > meta){

            data = [meta];
            backgroundColor = ['#4caf50'];

        } else{


            data = [venda, meta - venda];
            backgroundColor = ['#4caf50', '#e0e0e0'];

        }

        if(grafico){

            grafico.destroy();

        }

        grafico = new Chart(contextoGrafico, {

            type: 'doughnut',

            data: {

                labels: ['Vendas', 'Meta'],

                datasets: [{

                    data: data,

                    backgroundColor: backgroundColor,

                    hoverBackgroundColor: ['#45a049', '#d5d5d5'],

                    borderWidth: 1

                }]

            },

            options: {

                responsive: true,

                plugins:{

                    legend: {

                        position: 'nearest'

                    },

                    tooltip: {

                        borderWidth: 1,

                        padding: 10,

                        cornerRadius: 6,

                        callbacks: {

                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                /*
                                                 context.dataset.data

                                    context: É o objeto que contém todas as informações do tooltip

                                    context.dataset: Acessa o dataset específico do gráfico

                                    context.dataset.data: Acessa o array de dados do dataset

         
                                
                                                 Esta é a função callback do reduce:

                                    a (acumulador): Valor que vai acumulando o resultado

                                    b (valor atual): Cada elemento do array sendo processado

                                    => a + b: Soma o acumulador com o valor atual

                                    Funcionamento passo a passo:

                                    // Dados: [30, 70]
                                    // Reduce: (a, b) => a + b

                                    // 1ª iteração: a = 0, b = 30 → retorna 0 + 30 = 30
                                    // 2ª iteração: a = 30, b = 70 → retorna 30 + 70 = 100
                                    // Resultado final: 100

                                                Por que usar 0 como valor inicial?

                                    Evita erros com arrays vazios

                                    Garante que o tipo seja numérico

                                    Mais previsível e seguro

                                */
                                const percentage = Math.round((value / total) * 100);
                                
                                return `${label}: ${value} (${percentage}%)`;
                            },
                            // Adiciona informação de porcentagem
                            afterBody: function(context) {
                                const dataset = context[0].dataset;
                                const total = dataset.data.reduce((a, b) => a + b, 0);
                                const currentValue = context[0].raw;
                                const percentage = ((currentValue / total) * 100).toFixed(1);
                                
                                return `Porcentagem: ${percentage}% do total`;
                            }

                        }

                    }

                },

                cutout: '70%'//define o tamanho do espaço vazio no centro do gráfico.

            }

        });

        infoProduto.textContent = `Produto: ${produto}`;
        infoMeta.textContent = `Meta: ${meta}`;
        infoVenda.textContent = `Venda: ${venda}`;

    }

    lerArquivoExcel();

});