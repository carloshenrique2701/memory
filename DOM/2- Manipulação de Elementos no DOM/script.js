document.getElementById('mudarTexto').addEventListener('click', function() {
    
    var titulo = document.getElementById('titulo');

    titulo.textContent =  'Celoko num compensas'

});
document.getElementById('modificarHTML').addEventListener('click', function() {
    
    var conteudo = document.getElementById('conteudo');

    conteudo.innerHTML = '<p>Nada haver doido!</p>';

});
document.getElementById('adicionarElemento').addEventListener('click', function() {
    
    var novoElemento = document.createElement('p');

    novoElemento.textContent = 'Bora BILL!'

    document.body.appendChild(novoElemento)

});
document.getElementById('removerElemento').addEventListener('click', function() {
    
    var conteudo = document.getElementById('conteudo');

    if(conteudo.firstChild){

        conteudo.removeChild(conteudo.firstChild)
    }

});
document.getElementById('substituirElemento').addEventListener('click', function() {
    
    var novoElemento = document.createElement('p');

    novoElemento.textContent = "La elee";

    var conteudo = document.getElementById('conteudo');

    if(conteudo.firstChild){

        conteudo.replaceChild(novoElemento, conteudo.firstChild)

    }

});