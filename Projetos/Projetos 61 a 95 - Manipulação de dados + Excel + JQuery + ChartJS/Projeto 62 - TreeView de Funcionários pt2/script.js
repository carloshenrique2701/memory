document.addEventListener('DOMContentLoaded', () => {

    const treeView = $('#treeView');

    const tbody = document.getElementById('tabela');

    const excel = 'funcionarios.xlsx';

    function carregarDadosExcel(url) {
        
        fetch(url)

            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const primeiraSheet = wb.Sheets[wb.SheetNames[0]];

                const jsonData = XLSX.utils.sheet_to_json(primeiraSheet, {header: 1});

                gerarTreeView(jsonData)

            })

            .catch(error => console.error('Erro aocarregar o arquivo: ', error))

    }

    function gerarTreeView(data) {
        
        const treeData = [];

        const departamentos = {};

        data.forEach((linha, indice) => {
            
            if (indice > 0) {
                
                const [departamento, cargo, nome, salario] = linha;

                if (!departamentos[departamento]) {
                    
                    departamentos[departamento] = {};

                }

                if (!departamentos[departamento][cargo]) {
                    
                    departamentos[departamento][cargo] = [];

                }

                departamentos[departamento][cargo].push({nome, salario});

            }

        });

        for (const departamento in departamentos) {
            const depNode = {text: departamento, children: []};

            for (const cargo in departamentos[departamento]) {
                const cargoNode = {text: cargo, children: []};

                depNode.children.push(cargoNode);

            }

            treeData.push(depNode);
        }

        treeView.jstree({

            'core': {

                'data': treeData

            }

        });

        treeView.on("select_node.jstree", function (e, data) {
            // treeView: Objeto jQuery que representa o elemento da árvore
            // .on(): Método do jQuery para adicionar um event listener (ouvinte de eventos)
            // "select_node.jstree": Evento customizado do plugin jstree que é disparado quando um nó é selecionado
            // function(e, data): Função callback que será executada quando o evento ocorrer
            // e: Objeto de evento nativo do browser contendo informações sobre o evento
            // data: Objeto específico do jstree contendo dados sobre o nó selecionado e a instância da árvore
        
            const node = data.node;
            // data.node: Propriedade do objeto 'data' que contém informações sobre o nó clicado
            // Isso inclui: text, id, parent, children, estado do nó, etc.
        
            tbody.innerHTML = '';
        
            // Verificar se o nó selecionado é um cargo (tem um pai que é departamento)
            if (node.parent !== '#' && data.instance.get_node(node.parent).parent === '#') {
                // node.parent !== '#': Verifica se o nó atual tem um pai (no jstree, '#' representa a raiz)
                // data.instance: Referência à instância do jstree que gerencia esta árvore específica
                // .get_node(node.parent): Método do jstree que retorna o objeto do nó pai baseado no ID
                // .parent === '#': Verifica se o pai do nó pai é a raiz, indicando que é um departamento
                // Esta condição identifica que: nó atual é cargo -> seu pai é departamento -> seu avô é raiz
        
                const departamento = data.instance.get_node(node.parent).text;
                // data.instance.get_node(node.parent): Acessa o nó pai (departamento) do nó atual (cargo)
                // .text: Propriedade do nó jstree que contém o texto exibido para o usuário
                // Armazena o nome do departamento para usar na construção da tabela
        
                const cargo = node.text;
                // node.text: Acessa diretamente a propriedade text do nó atual (que é o cargo selecionado)
                // Esta é uma forma mais direta pois já estamos no contexto do nó de cargo
        
                // Buscar os funcionários correspondentes no objeto departamentos
                if (departamentos[departamento] && departamentos[departamento][cargo]) {
                    // departamentos[departamento]: Acesso por colchetes ao objeto departamentos
                    // Verifica se existe uma propriedade com o nome do departamento no objeto
                    // departamentos[departamento][cargo]: Acesso aninhado - primeiro ao departamento, depois ao cargo
                    // Esta verificação previne erros caso os dados não existam por algum motivo
        
                    const funcionarios = departamentos[departamento][cargo];
                    // departamentos[departamento][cargo]: Acessa o array de objetos funcionários
                    // Cada elemento do array é um objeto com propriedades {nome, salario}
                    // Esta variável agora contém todos os funcionários do departamento/cargo selecionado
        
                    // Preencher a tabela com cada funcionário encontrado
                    funcionarios.forEach(funcionario => {
        
                        const row = document.createElement('tr');
                        // Cria uma nova linha vazia que será adicionada ao tbody
        
                        row.innerHTML = `
                            <td>${departamento}</td>
                            <td>${cargo}</td>
                            <td>${funcionario.nome}</td>
                            <td>${funcionario.salario}</td>
                        `;
        
                        tbody.appendChild(row);
                    });
                    
                }
                
            }
           
        });

    }

    carregarDadosExcel(excel);

});

function exportarParaExcel() {
    
    const tabelaOriginal = document.getElementById('table');

    const tabelaClone = tabelaOriginal.cloneNode(true);

    const wb = XLSX.utils.table_to_book(tabelaClone, {

        sheet: 'Funcionários',
        display: true

    });

    XLSX.writeFile(wb, 'funcionarios.xlsx');

}