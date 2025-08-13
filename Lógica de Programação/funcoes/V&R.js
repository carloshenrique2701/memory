function hparaM(horas) {

    let minutos = horas * 60;
    return minutos;
    
}

const ex1 = hparaM(34);

console.log(`34 horas equivale á ${ex1} minutos`);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

function verifacarAno(ano) {
    let anoF;

    if((ano % 4 === 0 & ano % 100 !== 0) || ano % 400 === 0){
        anoF = `O ano ${ano} é bissexto`;
    }else {
        anoF = `O ano ${ano} não é bissexto`;
    }
    return anoF;
    
}

const ex2 = verifacarAno(2100);

console.log(ex2)
