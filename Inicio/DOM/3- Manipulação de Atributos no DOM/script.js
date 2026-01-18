document.getElementById('modificarAtributo').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    paragrafo.setAttribute('title', 'Não somos iguais');

    document.getElementById('resultadoAtributo').textContent = 'Atributo title modificada';
});

document.getElementById('adicionarAtributo').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    paragrafo.setAttribute('style', 'color:red');//vc pode add qlqr coisa numa tag

    document.getElementById('resultadoAtributo').textContent = 'class attribute add';

});

document.getElementById('removerAtributo').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    paragrafo.removeAttribute('title');

    document.getElementById('resultadoAtributo').textContent = 'Removed title attribute'

});

document.getElementById('acessarAtributo').addEventListener('click', function() {
    
    var paragrafo = document.getElementById('paragrafo');

    var title = paragrafo.getAttribute('title');

    document.getElementById('resultadoAtributo').textContent = `The title attibute is: ${title}`;

})