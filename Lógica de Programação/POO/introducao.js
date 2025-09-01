/*

class Pessoa{

    constructor(nome,idade){

        this.nome = nome;
        this.idade =idade;

    }

    exibirDetalhes(){
        console.log(`\nNome: ${this.nome} | Idade: ${this.idade}`);
    }

    cumprimentar(){
        console.log(`Olá, meu nome é ${this.nome}!\n`)
    }
}

const pessoa1 = new Pessoa('Carlos', 19);

pessoa1.exibirDetalhes();

pessoa1.cumprimentar();

////////

const pessoa2 = new Pessoa('Vanessa', 26);

pessoa2.exibirDetalhes();

pessoa2.cumprimentar();

////////

const pessoa3 = new Pessoa('Mônica', 62);

pessoa3.exibirDetalhes();

pessoa3.cumprimentar();

////////

const pessoa4 = new Pessoa('Selena', 6);

pessoa4.exibirDetalhes();

pessoa4.cumprimentar();

////////

const pessoa5 = new Pessoa('Julius', 12);

pessoa5.exibirDetalhes();

pessoa5.cumprimentar();




class Carro {

    constructor(marca, nome, ano, cor) {
        
        this.marca = marca;
        this.nome = nome;
        this.ano = ano;
        this.cor = cor;
        this.velocidade = 0;

    }

    acelerar(velocidade){

        this.velocidade += velocidade;

        console.log(`Você acelerou! 
        Velocidade Atual:${this.velocidade}\n`);

    }

    desacelerar(velocidade){
        
        if(this.velocidade >= velocidade){

            this.velocidade -= velocidade;

        } else{

            this.velocidade = 0;

        }

        console.log(`Você desacelerou! 
        Velocidade Atual:${this.velocidade}\n`)
    }

    frear(){

        this.velocidade = 0

        console.log('Você freou! O carro está parado!\n')

    }

    exibirDetalhes(){

        console.log(`Marca: ${this.marca} | Nome:${this.nome} | Ano: ${this.ano} | Cor:${this.cor} | Velocidade Atual: ${this.velocidade}km/h.\n`)

    }
}



const meuCarro = new Carro('Chevrolet', 'Opala', 1971, 'Prata Metalico');

meuCarro.exibirDetalhes();

meuCarro.acelerar(30);
meuCarro.acelerar(60);
meuCarro.acelerar(10);
meuCarro.acelerar(30);
meuCarro.acelerar(24);

meuCarro.desacelerar(5);
meuCarro.desacelerar(10);
meuCarro.desacelerar(30);
meuCarro.desacelerar(100);

meuCarro.exibirDetalhes();

meuCarro.frear();

meuCarro.exibirDetalhes();


*/

class Pessoa{

    constructor(nome){

        this.nome = nome;
        this.acordado = false;
        this.comendo = false;
        this.dirigindo = false;

    }
    
    acordar(){

        if(!this.acordado){

            console.log(`${this.nome} acordou.`);
            this.acordado = true;

        } else{

            console.log(`${this.nome} já está acordado.`);

        }

    }

    dormir(){

        if(this.acordado && !this.comendo && !this.dirigindo){

            console.log(`${this.nome} foi dormir.`);

        } else if(!this.acordado){

            console.log(`${this.nome} já está dormindo.`);

        } else{

            console.log(`${this.nome} não pode dormir agora, ele está comendo ou dirigindo.`);

        }

    }

    comer(){

        if (!this.comendo && this.acordado && !this.dirigindo) {

            console.log(`${this.nome} começou a comer.`);
            this.comendo = true;
            
        } else if(this.comendo) {
            
            console.log(`${this.nome} já está comendo.`);

        } else {

            console.log(`${this.nome} não pode comer agora, ele está dormindo ou dirigindo.`);

        }

    }

    pararDeComer(){

        if(this.comendo){

            console.log(`${this.nome} parou de comer.`);
            this.comendo = false;

        } else {

            console.log(`${this.nome} não está comendo.`);

        }

    }

    dirigir(){

        if(this.acordado && !this.comendo && !this.dirigindo){

            console.log(`${this.nome} começou a dirigir.`);
            this.dirigindo = true;

        } else if(this.dirigindo){

            console.log(`${this.nome} já está dirigindo.`);

        } else{

            console.log(`${this.nome} não pode dirigir agora, ele está dormindo ou comendo.`);

        }

    }

    pararDeDirigir(){

        if(this.dirigindo){

            console.log(`${this.nome} parou de dirigir.`);
            this.dirigindo = false;

        } else{

            console.log(`${this.nome} não esta dirigindo.`);

        }

    }

}

const pessoa = new Pessoa('Carlos');

pessoa.acordar();
pessoa.comer();
pessoa.pararDeComer();
pessoa.dirigir();
pessoa.pararDeDirigir();

pessoa.dormir();
pessoa.comer();
pessoa.dirigir();

pessoa.acordar();

pessoa.comer();
pessoa.comer();
pessoa.dirigir();
pessoa.dormir();
pessoa.pararDeComer();
pessoa.pararDeDirigir();

pessoa.dirigir();
pessoa.dirigir();
pessoa.comer();
pessoa.dormir();
pessoa.pararDeDirigir();
pessoa.pararDeComer();

pessoa.dormir();


