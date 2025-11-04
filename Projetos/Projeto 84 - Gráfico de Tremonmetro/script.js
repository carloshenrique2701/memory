window.onload = function (){

    desenharTermometro(0);//Valor inicial = 0

}

function desenharTermometro(valor) {
    
    var canvas = document.getElementById('graficoTermometro');

    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(valor > 100) valor = 100;//Garante que não utrapasse de 100%

    ctx.beginPath();
    /*
    Inicia um novo caminho no contexto gráfico, ou seja, começa a definir uma nova figura
        a ser desenhada.
    Isso é necessário antes de começar a desenhar formas como arcos ou retângulos.
    */

    ctx.arc(50, 350, 40, 0 , 2 * Math.PI);
    /*
    Desenha um arco que será a base circular do termômetro.
    Os primeiros definem um circulo com centro em ( 50, 350) e raio de 40 pixels.
    O arco em 0 radianos e termina em 2pi radianos, formando um circulo completo.
    */

    ctx.rect(30, 50, 40, 300);
    /*
    Desenha um retângulo que será o corpo do termômetro.
    O retângulo tem a posição inicial em (30, 50) e dimensões de 40 pixels de largura e 300 
        pixels de altura 
    */

    ctx.fillStyle = '#ddd';
    /*
    Define a cor de preenchimento para as formas do termômetro(circulo e retângulo) desenhadas
        anteriormente.
    */

    ctx.fill();
    /*
    Preenche as formas desenhadas com a cor especificada no 'fillStyle'.
    */

    var cores = [

        {limite:25, cor: '#ff0000'},
        {limite:50, cor: '#ffd700'},
        {limite:75, cor: '#1fe90ff'},
        {limite:100, cor: '#32cd32'}

    ]

    var alturaAnterior = 0; 
    /*
    Vriável que rastreia o limite percentual da faixa anterior para calcular corretamente
        a altura de cada faixa colorida no
    */

    for (var i = 0; i < cores.length; i++) {
        
        if (valor >= cores[i].limite) {

            ctx.fillStyle = cores[i].cor;

            ctx.fillRect(30, 350 - ( 300 * cores[i].limite / 100), 40, (300 * ( cores[i].limite - alturaAnterior) / 100));
            /*
            Desenha um retângulo colorido que representa a faixa atual.
            -O primeiro valor representa a posição x(30)
            -O segundo é calculado para começar na posição y correta, ajustando pela altura
            -O terceiro, 40, é largura
            -O quarto é a altura, calculda para preencher a porcentagem da faixa desde a 
                'alturaAnterior' até o limite atual.
            */
        } else{

            ctx.fillStyle = cores[i].cor;

            ctx.fillRect(

                30,
                350 - (300 * valor / 100),

                40,
                (300 * (valor - alturaAnterior) / 100)

            );

            break;
        
        }

        alturaAnterior = cores[i].limite;        
    }

    ctx.beginPath();

    ctx.arc(50, 350, 40, 0, 2 * Math.PI);
        //  x,  y ,radius, startAngle, endAngle

    ctx.rect(30, 50, 40, 300);
        //   x,  y, width, height

    ctx.lineWidth = 2;
    /*Define a largura dalinha usada para desenhar o contorno do termômetro */

    ctx.strokeStyle = "#000";//Cor da linha

    ctx.stroke();//Aplica

    ctx.fillStyle = "#000";

    ctx.font = '14px Arial';

    for (var i = 0; i <= 100; i += 10) {

        var y = 350 - (300 * i / 100);
        //Calcula posicao y para cada marca de porcentagem ajustando com base no 'i'

        ctx.fillText(i+ '%', 110, y + 5); // Desenha a porcentagem
        
    }

    ctx.beginPath();

    ctx.arc(50, 350, 40, 0, 2 * Math.PI); //Desenha um circulo na base do termômetro 

    ctx.fillStyle = '#FF0000';

    ctx.fill();

    ctx.lineWidth = 2;

    ctx.strokeStyle = '#000'

    ctx.stroke();

    ctx.fillStyle = '#000';

    ctx.font = '16px Arial';

    ctx.textAling = 'center';

    ctx.fillText(valor + '%', 40, 355)

}

function filtrarProduto() {
    
    var select = document.getElementById('produtoSelect');

    var produto = select.value;

    var tabela = document.getElementById('tabelaVendas');

    var vendas = 0;
    var meta = 100;

    for (var i = 1, linha; linha = tabela.rows[i]; i++) {
        
        if (linha.cells[0].innerText === produto) {

            vendas = parseInt(linha.cells[1].innerText);

            break;
            
        }
        
    }

    var desempenho = (vendas / meta) * 100;

    desenharTermometro(desempenho);

}