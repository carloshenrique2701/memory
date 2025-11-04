document.addEventListener('DOMContentLoaded', function () {
   
    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            atualizarGrafico(dadosJson);

        })
    .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

});

function atualizarGrafico(dados) {
    
    var contextoAreas = document.getElementById('graficoAreas').getContext('2d');

    var produtos = dados.map(item => item['Produto']);
    var metas = dados.map(item => item['Meta']);
    var vendas = dados.map(item => item['Vendas']);

    if(window.meuGraficoAreas){

        meuGraficoAreas.destroy();//Evita sobreposicao

    }

    //Contructor da classe externa Chart(cria o gráfico)
    window.meuGraficoAreas = new Chart(contextoAreas, {

        type: 'line',

        data: {

            labels: produtos,

            datasets: [

                {

                    label: 'Vendas',

                    data: vendas,

                    backgroundColor: 'rgba(54, 162, 235, 0.5)',

                    borderColor: 'rgba(54, 162, 235, 1)',

                    borderWidth: 2,

                    fill: true,

                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',

                    pointBorderColor: '#fff',

                    pontBorderWidth: 2,

                    pointRadius: 5,

                    pointHoverRadius: 7,
                    
                    datalabels: {//Configura o plugin: 'chartjs-plugin-datalabels'

                        display: true,

                        align: 'top',

                        backgroundColor: '#333',

                        borderRadius: 3,

                        color: 'white',

                        font: {

                            size: 10,
                            weight: 'bold'

                        },

                        formatter: function (value) {
                            
                            return value;

                        }

                    }

                },

                {

                    label: 'Meta',

                    data: metas,

                    backgroundColor: 'rgba(255, 99, 132, 0.2)',

                    borderColor: 'rgba(255, 99, 132, 1)',

                    borderWidth: 2,

                    borderDash: [5, 5],//Configura a linha para que seja tracejada (5px, 5px)

                    fill: true,

                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',

                    pointBorderColor: '#fff',

                    pontBorderWidth: 2,

                    pointRadius: 5,

                    pointHoverRadius: 7,

                    dataLabels: {//Configura o plugin: 'chartjs-plugin-datalabels'

                        display: false
                        //Destiva a exibição de rótulo de dados, o que pode ser útil se 
                            //quisermos manter o gráfico visualmente mais limpo ou se os
                            //rótulos não adicionarem informações ecenciais. 

                    }

                }

            ]

        },

        options: {//configurações globais(comportamento, aparência)

            plugins: {//configurações de plugins específicos usados no gráfico

                title: {

                    display: true,

                    text: 'Vendas VS Meta por Produto',

                    font: {

                        size: 20,

                        family: 'Roboto',

                        weight: 'bold',

                        color: '#333'

                    },

                    padding: {

                        top: 10,

                        bottom: 30

                    }

                },

                legend: {

                    display: true, 

                    position: 'top',

                    labels:{

                        font: {

                            size: 14,
    
                            family: 'Roboto',
                        
                        },

                        padding: 20

                    }

                },

                tooltip: {

                    backgroundColor: 'rgba(0, 0, 0, 0.7)',

                    padding: 10,

                    titleFont:{

                        size: 16,

                        family: 'Roboto',

                        weight: 'bold'

                    },

                    bodyFont: {

                        size: 14,

                        family: 'Roboto'

                    },

                    callBacks: {//Contém funções de retorno de chamada;
                        //Permite personalizar o conteúdo dos tooltips

                        label: function (context) {
                            //Define como o rótulo de cada ponto de dados é gerado e exibido
                                //dentro do tooltip
                            
                            var label = context.dataset.label || '';
                            //Recebe o rótulod do conjunto de dados atul ou uma string vazia

                            if(label) label += ': ';
                            //Se o ótulo estiver presente, adiciona ': ' para separar o rótulo
                                //do valor no tooltip

                            label += context.raw;
                            //Adiciona o valor bruto (não formatado) do ponto de dados ao rótulo
                                //'context.raw' refere-se ao valor exado do ponto de dados que o 
                                //usuário está visualizando

                            return label;

                        }

                    }

                }

            },

            scales:{//Configurações de escalas do gráfico
                //Especificamente, comos os eixos são configurados e apresentados

                y:{

                    beginAtZero: true,

                    title: {

                        display: true,

                        text: 'Quantidade de Vendas',

                        font: {

                            size: 14,

                            family: 'Roboto',
                            
                            weight: 'bold'

                        }

                    },

                    grid: {//Configurações de grade

                        color: 'rgba(0, 0, 0, 0.1)',

                        borderDash: [5, 5]//Configura a linha para que seja tracejada (5px, 5px)

                    }

                },

                x: {

                    title: {

                        display: true,

                        text: 'Produto',

                        font: {

                            size: 14,

                            family: 'Roboto',
                            
                            weight: 'bold'

                        }

                    },

                    grid: {

                        color: 'rgba(0, 0, 0, 0.1)',

                        borderDash: [5, 5]//Configura a linha para que seja tracejada (5px, 5px)

                    }

                }

            }

        },

        plugins: [ChartDataLabels]
        //Especifica os plugins a serem usados no gráfico. Aqui, 'ChartDataLabels' é um plugin
            //Chart.js que permite mostrar rótulos de dados nos gráficos, proporcionando 
            //informações adicionais diretamente nos pontos de dados ou barras do gráfico
        //Isso é útil para fornecer um contexto instantâneo e melhorar a legibilidade do gráfico, 
            // mostrando valores numéricos ou descrições diretamente nos elementos visuais

    })

}