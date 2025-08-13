class ContaBancaria{

    constructor(titular, saldoInicial){

        this.titular = titular;
        this.saldo = saldoInicial;

    }

    depositar(valor){

        this.saldo += valor;

        console.log(`\n---Deposito de ${valor} foi realzado com sucesso. Saldo atual: ${this.saldo}`);

    }

    saque(valor){

        if(valor > this.saldo){

            console.log(`\n°°°Saldo insuficiente para um saque de ${valor}`);

        } else{

            this.saldo -= valor;
            
            console.log(`\n***Saque de ${valor} foi realzado com sucesso. Saldo atual: ${this.saldo}`);

        }

    }

    verificarSaque(){

        console.log(`\nSaldo atual: ${this.saldo}`);

    }

}

const pessoa = new ContaBancaria('Carlos', 2000)

pessoa.depositar(500);
pessoa.saque(10000);
pessoa.depositar(200);
pessoa.saque(444);

pessoa.verificarSaque();

pessoa.depositar(100);
pessoa.saque(50)
pessoa.depositar(62);
pessoa.saque(23.90)
pessoa.depositar(10);
pessoa.saque(44.89)
pessoa.depositar(97.11);

pessoa.verificarSaque();