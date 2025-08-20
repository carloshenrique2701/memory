document.getElementById('gerarTabuada').addEventListener('click', function() {
    
    const numero = parseFloat(document.getElementById('tabuada-input').value);

    if(numero === '' || isNaN(numero)) {

        alert('Por favor, insira um número.');

        return;

    }

    const resultado = document.getElementById('tabuada');

    const lista = document.createElement('ul');

    resultado.innerHTML = '';

    for (let i = 1; i <= 10; i++) {

        const item = document.createElement('li');

        item.textContent = `${numero} x ${i} = ${numero * i}`;

        lista.appendChild(item);

    }

    resultado.appendChild(lista);

})