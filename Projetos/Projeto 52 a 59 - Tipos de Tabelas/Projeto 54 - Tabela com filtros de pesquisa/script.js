function filtrarTabela() {
    
    var filtroNome = document.getElementById('filtroNome').value.toLowerCase();

    var filtroDepartamento = document.getElementById('filtroDepartamento').value.toLowerCase();

    var filtroCargo = document.getElementById('filtroCargo').value.toLowerCase();

    var filtroSalario = document.getElementById('filtroSalario').value.toLowerCase();

    var filtroTempo = document.getElementById('filtroTempo').value.toLowerCase();

    var linhas = document.getElementById('corpoTabela').rows;

    for (var i = 0; i < linhas.length; i++) {
        //Acessa o texto dentro da primeira célula da linha atual e converte para minúsculo
        var nome = linhas[i].cells[0].textContent.toLowerCase(); 
        
        var departamento = linhas[i].cells[1].textContent.toLowerCase()

        var cargo = linhas[i].cells[2].textContent.toLowerCase()

        //Aqui, note que se os salários tiverem formatos especiais, como moeda, essa conversão simples para 
        // minúsculas pode não ser o suficiente para uma maior precisão.
        var salario = linhas[i].cells[3].textContent.toLowerCase()

        var tempo = linhas[i].cells[4].textContent.toLowerCase()

        //Define a visibilidade da linha atual com base nos critérios de filtro.
        linhas[i].style.display = 

            (nome.includes(filtroNome) || filtroNome === "") &&
            (departamento.includes(filtroDepartamento) || filtroDepartamento === "") &&
            (cargo.includes(filtroCargo) || filtroCargo === "") &&
            (salario.includes(filtroSalario) || filtroSalario === "") &&
            (tempo.includes(filtroTempo) || filtroTempo === "") 
        ? "" : "none";//Se todas as condições forem verdadeiras, mostra a linha(`""` significa para manter a 
                    // visibilidade). Se alguma condição for false, ela recebe o atributo "none"(0 visibilidade);

    }

}

function formatarSalario(salario) {
    
    return parseInt(salario).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    // O corpo da função realiza duas operações principais 
            // sobre o 'salario' recebido:

    // 1. parseInt(salario):
    //    - 'parseInt' é uma função que tenta converter seu 
            // argumento para um número inteiro.
    //    - Por exemplo, se 'salario' é a string "2000.99" ou "2000", 
            // 'parseInt' irá converter isso para o número 2000.
    //    - Isso é útil para garantir que o valor a ser formatado 
            // esteja no tipo de dado correto (número).

    // 2. toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }):
    //    - 'toLocaleString' é um método que formata um número para 
            // uma string de acordo com as convenções de uma 
            // localidade específica.
    //    - 'pt-BR' é o código de localidade para o Português do Brasil.
    //    - O objeto { style: 'currency', currency: 'BRL' } especifica 
            // que o número deve ser formatado como uma moeda, 
            // usando o Real Brasileiro ('BRL').
    //    - Isso transforma, por exemplo, o número 2000 em "R$ 2.000,00", 
            // que é a maneira como os valores monetários são 
            // tipicamente representados no Brasil.

    // A função então retorna este valor formatado, que pode ser 
            // usado em qualquer lugar da aplicação que necessite 
            // mostrar um valor salarial de forma legível e 
            // localmente adequada.

}

function carregarDados(dados) {

    var corpoTabela = document.getElementById('corpoTabela');

    dados.forEach(funcionario => {
        
        var linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${funcionario.Nome}</td>
            <td>${funcionario.Departamento}</td>
            <td>${funcionario.Cargo}</td>
            <td>${formatarSalario(funcionario.Salário)}</td>
            <td>${funcionario["Tempo de Empresa (anos)"]}</td>            
        `;

        corpoTabela.appendChild(linha);

    });
    
}

document.addEventListener('DOMContentLoaded', function () {
    
    // Chama a função 'fetch', que é usada para fazer uma solicitação 
            // de rede para um recurso, neste caso, o arquivo 
            // 'funcionarios.xlsx'.
    // 'fetch' retorna uma promessa que, quando resolvida, contém a 
            // resposta da solicitação de rede.

    fetch('funcionarios.xlsx')
    
        // O primeiro '.then' manipula a resposta do 'fetch'.
            // 'response.arrayBuffer()' é um método que lê a resposta e a 
                    // retorna como um ArrayBuffer, um tipo de dado que 
                    // representa um buffer de dados binários de tamanho fixo na memória.
        .then(response => response.arrayBuffer())

        // O segundo '.then' recebe o ArrayBuffer (data) como argumento.
            // Esse ArrayBuffer contém os dados binários do arquivo Excel.
        .then(data =>{

            // 'XLSX.read' é uma função da biblioteca SheetJS que lê os 
                    // dados binários do Excel e os converte em um objeto de 
                    // workbook (livro de trabalho) que pode ser manipulado 
                    // pelo JavaScript.
            // O parâmetro { type: 'array' } informa à função que os dados 
                    // estão no formato de um ArrayBuffer.
            var workbook = XLSX.read(data, {type: 'array'});

            // Acessa a primeira planilha do workbook.
            // 'workbook.SheetNames' é uma propriedade que contém uma 
                    // lista dos nomes de todas as planilhas no workbook.
            // 'workbook.Sheets[nome]' retorna a planilha 
                    // correspondente ao nome fornecido.
            var primeiraSheet = workbook.Sheets[workbook.SheetNames[0]];

            // Converte os dados da primeira planilha (primeiraSheet) em 
                    // um formato JSON (JavaScript Object Notation).
            // JSON é um formato que facilita a manipulação de dados em 
                    // JavaScript, transformando dados tabulares em 
                    // uma lista de objetos.
            var dadosJSON = XLSX.utils.sheet_to_json(primeiraSheet);

            carregarDados(dadosJSON);

        })

        // O método 'catch' é usado para capturar qualquer erro que 
                // ocorra durante a execução das promessas acima.
        // Se ocorrer um erro em qualquer ponto, desde a solicitação 
                // inicial até a conversão dos dados, ele será capturado 
                // aqui e um erro será logado no console.
        .catch(error => console.error(`Erro ao carregar os dados: ${error}`));

});

function exportarParaExel() {
    
    var tabela = document.getElementById("tabelaFuncionarios");

    // Converte a tabela HTML em um 'workbook' (livro de trabalho 
            // do Excel) usando a biblioteca XLSX.
    // 'XLSX.utils.table_to_book' é uma função da biblioteca SheetJS (XLSX) 
            // que toma um elemento de tabela HTML e o transforma em 
            // um formato que pode ser usado para gerar arquivos Excel.
    // 'workbook' é um objeto que representa o arquivo Excel, contendo 
            // todos os dados e formatações presentes na tabela HTML.
    var workbook = XLSX.utils.table_to_book(tabela);

    // Escreve o 'workbook' em um arquivo físico chamado 'funcionarios.xlsx'.
    // 'XLSX.writeFile' é uma função da biblioteca XLSX que cria um 
            // arquivo Excel real a partir do objeto 'workbook'.
    // O primeiro argumento é o objeto 'workbook' e o segundo 
            // argumento é o nome do arquivo que será criado e 
            // salvo no dispositivo do usuário.
    // Isso permite que o usuário baixe automaticamente o arquivo 
            // Excel com os dados da tabela.
    XLSX.writeFile(workbook, 'funcionarios.xlsx');

}