document.getElementById('btnTitulo').addEventListener('click', function() {
    
    var titulo = document.getElementById('titulo');

    document.getElementById('inputTitulo').value = titulo.textContent;

});

document.getElementById('btnItenstag').addEventListener('click', function() {
    
    var itensLista = document.getElementsByTagName('li');

    var texto = [];

    for (var i = 0; i < itensLista.length; i++){

        texto.push(itensLista[i].textContent);

    }

    document.getElementById('inputItenstag').value = texto.join(" ");

});

document.getElementById('btnMensagemClass').addEventListener('click', function() {
    
    var mensagens = document.getElementsByClassName('mensagem');

    var texto = [];

    for (var i = 0; i < mensagens.length; i++){

        texto.push(mensagens[i].textContent);

    }

    document.getElementById('inputMensagemClass').value = texto.join(" ");
});

document.getElementById('btnPrimeiroItem').addEventListener('click', function() {
    
    var primeiroItem = document.querySelector('li');

    document.getElementById('inputPrimeiroItem').value = primeiroItem.textContent;

});

document.getElementById('btnTodosItens').addEventListener('click', function() {
    
    var todosItens = document.querySelectorAll('li');

    var texto = [];

    todosItens.forEach(function(item) {
        
        texto.push(item.textContent);

    });

    document.getElementById('inputTodosItens').value = texto.join(' ');

})