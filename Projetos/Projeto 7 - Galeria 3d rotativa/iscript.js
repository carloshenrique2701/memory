let caixa = document.querySelector('.caixa');

function abrirImagem(numero) {
    
    let url = ` imagem.html?imagem=imagem${numero}.jpg&descrição=${numero}`;

    window.open(url, '_black');

}

