document.getElementById('calcular').addEventListener('click', function() {

    
    const salarioAntigo = document.getElementById('salarioAntigo').value;
    const salarioAtual = document.getElementById('salarioAtual').value;

    if(salarioAntigo === salarioAtual) {
        alert('Os salários antigos e atuais devem ser diferentes. Por favor, insira valores diferentes');
        return;
    } else if(salarioAntigo > salarioAtual) {
        
        const decremento = salarioAntigo - salarioAtual;
        document.getElementById('valorAumento').innerText = `Valor do desconto: R$${decremento.toFixed(2)}`;
        document.getElementById('percentualAumento').innerText = `Percentual de desconto: ${((decremento / salarioAntigo) * 100).toFixed(2)}%`;

    }else{

        const aumento = ((salarioAtual - salarioAntigo) / salarioAntigo) * 100;

        document.getElementById('valorAumento').innerText = `Valor do aumento: R$${(salarioAtual - salarioAntigo).toFixed(2)}`;
        document.getElementById('percentualAumento').innerText = `Percentual de aumento: ${aumento.toFixed(2)}%`;

    }    

});