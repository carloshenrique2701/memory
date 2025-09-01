document.addEventListener('DOMContentLoaded', () =>{

    const dataEvento = new Date('Feb 10, 2025 16:02:00').getTime();

    const intervalo = setInterval(() => {
       
        const agora = new Date().getTime();

        const distancia = dataEvento - agora;

        const dias = Math.floor(distancia / (100 * 60 * 60 * 24));
        const horas = Math.floor(distancia % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutos = Math.floor(distancia % (1000 * 60 * 60) / (1000 * 60));
        const segundos = Math.floor(distancia % (1000 * 60) / (1000));

        document.querySelector('#dias .number').textContent = dias < 10 ? '0' + dias : dias;
        document.querySelector('#horas .number').textContent = horas < 10 ? '0' + horas : horas;
        document.querySelector('#minutos .number').textContent = minutos < 10 ? '0' + minutos : minutos;
        document.querySelector('#segundos .number').textContent = segundos < 10 ? '0' + segundos : segundos;

        if (distancia < 0) {
            
            clearInterval(intervalo);

            document.querySelector('.contador').innerHTML = "<div>O evento começou!</div>"

        }

    }, 1000);

});
