const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let reservas = new Map();

function menu() {
    console.log(`\nEscolha uma opção:
    1. Reservar sala;
    2. Verificar disponibilidade;
    3. Cancelar Reserva;
    4. Exibir reservas;
    5. Sair.`);

    r1.question('Opção: ', (action) => {
        let acao = parseInt(action);

        if (isNaN(acao)) {
            console.log('Opção inválida. Digite uma opção válida...');
            menu();
        } else {
            switch (acao) {
                case 1:
                    reservarSala();
                    break;
                case 2:
                    verificarDisponibilidade();
                    break;
                case 3:
                    cancelarReserva();
                    break;
                case 4:
                    exibirReservas();
                    break;
                case 5:
                    console.log('Finalizando sistema...');
                    r1.close();
                    break;
                default:
                    console.log('Opção inválida. Digite uma opção válida...');
                    menu();
                    break;
            }
        }
    });
}

function fazerPergunta(pergunta) {
    return new Promise((resolve) => {
        r1.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

function formatarHorario(hora) {
    const horas = Math.floor(hora);
    const minutos = Math.round((hora - horas) * 60);
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
}

async function reservarSala() {
    const nome = await fazerPergunta("Qual o nome do evento? ");
    const sala = parseInt(await fazerPergunta(`Qual a sala que deseja? `));
    const hora = parseFloat(await fazerPergunta("Qual é o horário? "));

    if (isNaN(sala) || isNaN(hora)) {
        console.log(`Sala ou horário inválidos. Por favor, insira números adequados...`);
        menu();
    } else {
        if (reservas.has(nome)) {
            console.log('Nome de evento já existente.');
            menu();
        } else {
            const reservaKey = `${sala}-${formatarHorario(hora)}`;
            if (reservas.has(reservaKey)) {
                console.log(`A sala ${sala} já está reservada às ${formatarHorario(hora)}.`);
                menu();
            } else {
                const reserva = { nome: nome, sala: sala, horario: formatarHorario(hora) };
                reservas.set(reservaKey, reserva); // Armazena a reserva com uma chave única

                console.log(`${nome}, às ${formatarHorario(hora)}, na sala ${sala} foi adicionado à lista de reservas.`);
                menu();
            }
        }
    }
}

async function verificarDisponibilidade() {
    const sala = parseInt(await fazerPergunta(`Qual a sala que deseja? `));
    const hora = parseFloat(await fazerPergunta("Qual é o horário? "));

    if (isNaN(sala) || isNaN(hora)) {
        console.log(`Sala ou horário inválidos. Por favor, insira números adequados...`);
        menu();
    } else {
        const reservaKey = `${sala}-${formatarHorario(hora)}`;
        if (reservas.has(reservaKey)) {
            console.log (`A sala ${sala} não está disponível às ${formatarHorario(hora)}`);
        } else {
            console.log(`A sala ${sala} está disponível às ${formatarHorario(hora)}`);
        }
        menu();
    }
}

function cancelarReserva() {
    r1.question('Qual o nome da reserva? ', (nome) => {
        const reservaKey = Array.from(reservas.keys()).find(key => reservas.get(key).nome === nome);
        if (reservaKey) {
            reservas.delete(reservaKey);
            console.log(`\n${nome} foi removido.`);
        } else {
            console.log(`\nA reserva ${nome} não foi encontrada`);
        }
        menu();
    });
}

function exibirReservas() {
    if (reservas.size === 0) {
        console.log('Não há reservas para exibir.');
    } else {
        reservas.forEach((reserva) => {
            console.log(`Reserva para ${reserva.nome}, na sala ${reserva.sala}, às ${reserva.horario}`);
        });
    }
    menu();
}

menu();