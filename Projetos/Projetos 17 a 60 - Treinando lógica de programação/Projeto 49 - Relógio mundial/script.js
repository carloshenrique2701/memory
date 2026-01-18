const locais = [

    { nome: 'Tokyo', fuso: 9 },
    { nome: 'New York', fuso: -4 },
    { nome: 'Londres', fuso: 1 },
    { nome: 'Sydney', fuso: 10 },
    { nome: 'Moscou', fuso: 3 },
    { nome: 'São Paulo', fuso: -3 },
    { nome: 'Berlim', fuso: 2 },
    { nome: 'Paris', fuso: 2 },
    { nome: 'Brasília', fuso: -3 },
    { nome: 'Pequim', fuso: 8 },

]

function atualizarRelogios() {
    
    const containerRelogios = document.getElementById('relogios');

    containerRelogios.innerHTML = '';

    locais.forEach(local => {

        const agora = new Date();

        const horaLocal = new Date(agora.setHours(agora.getUTCHours() + local.fuso));

        const dataFormatada = horaLocal.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' });

        const horaFormatada = horaLocal.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const divRelogio = document.createElement('div');

        divRelogio.className = 'relogio';

        const divLocal = document.createElement('div');

        divLocal.className = 'local';

        divLocal.textContent = local.nome;

        const divDataHora = document.createElement('div');

        divDataHora.className = 'data-hora';

        divDataHora.textContent = `${dataFormatada} - ${horaFormatada}`;

        divRelogio.appendChild(divLocal);
        divRelogio.appendChild(divDataHora);

        containerRelogios.appendChild(divRelogio);

    });

}

setInterval(atualizarRelogios, 1000);