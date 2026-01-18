document.addEventListener('DOMContentLoaded', () => {
   
    fetch('Produtos.xlsx')
    //Faz uma solicitação para buscar o aquivo

        .then(response => response.arrayBuffer())
        //Quando a resposta for recebida, ela será convertida 
        // para um array buffer(uma forma de representar dados binários)

        .then(data =>{

            const workbook = XLSX.read(data, {type: 'array'});
            //Lê os dados binarios do arquivo exel e cria uma instancia 
            // de workbook(planilha)

            const sheetName = 'Dados';

            const sheet = workbook.Sheets[sheetName];
            //Obtém a planilha especificada chamada 'Dados' do workbook

            const dadosExcel = XLSX.utils.sheet_to_json(sheet, {header: 1});
            //Converte os dados da planilha para um formato JSON, onde cada 
            // linha é representada como um array

            dadosExcel.forEach((linha, indice) => {
                
                if(indice> 0){

                    linha[4] = XLSX.SSF.parse_date_code(linha[4]);
                    //converte a data na coluna de index 4 para um objryo de 
                    // data, se não for a primeira linha(cabeçalho)

                }

            });
            gerarTabelaPaginadaComFiltro(dadosExcel);

        })
    
        .catch(error =>{

            console.error('Erro ao carregar o arquivo excel: ', error);
            alert('Erro ao carregar o arquivo excel: ', error);

        });

});

let tabelaFiltradaGlobal = [];

