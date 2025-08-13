let indiceAtual = 0;

function mostrarImagem(indice) {
    
    const imagensTop = document.querySelectorAll('.slides-top');
    const imagensDown = document.querySelectorAll('.slides-down');

    if(indice >= imagensTop.length)indice = 0;
    if(indice < 0)indice = imagensTop.length - 1;

    imagensTop.forEach(img=>{

        img.style.display = 'none';

    });
    
    imagensTop[indice].style.display = 'block';
    
    indiceAtual = indice;

    if(indice >= imagensDown.length)indice = 0;
    if(indice < 0)indice = imagensDown.length - 1;

    imagensDown.forEach(img=>{

        img.style.display = 'none';

    });
    
    imagensDown[indice].style.display = 'block';
    
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

