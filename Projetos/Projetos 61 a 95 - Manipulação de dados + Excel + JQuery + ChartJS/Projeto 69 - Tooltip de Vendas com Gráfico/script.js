document.addEventListener('DOMContentLoaded', function () {
    
    const tabela = document.getElementById('tabela-produtos').getElementsByTagName('tbody')[0];

    const tooltip = document.getElementById('tooltip');

    let chart = null;

    let tempoEsconderTooltip;

    const excel = 'ProdutosVendas.xlsx';

    function carregarArquivo(arquivo) {
        
        fetch(arquivo)

            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const ws = wb.Sheets['Vendas'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, { header: 1 });

                processarDados(dadosJson);

            })

            .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    function processarDados(dados) {

        dados.slice(1).forEach(linha => {
            
            const produto = linha[0];
            const totalVendas = linha[1];

            //Extrai as colunas de index 2 a 8 no excel(periodo em meses)
            const vendasMensais = linha.slice(2, 8);

            const tr = document.createElement('tr');

            tr.setAttribute('data-produto', produto);
            tr.setAttribute('data-vendas-mensais', JSON.stringify(vendasMensais));

            tr.innerHTML = `
                <td>${produto}</td>
                <td>${formatarNumero(totalVendas)}</td>
            `;

            tr.addEventListener('mouseover', function (evento) {
                
                clearTimeout(tempoEsconderTooltip);

                exibirTooltip(evento, produto, vendasMensais);

            });

            tr.addEventListener('mouseout',function () {
                
                tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

            });

            tabela.appendChild(tr);

        });
        
    }

    function exibirTooltip(evento, nomeProduto, vendasMensais) {
        
        tooltip.style.display = 'block';

        tooltip.style.left = evento.pageX + 'px';//Posição vertical
        tooltip.style.top = evento.pageY + 'px';//Posição hoizontal

        if(chart){
            //Litralmente 'destroi' qualquer gráfico que tenha armazenado para colocar um novo
            chart.destroy();

        }

        //Obtém o contexto de 2d do canvas
        const ctx = document.getElementById('grafico-vendas').getContext('2d');

        //Cria um novo gráfico com a biblioteca Chart
        chart = new Chart(ctx, {

            //Define o tipo de gráfico
            type: 'line',

            //Define os dados e configurações do gráfico
            data: {

                //Define os rótulos do eixo X
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],

                //Define os conjuntos de dados a serem plotados
                datasets: [{

                    label: `Vendas Mensais de ${nomeProduto}`,//Define o rótulo do conjunto de dados
                    data: vendasMensais, // Define os dados numériocosa serem plotados
                    borderColor: '#ffd700',//Define estilo
                    backgroundColor: 'rgba(255,215, 0, 0.2)',//Define estilo
                    borderWidth: 2,//Define estilo
                    fill: true//Define estilo

                }]

            },

            //Define as opções do gráfico
            options: {

                //Faz o gráfico responsivo ao tamanho do elemento pai
                responsive: true,

                //Desativa a manutenção do aspecto original para que o 
                    //gráfico se ajuste aos containers
                maintaineAspectRatio: false,

                //Define configurações para os eixos dos gráfico
                scale: {

                    x: {

                        beginATZero: true //Define que o eixo X comece em zero

                    },

                    y: {

                        beginATZero: true //Define que o eixo Y comece em zero

                    }

                }

            }

        });

    }


    function esconderTooltip() {
        
        tooltip.style.display = 'none';

    }


    function formatarNumero(number) {
        
        return number.toLocaleString('pt-BR');

    }


    tooltip.addEventListener('mouseover', function () {
        
        clearTimeout(tempoEsconderTooltip);

    });

    tooltip.addEventListener('mouseout', function () {
        

        tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

    });

    carregarArquivo(excel);

});