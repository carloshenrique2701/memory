function gerarNumeroAleatorio(min, max) {/* SIMPLESMENTE MAGIA */
    
    return Math.floor(Math.random() * (max - min + 1)) + min;

}
/*

Como funciona A MAGIA:

Math.random() gera um número decimal aleatório entre 0 (inclusive) e 1 (exclusive).

Multiplicar por (max - min + 1) ajusta o intervalo para o tamanho desejado.

Math.floor arredonda o número para baixo, garantindo que seja um número inteiro.

Somar min garante que o número esteja dentro do intervalo desejado.

*/


function gerarCPF() {
    
    let digitosCPF = Array.from({ length: 9}, () => gerarNumeroAleatorio(0,9));
    /**Cria um array com 9 elementos, onde cada elemento é um número aleatório entre 0 e 9.

        Exemplo de resultado: [1, 2, 3, 4, 5, 6, 7, 8, 9]. 
        
    */

    let soma = digitosCPF.reduce((acc, curr, idx)=>{

        return acc + curr * (10 - idx);
        
    });

    /**
        * Calcula a soma ponderada dos 9 primeiros dígitos.

        Cada dígito é multiplicado por um peso decrescente, começando em 10.

        Exemplo:

        Para [1, 2, 3, 4, 5, 6, 7, 8, 9], a soma seria:

        1*10 + 2*9 + 3*8 + 4*7 + 5*6 + 6*5 + 7*4 + 8*3 + 9*2 = 210 
    */

    let primeiroDigito = soma % 11 < 2 ? 0: 11 - (soma % 11);

    /*
        Calcula o primeiro dígito verificador:

        Se o resto da divisão da soma por 11 for menor que 2, o dígito é 0.

        Caso contrário, o dígito é 11 - (soma % 11).

        Exemplo:

        Se soma % 11 for 1, o dígito é 0.

        Se soma % 11 for 5, o dígito é 11 - 5 = 6.

        O dígito é adicionado ao array digitosCPF: 

    */

    digitosCPF.push(primeiroDigito);

    soma = digitosCPF.reduce((acc, curr, idx) =>{

        return acc + curr * (11 -idx);

    }, 0);

    /*
        Agora, a soma ponderada é calculada para os 10 dígitos (9 iniciais + primeiro dígito verificador).

        Os pesos agora começam em 11.

        Exemplo:

        Para [1, 2, 3, 4, 5, 6, 7, 8, 9, 6], a soma seria:

        Copy
        1*11 + 2*10 + 3*9 + 4*8 + 5*7 + 6*6 + 7*5 + 8*4 + 9*3 + 6*2 = 231

    */

    let segundoDigito = soma % 11 < 2 ? 0 : 11 - (soma%11);

    /*
        Calcula o segundo dígito verificador usando a mesma lógica do primeiro dígito.

        Exemplo:

        Se soma % 11 for 0, o dígito é 0.

        Se soma % 11 for 4, o dígito é 11 - 4 = 7.

        O dígito é adicionado ao array digitosCPF:
    */

    digitosCPF.push(segundoDigito);

    /*
        Converte o array de dígitos em uma string.

        Exemplo:

        Se digitosCPF for [1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 7], o CPF gerado será "12345678967". 

    */

    return digitosCPF.join('');

}

function formatarCPF(cpf) {/*ISSO JÁ É MAGIA DAS TREVAS */
    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    /* 
    
        \d: Corresponde a qualquer dígito (0-9).

        {3}: Indica que o padrão anterior (\d) deve ocorrer exatamente 3 vezes.

        (): Cria grupos de captura. Cada grupo captura uma parte específica do CPF.

        A regex divide o CPF em 4 grupos:

        (\d{3}): Os primeiros 3 dígitos.

        (\d{3}): Os próximos 3 dígitos.

        (\d{3}): Os próximos 3 dígitos.

        (\d{2}): Os últimos 2 dígitos.

            Exemplo:

        Para o CPF "12345678901", a regex captura:

        Grupo 1: "123"

        Grupo 2: "456"

        Grupo 3: "789"

        Grupo 4: "01"

    */

    /*
        Método replace:

        O método replace substitui a parte do texto que corresponde à regex pelo formato desejado.

            °Primeiro argumento: A regex que define o padrão a ser substituído.

            °Segundo argumento: A string de substituição, que usa os grupos capturados.

        No código: '$1.$2.$3-$4'

        $1, $2, $3 e $4 são referências aos grupos capturados pela regex.

        O formato $1.$2.$3-$4 insere os pontos (.) e o hífen (-) nos lugares corretos.

            Exemplo:

        Para o CPF "12345678901", o replace faz o seguinte:

        Substitui "12345678901" por "123.456.789-01". 
    */


    /*

        Resumo:
        A regex captura os 11 dígitos do CPF e os divide em 4 grupos.

        O replace usa esses grupos para montar o CPF no formato XXX.XXX.XXX-XX.
     
    */   
}

function principal() {
    
    const campoCPF = document.getElementById('cpf');

    const botaoGerarCPF = document.getElementById('gerar-cpf');

    botaoGerarCPF.addEventListener('click', () =>{

        const novoCPF = gerarCPF();

        const cpfFormatado = formatarCPF(novoCPF);

        campoCPF.value = cpfFormatado;

    });

}

document.addEventListener('DOMContentLoaded', principal);

