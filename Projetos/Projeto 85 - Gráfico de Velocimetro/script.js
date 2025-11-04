window.onload = function () {
    
    desenharGrafico(0);

}

function desenharGrafico(valor) {
    
    var canvas = document.getElementById('graficoVelocimetro');

    var ctx = canvas.getContext('2d');//Obtém o contexto de renderização e desenhos

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Desenha o arco do velocimetro
    ctx.beginPath();

    ctx.arc(200, 250, 180, Math.PI, 2 * Math.PI);

    ctx.lineWidth = 20;

    ctx.strokeStyle = '#ddd';

    ctx.stroke();

    //Seções de marcação no arco acima medido em radianos
    var secoes = [

        {inicio: Math.PI, fim: Math.PI + Math.PI / 4, cor: '#ff0000'},
        {inicio: Math.PI + Math.PI / 4, fim: Math.PI + Math.PI / 2, cor: '#ffd700'},
        {inicio: Math.PI + Math.PI / 2, fim: Math.PI + 3 * Math.PI / 4, cor: '#1e90ff'},
        {inicio: Math.PI + 3 * Math.PI / 4, fim: 2 * Math.PI, cor: '#32cd32'}

    ]

    //Pinta as divisões do medidor
    secoes.forEach(secao => {

        ctx.beginPath();

        ctx.arc(200, 250, 180, secao.inicio, secao.fim);

        ctx.strokeStyle = secao.cor;

        ctx.stroke();

    });

    //Não deixa o valor ultrapassa 100
    if (valor > 100) valor = 100;

    //calcula o angulo do ponteiro com base no valor fornacido
    var angulo = Math.PI + (valor / 100) * Math.PI;

    //Desenha o ponteiro 
    ctx.beginPath();

    ctx.moveTo(200, 250);

    ctx.lineTo(200 + 180 * Math.cos(angulo), 250 + 180 * Math.sin(angulo));//Aplica o angulo
            //          X                  ,            Y
            //O tamanho depende da posicao do x e do y, não com: 30px por exemplo
    ctx.lineWidth = 5;

    ctx.strokeStyle = '#000';

    ctx.stroke();

    //Desenha a base do ponteiro
    ctx.beginPath();

    ctx.arc(200, 250, 10, 0, 2 * Math.PI);

    ctx.fillStyle = '#000';

    ctx.fill();

}

function filtrarPorProduto() {

    var select = document.getElementById('produtoSelect');
    var tabela = document.getElementById('tabelaVendas');

    var produto = select.value;

    var vendas = 0;

    var meta = 100;

    for (var i = 1, linha; linha = tabela.rows[i]; i++) {
        
        if (linha.cells[0].innerText === produto) {
            
            vendas = parseInt(linha.cells[1]. innerText);

            break;

        }
        
    }

    var desempenho = (vendas / meta) * 100;
    /*
    matematicamente é desnecessário quando a meta é 100. Porém, em termos de boas práticas 
    de programação, a forma atual é mais robusta e fácil de manter, pois comunica claramente 
    a intenção e permite futuras alterações na meta sem precisar reescrever a lógica.
     */

    desenharGrafico(desempenho)
    
}