function gerarTabelaPaginadaComFiltro(dados) {
    
    const containerTabela = document.getElementById('container-tabela');

    containerTabela.innerHTML = '';

    const tabela = document.createElement('table');

    const corpoTabela = document.createElement('tbody');

    const linhasPorPagina = 5;

    let paginaAtual = 1;

    let totalPaginas;

    const linhaFiltros = document.createElement('tr');

    const filtros = Array(dados[0].length).fill('');
    //Cria uma array com o mesmo comprimento do número de 
    // colunasnos dados recebidos e inicializa cada elemento 
    // do array como uma string vazia('').
    //Este array é usado para armazenar os critérios de filtro para cada coluna

    dados[0].forEach((coluna, indiceColuna) =>{

        const th = document.createElement('th');

        if(coluna === "Data de Vencimento"){

            const inputFiltroInicio = document.createElement('input');

            inputFiltroInicio.type = 'date';

            inputFiltroInicio.placeholder = 'Data inicio';

            const inputFiltroFim = document.createElement('input');

            inputFiltroFim.type = 'date';

            inputFiltroFim.placeholder = 'Data fim';

            inputFiltroInicio.addEventListener('input', () => {

                filtros[indiceColuna] = {inicio: inputFiltroInicio.value, fim: inputFiltroFim.value};

                paginaAtual = 1;

                renderizarTabela();

            });

            inputFiltroFim.addEventListener('input', () => {

                filtros[indiceColuna] = {inicio: inputFiltroInicio.value, fim: inputFiltroFim.value};

                paginaAtual = 1;

                renderizarTabela();

            });

            th.appendChild(inputFiltroInicio);
            th.appendChild(inputFiltroFim);

        } else{

            const inputFiltro = document.createElement('input');

            const divWrapper = document.createElement('div');
            divWrapper.className = 'input-wrapper';

            const label = document.createElement('label');
            label.textContent = `Filtrar por ${coluna}`;

            inputFiltro.type = 'text';

            inputFiltro.addEventListener('input', (event) => {

                filtros[indiceColuna] = event.target.value.toLowerCase();

                paginaAtual = 1;

                renderizarTabela();

                inputFiltro.focus();

            });

            divWrapper.appendChild(inputFiltro);
            divWrapper.appendChild(label);

            th.appendChild(divWrapper);

        }

        linhaFiltros.appendChild(th);

    });

    function renderizarTabela() {
        
        tabelaFiltradaGlobal = dados.filter((linha, indiceLinha) => {


                return indiceLinha === 0 || linha.every((celula, indiceCelula) => {
                    //Mantém a primeira linha (indice 0), que é o cabeçalho, sem 
                    // aplicar filtros. 
                    // Para todas as outras linhas, verifica se cada céluna atende 
                    // aos criterios de filtragem.
                    /*

                                            every() vs .forEach()

                        Propósito:

                            .every(): Testa uma condição - verifica se todos os elementos passam em um teste

                            .forEach(): Executa uma ação para cada elemento (como um loop tradicional)

                        Valor de retorno:

                            .every(): Retorna boolean (true ou false)

                            .forEach(): Retorna undefined

                        Comportamento:

                            .every(): Para no primeiro elemento que retorna false

                            .forEach(): Sempre executa para todos os elementos 

                    */

                    if(dados[0][indiceCelula] === "Data de Vencimento"){ //Verifica a coluna atual

                        const dataVencimento = new Date(linha[indiceCelula].y, linha [indiceCelula].m -1, linha[indiceCelula].d);
                        //Cria um objeto com base nos valores de ano(y), mes(m) e dia(d) da celula atual.
                        //NOTA: subtrai 1 do mês porquê o objeto Date usa meses indexados a partir de 0.

                        const filtroData = filtros[indiceCelula];
                        //Obtém o filtro de datacorrespondente a coluna atual.

                        if (!filtroData || (!filtroData.inicio && !filtroData.fim)) return true;
                        //Se não houver nenhum filtro de data definido, retorna true.

                        if (filtroData.inicio && new Date(filtroData.inicio) > dataVencimento) return false;
                        //Se houver um fitro de data de inicio e for maior que a data de nascimento, 
                        // retorna false

                        if(filtroData.fim && new Date(filtroData.fim) < dataVencimento) return false;
                        //Se houver um filtro de data final e for menor que a data de venciemnto, 
                        // retorna false

                        return true;
                        //Se nenhuma das condições forem atendidas, retorna true.

                        //Em outras palavras, as condições que retornarem 'false', singnifica que não 
                        // estão dentro do limite da data de vencimento e as que retornarem 'true', 
                        // significa que é um valor valido de filtro(há dados que se encaixem nesse filtro).

                    }else{

                        return celula.toString().toLowerCase().includes(filtros[indiceCelula]);
                        //Para as outras colunas, o valor de cada celula sera convertido para uma string em 
                        // letras minúsculas e será verificado se inclui o valor do filtro correspondente(que 
                        // também está convertido para minúsculo lá em cima). Retorna true caso a célula atende 
                        // o requisito e retorna false para o caso contrário.

                    }

                });
        });

        totalPaginas = Math.ceil((tabelaFiltradaGlobal.length - 1) / linhasPorPagina);

        corpoTabela.innerHTML = '';

        corpoTabela.appendChild(linhaFiltros);

        const inicio = (paginaAtual - 1) * linhasPorPagina;

        const fim = inicio + linhasPorPagina;

        const dadosPagina = [tabelaFiltradaGlobal[0]].concat(tabelaFiltradaGlobal.slice(inicio + 1, fim + 1));

        dadosPagina.forEach((linha, indiceLinha) =>{

            const tr = document.createElement('tr');

            linha.forEach((celula, indiceCelula) =>{

                const elementoCelula = indiceLinha === 0 ? document.createElement('th') : document.createElement('td');

                if(indiceLinha !== 0 && dados[0][indiceCelula] === 'Data de Vencimento'){

                    elementoCelula.textContent = new Date(celula.y, celula.m - 1, celula.d).toLocaleDateString('pt-br');

                } else{

                    elementoCelula.textContent = celula;

                }

                tr.appendChild(elementoCelula);

            });

            corpoTabela.appendChild(tr);

        })

        tabela.appendChild(corpoTabela);

        atualizarBotoes();

        atualizarFiltros();

    }

    function atualizarBotoes() {

        botaoPrimeira.disabled = paginaAtual === 1;
        botaoAnterior.disabled = paginaAtual === 1;
        botaoProximo.disabled = paginaAtual === totalPaginas;
        botaoUltima.disabled = paginaAtual === totalPaginas;

        textoPaginacao.textContent =`${paginaAtual} de ${totalPaginas}`;
        
    }

    function atualizarFiltros() {

        dados[0].forEach((coluna, indiceColuna) => {

            if(coluna === "Data de Vencimento"){

                const th = linhaFiltros.children[indiceColuna];

                const inputFiltroInicio = th.children[0];

                const inputFiltroFim = th.children[1];

                const filtroData = filtros[indiceColuna];

                if(filtroData){

                    inputFiltroInicio.value = filtroData.inicio;
                    inputFiltroFim.value = filtroData.fim;

                }

            } else{

                const th = linhaFiltros.children[indiceColuna];

                const inputFiltro = th.children[0];

                inputFiltro.value = filtros[indiceColuna];

            }

        })
        
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

    //////////

    const botaoAnterior = document.createElement('button');
    botaoAnterior.textContent = 'Anterior';
    botaoAnterior.onclick = () => {

        if(paginaAtual > 1){

            paginaAtual --;
            renderizarTabela();

        }

    }

    paginacao.appendChild(botaoAnterior);

    ///////////

    const textoPaginacao = document.createElement('span');
    textoPaginacao.textContent = `${paginaAtual} de ${totalPaginas}`;
    paginacao.appendChild(textoPaginacao);

    ///////////

    const botaoProximo = document.createElement('button');
    botaoProximo.textContent = 'Proximo';
    botaoProximo.onclick = () => {

        if(paginaAtual < totalPaginas){

            paginaAtual ++;
            renderizarTabela();

        }

    }

    paginacao.appendChild(botaoProximo);

    //////////

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

    if(!tabelaFiltradaGlobal || tabelaFiltradaGlobal.length === 0) return alert('Não há dados a serem exportados.');

    const dadosExportar = tabelaFiltradaGlobal.map((linha, indiceLinha) => {

        if(indiceLinha === 0) return linha;
        //Mapea cada linha da 'tabelaFiltradaGlobal' e retorna em caso de ser 
        // aprimeira linha(cabeçalho) sem modificações.

        return linha.map((celula, indiceColuna) =>{

            if(typeof celula === 'object' && celula !== null && 'y' in celula && 'm' in celula && 'd' in celula){
                //Verifica se a célula é um objeto, não é nula e possui as 
                // propriedades 'y'(year), 'm'(month) e 'd'(day)

                return new Date(celula.y, celula.m -1, celula.d).toLocaleDateString('pt-BR');

            }

            return celula;

        });

    });
        
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(dadosExportar);

    XLSX.utils.book_append_sheet(wb, ws, 'Tabela Exportada');

    XLSX.writeFile(wb, 'tabela_exportada.xlsx');

}