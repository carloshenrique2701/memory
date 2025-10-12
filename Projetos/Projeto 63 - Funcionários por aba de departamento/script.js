document.getElementById('DOMContentLoaded', carregarDadosExcel());

let dadosDepartamentos = {};

function carregarDadosExcel() {
    
    fetch('funcionarios.xlsx')

        .then(response => response.arrayBuffer())

        .then(data => {

            const wb = XLSX.read(data, {type: 'array'});

            const primeiraAba = wb.SheetNames[0];

            const planilha = wb.Sheets[primeiraAba];

            const dadosJson = XLSX.utils.sheet_to_json(planilha, {header: 1})

            processarDados(dadosJson);

        })

        .catch(error => console.error('Arquivo não encontrado: ', error));

}

function processarDados(dados) {
    
    /*
        Utiliza a desestruturação para separar os cabeçalhos da primeira linha
        das demais;
        'cabecalhos' contém a primeira linha do array dados, que são os titulos 
        das colunas do excel;
        '...linhas' é um uso do separador "spread", que coleta o restante dos 
        itens do array 'dados'(todas as linhas exceto a preimeira);
        Isso é útil para manipular os dados sem os cabeçalhos.
    */
    const[cabecalhos, ...linhas] = dados;

    dadosDepartamentos = {};

    linhas.forEach(linha =>{

        /*
            Dentro de cada interação, extrai o departamento, cargo, nome e salario
            de cada linha usando desestruturação. Cada linha é um array e essas
            variáveis correspondem a cada coluna de cada linha do excel;
        */
        const [departamento, cargo, nome, salario] = linha;

        /*
            Verifica se o departamento especificado já existe como chave no objeto 
            'dadosDepartamento'. Se não existir, inicializa um array vazio para que 
            possamos adicionar funcionários a esse departamento.
        */
        if(!dadosDepartamentos[departamento]){

            dadosDepartamentos[departamento] = [];

        }
        
        dadosDepartamentos[departamento].push({ Cargo: cargo, Nome: nome, Salário: formatarSalario(salario) });
        
    });

    criarAbas(dadosDepartamentos);

    document.getElementById('indicador-carregamento').style.display = 'none';

    document.getElementById('conteudo').style.display = 'block';

}

function formatarSalario(salario) {
    
    return parseFloat(salario)
    
        .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

}

