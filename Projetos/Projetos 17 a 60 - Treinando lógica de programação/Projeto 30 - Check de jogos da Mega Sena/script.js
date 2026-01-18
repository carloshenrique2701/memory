document.addEventListener('DOMContentLoaded', () => {

    const abrirModalCadastroBtn = document.getElementById('abrirModalCadastroBtn');
    const abrirModalSurpresinhaBtn = document.getElementById('abrirModalSurpresinhaBtn');
    const modalCadastro = document.getElementById('modalCadastro');
    const modalSurpresinha = document.getElementById('modalSurpresinha');
    const fecharModalSpans = document.querySelectorAll('.fechar');
    const formularioJogo = document.getElementById('formularioJogo');
    const quantidadeNumeros = document.getElementById('quantidadeNumeros');
    const quantidadeNumerosSurpresinha = document.getElementById('quantidadeNumerosSurpresinha');
    const numerosCampos = document.getElementById('numerosCampos');
    const listaJogos = document.getElementById('listaJogos');
    const botaoConferir = document.getElementById('botaoConferir');
    const salvarSurpresinhaBtn = document.getElementById('salvarSurpresinhaBtn');
    const jogoSurpresinha = document.getElementById('jogoSurpresinha');
    const conferirNumerosinput = [

        document.getElementById('confereNum1'),
        document.getElementById('confereNum2'),
        document.getElementById('confereNum3'),
        document.getElementById('confereNum4'),
        document.getElementById('confereNum5'),
        document.getElementById('confereNum6')

    ];

    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

    let numerosGeradosSurpresinha = [];

    /****************************************************************************************************************************************************** */

    abrirModalCadastroBtn.onclick = () => {
        gerarCamposNumeros(6);
        modalCadastro.style.display = 'block';
    }

    quantidadeNumeros.oninput = () => {
        const quantidade = parseInt(quantidadeNumeros.value);
        if (quantidade < 6 || quantidade > 20) {
            alert('A quantidade de números deve ser entre 6 e 20.');
            quantidadeNumeros.value = 6;
        } else {
            gerarCamposNumeros(quantidade);
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
        if (quantidade < 6 || quantidade > 20) {
            alert('A quantidade de números deve ser entre 6 e 20.');
            quantidadeNumerosSurpresinha.value = 6;
        } else {
            numerosGeradosSurpresinha = gerarNumerosAleatorios(quantidade);
            jogoSurpresinha.textContent = numerosGeradosSurpresinha.sort((a, b) => a - b).join(', ');
        }
    }

    /****************************************************************************************************************************************************** */
 
    fecharModalSpans.forEach(span => {
        span.onclick = () => {
            modalCadastro.style.display = 'none';
            modalSurpresinha.style.display = 'none';
        }
    });

    window.onclick = (event) => {
        if (event.target === modalCadastro || event.target === modalSurpresinha) {
            modalCadastro.style.display = 'none';
            modalSurpresinha.style.display = 'none';
        }
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

            if (acertos === 6) {
                li.classList.add('todos-certos');
            } else if(acertos >= 4){

                li.classList.add('acertos-4-5-6');

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

    salvarSurpresinhaBtn.onclick = () => {
        jogos.push(numerosGeradosSurpresinha);
        localStorage.setItem('jogos', JSON.stringify(jogos));
        exibirJogos();
        modalSurpresinha.style.display = 'none';
    };

    /**************************************************************************************************************************************************** */

    botaoConferir.onclick = () => {
        const numerosParaConferir = conferirNumerosinput.map(input => parseInt(input.value));
        exibirJogos(numerosParaConferir);
    };

    /****************************************************************************************************************************************************** */

    const gerarNumerosAleatorios = (quantidade) => {
        const numeros = [];

        while (numeros.length < quantidade) {
            const numero = Math.floor(Math.random() * 60) + 1;
            if (!numeros.includes(numero)) {
                numeros.push(numero);
            }
        }
        return numeros;
    }


    const gerarCamposNumeros = (quantidade) => {
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


    exibirJogos();

})