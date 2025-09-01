let tela = '';

function adicionar(string) {

    const exibirInput = document.getElementById('tela');
    
    tela += string;

    exibirInput.value = tela;

}

function exibirResultado() {

    try{

    let calculo = eval(tela);

    const exibirInput = document.getElementById('tela');

    exibirInput.value = calculo.toFixed(2);

    tela = calculo.toString();

    } catch{
        
        alert('Expressão inválida!');
        limpar();

    }

}

/*

try {
    // Código que pode gerar um erro
} catch (erro) {
    // Código executado se ocorrer um erro
} finally {
    // Código executado sempre, independentemente de erro
}

Como funciona:

//Bloco try:

Contém o código que pode gerar uma exceção (erro).

Se um erro ocorrer, a execução do bloco try é interrompida, e o controle é passado para o bloco catch.

//Bloco catch:

É executado apenas se um erro ocorrer no bloco try.

Recebe como parâmetro um objeto de erro (erro), que contém informações sobre o que deu errado.

Pode ser usado para tratar o erro, exibir uma mensagem ao usuário ou realizar alguma ação corretiva.

//Bloco finally (opcional):

É executado sempre, independentemente de um erro ter ocorrido ou não.

Geralmente usado para liberar recursos ou realizar ações de limpeza.


*/

function limpar() {

    tela = '';

    const exibirInput = document.getElementById('tela');

    exibirInput.value = '';
    
}

// Captura as teclas pressionadas no campo de entrada
document.addEventListener('keydown', function (event) {

    const tecla = event.key;

    // Verifica se a tecla pressionada é válida
    if (/[0-9+\-*/.=]|Backspace|Enter/.test(tecla)) {

        if (tecla === 'Enter') {

            // Se a tecla Enter for pressionada, calcula o resultado
            exibirResultado();
            event.preventDefault(); // Impede o comportamento padrão do Enter

        } else if (tecla === 'Backspace') {

            // Se a tecla Backspace for pressionada, remove o último caractere
            tela = tela.slice(0, -1);
            const exibirInput = document.getElementById('tela');
            exibirInput.value = tela;
            event.preventDefault(); // Impede o comportamento padrão do Backspace

        } else {

            // Adiciona o caractere à tela
            adicionar(tecla);

        }
    } else {

        // Bloqueia teclas inválidas
        event.preventDefault();

    }
});