function criarAbas(departamentos) {
    
    const tabsContainer = document.getElementById('container-abas');

    tabsContainer.innerHTML= `
        <ul class="nav nav-tabs" id="departamentosAbas" role="tablist"></ul>
        <div class="tab-content" id="departamentosConteudo"></div> 
    `;

    const navTabs = document.getElementById('departamentosAbas');

    const tabContent = document.getElementById('departamentosConteudo');

    let isActive = true;

    // Itera sobre cada entrada no objeto 'departamentos'. 
    // Cada entrada é um par [departamento, funcionarios].
    for(const[departamento, funcionarios] of Object.entries(departamentos)){

        // A instrução 'for...of' junto com 'Object.entries(departamentos)' é 
                // usada para iterar sobre cada par chave-valor no 
                // objeto 'departamentos'.
        // 'Object.entries' converte cada par chave-valor do objeto 
                // em um array [chave, valor], onde 'departamento' é a 
                // chave e 'funcionarios' é o valor associado.
        // Isso permite manipular facilmente tanto a chave (nome do 
                // departamento) quanto o valor (dados dos funcionários) 
                // dentro do loop.

        // Cria um identificador único para cada aba, substituindo 
        // espaços por hifens e convertendo tudo para letras minúsculas.
        const departamentoId = departamento.replace(/\s+/g, '-').toLowerCase();
        // 'departamentoId' é uma constante que armazena um identificador 
                // único gerado para cada departamento.
        // O método 'replace(/\s+/g, '-')' substitui todos os 
                // espaços (expresso pelo regex /\s+/g) por hifens (-).
        // O método 'toLowerCase()' converte todo o texto para letras 
                // minúsculas, garantindo consistência e evitando problemas de 
                // diferenciação entre maiúsculas e minúsculas.

        navTabs.innerHTML += `
            <li class="nav-item">
                <a class="nav-link ${isActive ? 'active' : ''}" id="${departamentoId}-tab" data-toogle="tab" href="#${departamentoId}" role="tab">
                ${departamento}
                </a>
            </li>
        `;

        tabContent.innerHTML += `
            <div class="tab-pane fade ${isActive ? 'show active' : ''}" id="${departamentoId}" role="tabpanel">
            
                <div class="table-responsive">

                    <table class="table table-striped table-bordered mt-3"> 
                    
                        <thead class="thead-dark"> 
                            <tr> 
                        
                                <th onclick="ordenarTabela('${departamentoId}', 0)">Cargo</th>
                                <th onclick="ordenarTabela('${departamentoId}', 1)">Nome</th>
                                <th onclick="ordenarTabela('${departamentoId}', 2)">Salario</th>

                            </tr>
                        </thead>

                        <tbody>

                            ${funcionarios.map(funcionario =>`
                                 <tr>
                                    
                                    <td>${funcionario.Cargo}</td>
                                    <td>${funcionario.Nome}</td>
                                    <td>${funcionario.Salário}</td>

                                </tr>
                                `).join('')}

                        </tbody>

                    </table>

                </div>

            </div>
        `;
                // Este trecho de código adiciona ao 'innerHTML' do 'tabContent' 
                // uma nova 'div' com a classe 'tab-pane' e opcionalmente 
                // as classes 'fade', 'show', e 'active'.
        // A classe 'fade' é usada para adicionar efeitos de transição 
                // suave ao alternar entre abas. 'show' e 'active' são 
                // usadas para tornar o painel visível e ativo.
        // O uso de `${isActive ? 'show active' : ''}` permite que 
                // apenas o primeiro painel (associado à primeira aba) 
                // seja exibido e ativo ao carregar a página.
        // 'id="${departamentoId}"' associa este painel ao ID único 
                // da aba, permitindo que a navegação entre abas e 
                // painéis seja sincronizada.
        // Dentro da 'div' principal, uma 'div' com a classe 'table-responsive' 
                // encapsula uma tabela. Esta classe do Bootstrap 
                // torna a tabela responsiva,
                // permitindo que ela se ajuste adequadamente 
                // em diferentes tamanhos de tela.
        // A tabela contém cabeçalhos ('th') que, ao serem clicados, 
                // chamam a função 'ordenarTabela', passando o ID do 
                // departamento e o índice da coluna como argumentos.
        // Isso permite que os dados na tabela sejam ordenados 
                // por cargo, nome ou salário.
        // A tabela é preenchida dinamicamente com os dados dos 
                // funcionários. O uso de 'map' seguido de 'join' transforma 
                // cada funcionário em uma linha da tabela ('tr'),
                // onde cada 'td' contém dados específicos de cada 
                // funcionário (cargo, nome, salário).

        isActive = false;

    }

    navTabs.querySelectorAll('.nav-link').forEach(tab =>{

        tab.addEventListener('click', (event) =>{

            event.preventDefault();
            // 'preventDefault' é chamado no objeto evento para prevenir o 
                    // comportamento padrão do navegador para esse evento.
            // Para eventos de clique em links (<a>), o comportamento padrão é 
                    // navegar para o URL especificado no atributo 'href'. 
                    // Aqui, evitamos que a página salte.

            const targetId = tab.getAttribute('href').substring(1);
             // 'getAttribute' obtém o valor do atributo 'href' do 'tab', que 
                    // normalmente seria algo como "#idDoPainel".
            // 'substring(1)' é usado para remover o primeiro 
                    // caractere (o símbolo '#') do valor do 'href', 
                    // resultando no ID puro do painel de conteúdo que a aba controla.

            navTabs.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

            tabContent.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));

            tab.classList.add('active');

            document.getElementById(targetId).classList.add('show', 'active');

        });

    });

    document.getElementById('campo-pesquisa').addEventListener('input', filtrarFuncionarios);

    document.getElementById('exportar-selecionado').addEventListener('click', exportarAbaSelecionada);

    document.getElementById('exportar-todos').addEventListener('click', exportarTodasAbas);

}

