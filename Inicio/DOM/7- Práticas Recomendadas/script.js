document.getElementById('adicionarItem').addEventListener('click', function () {
    
    var lista = document.getElementById('listaItens');

    var input = document.getElementById('novoItem');

    if(input.value.trim() !== ""){

        var novoLi = document.createElement('li');

        novoLi.textContent = input.value.trim();

        lista.appendChild(novoLi);

        input.value = ""; // Limpa o campo de entrada


    }

});

document.getElementById('listaItens').addEventListener('click', function(event) {
    
    if(event.target.tagName === 'LI'){

        alert('Você clicou em: ' + event.target.textContent);

    }

})