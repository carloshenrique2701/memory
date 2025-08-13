var botao = document.getElementById('botaoClick');

botao.addEventListener('click', function(event) {
    
    alert('Sai fora');

    event.preventDefault();

});

var areaHover = document.getElementById('areaHover');

areaHover.addEventListener('mouseover', function() {
    
    areaHover.style.backgroundColor = 'blue'

});

areaHover.addEventListener('mouseout', function() {
    
    areaHover.style.backgroundColor = 'crimson'

});

document.addEventListener('DOMContentLoaded', function() {
    
    alert('O documento foi completamente carregado e analisado')

});

function alertaBotao() {
    
    alert('Este Alerta não será mais mostrado após a remoção do ouvinte')

}


document.body.addEventListener('click', function() {
    
    alert('Click detectado no corpo da página');

}, false);



botao.addEventListener('click', alertaBotao);

setTimeout(function() {
    
    botao.removeEventListener('click', alertaBotao);

}, 5000);