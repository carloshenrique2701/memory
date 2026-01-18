document.getElementById('botaoGerar').addEventListener('click', function() {
    
    const texto = document.getElementById('entradaTexto').value;

    if(texto){

        var contenedorQRCode = document.getElementById('qrcode');

        contenedorQRCode.innerHTML = '';

        var qrCode = new QRCode(contenedorQRCode, {
            text: texto,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff"
        });

        document.getElementById('botaoBaixar').style.display = 'flex';

    } else {

        alert('Por favor, insira algum texto.');

    }

});

document.getElementById('botaoBaixar').addEventListener('click', function() {

    var contenedorQRCode = document.getElementById('qrcode').getElementsByTagName('canvas')[0];

    var link = document.createElement('a');

    link.href = contenedorQRCode.toDataURL('image/png');

    link.download = 'qrcode.png';

    link.click();

});