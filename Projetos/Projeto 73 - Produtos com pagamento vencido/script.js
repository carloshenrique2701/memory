document.addEventListener('DOMContentLoaded', function () {
    
    const corpoTabela = document.querySelector('#tabela-produtos tbody');

    const botaoFiltrar = document.getElementById('filtrar-vencidos');

    const botaoLimpar = document.getElementById('limpar-filtro');

    const botaoExportar = document.getElementById('exportar-excel');

    let dadosOriginais = [];

    let dadosVisiveis = [];

    const excel = 'dados.xlsx';

    function converterDataExcel(serial) {
        
        const utc_days = serial - 25569;
        /*
            Calcula o número de dias desde a época do Unix(1 de Janeiro de 1970).
        O excel usa a data base de 30 de Dezembro de 1899, que corresponde ao serial 1.
                Portanto, para alinhar com a época do Unix, subtrai-se 25.569 
                                        do valor serial.
        */

        const date_info = new Date(utc_days * 86400 * 1000);
        /*
            Converte o número de dias para milissegundos (o formato que o JS usa para datas)
        multiplicando o número de dias por 86.400(s/dia) e por 1000(milissegundos/s), e cria um
                                    Objeto Date com esse valor.
        */

        const dia = String(date_info.getUTCDate()).padStart(2, '0');
        /*
            Obtém o dia do mês do objeto Date(em UTC para evitar problemas de fusos horários),
        converte para string e garante que sempre tenha 2 digitos, preenchendo com zero a esquerda
                                            se necessário.
        */

        const mes = String(date_info.getUTCMonth() + 1).padStart(2, '0');
        /*
            O JS conta os meses de 0 a 11
        */

        const ano = date_info.getUTCFullYear();

        return `${dia}/${mes}/${ano}`;

    }

    function carregarExcel(arquivo) {
        
        fetch(arquivo)
            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const ws = wb.Sheets['Sheet1'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, { header: 1 });

                const hoje = new Date();

                dadosOriginais = dadosJson.slice(1).map(linha => {

                    const produto = linha[0];

                    const dataPagamentoSerial = linha[1];

                    const valor = linha[2];

                    const dataPagamento = converterDataExcel(dataPagamentoSerial);

                    const [dia, mes, ano] = dataPagamento.split('/');
                    /*Corta a data onde tiver '/' => 10/03/2025 */

                    const dataPagamentoDate = new Date(`${ano}-${mes}-${dia}`);

                    const vencido = dataPagamentoDate < hoje;

                    return { produto, dataPagamento, valor, vencido};

                });

                dadosVisiveis = [...dadosOriginais];//Copia

                renderizarTabela(dadosVisiveis);

            })

            .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    function renderizarTabela(dados) {
        
        corpoTabela.innerHTML = '';

        dados.forEach(dado => {
            
            const tr = document.createElement('tr');

            if (dado.vencido) {
                
                tr.style.backgroundColor = 'red';

                tr.style.color = 'white';

            } else {

                tr.style.backgroundColor = '';

                tr.style.color = '';
            
            }

            const tdProduto = document.createElement('td');
            tdProduto.textContent = dado.produto;
            tr.appendChild(tdProduto);

            const tdDTPagamento = document.createElement('td');
            tdDTPagamento.textContent = dado.dataPagamento;
            tr.appendChild(tdDTPagamento);

            const tdValor = document.createElement('td');
            tdValor.textContent = Number(dado.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            tr.appendChild(tdValor);

            corpoTabela.appendChild(tr);

        });


    }

    botaoFiltrar.addEventListener('click', function () {
        
        dadosVisiveis = dadosOriginais.filter(dado => dado.vencido);

        renderizarTabela(dadosVisiveis);

    });

    botaoLimpar.addEventListener('click', function () {
        
        renderizarTabela(dadosOriginais);

    });

    botaoExportar.addEventListener('click', function () {
        
        const planilha = XLSX.utils.json_to_sheet(dadosVisiveis.map(dado => ({

            Produto: dado.produto,

            'Data de Pagamento': dado.dataPagamento,

            Valor: Number(dado.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        })));

        const novoArquivo = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(novoArquivo, planilha, 'Produtos');

        XLSX.writeFile(novoArquivo, 'Produtos.xlsx')

    });


    carregarExcel(excel);

})