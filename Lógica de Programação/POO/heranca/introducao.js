/*
class Pai{

    constructor(nome){

        this.nomePai = nome;

    }

}

class Mae{

    constructor(nome){

        this.nomeMae = nome;

    }

}

class Filho {

    constructor(nome, pai, mae, escola){

        this.nome = nome;
        this.pai = pai.nomePai;
        this.mae = mae.nomeMae;
        this.escola = escola;

    }

}

const pai = new Pai('Varcirley');
const mae = new Mae('Claudiane');

const filho = new Filho('Carlos Henrique', pai, mae, 'CF03');

console.log(`Fihlo: ${filho.nome} | Pai: ${filho.pai} | Mãe: ${filho.mae} | Escola:${filho.escola}.`)


class Pai{

    imprimirDadosCasaPai(){

        console.log("  ----- Dados Casa Pai -----");
        console.log("Código: 1;");
        console.log("Proprietário: Vanmdersil da Lima;");
        console.log("Estado: Minas Gerais;");
        console.log("Cidade: Cabo Santo;");
        console.log("Valor: R$400.000,00");
        console.log("\n");

    }

}

class Mae{

    imprimirDadosCasaMae(){

        console.log("  ----- Dados Casa Mae -----");
        console.log("Código: 2;");
        console.log("Proprietário: Jaquelinne da Lima;");
        console.log("Estado: Minas Gerais;");
        console.log("Cidade: Cabo Verde;");
        console.log("Valor: R$831.500,00");
        console.log("\n");

    }

}

class Filho {
    constructor() {
        
        this.pai = new Pai();
        this.mae = new Mae();

    }

    imprimirDadosCasaPai(){

        this.pai.imprimirDadosCasaPai();

    }

    imprimirDadosCasaMae(){

        this.mae.imprimirDadosCasaMae();

    }

}


const dadosFilho = new Filho();

dadosFilho.imprimirDadosCasaMae();
dadosFilho.imprimirDadosCasaPai();



class Animal {

    constructor(nome) {
        this.nome = nome;
    }

    emitirSom(){

        console.log(`${this.nome} emitiu um som.`);

    }

}

class Cachorro extends Animal{

    emitirSom(){

        console.log(`${this.nome} latiu.`);

    }

}

class Gato extends Animal{

    emitirSom(){

        console.log(`${this.nome} miou.`);

    }

}

const cachorro = new Cachorro('Dino');
const gato = new Gato('Chirulipa')

cachorro.emitirSom();
gato.emitirSom();

*/

class AlunoEscolaPai{

    constructor(codigo, nome, sexo, idade){

        this.codigo = codigo;
        this.nome = nome;
        this.sexo = sexo;
        this.idade = idade;

    }

    imprimirInfos(){

        console.log(`Código: ${this.codigo}`);
        console.log(`Nome: ${this.nome}`);
        console.log(`Sexo: ${this.sexo}`);
        console.log(`Idade ${this.idade}`);
        console.log(` `);

    }

}

class AlunoEscolaFilho extends AlunoEscolaPai {
    constructor() {
        
        super(1, 'Catherine', 'Feminino', 18);

    }
}


class AlunoEscolaNeto extends AlunoEscolaPai {
    constructor() {
        
        super(2, 'Felipe', 'Masculino', 6);

    }
}

const dadosFilho = new AlunoEscolaFilho();

dadosFilho.imprimirInfos();

const dadosNeto = new AlunoEscolaNeto();

dadosNeto.imprimirInfos();










