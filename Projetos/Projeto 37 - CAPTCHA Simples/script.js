window.onload = function() {
    
    desenharCaptcha();

}

function desenharCaptcha() {

    const canvas = document.getElementById('canvas-captcha');

    const contexto = canvas.getContext('2d');

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let textoCaptcha = '';

    for (let i = 0; i < 6; i++) {

        textoCaptcha += caracteres[Math.floor(Math.random() * caracteres.length)];

    }

    const fontes = [
        '50px Arial', '50px Tahoma', '50px Verdana', ' 45px Times New Roman', '40px Courier New', '35px Georgia',
        '30px Helvetica', '85px Impact', '43px Lucida Sans', '42px Palatino', '100px Times', '55px Arial',
        '70px Arial', '70px Tahoma', '70px Verdana', ' 65px Times New Roman', '60px Courier New', '55px Georgia'
    ];

    const fonteSelecionada = fontes[Math.floor(Math.random() * fontes.length)];

    contexto.clearRect(0, 0, canvas.width, canvas.height);

    contexto.fillStyle = '#0a2933';

    contexto.fillRect(0, 0, canvas.width, canvas.height);

    const angle = Math.random() * 0.4 - 0.1;

    contexto.translate(canvas.width / 2, canvas.height / 2);

    contexto.rotate(angle);

    contexto.font = fonteSelecionada;

    contexto.fillStyle = '#FFFFFF';

    contexto.textAlign = 'center';

    contexto.fillText(textoCaptcha, 0, 15);

    contexto.rotate(-angle);

    contexto.translate(-canvas.width / 2, -canvas.height / 2);

    if(Math.random() > 0.5){

        contexto.beginPath();

        contexto.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);

        contexto.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);

        contexto.strokeStyle = 'red';

        contexto.lineWidth = 3;

        contexto.stroke();

    }

    canvas.setAttribute('data-captcha', textoCaptcha)

}

function verificarCaptcha() {
    
    const entrada = document.getElementById('entrada-captcha').value;

    const captchaGerado = document.getElementById('canvas-captcha').getAttribute('data-captcha');

    const status = document.getElementById('status');

    if (entrada === captchaGerado) {

        status.textContent = 'Captcha correto!';
        window.location.href = 'sucesso.html';

    } else {

       status.textContent = 'Captcha incorreto!';
       status.style.color = 'red';

       setTimeout(() => {
        status.textContent = '';
       }, 2000);
       
        
        desenharCaptcha();
    }

}