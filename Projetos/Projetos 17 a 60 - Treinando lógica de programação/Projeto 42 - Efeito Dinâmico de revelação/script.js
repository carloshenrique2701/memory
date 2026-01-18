document.addEventListener('DOMContentLoaded', () => {

    const tela = document.getElementById('tela');

    const contexto = tela.getContext('2d');

    const imagemTopo = new Image();

    const imagemFundo = new Image();

    imagemTopo.src = 'imgs/imagem-superior.jpg'

    imagemFundo.src = 'imgs/imagem-inferior.jpg'

    let posicaoMouseX = 0, posicaoMouseY = 0;

    let raio = 100;

    function desenharImagens() {
        
        contexto.clearRect(0, 0, tela.width, tela.height);

        contexto.drawImage(imagemFundo, 0, 0, tela.width, tela.height);

        contexto.save();

        contexto.beginPath();

        contexto.arc(posicaoMouseX, posicaoMouseY, raio, 0, Math.PI * 2, true);

        contexto.clip();

        contexto.drawImage(imagemTopo, 0, 0, tela.width, tela.height);

        contexto.restore();

    }

    imagemFundo.onload = imagemTopo.onload = function () {
        
        desenharImagens();

    };

    tela.addEventListener('mousemove', function(e) {

        const retangulo = tela.getBoundingClientRect();

        posicaoMouseX = e.clientX - retangulo.left;
        posicaoMouseY = e.clientY - retangulo.top;

        desenharImagens();

    });

    tela.addEventListener('mouseout', function() {

        contexto.clearReact(0, 0, tela.width, tela.height);

        contexto.drawImage(imagemFundo, 0, 0, tela.width, tela.height);


    });

});