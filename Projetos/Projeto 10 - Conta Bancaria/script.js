let usuarioLogado = null; // Variável global para armazenar o usuário logado

function registro() {
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const numeroDaConta = Math.floor(Math.random() * 100000);
    const usuario = {
        senha: senha,
        conta: numeroDaConta,
        saldo: 0,
        historico: []
    };

    localStorage.setItem(nome, JSON.stringify(usuario));
    alert('Usuário registrado com sucesso!');
    limparCampos();
}

function login() {
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    const dadosUsuario = JSON.parse(localStorage.getItem(nome));

    if (dadosUsuario && dadosUsuario.senha === senha) {
        usuarioLogado = nome;
        document.querySelector('.inicio').style.display = 'none';
        document.getElementById('entrada').style.display = 'block';
        document.getElementById('nomeRegistrado').innerText = nome;
        document.getElementById('numeroDaConta').innerText = `Conta: ${dadosUsuario.conta}`;
        document.getElementById('saldo').innerText = `Saldo: R$${formatarSaldo(dadosUsuario.saldo)}`;
    } else {
        alert('Usuário ou senha inválidos.');
    }
}

function formatarSaldo(saldo) {
    return saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}                              //Retorna um string de acordo com a conversão de número do BR

function logout() {
    usuarioLogado = null;
    document.querySelector('.inicio').style.display = 'block';
    document.getElementById('entrada').style.display = 'none';
    limparCampos();
}

function exibirDeposito() {
    ocultarTelas();
    document.getElementById('depositar').style.display = 'block';
}

function exibirSaque() {
    ocultarTelas();
    document.getElementById('sacar').style.display = 'block';
}

function exibirHistorico() {
    ocultarTelas();
    const dadosUsuario = JSON.parse(localStorage.getItem(usuarioLogado));
    const historico = dadosUsuario.historico;
    const caixaDeValores = document.getElementById('valores');

    caixaDeValores.innerHTML = ''; // Limpa o conteúdo anterior

    if (historico.length === 0) {
        caixaDeValores.innerHTML = '<p>Nenhuma transação registrada.</p>';
    } else {
        historico.reverse().forEach(transacao => {
            caixaDeValores.innerHTML += `<p>${transacao.tipo}: R$${formatarSaldo(transacao.valor)}</p>`;
        });
    }

    document.getElementById('historico').style.display = 'block';
}

function ocultarTelas() {
    document.getElementById('depositar').style.display = 'none';
    document.getElementById('sacar').style.display = 'none';
    document.getElementById('historico').style.display = 'none';
}

function depositar() {
    const valor = parseFloat(document.getElementById('quantidadeDepositada').value);
    const dadosUsuario = JSON.parse(localStorage.getItem(usuarioLogado));

    if (valor > 0 && !isNaN(valor)) {
        dadosUsuario.saldo += valor;
        dadosUsuario.historico.push({ tipo: 'Depósito', valor: valor });
        localStorage.setItem(usuarioLogado, JSON.stringify(dadosUsuario));
        document.getElementById('saldo').innerText = `Saldo: R$${formatarSaldo(dadosUsuario.saldo)}`;
        alert('Depósito realizado com sucesso!');
        ocultarTelas();
    } else {
        alert('Valor inválido.');
    }
}

function sacar() {
    const valor = parseFloat(document.getElementById('quantidadeSacada').value);
    const dadosUsuario = JSON.parse(localStorage.getItem(usuarioLogado));

    if (valor > 0 && !isNaN(valor) && valor <= dadosUsuario.saldo) {
        dadosUsuario.saldo -= valor;
        dadosUsuario.historico.push({ tipo: 'Saque', valor: valor });
        localStorage.setItem(usuarioLogado, JSON.stringify(dadosUsuario));
        document.getElementById('saldo').innerText = `Saldo: R$${formatarSaldo(dadosUsuario.saldo)}`;
        alert('Saque realizado com sucesso!');
        ocultarTelas();
    } else {
        alert('Valor inválido ou saldo insuficiente.');
    }
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('senha').value = '';
}