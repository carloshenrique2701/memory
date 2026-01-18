document.addEventListener('DOMContentLoaded', function () {
    
    const excel = 'VendasComparacao.xlsx';

    const ctx = document.getElementById('grafico-vendas').getContext('2d');

    let chart = null;

    function carregarExcel(arquivo) {
        
        fetch(arquivo)
            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const ws = wb.Sheets['Vendas'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, {header: 1});

                processarDados(dadosJson);

            })

            .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    function processarDados(dados) {

        const produtos = dados.slice(1).map(linha => linha[0]);

        const vendasAtual = dados.slice(1).map(linha => linha[1]);

        const vendasAnterior = dados.slice(1).map(linha => linha[2]);

        const datasets = {

            labels: produtos,

            datasets: [{

                label: 'Vendas Atual',

                data: vendasAtual,

                backgroundColor: 'rgba(169, 164, 12, 0.52)',

                borderColer: 'rgb(112, 198, 255)',

                borderWidth: 1,

            }]

        }

        chart = new Chart(ctx, {

            type: 'bar',

            data: datasets,

            options: {

                responsive: true,

                scales: {

                    x: {

                        beginAtZero: true

                    },

                    y: {

                        beginAtZero: true

                    }
                    
                },

                plugins: {

                    tooltip: {

                        callBacks: {

                            label: function (context) {
                                
                                const indice = context.dataIndex;

                                const vendasAtual = vendasAtual[indice];

                                const vendasAnterior = vendasAnterior[indice];

                                const diferenca = vendasAtual - vendasAnterior;

                                const porcentagem = ((diferenca/vendasAnterior) * 100).toFixed(2);

                                return [

                                    `Vendas Atual: ${vendasAtual.toLocaleString('pt-BR')}`,

                                    `Vendas Anterior: ${vendasAnterior.toLocaleString('pt-BR')}`,

                                    `Diferença: ${diferenca > 0 ? '+' : ''}${diferenca.toLocaleString('pt-BR')}`,

                                    `Porcentagem: ${porcentagem}%`

                                ];

                            }

                        }

                    }

                }

            }

        })
        
    }

    carregarExcel(excel)

})