function numeroPorExtenso(numero) {
    // Arrays que armazenam as palavras para unidades, dezenas, números especiais (11 a 19), centenas e classes (mil, milhão, etc.)
    const unidades = ['zero', 'Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove'];
    const dezenas = ['', 'Dez', 'Vinte', 'Trinta', 'Quarenta', 'Cinquenta', 'Sessenta', 'Setenta', 'Oitenta', 'Noventa'];
    const especiais = ['Onze', 'Doze', 'Treze', 'Quatorze', 'Quinze', 'Dezesseis', 'Dezessete', 'Dezoito', 'Dezenove'];
    const centenas = ['', 'Cem', 'Duzentos', 'Trezentos', 'Quatrocentos', 'Quinhentos', 'Seiscentos', 'Setecentos', 'Oitocentos', 'Novecentos'];
    const classes = [["",""], ["mil", "mil"], ["milhão", "milhões"], ["bilhão", "bilhões"], ["trilhão", "trilhões"]];

    // Função para converter uma parte do número (unidade, dezena, centena) em palavras
    function converterParte(num) {
        // Caso especial para números entre 11 e 19
        if (num < 20) return especiais[num - 11];
        // Caso especial para o número 10
        if (num === 10) return "Dez";
        // Caso especial para números entre 11 e 19 (repetido, pode ser removido)
        if (num < 20) return especiais[num];
        // Caso para números entre 20 e 99
        if (num < 100) {
            let dec = Math.floor(num / 10); // Pega a dezena
            let uni = num % 10; // Pega a unidade
            return dezenas[dec] + (uni ? " e " + unidades[uni] : ""); // Concatena dezena e unidade
        }
        // Caso para números entre 100 e 999
        if (num < 1000) {
            let cem = Math.floor(num / 100); // Pega a centena
            let resto = num % 100; // Pega o resto (dezenas e unidades)
            return (cem === 1 && resto === 0 ? "Cem" : centenas[cem]) + (resto ? " e " + converterParte(resto) : ""); // Concatena centena e o resto
        }
        // Caso para números maiores que 999
        return formatarNumero(Math.abs(numero));
    }

    // Função para formatar o número completo, dividindo-o em partes de até 3 dígitos (unidade, milhar, milhão, etc.)
    function formatarNumero(num) {
        // Caso especial para o número zero
        if (num == 0) return "Zero";

        let indice = 0; // Índice para controlar a classe (unidade, milhar, milhão, etc.)
        let partes = []; // Array para armazenar as partes do número em palavras

        // Loop para processar o número em partes de 3 dígitos
        while (num > 0) {
            let pedaco = num % 1000; // Pega os últimos 3 dígitos
            let prefixo = converterParte(pedaco); // Converte essa parte em palavras

            // Adiciona o sufixo correspondente à classe (mil, milhão, etc.)
            if (pedaco > 0) {
                let sufixo = classes[indice][pedaco > 1 ? 1 : 0]; // Escolhe o sufixo singular ou plural
                prefixo += " " + sufixo; // Concatena o prefixo e o sufixo
            }

            // Adiciona a parte formatada ao array de partes, se não estiver vazia
            if (prefixo.trim() !== "") {
                partes.unshift(prefixo); // Adiciona no início do array para manter a ordem correta
            }

            num = Math.floor(num / 1000); // Remove os 3 dígitos já processados
            indice++; // Avança para a próxima classe (milhar, milhão, etc.)
        }

        // Retorna as partes concatenadas com " e ", removendo espaços extras
        return partes.length > 0 ? partes.join(" e ").replace(/\s+/g, ' ').trim() : "Zero";
    }

    // Retorna o número completo formatado em palavras
    return formatarNumero(Math.abs(numero));
}

// Função para converter um número decimal (com reais e centavos) em palavras
function converterParaExtenso() {
    // Obtém o valor do campo de entrada e converte para número
    let numero = parseFloat(document.getElementById("numeroInput").value);

    // Separa a parte inteira (reais) e a parte decimal (centavos)
    let reais = Math.floor(numero);
    let centavos = Math.round((numero - reais) * 100);

    // Converte a parte dos reais em palavras e adiciona "Real" ou "Reais"
    let extensoReais = numeroPorExtenso(reais) + (reais === 1 ? ' Real' : ' Reais');

    // Converte a parte dos centavos em palavras e adiciona "Centavo" ou "Centavos", se houver centavos
    let extensoCentavos = centavos > 0 ? numeroPorExtenso(centavos) + (centavos === 1 ? ' Centavo' : ' Centavos') : "";

    // Concatena reais e centavos em uma única string
    let resultado = extensoReais;
    if (extensoCentavos) resultado += ' e ' + extensoCentavos;

    // Exibe o resultado no elemento com id 'resultado', capitalizando a primeira letra
    document.getElementById('resultado').textContent = capitalizarPrimeiraLetra(resultado);
}

// Função para capitalizar a primeira letra de uma string e deixar o restante em minúsculas
function capitalizarPrimeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Adiciona um listener para quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Adiciona um listener para o evento de pressionar uma tecla no campo de entrada
    document.getElementById('numeroInput').addEventListener('keypress', function (e) {
        // Verifica se a tecla pressionada foi "Enter"
        if (e.key === 'Enter') {
            // Impede o comportamento padrão do "Enter" (submeter o formulário)
            e.preventDefault();
            // Chama a função para converter o número em palavras
            converterParaExtenso();
        }
    });
});