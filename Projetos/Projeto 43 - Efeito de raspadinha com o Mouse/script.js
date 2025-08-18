document.addEventListener('DOMContentLoaded', () => {

    const tela = document.getElementById('tela');

    const contexto = tela.getContext('2d');
    // Acessa o contexto de renderização 2D do canvas. Esse contexto
            // fornece as funcionalidades necessárias para desenhar e
            // manipular imagens e gráficos no canvas.
    // O método 'getContext' com o parâmetro '2d' retorna um
            // objeto que representa um contexto de desenho bidimensional.

    const imagem = new Image();

    imagem.src = 'imgs/imagem-superior.jpg';

    imagem.onload = function() {

        tela.width = 500;
        tela.height = 500;

        contexto.drawImage(imagem, 0, 0, tela.width, tela.height);

        contexto.globalCompositeOperation = 'destination-out';
        // Configura o modo de composição do contexto de
                // desenho para 'destination-out'. 
        // Isso define como as formas e imagens subsequentes serão
                // desenhadas em relação às que já existem no canvas.
        // 'destination-out' faz com que o conteúdo desenhado apague o
                // conteúdo existente onde ambos se sobrepõem, criando um
                // efeito onde, por exemplo, movimentos de mouse podem "apagar"
                // partes da imagem mostrando o que estiver abaixo.
        
    }

    tela.addEventListener('mousemove', function(e) {

        const retangulo = tela.getBoundingClientRect();

        
        const x = e.clientX - retangulo.left;
        const y = e.clientY - retangulo.top;

        // Inicia um novo caminho, ou reinicia o caminho atual, que é
                // um conjunto de sub-caminhos, ou formas.
        contexto.beginPath();

        // Desenha um arco (parte de um círculo) no canvas. 
        // 'x' e 'y' definem o centro do arco.
        // '30' é o raio do arco em pixels. Este valor pode ser
                // ajustado para aumentar ou diminuir o tamanho
                // do círculo desenhado.
        // '0' e '2 * Math.PI' são os ângulos de início e fim do
                // arco, desenhando um círculo completo.
                // Altere o valor 30 para ajustar o tamanho do círculo
        contexto.arc(x, y, 30, 0, 2 * Math.PI);

        contexto.fill();
        // Preenche o caminho atual ou dado com o estilo de
                // preenchimento atual, usando a regra de
                // preenchimento não-zero, 
        // que determina quais partes do canvas devem ser
                // preenchidas com base no caminho traçado.

    })

});