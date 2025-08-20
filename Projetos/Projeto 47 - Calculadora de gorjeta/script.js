document.getElementById('calcularPorcentagem').addEventListener('click', function() {
    
    const total = parseFloat(document.getElementById('valorTotal').value);
    const gorjeta = parseFloat(document.getElementById('porcentagem').value);

    if(isNaN(total) || isNaN(gorjeta)){ 
        alert('Por favor, insira valores numériocos válidos.');
        return;
    }
    

    const gorjetaTotal = (total * gorjeta) / 100;

    const totalComGorjeta = total + gorjetaTotal;

    document.getElementById('resultado').innerText = 
    `
        Valor da gorjeta: R$  ${gorjetaTotal.toFixed(2)}
        Valor total da conta: R$ ${totalComGorjeta.toFixed(2)}
    `;

});