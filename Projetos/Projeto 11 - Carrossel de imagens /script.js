let indiceAtual = 0;

function mostrarImagem(indice) {
    
    const imagens = document.querySelectorAll('.imagens-carrossel img');

    if(indice >= imagens.length)indice = 0;
    if(indice < 0)indice = imagens.length - 1;

    imagens.forEach(img=>{

        img.style.display = 'none';

    });
    
    imagens[indice].style.display = 'block';
    
    indiceAtual = indice;

}

function mover(direcao) {

    mostrarImagem(indiceAtual + direcao);
    
}

document.addEventListener('DOMContentLoaded', () => {
                            //Evento que é disparado qnd o carregamento do html é terminado, sem esperar por folhas de estilo imgs ou subframes
    mostrarImagem(indiceAtual);

    setInterval(() => mover(1), 5000);
    //setInterval cria um temporizador que chama a função mover a cada 5000 milisegundos

});

function selecionarImagem(indice) {

    mostrarImagem(indice);
    
}
