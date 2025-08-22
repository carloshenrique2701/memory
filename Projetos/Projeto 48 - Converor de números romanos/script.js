document.getElementById('converterRomano').addEventListener('click', function() {
    
    const numero = parseInt(document.getElementById('valorEntrada').value);
    console.log(numero)
    const numeroRomano = numeroParaRomano(numero);
    document.getElementById('resultado').innerHTML = numeroRomano;

});

function numeroParaRomano(numero) {
            
        const romanos = [

            { valor: 1000, romano: 'M' },
            { valor: 900, romano: 'CM' },
            { valor: 500, romano: 'D' },
            { valor: 400, romano: 'CD' },
            { valor: 100, romano: 'C' },
            { valor: 90, romano: 'XC' },
            { valor: 50, romano: 'L' },
            { valor: 40, romano: 'XL' },
            { valor: 10, romano: 'X' },
            { valor: 9, romano: 'IX' },
            { valor: 5, romano: 'V' },
            { valor: 4, romano: 'IV' },
            { valor: 1, romano: 'I' }

        ]

        let numeroRomano = '';

        for (let i = 0; i < romanos.length; i++) {
            
            while (numero >= romanos[i].valor) {
                
                numero -= romanos[i].valor;
                numeroRomano += romanos[i].romano;
                
            }
            
        }

        return numeroRomano;


}

document.getElementById('converterDecimal').addEventListener('click', function() {
    
    const numeroRomano = document.getElementById('valorEntrada').value;
    console.log(numeroRomano)
    const numero = romanoParaNumero(numeroRomano);
    document.getElementById('resultado').innerHTML = numero;

});

function romanoParaNumero(romano) {

    const romanos = {

        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1

    }

    let numero = 0;

    for (let i = 0; i < romano.length; i++) {

        if (romanos[romano[i]] < romanos[romano[i + 1]]) {

            numero -= romanos[romano[i]];

        } else {

            numero += romanos[romano[i]];

        }

    }

    return numero;
    
}