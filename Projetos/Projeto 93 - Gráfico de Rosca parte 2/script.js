document.addEventListener('DOMContentLoaded', function () {
    
    const ctxGrafico = document.getElementById('graficoRosca').getContext('2d');
    
    const legenda = document.getElementById('legenda');
    
    const totalTitulo = document.getElementById('total');

    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {header: 1});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            criarLegenda(dadosJson);
            gerarGrafico(dadosJson);

        })
    .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

    function criarLegenda(dados) {
        
        const ul = document.createElement('ul');

        dados.forEach(item => {

            const div = document.createElement('div');

            div.className = item['Produto'].charAt(item['Produto'].length -1).toLowerCase();

            const li = document.createElement('li');

            li.textContent = item['Produto'];

            li.appendChild(div)
            ul.appendChild(li)

        });

        legenda.appendChild(ul);

    }

    function gerarGrafico(dados) {

        let cores = [

            '#c62929',
            '#c67f29',
            '#94c629',
            '#29c633',
            '#29b9c6'

        ];

        let hoverCores = [
            '#e04e4e', // Vermelho mais claro
            '#e09a4e', // Laranja mais claro
            '#b3e04e', // Verde limão mais claro
            '#4ee059', // Verde mais claro
            '#4ed9e0'  // Azul mais claro
        ];

        const produtos = dados.map(item => item['Produto'])
        const vendas = dados.map(item => item['Vendas'])

        let totalVendidos = 0;

        dados.forEach(item => {

            totalVendidos += item['Vendas'];

        })

        totalTitulo.innerHTML += ' - Total de Vendas: ' + totalVendidos;

        const porcentagens = vendas.map(venda => {

            return Math.round((venda / totalVendidos) * 100)

        })

        if(window.grafico) window.grafico.destroy();

        window.grafico = new Chart(ctxGrafico, {

            type: 'doughnut',

            data: {

                labels: produtos,

                datasets: [{

                    data: dados.map(item => item['Vendas']),

                    backgroundColor: cores,

                    hoverBackgroundColor: hoverCores,

                    borderWidth: 1

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: 'nearest'

                    },

                    tooltip: {

                        borderWidth: 1,

                        padding: 10,

                        cornerRadius: 6,

                        callbacks: {

                            label: function (context) {

                                const label = context.label || '';
                                const value = context.raw || 0;

                                return `${label}: ${value} vendas`;

                            },

                            afterBody: function (context) {

                                const dataset = context[0].dataset;
                                const total = dataset.data.reduce((a, b) => a + b, 0);
                                const currentValue = context[0].raw;
                                const percentual = ((currentValue/total) * 100).toFixed(1);

                                return `Procentagem: ${percentual}% de ${total} vendas`; 
                                
                            }

                        }

                    },

                    datalabels: {

                        color: '#fff',

                        font: {

                            weight: 'bold',

                            size: 12

                        },

                        formatter: (value, context) => {

                            const i = context.dataIndex;
                            
                            return `${produtos[i]}\n${porcentagens[i]}%`;

                        },

                        textAlign: 'center', 
                        textStrokeColor: 'rgba(0, 0, 0, 0.5)',
                        textStrokeWidth: 2

                    }

                },

                cutout: '50%'

            },

            plugins: [ChartDataLabels]

        });
        
    }

});