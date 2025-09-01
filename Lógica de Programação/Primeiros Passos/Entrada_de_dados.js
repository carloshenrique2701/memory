/* 
const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});

r1.question('Olá, qual é o seu nome? ', (resposta) => {

    console.log(`Olá, ${resposta}`);

    r1.close();

})
*/

const readline = require("readline");

const r1 = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});

function fazerPergunta(pergunta){

    return new Promise ((resolve) => {
        
        r1.question(pergunta, (resposta) => {

            resolve(resposta); 
            
        });

    });

}

async function coletarRepostas(){

    const nome = await fazerPergunta('Qual o seu nome?');
    const cor = await fazerPergunta('Qual sua cor favorita?');
    const animal = await fazerPergunta('Qual o seu animal favorito?');
    const hobby = await fazerPergunta('Qual o seu hobby favorito?');
    const food = await fazerPergunta('Qual a sua comida favorita?');


    console.log(`\nAqui estão suas respostas:
        Nome: ${nome}
        Cor favorita: ${cor}
        Animal favorito: ${animal}
        Hobby favorito: ${hobby}
        Comida favorita: ${food}
        `);

        r1.close();
}

coletarRepostas();
