document.addEventListener('DOMContentLoaded', function () {
    
    const vermelho = document.querySelector('.vermelho');
    const amarelo = document.querySelector('.amarelo');
    const verde = document.querySelector('.verde');

    let estadoAtual = 0;

    function alterarEstado() {
        
        vermelho.classList.remove('ativo');
        amarelo.classList.remove('ativo');
        verde.classList.remove('ativo');

        if(estadoAtual === 0){

            vermelho.classList.add('ativo');
    
        }else if (estadoAtual === 1) {
            
            amarelo.classList.add('ativo');
    
        }else if (estadoAtual === 2) {
            
            verde.classList.add('ativo');
    
        }


        estadoAtual = (estadoAtual + 1) % 3;

        /*Se estadoAtual for 0:

estadoAtual + 1 resulta em 1.

1 % 3 retorna 1 (porque 1 dividido por 3 tem resto 1).

estadoAtual agora é 1.

Se estadoAtual for 1:

estadoAtual + 1 resulta em 2.

2 % 3 retorna 2 (porque 2 dividido por 3 tem resto 2).

estadoAtual agora é 2.

Se estadoAtual for 2:

estadoAtual + 1 resulta em 3.

3 % 3 retorna 0 (porque 3 dividido por 3 tem resto 0).

estadoAtual agora é 0.

E o ciclo se repete:

Depois de 2, o valor volta para 0, criando um loop entre 0, 1 e 2. */
    }

    setInterval(alterarEstado, 1500);

    const lights = document.querySelectorAll('.semaforo div');

    lights.forEach(light => {

        light.addEventListener('click', () =>{

            lights.forEach(l => l.classList.remove('ativo'));

            light.classList.add('ativo');

        });
    }); 
});



