document.getElementById('alterarEstilo').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    paragrafo.style.color =  'blue';
    paragrafo.style.fontFamily =  'Arial';
    
});

document.getElementById('adicionarClasse').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    paragrafo.classList.add('destaque');

});

document.getElementById('removerClasse').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    paragrafo.classList.remove('destaque');

});

document.getElementById('alterarClasse').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    paragrafo.classList.toggle('fundo-azul');//adiciona ou remove a classe indicada

})