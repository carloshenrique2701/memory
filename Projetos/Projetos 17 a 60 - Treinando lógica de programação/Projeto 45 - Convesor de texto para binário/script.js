function abrirModal() {
    
    document.getElementById('informacoes-modal').style.display = 'block';

}

function fecharModal() {
    
    document.getElementById('informacoes-modal').style.display = 'none';

}
//Converter Texto para binário
document.getElementById('converterTexto').addEventListener('click', function() {

    const textoEntrada = document.getElementById('textoEntrada').value;

    const resultado = document.getElementById('resultado');

    let binario = ' ';

    for (let i = 0; i < textoEntrada.length; i++) {

        const codigo = textoEntrada.charCodeAt(i);

        const binChar = codigo.toString(2).padStart(8, '0');

        binario += binChar + ' ';

    }

    resultado.value = binario;

});

//Converter Binário para Texto
document.getElementById('converterBinario').addEventListener('click', function() {

    const textoEntrada = document.getElementById('textoEntrada').value;

    const resultado = document.getElementById('resultado');

    let texto = ' ';

    const bytes = textoEntrada.replace(/\s/g, '').match(/.{1,8}/g) || [];

    for(let byte of bytes){

        const charCode = parseInt(byte, 2);

        const char = String.fromCharCode(charCode);

        texto += char;

    }

    resultado.value = texto;

});

//Ajustar a altura da textarea pela quantidade de texto que tem
document.addEventListener('DOMContentLoaded', function() {
    
        const textarea = document.getElementById('resultado');

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
            

})