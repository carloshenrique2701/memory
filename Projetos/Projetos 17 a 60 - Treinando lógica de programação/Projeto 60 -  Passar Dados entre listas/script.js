document.addEventListener('DOMContentLoaded', () => { 

    const listaNomes = document.getElementById('listaNomes');

    const listaDados = document.getElementById('listaDados');

    const moverParaDados = document.getElementById('moverParaDados');

    const moverParaNomes = document.getElementById('moverParaNomes');

    const moverTodosParaDados = document.getElementById('moverTodosParaDados');

    const moverTodosParaNomes = document.getElementById('moverTodosParaNomes');

    const excelFileURL = 'funcionarios.xlsx';

    ////////////////////
    
    function moverItem(listaOrigem, listaDestino) {
        
        const selecionados = Array.from(listaOrigem.selectedOptions); //Captura o item selecionado 

        selecionados.forEach(opcao => {

            listaDestino.appendChild(opcao);//Joga o item selecionado no destino escolhido

        });

        listaOrigem.selectedindice = -1; //Reseta o indice selecionado na 'listaOrigem' para -1 desmarcando os itens.

    }

    moverParaDados.addEventListener("click", () => {

        moverItem(listaNomes, listaDados);

    });

    moverParaNomes.addEventListener("click", () => {

        moverItem(listaDados, listaNomes);

    });
    
    ////////////////////

    function moverTodosItem(listaOrigem, listaDestino) {

        const todosItens = Array.from(listaOrigem.options); //Captura todos os itens selecionados

        todosItens.forEach(opcao => {

            listaDestino.appendChild(opcao);

        })

        listaOrigem.selectedindice = -1;
        
    }

    moverTodosParaDados.addEventListener("click", () => {

        moverTodosItem(listaNomes, listaDados);

    });

    moverTodosParaNomes.addEventListener("click", () => {

        moverTodosItem(listaDados, listaNomes);

    });

    ////////////////////

    function carregarDadosExcel(url) {
        
        fetch(url)

            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                primeiraSheet = wb.Sheets[wb.SheetNames[0]];

                const jsonData = XLSX.utils.sheet_to_json(primeiraSheet, {header: 1});

                populateListaNomes(jsonData);
 
            })

            .catch(error => console.error('Erro ao carregar o arquivo :', error));

    }

    ////////////////////

    function populateListaNomes(data) {
        
        listaNomes.innerHTML = '';

        /**
        O arquivo JSON ficaria assim:
        {
            "funcionarios": [
                {"nome": "Alice"},
                {"nome": "Bob"},
                {"nome": "Charlie"},
                {"nome": "David"},
                {"nome": "Emily"},
                {"nome": "Frank"},
                {"nome": "Grace"},
                {"nome": "Helen"},
                {"nome": "Ivy"},
                {"nome": "Jack"},
                {"nome": "Lucy"},
                {"nome": "Morgan"},
                {"nome": "Nathan"},
                {"nome": "Olivia"},
                {"nome": "Paul"},
                {"nome": "Quincy"},
                {"nome": "Rachel"},
                {"nome": "Steve"},
                {"nome": "Ursula"},
                {"nome": "Victor"},
                {"nome": "Wendy"},
                {"nome": "Xander"},
                {"nome": "Yara"},
                {"nome": "Zane"},
                {"nome": "Oscar"},
                {"nome": "Penny"},
                {"nome": "Queen"},
                {"nome": "Roger"}
            ]
        } 
         */

        data.forEach((linha, indiceLinha) => {

            if (indiceLinha > 0 && linha[0]){

                const opcao = document.createElement('option');

                opcao.text = linha[0];

                listaNomes.add(opcao);

            }

        })

    }

    carregarDadosExcel(excelFileURL);

});