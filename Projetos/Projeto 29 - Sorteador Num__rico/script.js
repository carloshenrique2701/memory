function sortearNumero() {
    
    const minimo = document.getElementById("numeroMinimo").value;
    const maximo = document.getElementById("numeroMaximo").value;
    const contadorElemento = document.getElementById("contador");
    const numeroSorteadoElemento = document.getElementById("numeroSorteado");

    if(isNaN(minimo) || isNaN(maximo) || minimo === "" || maximo === "" || parseInt(minimo) >= parseInt(maximo)) {
        alert("Por favor, insira valores válidos para o mínimo e máximo.");
        return;
    }

    contadorElemento.style.display = 'block';
    contadorElemento.textContent = "5";

    numeroSorteadoElemento.textContent = '';

    contadorElemento.style.opacity = '1';

    numeroSorteadoElemento.style.opacity = '0';

    let contador = 5;

    const intervalo = setInterval(() => {

        contador --;

        contadorElemento.textContent = contador;

        if(contador === 0) {

            clearInterval(intervalo);

            const numeroSorteado = Math.floor(Math.random() * (parseInt(maximo) - parseInt(minimo) + 1)) + parseInt(minimo);
            //Por exemplo, minimo = 1 e máximo = 10, um numero aleatório sera gerado no math.random() * (10 - 1 + 1) + 1, ou seja, entre 1 e 10.
            //depois que o numero aleatorio for gerado, podendo ser ate um 2,12321..., o math.floor arredonda para baixo, tornando o numero inteiro, por exemplo, 2.
            //e por fim, temos o 2, como no exemplo, + parseInt(minimo) que é 1, resultando em 3, que é o número sorteado.
            /* Resumindo: A fórmula utilizada para gerar um número aleatório entre o mínimo e o.maxcdnimo, incluindo ambos, é: Math.floor(Math.random() * (max - min + 1)) + min */
            // O Math.random() gera um número aleatório entre 0 (inclusivo) e 1 (exclusivo), multiplicado pela diferença entre o máximo e o mínimo, mais 1, para incluir o máximo. O Math.floor arredonda para baixo, garantindo que o resultado seja um número inteiro.
            // O parseInt(minimo) é adicionado para garantir que o número sorteado esteja dentro do intervalo especificado.

            contadorElemento.style.display = 'none';

            numeroSorteadoElemento.textContent = numeroSorteado;

            numeroSorteadoElemento.style.opacity = '1';

        }

    }, 1000)

}