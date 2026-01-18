document.getElementById('carregarArquivo').addEventListener('change', function (evento) {
    
    const nomeArquivo = evento.target.files[0] ? evento.target.files[0].name : 'Nenhum Arquivo escolhido';

    document.getElementById('nomeArquivo').textContent = nomeArquivo;

    carregarArquivo(evento)

});


document.getElementById('condicao').addEventListener('change', function () {
    
    const condicao = this.value;

    const valor1 = document.getElementById('valor1');
    const valor2 = document.getElementById('valor2');

    if (condicao === 'entre') {
        
        valor2.style.display = 'inline-block';
        valor1.style.display = 'inline-block';
        valor2.placeholder = 'Número ou Data';
        valor1.placeholder = 'Número ou Data';

    } else if (condicao === 'contemTexto' || condicao === 'dataOcorre' ) {
        
        valor2.style.display = 'none';
        valor1.style.display = 'inline-block';
        valor1.placeholder = 'Texto ou Data';

    }else if (condicao === 'valoresDuplicados' ) {
        
        valor2.style.display = 'none';
        valor1.style.display = 'none';

    } else {


        valor2.style.display = 'none';
        valor1.style.display = 'inline';
        valor1.placeholder = 'Número';

    }

});

let dadosExcel = [];

function carregarArquivo(evento) {
    
    const arquivo = evento.target.files[0];

    if (arquivo) {
        
        const leitor = new FileReader();

        leitor.onload = function (e) {
            
            const dados = new Uint8Array(e.target.result);

            const planilhaTrabalho = XLSX.read(dados, {type: 'array'});

            const primeiraPlanilha = planilhaTrabalho.SheetNames[0];

            const planilha = planilhaTrabalho.Sheets[primeiraPlanilha];

            dadosExcel = XLSX.utils.sheet_to_json(planilha, {header: 1});

            preencherTabela(dadosExcel);
            preecherSelecaoColuna(dadosExcel);

        }

        leitor.readAsArrayBuffer(arquivo);

    }

}

function preencherTabela(dados) {
    
    const tabelaContainer = document.getElementById('tabelaContainer');

    let tabelaHTML = '<table><thead><tr>';

    dados[0].forEach(cabecalho => {
        
        tabelaHTML +=`<th>${cabecalho}</th>`;

    });


    tabelaHTML += '</tr></thead><tbody>';


    for (let i = 1; i < dados.length; i++) {
        
        tabelaHTML += '<tr>';

        dados[i].forEach(celula => {

            tabelaHTML +=`<td>${celula || ''}</td>`;

        });

        tabelaHTML += '</tr>';

        
    }



    tabelaHTML += '</tbody></table>';

    tabelaContainer.innerHTML = tabelaHTML;

}

function preecherSelecaoColuna(dados) {
    
    const selecaoColuna = document.getElementById('selecaoColuna');

    selecaoColuna.innerHTML = '';

    dados[0].forEach((cabecalho, indice) => {

        const opcao = document.createElement('option');

        opcao.value = indice;

        opcao.textContent = cabecalho;

        selecaoColuna.appendChild(opcao);

    })

}

document.getElementById('aplicarFormatacao').addEventListener('click', aplicarFormatacaoCondicional);
document.getElementById('exportarDados').addEventListener('click', exportarDadosFiltrados);

function aplicarFormatacaoCondicional() {
    
    const selecaoColuna = document.getElementById('selecaoColuna').value;
    const condicao = document.getElementById('condicao').value;

    let valor1 = document.getElementById('valor1').value;
    let valor2 = document.getElementById('valor2').value;

    const linhas = document.querySelectorAll('#tabelaContainer tbody tr');

    linhas.forEach(linha => {

        linha.classList.remove('formato-condicional');

    });

    const isColunaNumerica = verificarColunaNumerica(selecaoColuna);
    const isColunaData = verificarColunaData(selecaoColuna);

    if (isColunaNumerica) {
        
        valor1 = parseFloat(valor1.replace(/[^0-9,.-]+/g, "").replace(",", "."));

        if (valor2) valor2 = parseFloat(valor2.replace(/[^0-9,.-]+/g, "").replace(",", "."));

    }

    if (isColunaData) {
        
        valor1 = converterData(valor1);

        if (valor2) valor2 = converterData(valor2);

    }

    if (condicao === 'valoresDuplicados') {
        
        marcarValoresDuplicados(selecaoColuna);

    } else {

        linhas.forEach(linha => {

            const celula = linha.children[selecaoColuna];

            let valorCelula = celula.textContent.trim();//Remove espaços em branco desnecessários

            if (isColunaNumerica) {
                
                valorCelula = parseFloat(valorCelula.replace(/[^0-9,.-]+/g, "").replace(",", "."));

            }

            if (isColunaData) {
                
                valorCelula = converterData(valorCelula);

            }

            if(validarCondicao(valorCelula, condicao, valor1, valor2, isColunaData, isColunaNumerica)){

                linha.classList.add('formato-condicional')

            }

        });

    }

    aplicarFiltro();

}

