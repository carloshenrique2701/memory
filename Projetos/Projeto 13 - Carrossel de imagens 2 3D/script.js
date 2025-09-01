document.addEventListener('DOMContentLoaded', ()=>{

    const slides = document.querySelectorAll('.slide');

    const btnAnterior = document.querySelector('.anterior');
    const btnProximo = document.querySelector('.proximo');

    let anguloAtual = 0;

    const anguloPorSlide = 360 / slides.length;/*Calcula o angulo de rotacão necessário para cada slide */

    function atualizarSlides() {
        
        slides.forEach((slide, index)=>{

            const angulo = anguloAtual + index * anguloPorSlide;//calcula o angulo para cada slide adicionando o angulo atual co carrossel ao angulo calculado com base na posição do indice. O resutado é o angulo especifico q o slide deve ser posicionado no carrossel

            const radianos = angulo * Math.PI / 180;//converte graus para radianos(funções trigonométricas)

            const elevacao = Math.cos(radianos) * 680;//calcula profundidade dp slide no cosseno do angulo em radianos. Dps multiplica em 600 para ajustar a escala de elevação dentro do espaço visual

                //Define a transformação CSS do slide para 
            // posicioná-lo dentro do carrossel. 
                // 'rotateY' gira o slide ao redor do eixo Y pelo 
            // ângulo calculado, orientando-o de acordo 
            // com sua posição no carrossel. 
                // 'translatez move o slide ao longo do eixo Z para 
            // dentro ou para fora do plano da tela, aqui 
            // fixado em 700px para todos os slides para dar profundidade. 
                // 'translatey' move o slide ao longo do eixo Y para 
            // cima ou para baixo; usa a elevação 
            // calculada apenas se ela for negativa, 
            // o que ocorre quando o slide está atrás do ponto 
            // central na visualização 30, fazendo com 
            // que ele apareça mais baixo no visor. 
                // Math.abs(elevacao) é usado para converter quaisquer
            // que ele apareça mais baixo no visor. 
                // Math.abs(elevacao) é usado para converter quaisquer 
            // valores negativos de elevação para positivos, 
            // garantindo que o deslocamento seja sempre para cima.
            slide.style.transform = `rotateY(${angulo}deg) translateZ(700px) translateY(${elevacao < 0 ? Math.abs(elevacao) : 0}px)`;
          
        })

    }

    btnAnterior.addEventListener('click', ()=>{

        anguloAtual -= anguloPorSlide;

        atualizarSlides();

    });
    btnProximo.addEventListener('click', ()=>{

        anguloAtual += anguloPorSlide;

        atualizarSlides();

    });

    setInterval(()=>{

        anguloAtual += anguloPorSlide;

        atualizarSlides();

    }, 5000)

    atualizarSlides();

});