function ordenarTabela(departamentoId, coluna) {
    
    const tabela = document.querySelector(`#${departamentoId} table tbody`);
    
    // Converte a coleção de linhas ('rows') do 'tbody' em 
    // um array para facilitar a ordenação.
    const linhas = Array.from(tabela.rows);

    // Ordena o array de linhas com base nos valores 
    // da coluna especificada.
    linhas.sort((a,b) => {

        // 'a' e 'b' são duas linhas da tabela sendo comparadas.
        // 'cells' é uma coleção das células de uma linha. 
        // 'coluna' é o índice da célula na linha.
        
        const valorA = a.cells[coluna].innerText;
        const valorB = b.cells[coluna].innerText;

        // Se a coluna for a de índice 2 (coluna de Salário), 
        // converte os valores de string para número 
        // para comparação numérica.
        if(coluna === 2) {
            // Remove o símbolo de moeda 'R$', substitui '.' por '', 
            // e ',' por '.' para converter a string em um 
            // número de ponto flutuante.
            // Faz isso para que a comparação de salários seja 
            // numérica e não alfabética.
            return parseFloat(valorA.replace('R$', '').replace('.', '').replace(',', '.')) - parseFloat(valorB.replace('R$', '').replace('.', '').replace(',', '.'));

        }
        // Para outras colunas, faz uma comparação alfabética 
        // usando 'localeCompare', que considera as 
        // regras de ordenação locais.
        return valorA.localeCompare(valorB);

    })

    linhas.forEach(linha => tabela.appendChild(linha));

}

function filtrarFuncionarios(event) {

    const termo = event.target.value.toLowerCase();

    const abas = document.querySelectorAll('.tab-pane');

    abas.forEach(aba => {

        const linhas = aba.querySelectorAll('tbody tr');

        linhas.forEach(linha => {

            const nome = linha.cells[1].innerHTML.toLowerCase();
            
            if ( nome.includes(termo)) {

                linha.style.display = '';

            } else{

                linha.style.display = 'none';

            }

        });

    });
    
}

function exportarAbaSelecionada() {

    const abaAtiva = document.querySelector('.tab-pane.show.active');

    const departamentoId = abaAtiva.id;

    const departamentoNome = document.querySelector(`#${departamentoId}-tab`).innerText;

    const funcionarios = dadosDepartamentos[departamentoNome];

    const ws = XLSX.utils.json_to_sheet(funcionarios);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, departamentoNome);

    XLSX.writeFile(wb, `${departamentoNome}.xlsx`);
    
}

function exportarTodasAbas() {

    const wb = XLSX.utils.book_new();

    // Itera sobre cada entrada no objeto 'dadosDepartamentos'.
    // 'Object.entries' retorna um array de pares [chave, valor] 
    // para cada entrada no objeto.
    for (const [departamento, funcionarios] of Object.entries(dadosDepartamentos)) {
         // 'Object.entries(dadosDepartamentos)' é usado para obter um 
                // array de todos os pares chave-valor do objeto 'dadosDepartamentos'.
        // Cada par consiste em um nome de departamento ('departamento') e 
                // a lista correspondente de funcionários ('funcionarios').
        // O loop 'for...of' itera sobre cada um desses pares.

        const ws = XLSX.utils.json_to_sheet(funcionarios);

        XLSX.utils.book_append_sheet(wb, ws, departamento);

    }

    XLSX.writeFile(wb, 'todos-departamentos.xlsx');
    
}