function verificarColunaNumerica(indiceColuna) {
    
    const cabecalho = document.querySelector(`#selecaoColuna option[value="${indiceColuna}"]`).textContent;

    return cabecalho.toLowerCase().includes('nota') ||  //Verifica se tem algum campo no cabeçalho com essas palavras.
            cabecalho.toLowerCase().includes('valor') ||//Verifica se tem algum campo no cabeçalho com essas palavras.
            cabecalho.toLowerCase().includes('falta') ||//Verifica se tem algum campo no cabeçalho com essas palavras.
            !isNaN(parseFloat(cabecalho));

}

function verificarColunaData(indiceColuna) {

    const cabecalho = document.querySelector(`#selecaoColuna option[value="${indiceColuna}"]`).textContent;
    
    return cabecalho.toLowerCase().includes('data');

}

function converterData(date) {

    const partes = date.split('/'); // dd/mm/yy

    if (partes.length == 3) {

        return new Date(partes[2], partes[1] - 1, partes[0]);
        
    }

    return new Date(date);
    
}


function validarCondicao(valorCelula, condicao, valor1, valor2, isColunaData, isColunaNumerica) {

    switch (condicao) {

        case 'maiorQue':

            return valorCelula > valor1;
            
        break;

        case 'menorQue':

            return valorCelula < valor1;
                
        break;

        case 'igualA':

            return isColunaNumerica ? valorCelula == valor1 :
                        isColunaData ? valorCelula.getTime() === valor1.getTime() :
                        valorCelula == valor1;
                    
        break;

        case 'entre':

            return valorCelula >= valor1 && valorCelula <= valor2;
                
        break;

        case 'contemTexto':

            return valorCelula.includes(valor1);
                
        break;

        case 'dataOcorre':

            return isColunaData && verificarDataOcorre(valorCelula, valor1);
                
        break;

        case 'valoresDuplicados':

            return true;
                
        break;

        default:

            console.log('Ocorreu um erro na validação de condições... ', condicao);
            return false;

        break;
    }
    
}

function verificarDataOcorre(valorCelula, valor1) {
    
    return valorCelula.getTime() === valor1.getTime();

}

function marcarValoresDuplicados(indiceColuna) {

    const valores = new Map();

    const linhas = document.querySelectorAll('#tabelaContainer tbody tr');

    linhas.forEach(linha => {

        const valorCelula = linha.children[indiceColuna].textContent.trim();

        if (valores.has(valorCelula)) {
            
            valores.set(valorCelula, valores.get(valorCelula) + 1);


        } else {

            valores.set(valorCelula, 1)

        }

    });

    linhas.forEach(linha => {

        const valorCelula = linha.children[indiceColuna].textContent.trim();

        if (valores.get(valorCelula) > 1) {
            
            linha.classList.add('formato-condicional');


        }

    })
    
}

function aplicarFiltro() {

    const linhas = document.querySelectorAll('#tabelaContainer tbody tr');

    const mostrarSomenteFiltrados = document.getElementById('mostrarSomenteFiltrados').checked;

    linhas.forEach(linha => {
        
        if (mostrarSomenteFiltrados) {
            
            if (!linha.classList.contains('formato-condicional')) {
            
                linha.style.display = 'none';
    
            } else {
    
    
                linha.style.display = '';
                
            }

        } else {
            
            linha.style.display = '';

        }

    });
    
}

function exportarDadosFiltrados() {

    const linhasFiltradas = Array.from(document.querySelectorAll('#tabelaContainer tbody tr'))

        .filter(linha=> linha.style.display !== 'none');

    const dadosParaExportar = linhasFiltradas.map(linha => 
        Array.from(linha.children).map(celula => celula.textContent)
    );
    
    const planilhaTrabalho = XLSX.utils.book_new();

    const folhaTrabalho = XLSX.utils.aoa_to_sheet([dadosExcel[0], ...dadosParaExportar]);

    XLSX.utils.book_append_sheet(planilhaTrabalho, folhaTrabalho, "Dados filtrados");

    XLSX.writeFile(planilhaTrabalho, "dados_filtrados.xlsx");

}