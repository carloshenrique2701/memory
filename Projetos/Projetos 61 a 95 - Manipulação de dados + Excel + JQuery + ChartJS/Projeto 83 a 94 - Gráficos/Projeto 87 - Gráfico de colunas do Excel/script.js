document.addEventListener('DOMContentLoaded', function () {
   
    fetch('dados.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets[wb.SheetNames[0]];

            const dadosJson = XLSX.utils.sheet_to_json(ws);

            var  corpoTabela = document.getElementById('tabelaVendas');

            dadosJson.forEach(function (linha) {
                
                var tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${linha['Produto']}</td>
                    <td>${linha['Vendas']}</td>
                `;

                corpoTabela.appendChild(tr)

            });
            atualizarGrafico(dadosJson)

        })
    .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

});

function atualizarGrafico(dados) {

    var contexto = document.getElementById('graficoColunas').getContext('2d');

    var produtos = dados.map(item => item['Produto']);
    var vendas = dados.map(item => item['Vendas']);

    var cores = [

        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',

    ]
    var bordas = [

        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',

    ]

    if(window.meuGrafico) window.meuGrafico.destroy();
    /* Por que 'meuGráfico' não foi declarado em lugar algum?

            No navegador, window é o objeto global

            Quando você faz window.meuGrafico, está criando uma propriedade no objeto global

            Isso é equivalente a declarar var meuGrafico no escopo global

        Realmente funciona: 

        Declarando explicitamente no início
        var meuGrafico;
       
        ... depois
        meuGrafico = new Chart(contexto, { ... });

        Diretamente no escopo global
        meuGrafico = new Chart(contexto, { ... }); // sem "var", "let" ou "const"
    */

    window.meuGrafico = new Chart(contexto, {
        
        type: 'bar',

        data: {

            labels: produtos,

            datasets: [{

                label: 'Vendas',

                data: vendas,

                backgroundColor: cores,

                borderColor: bordas,

                borderWidth: 1

            }]

        },

        options: {

            plugins: {

                legend:{

                    display: false

                },

                title:{

                    display: true,

                    text: 'Quantidade de Vendas por Produto'

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    title:{

                        display: true,

                        text: 'Quantidade de Vendas'

                    }

                },

                x: {

                    title: {

                        display: true,

                        text: 'Produtos'

                    }

                }

            }

        }

    });
    
}