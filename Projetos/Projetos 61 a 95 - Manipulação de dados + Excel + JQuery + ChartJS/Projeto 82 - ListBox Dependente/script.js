let dados = [];

let paises = new Set();
let estados = new Set();
let cidades = new Set();

document.getElementById('pais').addEventListener('click', function (event) {
    
    if (event.target.tagName === 'LI') {
        
        toggleSelection(event.target);

        atualizarEstados();

        atualizarCidades();

        filtrarDados();

    }

});

document.getElementById('estado').addEventListener('click', function (event) {
    
    if (event.target.tagName === 'LI') {
        
        toggleSelection(event.target);

        atualizarCidades();

        filtrarDados();

    }

});

document.getElementById('cidade').addEventListener('click', function (event) {
    
    if (event.target.tagName === 'LI') {
        
        toggleSelection(event.target);

        filtrarDados();

    }

});

function carregarExcel() {
    
    fetch('Cidades.xlsx')
        .then(res => res.arrayBuffer())
        .then(data => {
            const wb = XLSX.read(data, {type: 'array'});

            const ws = wb.Sheets['Dados'];

            dados = XLSX.utils.sheet_to_json(ws);

            popularListbox('pais', extrairUnicos('Pais'));

            filtrarDados();

        })
    .catch(erro => console.error('Erro ao carregar o arquivo: ', erro));

}

function extrairUnicos(coluna) {
    
    //Retorna um novo conjunto (Set) a partir dos valores de uma coluna específica do 
        //array 'dados'.
    //A funçao 'map' é usada para transformar o array 'dados', extraindo o valor da coluna 
        // especificada de cada objeto no array.
    //O operador '...' (spread) é usado para expandir os elementos od Set em um novo array.
    //Sets automaticamente removem duplicatas, então o array resultante terá apenas valores 
        //únicos.
    return [...new Set(dados.map(item => item[coluna]))];

}

function filtrarDados() {
    
    const paisesSelecionados = obterValoresSelecionados('pais');
    const estadosSelecionados = obterValoresSelecionados('estado');
    const cidadesSelecionados = obterValoresSelecionados('cidade');

    const tabelaBody = document.querySelector('#tabela tbody');

    tabelaBody.innerHTML = '';

    const daodsFiltrados = dados.filter( item => {

        //Verifica se cada item dos dados corresponde a qualquer valor selecionado nos 
            //filtros de país, estado e cidade.
        //Se uma categoria estiver vazia, todos os itens são considerados como correspondentes 
            // para essa categoria.
        return (paisesSelecionados.length === 0 || paisesSelecionados.includes(item.Pais)) &&
                (estadosSelecionados.length === 0 || estadosSelecionados.includes(item.Estado)) &&
                (cidadesSelecionados.length === 0 || cidadesSelecionados.includes(item.Cidade));

    });

    daodsFiltrados.forEach(item => {

        const row = tabelaBody.insertRow();
        console.log('inserindo dados na tabela')

        row.insertCell(0).textContent = item.Pais;
        row.insertCell(1).textContent = item.Estado;
        row.insertCell(2).textContent = item.Cidade;


    })

}

function popularListbox(id, valores) {
    
    const listbox = document.getElementById(id);

    listbox.innerHTML = '';

    valores.forEach(valor => {

        const li = document.createElement('li');

        li.textContent = valor;

        listbox.appendChild(li);

    })

}

function toggleSelection(element) {

    //Adiciona e se ja tiver adicionado, remove.
    element.classList.toggle('selected');

}

function obterValoresSelecionados(id) {
    
    const listbox = document.getElementById(id);

    //Encontra todos os elementos com classe '.selected' no 'listbox' e utiliza do 
        // 'Array.from' para converter o NodeList retornado em um array JS real.
    //'.map' é, então, usado para extrair o texto de cada elemento li selecionado.
    return Array.from(listbox.querySelectorAll('.selected')).map(li => li.textContent);

}

function atualizarEstados() {
    
    const paisesSelecionados = obterValoresSelecionados('pais');

    if (paisesSelecionados.length > 0) {
        
        estados.clear();

        dados.forEach(item => {

            if (paisesSelecionados.includes(item.Pais)) {
                
                estados.add(item.Estado);

            }

        })

        popularListbox('estado', estados);

    } else {

        document.getElementById('estado').innerHTML = '';
        document.getElementById('cidade').innerHTML = '';

    }

}

function atualizarCidades() {
    
    const estadosSelecionados = obterValoresSelecionados('estado');

    if (estadosSelecionados.length > 0) {
        
        cidades.clear();

        dados.forEach(item => {

            if (estadosSelecionados.includes(item.Estado)) {
                
                cidades.add(item.Cidade);

            }

        })

        popularListbox('cidade', cidades);

    } else {

        document.getElementById('cidade').innerHTML = '';

    }

}

carregarExcel();