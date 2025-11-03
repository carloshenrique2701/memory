document.addEventListener('DOMContentLoaded', function () {
    
    filtrarPorProduto()

});

function filtrarPorProduto() {
    
    var select = document.getElementById('selecionarProduto');

    var produto = select.value;

    var tabela = document.getElementById('tabela-vendas');

    var vendas = 0;
    var meta = 100;

    for (var i = 1, linha; linha = tabela.rows[i]; i++) {
        //Declara duas variáveis: 'i' e 'linha';
        //O loop continuará equanto 'tabela.rows[i]' não for 'undefined', ou seja,
            //enquanto existir uma linha na posicao 'i' da tabela, faça...
        
        if (linha.cells[0].innerText === produto) {
            //Verifica se o nome do produto da célula atual é igual ao produto selecionado
            
            vendas = parseInt(linha.cells[1].innerText)//Pega a quantidade do produto

            break;//Para o loop

        }

    }

    var desempenho = (vendas / meta) * 100;//Percentual da meta em relação a meta

    desenharGraficoWaffle(desempenho);

}

function desenharGraficoWaffle(valor) {

    var grade = document.querySelector('.grafico-waffle .grade');

    var percentual = document.querySelector(".grafico-waffle .percentual");

    grade.innerHTML = '';

    var quebradorPreenchidos = Math.round((valor/100) * 100);
    //Arredonda para o inteiro mais próximo

    for (let i = 0; i < 100; i++) {
        
        var quadrado = document.createElement('div');

        if (i < quebradorPreenchidos) {
            
            quadrado.classList.add('preenchido');

        }

        grade.prepend(quadrado);
        //O método 'prepend' adiciona cada novo quadrado ao início da grade.
        //Isso resulta nos quadrados sendopreenchidos de baixo pra cima, preenchendo primeiro
            //os quadrados inferiores;
        
    }

    percentual.innerHTML = Math.round(valor) + '%';
    //Arredonda para o inteiro mais próximo
    
}