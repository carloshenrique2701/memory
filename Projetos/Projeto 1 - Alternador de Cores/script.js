document.getElementById('botao').addEventListener('click', function() {
    
    const corAleatoria = Math.floor(Math.random() * 1562473).toString(16);

    document.body.style.background = "#" + corAleatoria;

});