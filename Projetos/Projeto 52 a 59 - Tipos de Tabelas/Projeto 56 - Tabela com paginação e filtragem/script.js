document.addEventListener('DOMContentLoaded', () =>{

    fetch('funcionarios.xlsx')

        .then(response => response.arrayBuffer())

        .then(data => {

            const workbook = XLSX.read(data, {type: 'array'});

            const sheetName = 'Dados';

            sheet = workbook.Sheets[sheetName];

            const dadosExcel = XLSX.utils.sheet_to_json(sheet, {header: 1});

            gerarTabelaPaginadaComFiltro(dadosExcel);

        })
    
        .catch(error => {

            console.log('Erro ao carregar o arquivo Excel: ', error);

            alert('Erro ao carregar o arquivo Excel: ', error);

        })

    
})

let tabelaFiltradaGlobal = [];

function gerarTabelaPaginadaComFiltro(dados) {

    const containerTabela = document.getElementById('container-tabela');

    containerTabela.innerHTML = '';

    const tabela = document.createElement('table');

    const corpoTabela = document.createElement('tbody');

    const linhasPorPagina = 5;

    let paginaAtual = 1;

    let totalPaginas;

    const linhasFiltros = document.createElement('tr');

    const filtros = Array(dados[0].length).fill('');
    //Cria um array com o mesmo numero de elementos que há de clunas 
    // nos dados, inicializando cada elemento como uma string vazia.
    //Este array armazenará os valores dos filtros aplicados a cada coluna.

    dados[0].forEach((coluna, indiceColuna) => {
        //Percorre a primeira linha dos dados, representando os cabeçalhos das colunas.
        
        const th = document.createElement('th');

        const inputFiltro = document.createElement('input');

        const label = document.createElement('label');

        inputFiltro.type = 'text';

        label.textContent = `Filtrar ${coluna}`;

        inputFiltro.addEventListener('input', (event) => {

            filtros[indiceColuna] = event.target.value.toLowerCase();

            paginaAtual = 1;

            renderizarTabela();

            inputFiltro.focus();
            //Mantém o foco no campo de entrada após a filtragem para facilitar acontinuidade de digitação


        })

        const wrapper = document.createElement('div');

        wrapper.className = 'input-wrapper'

        wrapper.appendChild(inputFiltro)

        wrapper.appendChild(label)

        th.appendChild(wrapper);

        linhasFiltros.appendChild(th);

    });

    function renderizarTabela() {
        
        tabelaFiltradaGlobal = dados.filter((linha, indiceLinha) =>{

            return indiceLinha === 0 || linha.every((celula, indiceCelula) => {
                 // Mantém a primeira linha (cabeçalhos) sempre 
                        // visível, ou verifica se todas as células de 
                        // uma linha específica correspondem aos filtros.

                return celula.toString().toLowerCase().includes(filtros[indiceCelula]);

            })

        })

        totalPaginas = Math.ceil((tabelaFiltradaGlobal.length - 1) / linhasPorPagina);
        //Calcula o número total de páginas para exibir todas as linhas filtradas.
        //tabelaFiltradaGlobal.length - 1 obtém o numero total de linhas subtraindo a linha do abesalho.
        //ceil retorna o maior número inteiro ex. Math.ceil(4.3) output: 5 

        corpoTabela.innerHTML = '';

        corpoTabela.appendChild(linhasFiltros);

        const inicio = (paginaAtual - 1) * linhasPorPagina;

        const fim = inicio + linhasPorPagina;

        const dadosPagina = [tabelaFiltradaGlobal[0]].concat(tabelaFiltradaGlobal.slice(inicio + 1, fim + 1));
        //Cria um novo array que contém as linhas que devem ser exibidas na pagina atual.
        //[tabelaFiltradaGlobal[0]] adiciona a linha do cabeçalho no inicio.
        // tabelaFiltradaGlobal.slice(inicio + 1, fim + 1) obtém as linhas de dados a serem exibidas, começando do indice
        // inicio + 1 (para pular a linha de cabeçalho) até fim + 1.

        dadosPagina.forEach((linha, indiceLinha) => {

            const tr = document.createElement('tr');

            linha.forEach((celula, indiceCelula) =>{

                const elementoCelula = indiceLinha === 0 ? document.createElement('th') : document.createElement('td');

                if(indiceLinha !=+ 0 && dados[0][indiceCelula] === 'Salário'){

                    elementoCelula.textContent = parseFloat(celula).toLocaleString('pt-BR');

                } else{

                    elementoCelula.textContent = celula;

                }

                tr.appendChild(elementoCelula);

            });

            corpoTabela.appendChild(tr);

        });

        tabela.appendChild(corpoTabela);

        atualizarBotoes();

    }

    function atualizarBotoes() {
        
        botaoPrimeira.disabled = paginaAtual === 1;

        botaoAnterior.disabled = paginaAtual === 1;

        botaoProximo.disabled = paginaAtual === totalPaginas;

        botaoUltima.disabled = paginaAtual === totalPaginas;

        textoPaginacao.textContent = `${paginaAtual} de ${totalPaginas}`;

    }




    const paginacao = document.createElement('div');

    paginacao.className = 'paginacao';

    const botaoPrimeira = document.createElement('button');

    botaoPrimeira.textContent = 'Primeira';

    botaoPrimeira.onclick = () => {

        paginaAtual = 1;
        renderizarTabela();

    }

    paginacao.appendChild(botaoPrimeira);


    //


    const botaoAnterior = document.createElement('button');

    botaoAnterior.textContent = 'Anterior'

    botaoAnterior.onclick = () => {

        if(paginaAtual > 1){

            paginaAtual--;

            renderizarTabela();

        }

    }

    paginacao.appendChild(botaoAnterior);

    const textoPaginacao = document.createElement('span');

    textoPaginacao.textContent = `${paginaAtual} de ${totalPaginas}`;

    paginacao.appendChild(textoPaginacao);


    //


    const botaoProximo = document.createElement('button');

    botaoProximo.textContent = 'Próximo'

    botaoProximo.onclick = () => {

        if(paginaAtual < totalPaginas){

            paginaAtual++;

            renderizarTabela();

        }

    }

    paginacao.appendChild(botaoProximo);


    //
   

    const botaoUltima = document.createElement('button');

    botaoUltima.textContent = 'Última';

    botaoUltima.onclick = () => {

        paginaAtual = totalPaginas;
        renderizarTabela();

    }

    paginacao.appendChild(botaoUltima);

    containerTabela.appendChild(tabela);

    containerTabela.appendChild(paginacao);

    renderizarTabela();
    
}

document.getElementById('botao-exportar').addEventListener('click', exportarTabela, false);

function exportarTabela() {

    if(!tabelaFiltradaGlobal || tabelaFiltradaGlobal === 0) return;

    const wb = XLSX.utils.book_new(); //cria um novo workbook

    const ws = XLSX.utils.aoa_to_sheet(tabelaFiltradaGlobal); //converte os dados para um formato de planilha excel

    XLSX.utils.book_append_sheet(wb, ws, 'Tabela exportada'); //Adiciona a planilha criado ao workbook
    
    XLSX.writeFile(wb, 'Tabela_exportada.xlsx');

}