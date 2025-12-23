document.addEventListener('DOMContentLoaded', function () {
    
    const CANVAS = document.getElementById('canvasJogo');
    const CONTEXTO = CANVAS.getContext('2d');

    const PONTUACAO_ATUAL_ELEMENT = document.getElementById('pontuacaoAtual');

    CANVAS.width = 800;
    CANVAS.height = 600;

    const IMAGEM_FUNDO = new Image();
    IMAGEM_FUNDO.src = 'fundo_nuvem.png';

    const IMAGEM_SAPO =  new Image();
    IMAGEM_SAPO.src = 'sapo_direita.png';

    const SOM_PULO_SIMPLES = new Audio('som_seta_cima.mp3')
    const SOM_PULO_LONGO = new Audio('som_espaco.mp3')
    const SOM_FIM_JOGO = new Audio('game-over.mp3')

    const TAMANHO_JOGADOR = 60;
    const FORCA_PULO_SIMPLES = 15;
    const FORCA_PULO_LONGO = 22;
    const GRAVIDADE = 0.5; //Define a gravidade que afeta as ações de pulo do jogador
    const VELOCIDADE_JOGADOR = 5;
    const ALTURA_CHAO = CANVAS.height - 20;

    let pulou = false;
    let pontuacao = 0;
    let ultimaPlataformaTocada = -1; //inicia com -1 indicando que nenhuma plataforma foi tocada ainda;
    let primeiroPulo = false;
    let ultimaTecla;
    const POSICAO_INICIAL_X = (CANVAS.width - TAMANHO_JOGADOR) / 2;
    const POSICAO_INICIAL_Y = ALTURA_CHAO - TAMANHO_JOGADOR;

    let jogador = {

        x: POSICAO_INICIAL_X,
        y: POSICAO_INICIAL_Y,
        largura: TAMANHO_JOGADOR,
        altura: TAMANHO_JOGADOR,
        dx: 0,//Inicializa o delocamento X como 0. Controla a movimentação em X
        dy: 0,//Inicializa o delocamento Y como 0. Controla a movimentação em Y
        pulando: false

    }

    let plataformas = [];

    const ALTURA_PLATAFORMA = 20;
    const LARGURA_PLATAFORMA = 120;

    function gerarPlataformas() {
        
        let yPos = CANVAS.height - 100;

        for (let i = 0; i < 5; i++) { //Cria 5 plataformas
            
            plataformas.push({

                x:Math.random() * (CANVAS.width - LARGURA_PLATAFORMA),//Posição aleatória dentro do canvas
                y: yPos,
                largura: LARGURA_PLATAFORMA,
                altura: ALTURA_PLATAFORMA

            });

            yPos -= 120;
            
        }

    }



    function fimDeJogo() {
        
    }

    function moverPlataformas() {
        
        plataformas.forEach(plataforma => {

            plataforma.y += 2;

            if (plataforma.y > CANVAS.height) {
                
                plataforma.y = - ALTURA_PLATAFORMA;

                plataforma.x = Math.random() * (CANVAS.width - LARGURA_PLATAFORMA);//Mantem elas centralizadas

            }

        });

    }

    function verificarColisao() {
        
        plataformas.forEach((plataforma, indice) => {

            if(jogador.x < plataforma.x + plataforma.largura &&//Verifica se o lado esquerdo do jogador está à esquerda do lado direito da plataforma 
               jogador.x + jogador.largura > plataforma.x && //Verifica se o lado direito do jogador está à direita do lado esquerdo da plataforma 
               jogador.y < plataforma.y + plataforma.altura &&//Verifica se a parte inferior do jogador está acima do topo da plataforma 
               jogador.y + jogador.altura > plataforma.y &&//Verifica se a parte superior do jogador está abaixo do topo da plataforma 
               jogador.dy >= 0 ){//Verifica se o jogador está se movendo para baixo ou estacionário, indicando uma queda.

                if(ultimaPlataformaTocada !== indice){//Verifica se a plataforma é a mesma da ultima tocada, 
                // impedido que a pontuação seja contada mais de uma vez pela mesma plataforma

                    pontuacao++;
                    salvarPontuacao();
                    atualizarPontuacao()
                    ultimaPlataformaTocada = indice;

                }

                jogador.pulando = false;
                jogador.dy = 0;
                jogador.y = plataforma.y - jogador.altura;
                pulou = false;

            }

        })

    }

    function desenharPlataformas() {
        
        CONTEXTO.fillStyle = 'green';

        plataformas.forEach(plataforma => {

            CONTEXTO.fillRect(plataforma.x, plataforma.y, plataforma.largura, plataforma.altura);

        });

    }

    function desenharPontuacao() {
        
        CONTEXTO.font = '16px Arial';

        CONTEXTO.fillStyle = 'black';

        CONTEXTO.fillText('Pontuação: ', pontuacao, 10, 20);

    }

    function salvarPontuacao() {
        
        localStorage.setItem('pontuacao', pontuacao);

    }
    function atualizarPontuacao() {

        PONTUACAO_ATUAL_ELEMENT.textContent = pontuacao;
        
    }

    function pular(tipoPulo) {
        
        if(!jogador.pulando && !pulou){

            jogador.dy = tipoPulo === 'longo' ? -FORCA_PULO_LONGO : -FORCA_PULO_SIMPLES;

            jogador.pulando = true;

            pulou = true;

            primeiroPulo = true;

            if(tipoPulo === 'longo'){

                SOM_PULO_LONGO.play();

            } else {

                SOM_PULO_SIMPLES.play();

            }

        }

    }

    function atualizar() {
        
        CONTEXTO.clearRect(0, 0, CANVAS.width, CANVAS.height);
        CONTEXTO.drawImage(IMAGEM_FUNDO, 0, 0, CANVAS.width, CANVAS.height);

        jogador.dy += GRAVIDADE;
        jogador.y += jogador.dy;//Delocamento em Y

        if(primeiroPulo && jogador.y >= ALTURA_CHAO - jogador.altura){//Se for a priemeira vez que o jogador toca 
        // o chão após o primeiro pulo.

            fimDeJogo();
            return;

        } else if(jogador.y > ALTURA_CHAO - jogador.altura){

            jogador.y = ALTURA_CHAO - jogador.altura; //Corrige a posicao do jogador para que ele não afunde 
            // no chão. Isso o coloca precisamente no chão, evitando deslocamentos incorretors devido a incrementos 
            // grandes em 'dy'.
            jogador.pulando = false;

        }

        jogador.x += jogador.dx;//Deslocamento em X
        //dx e dy são alterados em outras funções e é no atualizar() que elas são realmente aplicadas, fazendo com 
            // que o sapo se mova.

        if(jogador.x < 0) {

            jogador.x = 0;

        } else if(jogador.x > CANVAS.width - jogador.largura){

            jogador.x = CANVAS.width - jogador.largura;//Corrije a posição para o sapo não passar da borda direita 
            // do canvas.

        }

        moverPlataformas();
        verificarColisao();
        desenharPlataformas();

        CONTEXTO.drawImage(IMAGEM_SAPO, jogador.x, jogador.y, jogador.largura, jogador.altura);
        desenharPontuacao();
        requestAnimationFrame(atualizar)
        /*
            é uma função do JavaScript que instrui o navegador a executar uma animação, chamando uma função de 
            retorno (callback) antes da próxima repintura da tela. Ela otimiza a animação ao sincronizá-la com 
            a taxa de atualização do navegador, garantindo fluidez, economizando recursos (pausando quando a aba 
            não está visível) e sendo mais eficiente que setInterval. 
        */

        if (IMAGEM_SAPO.src.includes('sapo_esquerda') && jogador.pulando) {

            IMAGEM_SAPO.src = 'sapo_pulo_esquerda.png';
            
        }else if(IMAGEM_SAPO.src.includes('sapo_direita') && jogador.pulando) {

            IMAGEM_SAPO.src = 'sapo_pulo_direita.png';
            
        } else if(!jogador.pulando) {

            trocarSrcSapo()

        }
        
    }
    function trocarSrcSapo() {
        
        if (ultimaTecla === 'esquerda') {
            
            IMAGEM_SAPO.src = 'sapo_esquerda.png';

        } else {

            IMAGEM_SAPO.src = 'sapo_direita.png'

        }

    }

    function fimDeJogo() {
        
        SOM_FIM_JOGO.play();

        alert(`Fim de Jogo! sua pontuação foi: ${pontuacao}`);

        document.location.reload();//Recarrega a pagina atual.

    }

    function carregarPontuacao() {
        
        const pontuacaoSalva = localStorage.getItem('pontuacao');//Pega a pontuação no armazenamento local

        if(pontuacaoSalva !== null){

            pontuacao = parseInt(pontuacaoSalva, 10);//Decimal

            atualizarPontuacao();

        }

    }
    

    moverPlataformas()
    desenharPlataformas();

    window.addEventListener('keydown', function (e) {
        

        if(e.key === 'ArrowLeft') {

            jogador.dx = -VELOCIDADE_JOGADOR;
            ultimaTecla = 'esquerda'
            trocarSrcSapo('sapo_esquerda.png')

        } else if(e.key === 'ArrowRight') {

            jogador.dx =  VELOCIDADE_JOGADOR;
            ultimaTecla = 'direita'
            trocarSrcSapo("sapo_direita.png")

        } else if(e.key === ' ') {

            pular('simples');

        } if(e.key === 'ArrowUp') {

            pular('longo');

        }


    });

    window.addEventListener('keyup', function (e) {
        
        if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {//Verifica se uma dessas teclas precionada foi librada 

            jogador.dx = 0;//Torna o deslocamento em 0, pois a posição do jogador está sempre recebendo seu 
            // deslocamento na função atualizar(), em outras palavras, enquanto a tecla estiver sendo precionada, 
            // o deslocamento recebe a VELOCIDADE_JOGADOR e altera seu delocamento, logo, o sapo se mexe para 
            // alguma direção. Se a tecla não estiver sendo precionada, o delocamento em X é zerado, logo, o sapo 
            // para de se mexer.

        }

    })

    IMAGEM_FUNDO.onload = function () {
        
            carregarPontuacao();
            atualizar();
            gerarPlataformas();

    }

    

})