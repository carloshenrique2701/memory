async function buscarCNPJ() {
    const inputCNPJ = document.getElementById('cnpj').value.replace(/[^\d]/g, ''); // Pegando o CNPJ digitado pelo usuário

    // Validação do CNPJ
    if (inputCNPJ.length !== 14) {
        document.getElementById('resultado').innerHTML = `<p>CNPJ inválido. O CNPJ deve ter 14 dígitos.</p>`;
        return;
    }

    const url = `https://brasilapi.com.br/api/cnpj/v1/${inputCNPJ}`;

    try {
        const resposta = await fetch(url); // Fazendo a requisição

        if (!resposta.ok) {//verifica se a resposta da propriedade 'ok' do objeto 'resposta' é verdadeira
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log(dados);

        mostrarResultado(dados);

    } catch (erro) {
        console.error('Erro: ', erro);
        let mensagemErro = 'Erro ao buscar CNPJ.';
        if (erro.message.includes('404')) {
            mensagemErro = 'CNPJ não encontrado.';
        } else if (erro.message.includes('NetworkError')) {
            mensagemErro = 'Erro de conexão. Verifique sua internet.';
        }
        document.getElementById('resultado').innerHTML = `<p>${mensagemErro}</p>`;
    }
}

function mostrarResultado(dados) {
    // Verifica se cnaes_secundarios existe e é um array
    /*Antes de mapear cnaesSecundarios, é importante verificar se a propriedade existe e se é um array. 
    Caso contrário, o código pode lançar um erro.*/
    const cnaesSecundarios = dados.cnaes_secundarios && Array.isArray(dados.cnaes_secundarios) ? dados.cnaes_secundarios.map(cnae => 
            
            `<li>${cnae.codigo} - ${cnae.descricao}</li>`

        ).join('') : '<li>Nenhum CNAE secundário encontrado.</li>';

    // Exibe os dados da empresa
    document.getElementById('resultado').innerHTML = `
        <h2>Informações da Empresa: </h2>
        <p><strong>Nome Fantasia:</strong> ${dados.nome_fantasia || 'Não disponível'}</p>
        <p><strong>Razão social:</strong> ${dados.razao_social || 'Não disponível'}</p>
        <p><strong>CNPJ:</strong> ${dados.cnpj}</p>
        <p><strong>Endereço:</strong> ${dados.logradouro}, ${dados.numero}, ${dados.bairro}, ${dados.municipio} - ${dados.uf}</p>
        <p><strong>Telefone:</strong> ${dados.telefone || 'Não informado'}</p>
        <h3>CNAEs Secundários:</h3>
        <ul>${cnaesSecundarios}</ul>
        <p><strong>Mais imformações:</strong> <a href="https://brasilapi.com.br/api/cnpj/v1/${dados.cnpj}" target="_blank">Abrir em outra pagina.</a></p>
    `;
}

function exportarParaPDF() {

    const { jsPDF } = window.jspdf; 
    //Desestrutura a biblioteca jsPDF do objeto global 'window.jspdf'. Essa biblioteca permite a criação de arquivos PDF no navegador

    const doc = jsPDF();
    //Cria uma nova instância da biblioteca jsPDF e armazena na variável 'doc' e inicializa ela. Será utilizada para gerar o PDF e os elementos de texto

    const titulo = "";

    const subTituloY = 10;

    let y = 20;

    doc.setFontSize(16);

    doc.text(titulo, 10, subTituloY);

    doc.setFontSize(12);

    const resultado = document.querySelectorAll('#resultado p, #resultado h2');

    resultado.forEach((item, index) => {

        let linhaAtual = item.textContent;

        let splitTexto = doc.splitTextToSize(linhaAtual, 180);

        splitTexto.forEach((linha, i) =>{

            if(y > 280){

                doc.addPage();

                y = 10;

            }

            if(item.tagName === 'H2' && i === 0){

                doc.setFontSize(14);

                doc.text(linha, 10, y);

                doc.setFontSize(12);

            }else{

                doc.text(linha, 10, y);

            }

            y += 10;

        });

    });

    doc.save('Informações-empresa.pdf');
    
}

/*function exportarParaExel(){

    const wb = XLSX.utils.book_new();

    const ws_data = [];

    const resultado = document.querySelectorAll('#resultado p, #resultado h2');

    resultado.forEach((item) => {

        ws_data.push([item.texContent]);

    })

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, "Informações");

    XLSX.writeFile(wb, 'informações-empresa.xlsx');

}*/

/**
 * Export displayed company information to an Excel file.
 * This function gathers the information shown in the 'resultado' element
 * and exports it into an Excel file named 'informações-empres.xlsx'.
 */
function exportarParaExel() {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Initialize an array to hold worksheet data
    const worksheetData = [];
    
    // Select all paragraph and heading elements within the 'resultado' div
    const results = document.querySelectorAll('#resultado p, #resultado h2');

    // Iterate over each selected element to extract its text content
    results.forEach((item) => {
        worksheetData.push([item.textContent]); // Add the text content to worksheet data
    });

    // Convert the array of arrays into a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Append the worksheet to the workbook with the name 'Informações'
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Informações');
    
    // Write the workbook to a file named 'informações-empres.xlsx'
    XLSX.writeFile(workbook, 'informações-empres.xlsx');
}
