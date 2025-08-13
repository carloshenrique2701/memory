document.addEventListener('DOMContentLoaded', () => {
    
    const abrirModalCadastroBtn = document.getElementById('abrirModalCadastroBtn');
    const modalCadastro = document.getElementById('modal-cadastro');
    const quantidadeNumeros = document.getElementById('quantidadeNumeros');
    const numerosCampos = document.getElementById('numerosCampos');
    const formularioJogo = document.getElementById('formularioJogo');

    const abrirModalSurpresinhaBtn = document.getElementById('abrirModalSurpresinhaBtn');
    const modalSurpresinha = document.getElementById('modal-surpresinha');
    const quantidadeNumerosSurpresinha = document.getElementById('quantidadeNumerosSurpresinha');
    const jogoSurpresinha = document.getElementById('jogoSurpresinha');
    const salvarSurpresinhaBtn = document.getElementById('salvarSurpresinhaBtn');

    const fecharModalSpans = document.querySelectorAll('.fechar');

    const botaoConferir = document.getElementById('conferir');
    const conferirNumerosInput = [
        document.getElementById('confereNum1'),
        document.getElementById('confereNum2'),
        document.getElementById('confereNum3'),
        document.getElementById('confereNum4'),
        document.getElementById('confereNum5'),
        document.getElementById('confereNum6'),
        document.getElementById('confereNum7'),
        document.getElementById('confereNum8'),
        document.getElementById('confereNum9'),
        document.getElementById('confereNum10'),
        document.getElementById('confereNum11'),
        document.getElementById('confereNum12'),
        document.getElementById('confereNum13'),
        document.getElementById('confereNum14'),
        document.getElementById('confereNum15')
    ];

    const listaJogos = document.getElementById('listaJogos');
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

    let numerosGeradosSurpresinha = [];

/****************************************************************************************************************************************************** */
    abrirModalCadastroBtn.onclick = () => {
        gerarCamposNúmeros(15);
        modalCadastro.style.display = 'block';
    }

    quantidadeNumeros.oninput = () => {
        const quantidade = parseInt(quantidadeNumeros.value);
        if (quantidade < 15 || quantidade > 20) {
            alert('A quantidade de números deve ser entre 15 e 20.');
            quantidadeNumeros.value = 15;
        } else {
            gerarCamposNúmeros(quantidade);
        }
    }

/****************************************************************************************************************************************************** */

    abrirModalSurpresinhaBtn.onclick = () => {
        modalSurpresinha.style.display = 'block';
        atualizarSurpresinha();
    }

    quantidadeNumerosSurpresinha.oninput = () => {
        atualizarSurpresinha();
    }   

    const atualizarSurpresinha = () => {
        const quantidade = parseInt(quantidadeNumerosSurpresinha.value);
        numerosCampos.innerHTML = '';    
        if (quantidade < 15 || quantidade > 20) {
            alert('A quantidade de números deve ser entre 15 e 20.');
            quantidadeNumerosSurpresinha.value = 15;
        } else {
            numerosGeradosSurpresinha = gerarNumerosAleatoriosSurpresinha(quantidade);
            jogoSurpresinha.textContent = `Números gerados: ${numerosGeradosSurpresinha.sort((a, b) => a - b).join(', ')}`;
        }
    }

    salvarSurpresinhaBtn.onclick = () => {
        if (numerosGeradosSurpresinha.length === 0) {
            alert('Por favor, gere os números da Surpresinha antes de salvar.');
            return;
        }
        jogos.push(numerosGeradosSurpresinha);
        localStorage.setItem('jogos', JSON.stringify(jogos));
        exibirJogos();
        modalSurpresinha.style.display = 'none';
        jogoSurpresinha.textContent = '';
        quantidadeNumerosSurpresinha.value = 15;
        numerosGeradosSurpresinha = [];
    }

/****************************************************************************************************************************************************** */

     formularioJogo.onsubmit = (event) => {
        event.preventDefault();

        const quantidade = parseInt(quantidadeNumeros.value);

        const novoJogo = [];

        for (let i = 1; i <= quantidade; i++) {
            const numero = document.getElementById(`num${i}`).value;
            if (numero) {
                novoJogo.push(parseInt(numero));
            }
        }

        jogos.push(novoJogo);
        localStorage.setItem('jogos', JSON.stringify(jogos));
        exibirJogos();
        modalCadastro.style.display = 'none';
        formularioJogo.reset();
    }

    const exibirJogos = (numerosParaConferir = []) => {
        listaJogos.innerHTML = '';
        jogos.forEach((jogo, index) => {
            const li = document.createElement('li');
            
            let acertos = 0;

            jogo.forEach(numero => {
                const span = document.createElement('span');

                span.textContent = numero;

                if(numerosParaConferir.includes(numero)) {
                    span.classList.add('correto');
                    acertos++;
                }

                li.appendChild(span);
            });

            const resultadosSpan = document.createElement('span');
            resultadosSpan.textContent = `Acertos: ${acertos}`;
            li.appendChild(resultadosSpan);

            if (acertos === 15) {
                li.classList.add('todos-certos');
            } else if(acertos >= 10){

                li.classList.add('acertos-parciais');

            }

            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.onclick = () => {
                jogos.splice(index, 1);
                localStorage.setItem('jogos', JSON.stringify(jogos));
                exibirJogos();
            }
            li.appendChild(botaoExcluir);

            listaJogos.appendChild(li);

        });
    }
    
/****************************************************************************************************************************************************** */

    botaoConferir.onclick = () => {
        const numerosParaConferir = conferirNumerosInput.map(input => parseInt(input.value));
        if (numerosParaConferir.some(isNaN)) {
            alert('Por favor, preencha todos os números para conferir.');
            return;
        }
        exibirJogos(numerosParaConferir);
    }

/***************************************************************************************************************************************************** */

    fecharModalSpans.forEach(span => {
        span.onclick = () => {
            modalCadastro.style.display = 'none';
            modalSurpresinha.style.display = 'none';
        }
    });

/****************************************************************************************************************************************************** */

    const gerarCamposNúmeros = (quantidade) => {
        const numerosCampos = document.getElementById('numerosCampos');
        numerosCampos.innerHTML = '';
        for (let i = 1; i <= quantidade; i++) {

            const label = document.createElement('label');
            label.setAttribute('for', `num${i}`);
            label.textContent = `Número ${i}:`;

            const input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('id', `num${i}`);
            input.setAttribute('min', '1');
            input.setAttribute('max', '60');
            input.required = true;

            numerosCampos.appendChild(label);
            numerosCampos.appendChild(input);
        }
    }

    const gerarNumerosAleatoriosSurpresinha = (quantidade) => {
        const numerosGerados = [];
        while (numerosGerados.length < quantidade) {
            const numero = Math.floor(Math.random() * 60) + 1;
            if (!numerosGerados.includes(numero)) {
                numerosGerados.push(numero);
            }
        }
        return numerosGerados;
    }

    exibirJogos();

})  