document.addEventListener('DOMContentLoaded', () => {

    const scrollersLed = document.querySelectorAll('.conteudo-led');

    scrollersLed.forEach(conteudoTexto => {

        conteudoTexto.addEventListener('mouseover', function() {
            
            this.style.animationPlayState = 'paused';

        })

        conteudoTexto.addEventListener('mouseout', function() {
            
            this.style.animationPlayState = 'running';

        })
    
    });

    const scrollerRotate = document.querySelector('.conteudo-rotate');

    scrollerRotate.addEventListener('mouseover', function() {
        
        this.style.animationPlayState = 'paused';

    })

    scrollerRotate.addEventListener('mouseout', function() {
        
        this.style.animationPlayState = 'running';

    })

});