document.addEventListener('DOMContentLoaded', function () {
   
    const ctxGraficoH = document.getElementById('graficoH').getContext('2d');

    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {header: 1});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            carregarGráfico(dadosJson);

        })
        .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

    function carregarGráfico(dados) {
        
        const produtos = dados.map(item => item['Produto']);
        const vendas = dados.map(item => item['Vendas']);
        const metas = dados.map(item => item['Meta']);

        const dadosAtingidos = [];
        const dadosExcedentes = [];
        const coresBarras = [];
        const coresHovers = [];

        vendas.forEach((venda, index) => {

            const meta = metas[index];

            if (venda >= meta) {

                dadosAtingidos.push(meta);
                dadosExcedentes.push(0);
                coresBarras.push('rgb(53, 255, 2)');
                coresHovers.push('rgb(45, 210, 4)');
                
            } else {

                dadosAtingidos.push(venda);
                dadosExcedentes.push(meta - venda);
                coresBarras.push('rgba(255, 255, 2, 1)');
                coresHovers.push('rgb(216, 216, 4)');
                
            }
            
        });
;
        if (window.meuGrafico ) window.meuGrafico.destroy();

        window.meuGrafico = new Chart(ctxGraficoH, {

            type: 'bar',

            data: {

                labels: produtos,

                datasets: [
                    {

                    label: 'Vendas Realizadas',

                    data:  dadosAtingidos,

                    backgroundColor: coresBarras,
    
                    hoverBackgroundColor: coresHovers,
    
                    borderWidth: 1
    

                    },

                    {

                        label: 'Meta Restante',

                        data: dadosExcedentes,

                        backgroundColor: 'rgba(128, 128, 128, 0.3)',

                        hoverBackgroundColor: 'rgba(128, 128, 128, 0.5)',

                        borderWidth: 1

                    }
                ]
            },

            options: {

                indexAxis: 'y',

                responsive: true,

                plugins: {

                    tooltip: {

                        borderWidth: 1,

                        padding: 10,

                        cornerRadius: 6,

                        callbacks:{

                            label: function (context) {
                                
                                const pruductIndex = context.dataIndex;

                                if(context.datasetIndex === 0){

                                    const meta = metas[pruductIndex];
                                    const venda = vendas[pruductIndex];

                                    if(venda >= meta){

                                        return `Meta atingida: ${venda} (Meta: ${meta})`;

                                    } else {

                                        return `Vendas: ${venda} (Faltam ${meta - venda} para atingir a meta)`;

                                    }

                                } else {

                                    return `Meta: ${metas[pruductIndex]}`

                                }


                            }

                        }

                    },

                    datalabels:{

                        color: '#000',

                        font: {

                            weight: 'bold',

                            size: 12

                        },

                        formatter: function(value, context) {
                            // Mostrar apenas no dataset das vendas
                            if (context.datasetIndex === 0 && value > 0) {

                                return `${vendas[context.dataIndex]}`;

                            } else if(vendas[context.dataIndex] <= metas[context.dataIndex]){

                                return `${metas[context.dataIndex] - vendas[context.dataIndex]}`;

                            }
                            return '';
                        },

                        align: 'center',

                        anchor: 'center'

                    }

                },
                
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Valores'
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Produtos'
                        }
                    }
                }

            },

            plugins: [ChartDataLabels]

        });

    }

});