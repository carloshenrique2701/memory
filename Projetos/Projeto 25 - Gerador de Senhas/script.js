document.addEventListener('DOMContentLoaded', () =>{

    const botaoGerar = document.getElementById('gerar');

    const divSenha = document.getElementById('senha');

    botaoGerar.addEventListener('click', () =>{

        const comprimento= parseInt(document.getElementById('comprimento').value);

        const incluirMaiusculas = document.getElementById('incluir-maiusculas').checked;
        const incluirespeciais = document.getElementById('incluir-especiais').checked;
        const incluirnumeros = document.getElementById('incluir-numeros').checked;

        const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
        const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const caracteresEspeciais = '!@#$%&*+-=§/°()_^[]{}|';
        const numeros = '0123456789'

        let conjuntoCaracteres = letrasMinusculas;

        if(incluirMaiusculas) conjuntoCaracteres += letrasMaiusculas;

        if(incluirespeciais) conjuntoCaracteres += caracteresEspeciais;

        if(incluirnumeros) conjuntoCaracteres += numeros;

        if (conjuntoCaracteres.length == 0) {
            
            divSenha.innerHTML = 'Por favor, selecione pelo menos um critério para gerar a senha.';

            return;

        } 

        let senha = '';

        for (let i = 0; i < comprimento; i++) {
           
            const indiceAleatorio = Math.floor(Math.random() * conjuntoCaracteres.length);
                                                                        // ^conta os caracteres
            senha += conjuntoCaracteres[indiceAleatorio];
            
        }

        if(incluirnumeros && !/\d/.test(senha)){
                            //verifica se a senha gerada atualmente nao tenha nenhum digito numerico. A expressão '/\d/' busca digitos numericos. A funcao '.test(senha)' retorna verdadeira se encontrar algum digito
            const indiceAleatorio = Math.floor(Math.random() * senha.length);

            const indiceDigitoAleatorio = Math.floor(Math.random() * numeros.length);

            senha = senha.substring(0, indiceAleatorio) + numeros[indiceDigitoAleatorio] + senha.substring(indiceAleatorio+1);
                    //substitui a senha inserindo um digito aleatorio no indice 'indiceAleatorio'
                    //senha.substring(0, indiceAleatorio) retorna parte da senha antes do indice aleatorio
                    //senha.substring(indiceAleatorio+1) retorna parte da senha apos o indice aleatorio

                    //senha =  senha.substring(0, indiceAleatorio)  ||  numeros[indiceDigitoAleatorio]  ||  senha.substring(indiceAleatorio+1)
                    //              1°parte                                 2ºparte                             3ºparte
        }

        divSenha.innerText = senha;


 
    })

});