function mostrarImagem(caminho) {

    const imagemGrande = document.getElementById('imagem-grande');
    const imagemZoom = document.getElementById('imagem-zoom');

    imagemGrande.src = caminho;
    imagemZoom.src = caminho;
    
};

document.getElementById('imagem-grande').addEventListener('mousemove', function(e) {
    
    const zoomContainer = document.getElementById('zoom-container');
    const zoomImagem = document.getElementById('imagem-zoom');
    const rect= this.getBoundingClientRect();
    const x = e.clientX - rect.left;//calcula a posição x do cursor, enquanto rect.left é a margem esquerda do elemento 
    const y = e.clientY - rect.top;//calcula a posição y do cursor, enquanto rect.top é a margem superior do elemento 

    const xpercent = (x/rect.width) * 100;
    const ypercent = (y/rect.height) * 100;

    zoomImagem.style.transformOrigin = `${xpercent}% ${ypercent}%`;
/*A linha const rect = this.getBoundingClientRect(); é usada para obter as informações de posição e tamanho de um elemento HTML em relação à viewport (a área visível da página no navegador). Vamos detalhar o que isso significa e como funciona:

O que é getBoundingClientRect()?
O método getBoundingClientRect() retorna um objeto do tipo DOMRect que contém as seguintes propriedades:

top: Distância do topo do elemento até o topo da viewport.

right: Distância da borda direita do elemento até a borda esquerda da viewport.

bottom: Distância da borda inferior do elemento até o topo da viewport.

left: Distância da borda esquerda do elemento até a borda esquerda da viewport.

width: Largura do elemento (incluindo padding e bordas, se houver).

height: Altura do elemento (incluindo padding e bordas, se houver).

x: Equivalente a left (distância da borda esquerda do elemento até a borda esquerda da viewport).

y: Equivalente a top (distância do topo do elemento até o topo da viewport). */

    zoomImagem.style.transform = 'scale(2)';
    zoomContainer.style.display = 'block';

});

document.getElementById('imagem-grande').addEventListener('mouseleave', function () {
    
    const zoomImagem = document.getElementById('imagem-zoom');

    zoomImagem.style.transform = 'scale(1)';//Volta a img ao tamanho original

    const zoomField = document.getElementById('zoom-container');

    zoomField.style.display = 'none';//Esconde a div
    

});

document.addEventListener('DOMContentLoaded', function () {
    
    const listaImagens = document.getElementById('lista-imagens');

    const numImagens = 12;//numero de imagens que temos

    for (let i = 1; i <= numImagens; i++) {

        const img = document.createElement('img');

        img.src = `Imagem${i}.jpg`;

        img.alt = `Imagem ${i}`

        img.classList.add('miniatura');

        img.onmouseover = () => mostrarImagem(img.src);

        listaImagens.appendChild(img);
        
    }

});