document.addEventListener('DOMContentLoaded', function () {
    
    const tabela = document.getElementById('tabela-dados').getElementsByTagName('tbody')[0];

    const tooltip = document.getElementById('tooltip');

    let tempoEsconderTooltip;

    function carregarExcel() {
        
        const excel = 'Estados.xlsx'

        fetch(excel)
            .then(response => response.arrayBuffer())

            .then(data => {
                console.log('Lendo arquivo...');
                const wb = XLSX.read(data,{ type: 'array'});

                const ws = wb.Sheets['Dados'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, {header: 1});

                processarDados(dadosJson)

            })

            .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    function processarDados(dados) {
        console.log('Processando dados...');
        
        dados.slice(1).forEach(coluna => {

            console.log('Interando sobre cada coluna do arquivo...');
            const estado = coluna[0];
            const cidade = coluna[1];
            const totalHabitantes = coluna[2];

            const tr = document.createElement('tr');

            tr.setAttribute('data-estado', estado);
            tr.setAttribute('data-cidade', cidade);

            tr.innerHTML = `
                <td>${estado}</td>
                <td>${cidade}</td>
                <td>${formatarNumero(totalHabitantes)}</td>
            `;

            console.log('Adicionando leitores de eventos...');

            tr.addEventListener('mouseover', function(event) {
                //Cancela qualquer temporizador
                clearTimeout(tempoEsconderTooltip);

                exibirTooltip(event, estado, cidade);

            });

            tr.addEventListener('mouseout', function () {
                
                tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

            });

            tabela.appendChild(tr);

        });

    }

    function formatarNumero(numero) {
        
        console.log('Formatando dados...');
        return numero.toLocaleString('pt-BR');

    }

    function esconderTooltip() {
        
        tooltip.style.display = 'none';

    }

    function exibirTooltip(evento, estado, cidade) {
        
        tooltip.innerHTML = `
            <p><strong>Estado: </strong>${estado}</p>
            <p><strong>Cidade: </strong>${cidade}</p>
            <button id="filtro-estado">Filtrar por Estado</button>
            <button id="filtro-cidade">Filtrar por Cidade</button>
            <button id="limpar-filtro">Limpar filtro</button>
        `;

        tooltip.style.display = 'block';

        tooltip.style.left = evento.pageX + 'px';
        tooltip.style.top = evento.pageY + 'px';


        document.getElementById('filtro-estado').addEventListener('click', function() {
            filtrarPorEstado(estado);
        });
        document.getElementById('filtro-cidade').addEventListener('click', function() {
            filtrarPorCidade(cidade);
        });

        document.getElementById('limpar-filtro').addEventListener('click', function() {
            limparFiltro();
        });
    }

    function filtrarPorEstado(estado) {
        
        const linhas = tabela.getElementsByTagName('tr');

        for (let linha of linhas) {
            
            // Verifica se o atributo 'data-estado' da linha é diferente 
                    // do estado selecionado.
            if(linha.getAttribute('data-estado') !== estado){

                linha.style.display = 'none';

            } else{

                linha.style.display = '';

            }

        }

        esconderTooltip();

    }

    function filtrarPorCidade(cidade) {
        
        const linhas = tabela.getElementsByTagName('tr');

        for (let linha of linhas) {
            
            // Verifica se o atributo 'data-estado' da linha é diferente 
                    // do estado selecionado.
            if(linha.getAttribute('data-cidade') !== cidade){

                linha.style.display = 'none';

            } else{

                linha.style.display = '';

            }

        }

        esconderTooltip();

    }

    function limparFiltro() {

        const linhas = tabela.getElementsByTagName('tr');

        for (let linha of linhas) {
            
            linha.style.display = '';

        }

        esconderTooltip();
        
    }

    tooltip.addEventListener('mouseover', function() {
        
        clearTimeout(tempoEsconderTooltip);

    });

    tooltip.addEventListener('mouseout', function() {
        
        tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

    })

    carregarExcel();

})