document.addEventListener('DOMContentLoaded', function() {
    
    const tabela = document.getElementById('tabela-estados').getElementsByTagName('tbody')[0];

    const tooltip = document.getElementById('tooltip');

    let tempoEsconderTooltip;

    function carregarArquivoExcel() {

        const arquivo = 'Estados.xlsx';

        fetch(arquivo)

            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const ws = wb.Sheets['Dados'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, {header: 1});

                processarDados(dadosJson);

            })

            .catch(error => console.error('Erro ao carregar o arquivo: ',error));

    }

    function processarDados(dados) {
        
        const estados = {};

        dados.slice(1).forEach(linha => {
            
            const estado = linha[0];
            const cidade = linha[1];
            const totalHabitantes = linha[2];

            //Verifica se o objeto 'estados' já tem uma chave correspondente ao nome do estado.
            if (estados[estado]) {
                
                //Incrementa o total de habitantes do estado com o número de habitanetes da cidade atual.
                estados[estado].totalHabitantes += totalHabitantes;

                //Adiciona a cidade atual e seu total de habitantes à lista de cidades desse estado.
                estados[estado].cidades.push({ cidade, totalHabitantes });

            } else{

                //Se o estado não estpa registrado no objeto 'estados', inicializa-o com os dados da linha atual.
                estados[estado] = {

                    //Define o valor de habitantes inicial para o estado com valor da cidade atual.
                    totalHabitantes,

                    //Inicializa a lista de cidades com a cidade e seu total de habitantes.
                    cidades: [{cidade, totalHabitantes}]

                }

            }

        });

        //Itera sobre cada 'estado' no objeto 'estados', onde 'estado' é a chabe do objeto.
        for (const estado in estados) {
            
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${estado}</td>
                <td>${formatarNumero(estados[estado].totalHabitantes)}</td>
            `;

            tr.addEventListener('mousemove', function(event) {
                
                exibirTooltip(event, estado, estados[estado].cidades);

            });

            tr.addEventListener('mouseout', function() {
                
                tempoEsconderTooltip = setTimeout(esconderTooltip, 10000);

            });

            tabela.appendChild(tr);

        }

    }

    function formatarNumero(numero) {
        
        return numero.toLocaleString('pt-BR');

    }

    function exibirTooltip(evento, estado, cidades) {

        let cidadeHtml = '';

        cidades.forEach(cidade => {

            cidadeHtml += `<p><strong>Cidade: </strong>${cidade.cidade} - <strong>Total de Habitantes: </strong>${formatarNumero(cidade.totalHabitantes)}</p>`

        });

        tooltip.innerHTML= `
            <p><strong>Estado: </strong>${estado}</p>
            ${cidadeHtml}
            <button id="botao-exportar">Exportar para Excel</button>
        `;

        tooltip.style.display = 'block';

        tooltip.style.left = evento.pageX + 'px';
        tooltip.style.top = evento.pageY + 'px';
        
        document.getElementById('botao-exportar').addEventListener('click', function () {
            
            exportarParaExcel(estado, cidades);

        })

    }

    function esconderTooltip() {
        
        tooltip.style.display = 'none';

    }

    tooltip.addEventListener('mousemove', function () {
        
        clearTimeout(tempoEsconderTooltip);

    })

    tooltip.addEventListener('mouseout', function(){

        tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

    })

    function exportarParaExcel(estado, cidades) {

        const dadosParaExportar = [

            ['Estado', 'Cidade', 'Total de Habitantes'],

            ...cidades.map(cidade => [estado, cidade.cidade, cidade.totalHabitantes])

        ];
        
        const planilha = XLSX.utils.aoa_to_sheet(dadosParaExportar);

        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, planilha, 'Dados');

        XLSX.writeFile(wb, `${estado}_dados.xlsx`);

    }

    carregarArquivoExcel()

})