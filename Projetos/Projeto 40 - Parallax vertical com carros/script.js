document.getEventListener('scroll', function () {

    const elementosParallax = document.querySelectorAll('.parallax');

    elementosParallax.forEach(function(elemento) {

        let deslocamento = window.pageYOffset;

        elemento.style.backgroundPositionY = `${deslocamento * 0.7}px`;

    });

});
/**
 * Esse leitor de eventos do scroll do mouse, faz com que o parallax se mova junto com o scroll da pagina 
 * de maneira dinamica. Ajusta a posição y do background do parallax conforme o scroll da pagina, multiplicando
 * o 'delocamento' por 0.7, criando um efeito do fundo movento lentamente durante a rolagem, acentuando a sensação
 * de profundidade.
 */ 
