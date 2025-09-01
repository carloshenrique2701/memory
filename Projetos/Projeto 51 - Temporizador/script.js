let horas = 0, minutos = 0, segundos = 0;

let intervalo;

let pausado = false;

const atualizarDisplay = () => {

    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');

}

const iniciarTemporizador = () =>{

    if(intervalo){
        clearInterval(intervalo);
    }

    horas = parseInt(document.getElementById('entrada-horas').value);
    minutos = parseInt(document.getElementById('entrada-minutos').value);
    segundos = parseInt(document.getElementById('entrada-segundos').value);

    if(horas === 0 && minutos === 0 && segundos === 0) {

        alert('Por favor, defina um tempo.');
        return;

    } 

    if(isNaN(horas)){

        horas = 0;

    } else if(isNaN(minutos)) {

        minutos = 0;

    } else if(isNaN(segundos)) {

        segundos = 0;

    }

    atualizarDisplay();

    pausado = false;

    intervalo = setInterval(() => {

        if (!pausado) {

            if(segundos === 0) {

                if(minutos === 0) {

                    if(horas === 0) {

                        clearInterval(intervalo);
                        alert('Tempo esgotado!');
                        reiniciarBotoes();
                        return;

                    } else {
                        horas--;
                        minutos = 59;
                    }

                } else {
                    minutos--;
                    segundos = 59;
                }

            } else {
                segundos--;
            }

            atualizarDisplay();

        }

    }, 1000);

    document.getElementById('iniciar').disabled = true;
    document.getElementById('pausar').disabled = false;
    document.getElementById('continuar').disabled = true;
    document.getElementById('reiniciar').disabled = false;

}


const pausarTemporizador = () =>{

    pausado = true;

    document.getElementById('iniciar').disabled = true;
    document.getElementById('pausar').disabled = true;
    document.getElementById('continuar').disabled = false;
    document.getElementById('reiniciar').disabled = false;


}

const continuarTemporizador = () =>{

    pausado = false;

    document.getElementById('iniciar').disabled = true;
    document.getElementById('pausar').disabled = false;
    document.getElementById('continuar').disabled = true;
    document.getElementById('reiniciar').disabled = false;

}

const reiniciarTemporizador = () =>{

    clearInterval(intervalo);

    horas = 0;
    minutos = 0;
    segundos = 0;

    atualizarDisplay();

    document.getElementById('iniciar').disabled = false;
    document.getElementById('pausar').disabled = true;
    document.getElementById('continuar').disabled = true;
    document.getElementById('reiniciar').disabled = true;

}

const reiniciarBotoes = () =>{

    document.getElementById('pausar').disabled = true;
    document.getElementById('continuar').disabled = true;
    document.getElementById('reiniciar').disabled = true;

}

atualizarDisplay();
reiniciarBotoes();

document.getElementById('iniciar').addEventListener('click', iniciarTemporizador);
document.getElementById('pausar').addEventListener('click', pausarTemporizador);
document.getElementById('continuar').addEventListener('click', continuarTemporizador);
document.getElementById('reiniciar').addEventListener('click', reiniciarTemporizador);
