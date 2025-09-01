class Funcionario{
    #nome;
    #idade;
    constructor(nome, idade) {
        
        this.#nome = nome;
        this.#idade = idade;

    }

    #calcularSalário(horasTrabalhadas, taxaHora){

        return horasTrabalhadas * taxaHora;

    }

    exibirSalario(horasTrabalhadas, taxaHora){

        const salario = this.#calcularSalário(horasTrabalhadas, taxaHora);

        console.log(`O salário de ${this.#nome} é de R$${salario}.`);

    }

    getNome(){

        return this.#nome;

    }

    getIdade(){

        return this.#idade;

    }
}

const funcionario1 = new Funcionario('Carlos', 19);
const funcionario2 = new Funcionario('Maria', 23);
const funcionario3 = new Funcionario('Vanessa', 32);

funcionario1.exibirSalario(40, 938.98);
funcionario2.exibirSalario(72, 879.21);
funcionario3.exibirSalario(36, 780.20);
