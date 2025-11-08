document.addEventListener('DOMContentLoaded', function () {
    
    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws)

            var corpotabela = document.querySelector('#tabelaVendas tbody');

            corpotabela.innerHTML = '';

            dadosJson.forEach(function (linha) {
                
                var tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${linha['Produto']}</td>
                    <td>${linha['Vendas']}</td>
                `;

                corpotabela.appendChild(tr);

            })

            atualizarGraficoPizza(dadosJson);

        })
    .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

});

function atualizarGraficoPizza(dados) {
    
    var contextoPizza = document.getElementById('graficoPizza').getContext('2d');

    var produtos = dados.map(item => item['Produto']);
    var vendas = dados.map(item => item['Vendas']);

    var totalVendas = vendas.reduce((a, b) => a + b, 0);
    /*
    O método 'reduce' aplica uma função que é chamada para cada elemento do array para 
        reduzi-lo a um único valor, nesse caso, a soma de todas as vendas. '0' é o valor 
        inicial do acumulador.
    */

    var cores = [
        'rgba(255, 99, 192, 0.8)',        
        'rgba(54, 162, 235, 0.8)',        
        'rgba(255, 206, 86, 0.8)',        
        'rgba(75, 192, 192, 0.8)',        
        'rgba(153, 102, 255, 0.8)'        
    ];

    var bordas = [
        'rgba(255, 255, 255, 1)',       
        'rgba(255, 255, 255, 1)',       
        'rgba(255, 255, 255, 1)',       
        'rgba(255, 255, 255, 1)',       
        'rgba(255, 255, 255, 1)',       
    ];

    if(window.meuGraficoPizza) window.meuGraficoPizza.destroy();

    window.meuGraficoPizza = new Chart(contextoPizza, {

        type: 'pie',

        data: {

            labels: produtos,

            datasets: [{

                data: vendas,

                backgroundColor: cores,

                borderColor: bordas,

                bordaWidth: 2,

                hoverOffset: 10 //Destaca a fatia de pizza em 10px

            }]

        },

        options: {

            plugins: {

                title: {

                    display: true,

                    text: 'Proporção de Vendas por Produto',

                    font: {

                        size: 18

                    },

                    padding: {

                        top: 10,

                        bottom: 30

                    }

                },

                legend: {

                    display: true,

                    position: 'right',

                    labels: {

                        font: {

                            size: 14

                        },

                        padding: 20

                    }

                },

                datalabels: {

                    formatter: (value, context) => {

                        let percentual = ((value/totalVendas) * 100).toFixed(2) + '%';

                        let label = context.chart.data.labels[context.dataIndex];
                        //Acessa as etiquetas definidas para o gráfico.
                        //Obtem a etiqueta correspondente a cada valor de dado, o que ajuda 
                            // a identificar qual produto ou categoria o dado representa,

                        return label + '\n' + percentual;

                    },

                    color: '#fff',

                    font: {

                        weight: 'bold',

                        size: 14

                    }

                }

            }

        },

        plugins: [ChartDataLabels]

    })

}