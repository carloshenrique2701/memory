console.log('                       ');

function contaBancaria (titular, saldoInicial){

    this.titular = titular;

    this.saldo = saldoInicial;

    this.depositar = function (valor) {

        if(valor > 0){

            this.saldo += valor;

            console.log(`Deposito de R$${valor} realizado com sucesso. Saldo atual: R$${this.saldo}`);

        }else{

            console.log(`O valor do deposito deve ser positivo.`);

        }
        
    }

    this.sacar = function (valor) {
        
        if (valor > 0 && valor < this.saldo){

            this.saldo -= valor;

            console.log(`Saque no valor de R$${valor} realizado com sucesso. Saldo atual: R$${this.saldo}`);

        }else{

            console.log(`Verifique se o valo a ser sacado é positivo e menor que seu saldo`);

        }

    }

    this.colsultarSaldo = function () {

        console.log(`Saldo atual: R$${this.saldo}`)
        
    }

}

var minhaConta = new contaBancaria('Carlos', 2200); //cria uma instância

minhaConta.depositar(500);
minhaConta.sacar(200);
minhaConta.colsultarSaldo();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
console.log('                       ');



function Carro (marca, modelo, quilometragemInicial) {

    this.marca = marca;

    this.modelo = modelo;

    this.quilometros = quilometragemInicial;
    
    this.dirigir = function (km) {

        if (km > 0){

            this.quilometros += km;

            console.log(`Você dirigiu ${km}km. Quilometragem atual: ${this.quilometros}`);

        }else{

            console.log(`Favor insira um valor em km válido`);

        }
        
    }

    this.exibirInformacoes = function () {

        console.log(`Carro ${this.modelo} da marca ${this.marca}, tem de quilometragem: ${this.quilometros}km.`);
        
    }

}

var meuCarro = new Carro('Chevrolet', 'Opala', '450000');

meuCarro.dirigir(1200);
meuCarro.exibirInformacoes();


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
console.log('                       ');

function AjustarTempo(hora, minuto, segundo) {

    this.hora = hora;

    this.minuto = minuto;

    this.segundo = segundo;

    this.ajustarTempo = function (hr, min, sec) {
        
        this.hora = hr;
        this.minuto = min;
        this.segundo = sec;

        console.log(`Relógio ajustado. Horário atual: ${this.hora.toString().padStart(2, '0')}:${this.minuto.toString().padStart(2, '0')}:${this.segundo.toString().padStart(2, '0')}`);

    }

    this.adicionarHora = function (horas) {

        this.hora += horas;

        console.log(`Relógio ajustado (hr). Horário atual: ${this.hora.toString().padStart(2, '0')}:${this.minuto.toString().padStart(2, '0')}:${this.segundo.toString().padStart(2, '0')}`);
        
    }

    this.adicionarMinutos = function (minutos) {
        
        this.minuto += minutos; 

        while (this.minuto >= 60) { 

            this.minuto -= 60; 
            
            this.hora += 1;
        
        }   
        
        console.log(`Relógio ajustado (min). Horário atual: ${this.hora.toString().padStart(2, '0')}:${this.minuto.toString().padStart(2, '0')}:${this.segundo.toString().padStart(2, '0')}`);

    }

    this.adicionarSegundos = function (segundos) {
        
        this.segundo += segundos; 

        while (this.segundo >= 60) { 

            this.segundo -= 60; 
            
            this.minuto += 1;
        
        }     

        console.log(`Relógio ajustado (sec). Horário atual: ${this.hora.toString().padStart(2, '0')}:${this.minuto.toString().padStart(2, '0')}:${this.segundo.toString().padStart(2, '0')}`);

    }

    this.exibirHorario = function () {
        //Para usa padStart(), é necessário transformar em uma string, no caso: toString.
        // padStart(2, '0'), Faz com que tenha dois caracteres na formatação, e se não tiver, adiciona um 0 a esquerda
        console.log(`Relógio ajustado. Horário atual: ${this.hora.toString().padStart(2, '0')}:${this.minuto.toString().padStart(2, '0')}:${this.segundo.toString().padStart(2, '0')}`);

    }
    
}

var meuRelogio = new AjustarTempo(17, 48, 56);

meuRelogio.adicionarHora(223)
meuRelogio.adicionarMinutos(90);
meuRelogio.adicionarSegundos(394)
meuRelogio.exibirHorario();


meuRelogio.ajustarTempo(18, 6 ,49)










console.log('                       ');