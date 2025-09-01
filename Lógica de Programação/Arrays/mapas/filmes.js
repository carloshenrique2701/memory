let filmesAvaliados = new Map();

function adicionarFilme(filme, avaliacao) {
    filmesAvaliados.set(filme, avaliacao);
    
    console.log(`\n${filme}| adicionado.
         ${avaliacao}★  `);
}

function excluirFilme(filme) {

    if(filmesAvaliados.has(filme)){

        filmesAvaliados.delete(filme);

        console.log(`\n${filme} removido.`);

    }else{

        console.log(`\nO filme ${filme} não foi encontrado`);

    }
}

function exibirFilmes() {

    console.log('Filmes listados:')
    
    filmesAvaliados.forEach((avaliacao, filme)=>{

        console.log(`${filme}: ${avaliacao}★`)

    });

}

function verificarFilme(filme) {
    
    if(filmesAvaliados.has(filme)){

        console.log(`\n${filme} está na lista.`);

    }else{

        console.log(`\n${filme} não está na lista.`);

    }

}


adicionarFilme('The last of us', 4.5);
adicionarFilme('The Hulk', 5);
adicionarFilme('Thor: Amor e Trovão', 1.5);
adicionarFilme('Deadpool', 5);
adicionarFilme('Herry Potter e o cálice de fogo', 4.5);
adicionarFilme('Jogos Vorazes', 5);


excluirFilme('Thor: Amor e Trovão');

exibirFilmes();

verificarFilme('The Hulk');
verificarFilme('Pantera Negra');