const readline = require("readline").createInterface({

    input: process.stdin,

    output: process.stdout
    
});


function makeQ(pergunta){

        return new Promise((resolve) => {

            readline.question(pergunta, (resposta) => {

                resolve(resposta);

            });

        });

}

async function resp(){
    const nome = await makeQ('Qual é o seu nome?');
    const idade = await makeQ('Qual é a sua idade?');
    const city = await makeQ('Qual cidade você mora?');

    console.log(`\nSua fixa:
        Nome: ${nome}
        idade: ${idade}
        Cidade: ${city} 
        `);

        readline.close();
}

resp();



