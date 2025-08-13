class Pessoa {
    constructor(nome, idade) {
        
        this.nome = nome;
        this.idade = idade;

    }

    imprimirDados(){

        console.log(`Nome: ${this.nome}`);
        console.log(`Idade: ${this.idade}`);
        console.log(``);

    }
}

class Aluno extends Pessoa {
    constructor(nome, idade, matricula) {
        
        super(nome, idade);
        this.matricula = matricula;

    }

    imprimirDados(){

        console.log(`Nome: ${this.nome}`);
        console.log(`Idade: ${this.idade}`);
        console.log(`Matrícula: ${this.matricula}`);
        console.log(``);

    }
}

class Professor extends Pessoa{

    constructor(nome, idade, departamento){

        super(nome, idade);
        this.departamento = departamento

    }

    imprimirDados(){

        console.log(`Nome: ${this.nome}`);
        console.log(`Idade: ${this.idade}`);
        console.log(`Departamento: ${this.departamento}`);
        console.log(``);

    }

}

const professor = new Professor('Tarsillo', 43, 'Design de Web');
professor.imprimirDados();

const aluno = new Aluno('Carlos', 19, 202410573);
aluno.imprimirDados();