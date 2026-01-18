document.addEventListener("DOMContentLoaded", () => {

    const treeContainer = $('#treeContainer');
    //Define uma constante e a atribui ao elemento HTML com o id 
    // 'treeContainer' utilizando o JQuery ($) para selecionar o 
    // elemento, o que facilita manipulações subsequentes, como 
    // adicionar a treeVeiw. (NESSESSÁRIO A BIBLIOTECA IMPORTADA NO HTML)

    /*
                    *Diferenças do js puro para o JQuery:


                *jQuery ($('#treeContainer'))

            const treeContainer = $('#treeContainer');

                -Retorna um objeto jQuery

                -Pode conter 0, 1 ou múltiplos elementos

                -Tem acesso aos métodos do jQuery (.hide(), .show(), .addClass(), etc.)

                -Mesmo se o elemento não existir, não dá erro

                ---------------------------------------------------------------

                *JavaScript puro (document.getElementById('departamento'))
            
            const departamentoInput = document.getElementById('departamento');

                -Retorna um elemento DOM nativo

                -Retorna null se o elemento não existir

                -Tem acesso aos métodos nativos do DOM (.addEventListener(), .style, etc.)
    */

    const departamentoInput = document.getElementById('departamento');

    const cargoInput = document.getElementById('cargo');

    const nomeInput = document.getElementById('nome');

    const salarioInput = document.getElementById('salario');

    const excelCaminhoArquivo = 'funcionarios.xlsx';

    function carregarDadosExcel(url) {
        
        fetch(url)

            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const primeiraSheet = wb.Sheets[wb.SheetNames[0]];

                const jsonData = XLSX.utils.sheet_to_json(primeiraSheet, {header: 1});

                populateTreeView(jsonData);

            })

            .catch(error => console.error("Erro ao carregar arquivo excel: ", error));

    }

    function populateTreeView(data) {
        
        const treeData =[];

        const departamentos = {};

        data.forEach((linha, indice) => {

            if (indice > 0){
            
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

                departamentos[departamento][cargo].forEach(funcionario => {

                    const nomeNode = {

                        text:funcionario.nome,
                        data: {departamento, cargo, nome: funcionario.nome, salario: funcionario.salario}

                    }

                    cargoNode.children.push(nomeNode);

                });

                depNode.children.push(cargoNode);
                
            }

            treeData.push(depNode);
            
        }

        treeContainer.jstree({

            'core': {

                'data': treeData

            }

        });

        treeContainer.on("select_node.jstree", function(e, data){

            const noSelecionado = data.node;

            if (noSelecionado.data){

                departamentoInput.value = noSelecionado.data.departamento;

                cargoInput.value = noSelecionado.data.cargo;

                nomeInput.value = noSelecionado.data.nome;

                salarioInput.value = noSelecionado.data.salario;

                setInterval(() => {
                    
                    departamentoInput.value = '';
            
                    cargoInput.value = '';
            
                    nomeInput.value = '';
            
                    salarioInput.value = '';
                        
                }, 20000);

            }

        });
        

    }

    carregarDadosExcel(excelCaminhoArquivo);

});
