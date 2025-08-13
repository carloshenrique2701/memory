document.addEventListener('DOMContentLoaded', function () {
    
    renderizarContatos();

});

function obterContatos() {
    
    return JSON.parse(localStorage.getItem('contatos') || '[]');
    //Retorna os contatos que estão armazenados no armazenamento local, se nao tiver nada, retorna um array vazio

}

function adicionarContato() {

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const novoContato = {id: Date.now(), nome, email, telefone};

    const contatos = obterContatos();

    contatos.push(novoContato);

    salvarContatos(contatos);

    renderizarContatos();

    limparCampos();
   
}

function limparCampos() {
    
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';

}

function renderizarContatos(contatos = obterContatos()) {
    
    const tbody = document.getElementById('tabelaContatos').getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';//para nao repetir os elementos quando a função for chamada novamente

    contatos.forEach(function(contato) {
        
        const tr = document.createElement('tr');//Cria um tr no html

        tr.innerHTML = `<td>${contato.nome}</td>
                        <td>${contato.email}</td>
                        <td>${contato.telefone}</td>
                        <td>
                        
                            <button onclick="editarContato(${contato.id})">Alterar</button>
                            <button onclick="excluirContato(${contato.id})">Excluir</button>

                        </td> `//isso é adicionado no html num loop foda

       tbody.appendChild(tr);

       atualizarTotalContatos(contatos.length);

    });
};

function salvarContatos(contatos) {
    //Armazena ou atuaaliza os itens no armazenamento local
    localStorage.setItem('contatos', JSON.stringify(contatos)); 
                                    //converte o array contatos em uma string JSON antes de armazena-lo.
    //Este método faz com que os contatos sejam armazenados no navegador de forma persistente, permitindo recuperá-la entre sessões do navegador
}

function atualizarTotalContatos(total) {
    
    document.getElementById('totalContatos').textContent = `Total de Contatos: ${total}`;
    //Define um valor para o trem com id de "totalContatos"

}

function editarContato(id) {

    const contatos = obterContatos();

    const contato = contatos.find(c => c.id === id);

    if (contato) {
        
        document.getElementById('nome').value = contato.nome;
        document.getElementById('email').value = contato.email;
        document.getElementById('telefone').value = contato.telefone;

        excluirContato(id);

    }
    
}

function excluirContato(id) {

    let contatos = obterContatos();

    contatos = contatos.filter(contato => contato.id !== id);//Pega dos os contatos que diferem do id e, logo em seguida, ele salva os contatos, exceto o que foi deixado de lado;

    salvarContatos(contatos);

    renderizarContatos();
    
}


function filtrarContatos() {
    
    const filtro = document.getElementById('filtro').value.toLowerCase();
                                                            //Faz com que o texto de entrada seja minúsculo, garantindo uma busca insensível a maiúsculas ou minúsculas
    const contatos = obterContatos();

    const filtrados = contatos.filter(contato =>
         contato.nome.toLowerCase().includes(filtro) ||
         contato.email.toLowerCase().includes(filtro) ||
         contato.telefone.includes(filtro)
    );

    renderizarContatos(filtrados);

}