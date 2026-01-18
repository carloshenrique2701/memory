let dados = [];

let paises = new Set();
let estados = new Set();
let cidades = new Set();

document.getElementById("pais").addEventListener('change', function () {
    
    filtrarDados();

    atualizarEstados();

});

document.getElementById("estado").addEventListener('change', function () {
    
    filtrarDados();

    atualizarCidades();

});

document.getElementById("cidade").addEventListener('change', function () {
    
    filtrarDados();

});

function filtrarDados() {

    const cidadeSelecionado = document.getElementById('cidade').value;
    const estadoSelecionado = document.getElementById('estado').value;
    const paisSelecionado = document.getElementById('pais').value;
    
    const tabelaBody = document.querySelector('#tabela tbody');

    tabelaBody.innerHTML = '';

    const dadosFiltrados = dados.filter(item => {

        return (

            (item.Pais === paisSelecionado || paisSelecionado === '') &&
            (item.Estado === estadoSelecionado || estadoSelecionado === '') &&
            (item.Cidade === cidadeSelecionado || cidadeSelecionado === '') 

        );

    });

    dadosFiltrados.forEach(item => {

        const linha = tabelaBody.insertRow();

        linha.insertCell(0).textContent = item.Pais;
        linha.insertCell(1).textContent = item.Estado;
        linha.insertCell(2).textContent = item.Cidade;

    })

}

function atualizarCidades() {

    const estadoSelecionado = document.getElementById('estado').value;
    const paisSelecionado = document.getElementById('pais').value;

    cidades.clear();

    dados.forEach(item => {

        if (item.Estado === estadoSelecionado || !estadoSelecionado) {
            
            cidades.add(item.Cidade)

        }

    });

    popularCombosbox('cidade', cidades)
    
}
function atualizarEstados() {

    const paisSelecionado = document.getElementById('pais').value;

    estados.clear();

    dados.forEach(item => {

        if (item.Pais === paisSelecionado || !paisSelecionado) {
            
            estados.add(item.Estado)

        }

    });

    popularCombosbox('estado', estados)
    
}

function carregarExcel() {
    
    fetch('Cidades.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {

            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets['Dados'];

            dados = XLSX.utils.sheet_to_json(ws);

            popularCombosboxes();

            filtrarDados();

        })
    .catch(error => console.error('Erro ao carregar o arquivo: ', error));

}

function popularCombosboxes() {
    
    dados.forEach(item => {

        paises.add(item.Pais)
        estados.add(item.Estado)
        cidades.add(item.Cidade)


    });

    popularCombosbox('pais', paises);
    popularCombosbox('estado', estados);
    popularCombosbox('cidade', cidades);

}

function popularCombosbox(id, valores) {
    
    const combobox = document.getElementById(id);

    combobox.innerHTML = '<option value="">Todos</option>';

    valores.forEach(valor => {

        const option = document.createElement('option');

        option.value = valor;

        option.text = valor;

        combobox.add(option);

    })

}

carregarExcel();