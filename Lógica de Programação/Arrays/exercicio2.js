/*let listaDeNomes = ['André', 'Beatriz', 'Carlos', 'Diana', 'Eduardo', 'Fernanda', 'Gabriel', 'Heloísa', 'Igor', 
    'Juliana', 'Karen', 'Lucas', 'Mariana', 'Nicolas', 'Olívia', 'Paulo', 'Quênia', 'Rafael', 'Sofia', 'Tiago', 
    'Úrsula', 'Valéria', 'Wagner', 'Xênia', 'Yara', 'Zeca', 'Aline', 'Bruno', 'Camila', 'Diego', 'Eliane', 'Felipe', 
    'Giovanna', 'Henrique', 'Isabela', 'João', 'Karina', 'Lívia', 'Márcio', 'Natália', 'Otávio', 'Priscila', 'Quirino', 
    'Renata', 'Simone', 'Tereza', 'Vitor', 'Wesley', 'Yuri', 'Zilda', 'Amanda', 'Bruna', 'Cíntia', 'Douglas', 'Evelyn', 
    'Fernando', 'Graziella', 'Humberto', 'Ingrid', 'Júlio', 'Kelly', 'Leonardo', 'Melissa', 'Natanael', 'Osvaldo', 'Patrícia', 
    'Queila', 'Rogério', 'Silvana', 'Tatiane', 'Vanessa', 'William', 'Xavier', 'Yasmin', 'Zoraide', 'Anita', 'Bárbara', 
    'Cauê', 'Daniele', 'Erick', 'Francisco', 'Gustavo', 'Helena', 'Irene', 'Jefferson', 'Kátia', 'Lorena', 'Mário', 
    'Nícolas', 'Otília', 'Pedro', 'Quintino', 'Roberta', 'Sérgio', 'Tássia', 'Viviane', 'Wellington', 'Ximena', 'Yasmine', 
    'Zuleica', 'Alberto', 'Bianca', 'Cecília', 'Débora', 'Eduarda', 'Frederico', 'Gabriela', 'Heitor', 'Isadora', 'Joaquim', 'Keila', 
    'Luana', 'Marcos', 'Naiara', 'Orlando', 'Paloma', 'Quésia', 'Raquel', 'Samuel', 'Talita', 'Vera', 'Waldir', 'Yolanda', 'Zélia']

function filtro() {
    
    listafinal = listaDeNomes.filter(nome => nome.startsWith('A'))

    listafinal.forEach((nomes, index)=>{

        console.log(`${index+1}. ${nomes}`)
    
    })
}


filtro();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const readline = require('readline');

r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let listaDeCompras = ['1p Arroz', '4p feijão', '2p açúcar']

function menuDeOpcoes() {
    
    console.log(`

Opções:

1. Add item de compra
2. Remover item de compra
3. Mostrar a lista
4. Sair

        `);

}

function addIten() {
    
    r1.question('Digite a quantidade e o nome do item respectivamente: ', (item)=>{

        listaDeCompras.push(item);

        console.log('Item adicionado com sucesso!');

        inicializacao();
    });

}

function removeIten() {
    
    r1.question('Digite o número do item que deseja remover: ', (item)=>{

        item = parseInt(item - 1);

        if(item >= 0 && item < listaDeCompras.length){

            listaDeCompras.splice(item, 1);

            console.log('Item removido com sucesso!');

            inicializacao();

        }else{

            console.log('Item inválido');

            inicializacao();

        }

    });

}

function showItens() {
    
    listaDeCompras.forEach((nome, index)=>{

        console.log(`${index + 1}. ${nome};`);

    });

    inicializacao();

}

function inicializacao() {
    
    menuDeOpcoes();

    r1.question('Escolha: ', (opcao)=>{

        switch (opcao) {
            case '1':
                addIten();
                break;
            case '2':
                removeIten();
                break;
            case '3':
                showItens();
                break;
            case '4':
                console.log('Desligando...')
                r1.close();      
                break;
        
            default:
                console.log(`Opção inválida.`);
                inicializacao();
                break;
        }

    });
}

inicializacao();
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let listaSemFiltro = ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo', 'Fernanda', 'Gabriel', 
    'Heloísa', 'Ana', 'Bruno', 'Igor', 'Juliana', 'Carlos', 'Diana', 'Karen', 
    'Lucas', 'Ana', 'Fernanda', 'Mariana', 'Nicolas', 'Eduardo', 'Gabriel', 'Paulo', 
    'Heloísa', 'Ana', 'Bruno', 'Tiago', 'Úrsula', 'Lucas', 'Nicolas'
]

function filtro(lista) {
    
    let listaFiltrada = lista.filter((item, index) => {

        return lista.indexOf(item) === index;
        
    });

    return listaFiltrada;

}

let listaComFiltro = filtro(listaSemFiltro)

console.log('lista sem filtro.', listaComFiltro);



