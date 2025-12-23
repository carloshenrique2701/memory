window.addEventListener('load', function () {
    
    const CANVAS = this.document.getElementById('canvasGame');
    const ctx = CANVAS.getContext('2d');

    const LARGURA = CANVAS.width;
    const ALTURA = CANVAS.height;
    const TAMANHO_BLOCO = 16;

    const PRETO  = '#000';
    const AZUL = '#2121ff';
    const AMARELO = '#ffff00';
    const BRANCO = '#fff';
    const VERMELHO = '#ff0000';
    const ROSA = '#ffb6c1';
    const CIANO = '#00ffff';
    const LARANJA = '#ffa500';
    const AZUL_CLARO = '#00ced1';

    const LABIRINTOS =[

        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X............XX............X",
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X......XX....XX....XX......X",
            "XXXXXX.XXXXX XX XXXXX.XXXXXX",
            "     X.XXXXX XX XXXXX.X     ",
            "     X.XX          XX.X     ",
            "     X.XX XXX--XXX XX.X     ",
            "XXXXXX.XX X      X XX.XXXXXX",
            "      .   X      X   .      ",
            "XXXXXX.XX X      X XX.XXXXXX",
            "     X.XX XXX--XXX XX.X     ",
            "     X.XX          XX.X     ",
            "     X.XX XXXXXXXX XX.X     ",
            "XXXXXX.XX XXXXXXXX XX.XXXXXX",
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "X...XX................XX...X",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "X......XX....XX....XX......X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X............@@............X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ],

        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "X..........................X",
            "X.XXXXXX.XXXXXXXXXX.XXXXXX.X",
            "XoXXXXXX.XXXXXXXXXX.XXXXXXoX",
            "X.XXXXXX.XXXXXXXXXX.XXXXXX.X",
            "X..........................X",
            "X.XX.XXXXXXXXXXXXXXXX.XX.XXX",
            "X.XX.XXXXXXXXXXXXXXXX.XX.XXX",
            "X..........XX....XX....XX..X",
            "XXXXXX.XXXXX.XX.XXXXX.XXXXXX",
            "     X.XXXXX.XX.XXXXX.X     ",
            "     X.XX          XX.X     ",
            "     X.XX XXX--XXX XX.X     ",
            "XXXXXX.XX X      X XX.XXXXXX",
            "........  X      X   .......",
            "XXXXXX.XX X      X XX.XXXXXX",
            "     X.XX XXX--XXX XX.X     ",
            "     X.XX          XX.X     ",
            "     X.XX XXXXXXXX XX.X     ",
            "XXXXXX.XX XXXXXXXX XX.XXXXXX",
            "X..XX.................X..X",
            "X.XXXXXX.XXXXXXXXXX.XXXXXX.X",
            "XoXXXXXX.XXXXXXXXXX.XXXXXXoX",
            "X.XXXXXX.XXXX..XXXX.XXXXXX.X",
            "X..........................X",
            "XXX.XX.XXXXXXXXXXXXXX.XX.XXX",
            "XXX.XX.XXXXXXXXXXXXXX.XX.XXX",
            "X............XX............X",
            "X.XXXXXXXXXXXXXXXXXXXXXXXX.X",
            "X.XXXXXXXXXXXXXXXXXXXXXXXX.X",
            "X............@@............X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ],

        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X............XX............X",
            "XXXXXX.XXXXXXXXXXXXXX.XXXXXX",
            "XXXXXX.XXXXXXXXXXXXXX.XXXXXX",
            "X......XX....XX....XX......X",
            "X.XXXX.XXXXX XX XXXXX.XXXX.X",
            "X.XXXX.XXXXX XX XXXXX.XXXX.X",
            "X......XX          XX......X",
            "XXXXXX.XX XXX  XXX XX.XXXXXX",
            "...... .  X      X   . ......",
            "      .   .  @@  .   .      ",
            "...... .  X      X   . ......",
            "XXXXXX.XX XXX  XXX XX.XXXXXX",
            "X......XX          XX......X",
            "X.XXXX.XXXXX XX XXXXX.XXXX.X",
            "X.XXXX.XXXXX XX XXXXX.XXXX.X",
            "X......XX....XX....XX......X",
            "XXXXXX.XXXXXXXXXXXXXX.XXXXXX",
            "XXXXXX.XXXXXXXXXXXXXX.XXXXXX",
            "X............X ............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X............XX............X",
            "X.XXXXXX.XXXXXXXX.XXXXXX.XXX",
            "X.XXXXXX.XXXXXXXX.XXXXXX.XXX",
            "X..........................X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ]

    ];

    let pontuacao_total = 0;
    let paredes = [];
    let pontos = [];
    let pastilhas = [];
    let fantasmas = [];
    let jogador;
    let vidas;
    let fase_atual;
    let pontuacao;
    let rodando;
    let labirinto;
    let fantasmas_posicoes_iniciais = [];
    let tempo_poder = 0;
    let tempo_poder_restante = 0;
    let poder_ativo = false;
    let animationFrameId;

    class Jogador {
        constructor(x, y) {
            
            this.posicao = [x, y];
            this.direcao = [0, 0];
            this.direcao_desejada = [0, 0];
            this.velocidade = 2;
            this.retangulo = {
                x: x + 1,
                y: y + 1,
                width: TAMANHO_BLOCO - 2,
                height: TAMANHO_BLOCO - 2
            }
        }

        mover(paredes) {

            if (this.direcao_desejada[0] !== this.direcao[0] || this.direcao_desejada[1] !== this.direcao[1] ) {
                let nova_posicao = [
                    this.posicao[0] + this.direcao_desejada[0] * this.velocidade,
                    this.posicao[1] + this.direcao_desejada[1] * this.velocidade
                ];
                let novo_retangulo = {
                    x: nova_posicao[0] + 1,
                    y: nova_posicao[1] + 1,
                    width: TAMANHO_BLOCO - 2,
                    height: TAMANHO_BLOCO - 2
                }

                if (!this.verificar_colisao(novo_retangulo, paredes)) {
                    this.direcao = [...this.direcao_desejada];
                }
            }

            let nova_posicao_atual = [
                this.posicao[0] + this.direcao[0] * this.velocidade,
                this.posicao[1] + this.direcao[1] * this.velocidade
            ]

            let novo_retangulo_atual = {
                    x: nova_posicao_atual[0] + 1,
                    y: nova_posicao_atual[1] + 1,
                    width: TAMANHO_BLOCO - 2,
                    height: TAMANHO_BLOCO - 2
            }

            if (!this.verificar_colisao(novo_retangulo_atual, paredes)) {
                this.posicao = [...nova_posicao_atual];//Criamos um clone ao inves de utilizar o mesmo lugar da memoria
                this.retangulo = novo_retangulo_atual;
            } else {
                this.alinhar();
            }
           
            if (this.posicao[0] < -TAMANHO_BLOCO) {
                this.posicao[0] = LARGURA
            } else if(this.posicao[0] > LARGURA) {

                this.posicao[0] = -TAMANHO_BLOCO;


                this.retangulo.x = this.posicao[0] + 1;
                this.retangulo.y = this.posicao[1] + 1;
            }
        }

        verificar_colisao(retangulo, paredes) {

            for (const parede of paredes) {
                if (retangulos_colidem(retangulo, parede)) {
                    return true;
                }
            }

            return false;

        }

        alinhar() {

            this.posicao[0] = Math.round(this.posicao[0] / TAMANHO_BLOCO) * TAMANHO_BLOCO;
            this.posicao[1] = Math.round(this.posicao[1] / TAMANHO_BLOCO) * TAMANHO_BLOCO;

            this.retangulo.x = this.posicao[0] + 1;
            this.retangulo.y = this.posicao[1] + 1;

        }

        desenhar(ctx) {

            ctx.fillStyle = AMARELO;

            ctx.beginPath();
            ctx.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2,
                this.posicao[1] + TAMANHO_BLOCO / 2,
                TAMANHO_BLOCO / 2,
                0, 2 * Math.PI
            );
            ctx.fill();

        }

        comer_ponto(pontos) {

            for (let i = pontos.length - 1; i >= 0; i--) {
                let ponto = pontos[i];

                if (retangulos_colidem(this.retangulo, ponto.retangulo)) {
                    pontos.splice(i, 1);
                    pontuacao_total += 1;
                    return 1;
                }
            }

            return 0;

        }

        comer_pastilhas(pastilhas) {

            for (let i = pastilhas.length - 1; i >= 0; i--) {
                let pastilha = pastilhas[i];
                
                if (retangulos_colidem(this.retangulo, pastilha.retangulo)) {
                    pastilhas.splice(i, 1);
                    pontuacao_total += 50;
                    ativarPoder();
                    return 50;
                }
            }

            return 0;

        }

    }

    class Ponto {
        constructor(x, y) {
            
            this.posicao = [x, y];
            this.retangulo = {
                x: x + TAMANHO_BLOCO/ 2 - 2,
                y: y + TAMANHO_BLOCO/ 2 - 2,
                width: 4,
                height: 4
            }

        }

        desenhar(ctx) {

            ctx.fillStyle = BRANCO;

            ctx.beginPath();
            ctx.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2,
                this.posicao[1] + TAMANHO_BLOCO / 2,
                2,
                0,
                2 * Math.PI
            );
            ctx.fill();

        }
    }

    class Pastilha {
        constructor(x, y) {
            
            this.pontuacao = [x, y];
            this.retangulo = {
                x: x + TAMANHO_BLOCO / 2 - 4,
                y: y + TAMANHO_BLOCO / 2 - 4,
                width:8,
                height: 8
            }
            
        }

        desenhar(ctx) {

            ctx.fillStyle = BRANCO;

            ctx.beginPath();
            ctx.arc(
                this.pontuacao[0] + TAMANHO_BLOCO / 2,
                this.pontuacao[1] + TAMANHO_BLOCO / 2,
                4,
                0,
                2 * Math.PI
            )
            ctx.fill();

        }
    }

    class Fantasma {
        constructor(x, y, cor) {
            
            this.posicao = [x, y]
            this.direcao = this.escolher_direcao_aleatoria();
            this.velocidade = 2;
            this.retangulo = {
                x: x + 1,
                y: y + 1,
                width: TAMANHO_BLOCO - 2,
                height: TAMANHO_BLOCO - 2
            }
            this.corOriginal = cor;
            this.cor = cor;
            this.estado = 'normal';

        }

        escolher_direcao_aleatoria() {

            const direcoes = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            return direcoes[Math.floor(Math.random() * direcoes.length)];

        }

        mover(paredes, deltaTime) {

            let nova_posicao;

            if (this.estado === 'assustado') {
                this.direcao = this.escolher_direcao_fuga();
            } else {

                if (Math.random() < 0.01) {//2% de chance do fantasma mudar de direção seele estiver no estado normal
                    this.direcao = this.escolher_direcao_aleatoria();
                }

            }

            nova_posicao = [
                this.posicao[0] + this.direcao[0] * this.velocidade,
                this.posicao[1] + this.direcao[1] * this.velocidade,
            ];

            let novo_retangulo = {
                x: nova_posicao[0] + 1,
                y: nova_posicao[1] + 1,
                width: TAMANHO_BLOCO - 2,
                height: TAMANHO_BLOCO - 2,
            }

            if (!this.verificar_colisao(novo_retangulo, paredes)) {
                
                this.posicao = [...nova_posicao];
                this.retangulo = novo_retangulo;

            } else {

                this.direcao = this.escolher_direcao_aleatoria();

            }

            //Se a posição do fantasma ultrapassar as bordas da direita ou esquerda, posiciona no lado contrario 
                // do labirinto(pelas laterais do meio)
            //O mesmo vale para o jogador la em cima
            if (this.posicao[0] < -TAMANHO_BLOCO) {
                this.posicao[0] = LARGURA;
            } else if (this.posicao[0] > LARGURA) {//Limite de largura do labirinto
                this.posicao[0] = -TAMANHO_BLOCO;
            }

            this.retangulo.x = this.posicao[0] + 1;
            this.retangulo.y = this.posicao[1] + 1;

        }

        escolher_direcao_fuga() {

            const direcoes = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            
             // Inicializa a maior distância com o menor 
                    // valor possível (-Infinity) 
                    // para garantir que qualquer distância 
                    // calculada seja maior.
            let max_distancia = -Infinity;
            let melhor_direcao = this.direcao;

            for (let direcao of direcoes) {
                
                let nova_posicao = [
                    this.posicao[0] + direcao[0] * this.velocidade,
                    this.posicao[1] + direcao[1] * this.velocidade
                ];

                let novo_retangulo = {
                    x: nova_posicao[0] + 1,
                    y: nova_posicao[1] + 1,
                    width: TAMANHO_BLOCO - 2,
                    height: TAMANHO_BLOCO - 2
                }

                if (!this.verificar_colisao(novo_retangulo, paredes)) { //Verifica se não há colisão
                    
                    let distancia = distanciaEntreDoisPontos(nova_posicao, jogador.posicao);
                    if (distancia > max_distancia) {
                        
                        max_distancia = distancia;
                        melhor_direcao = direcao;

                    }

                }

            }

            return melhor_direcao;

        }

        verificar_colisao(retangulo, paredes) {

            for (let parede of paredes) {
                
                if (retangulos_colidem(retangulo, parede)) {
                    return true;
                }

            }

        }

        desenhar(ctx) {

            ctx.fillStyle = this.cor;
            
            ctx.fillRect(
                this.retangulo.x,
                this.retangulo.y,
                this.retangulo.width,
                this.retangulo.height
            )

        }


    }

    function retangulos_colidem(r1, r2) {
        
        return !(

            r2.x > r1.width + r1.x ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y +  r1.height ||
            r2.y + r2.height < r1.y 

        );

    }

    function distanciaEntreDoisPontos(p1, p2) {
        
        let dx = p1[0] - p2[0];
        let dy = p1[1] - p2[1];

        return Math.sqrt(dx * dx + dy * dy);
    }

    function resetarPosicoes() {
        
        jogador.posicao = [14 * TAMANHO_BLOCO, 23 * TAMANHO_BLOCO];
        jogador.direcao = [0, 0];
        jogador.direcao_desejada = [0, 0];
        jogador.retangulo.x = jogador.posicao[0] + 1;
        jogador.retangulo.y = jogador.posicao[1] + 1;

        for (let idx = 0; idx < fantasmas.length; idx++) {
            
            let fantasma = fantasmas[idx];
            let pos_inicial = fantasmas_posicoes_iniciais[idx]

            fantasma.posicao = [pos_inicial[0], pos_inicial[1]];
            fantasma.direcao = fantasma.escolher_direcao_aleatoria();
            fantasma.x = fantasma.posicao[0] + 1;
            fantasma.y = fantasma.posicao[1] + 1;
            fantasma.estado = 'normal';
            fantasma.cor = fantasma.corOriginal;

        }

        poder_ativo = false;
        tempo_poder_restante = 0;

    }

    function ativarPoder() {
        
        poder_ativo = true;
        tempo_poder_restante = 10;

        for (let fantasma of fantasmas) {
            
            fantasma.estado = 'assustado';
            fantasma.cor = AZUL_CLARO;

        }

    }

    function atualizarPoder(deltaTime) {
        
        if (poder_ativo) {
            
            tempo_poder_restante -= deltaTime;

            if (tempo_poder_restante <= 0) {
                
                poder_ativo = false;

                for (let fantasma of fantasmas) {
                    fantasma.estado = 'normal';
                    fantasma.cor = fantasma.corOriginal;
                }

            }

        }

    }

    function mostrarMensagem(mensagem, fimDeJogo = false) {
        
        rodando = false;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        ctx.fillStyle = PRETO;
        ctx.fillRect(0, 0, LARGURA, ALTURA);

        ctx.fillStyle = BRANCO;
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(mensagem, LARGURA / 2, ALTURA / 2);

        if (fimDeJogo) {
            
            ctx.fillText(
                `Pontuação Total: ${pontuacao_total + pontuacao}`, 
                LARGURA / 2,
                ALTURA / 2 + 30
            );

            setTimeout(() => {

                mostrarMenu()

            }, 5000);

        } else {

            setTimeout(() => {

                rodando = true;
                ultimoTempo = performance.now();
                animationFrameId = requestAnimationFrame(gameLoop);

            }, 2000);
            
        }

    }

    function salvarPontuacao(pontuacao) {
        
        let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];
        pontuacoes.push(pontuacao);
        localStorage.setItem('pontuacoes', JSON.stringify(pontuacoes));

    }

    function carregarPontuacaoAcumulda() {
        
        let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];
        let total = pontuacoes.reduce((a, b) => a + b, 0);

        return total;

    }

    function mostrarMenu() {
        
        ctx.fillStyle = PRETO;
        ctx.fillRect(0, 0, LARGURA, ALTURA);

        ctx.fillStyle = AMARELO;
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Pac-Man', LARGURA/2, ALTURA/2 - 50);

        ctx.fillStyle = BRANCO;
        ctx.font = '24px Arial';
        ctx.fillText('Pressione ESPAÇO para jogar', LARGURA/2, ALTURA/2);

        let pontuacao_acumulada = carregarPontuacaoAcumulda();
        ctx.fillText(`Pontuação Acumulada: ${pontuacao_acumulada}`, LARGURA/2, ALTURA/2 + 50);

        document.addEventListener('keydown', iniciarAoPressionarEspaco);

    }

    function iniciarAoPressionarEspaco(e) {
    
        if (e.code === 'Space') {

            document.removeEventListener('keydown', iniciarAoPressionarEspaco);
            iniciarJogo();
            
        }

    }

    function iniciarJogo() {
        
        fase_atual = 0;
        pontuacao_total = 0;
        vidas = 5;
        iniciarFase();

    }

    function iniciarFase() {
        
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);//Cancela o próximo quadro de animação para parar o jogo
            animationFrameId = null;
            //Reseta o identificador de loopde animação para garantir que não seja reutilizado
        }

        paredes = [];
        pontos = [];
        pastilhas = [];
        fantasmas = [];
        fantasmas_posicoes_iniciais = [];
        pontuacao = 0;
        rodando = true;
        poder_ativo = false;
        tempo_poder_restante = 0;
        
                        //LABIRINTO

        labirinto = LABIRINTOS[fase_atual];
        const LINHAS = labirinto.length;
        const COLUNAS = labirinto[0].length;
        
        let jogador_posicao_inicial = [14 * TAMANHO_BLOCO, 23 * TAMANHO_BLOCO];
        jogador = new Jogador(jogador_posicao_inicial[0], jogador_posicao_inicial[1]);
        //Instancia o jogador com sua posição inicial

        for (let linha = 0; linha < LINHAS; linha++) {  //iterage sobre o labirinto atual
            for (let coluna = 0; coluna < COLUNAS; coluna++) {
                
                let bloco = labirinto[linha][coluna];

                let x = coluna * TAMANHO_BLOCO;
                let y = linha * TAMANHO_BLOCO;

                if (bloco === 'X') { //Verifica se é uma parede
                    
                    let parede = {
                        x: x,
                        y: y,
                        width: TAMANHO_BLOCO,
                        height: TAMANHO_BLOCO
                    };

                    paredes.push(parede);

                } else if (bloco === '.'){//Verifica Pontos coletáveis para o pacman

                    let ponto = new Ponto(x, y);
                    pontos.push(ponto);

                } else if (bloco === 'o') {//Verifica se é uma pastilha para o pacman

                    let pastilha = new Pastilha(x, y);
                    pastilhas.push(pastilha);

                } else if (bloco === '@') {//Verifica se é um fantasma

                    let fantasma = new Fantasma(x, y);
                    fantasmas.push(fantasma);
                    fantasmas_posicoes_iniciais.push([x, y]);

                }
            }
        }

                    //Adiciona FANTASMAS EXTRAS com base na fase atual

        let numero_de_fantasmas_extras = fase_atual * 2;
        let cores_fantasmas = [VERMELHO, ROSA, CIANO, LARANJA];

        let posicoes_fantasmas = [//Posições iniciais dos fantasmas no centro do labirinto
            [14 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO],
            [14 * TAMANHO_BLOCO, 15 * TAMANHO_BLOCO],
            [13 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO],
            [15 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO]
        ];
        for (let i = 0; i < numero_de_fantasmas_extras; i++) {
            //Itera sobre cada fantasmas, colocando na posicao inicial, dando cor, intanciando e aramazenando
            let pos = posicoes_fantasmas[i % posicoes_fantasmas.length];
            let cor = cores_fantasmas[i % posicoes_fantasmas.length];

            let fantasma = new Fantasma(pos[0], pos[1],cor);

            fantasmas.push(fantasma);
            fantasmas_posicoes_iniciais.push([pos[0], pos[1]]);
            
        }

        document.addEventListener('keydown', controlarJogador);

         // Inicia o loop principal do jogo.
        // Obtém o tempo atual usando `performance.now()` para 
                // calcular o deltaTime na animação.
        ultimoTempo = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);

    }

    function controlarJogador(e) {
        
        if (e.code == 'ArrowLeft') {//  X , Y
            jogador.direcao_desejada = [-1, 0];
        } else if (e.code == 'ArrowRight') {
            jogador.direcao_desejada = [1, 0];
        } else if (e.code == 'ArrowUp') {
            jogador.direcao_desejada = [0, -1];
        } else if (e.code == 'ArrowDown') {
            jogador.direcao_desejada = [0, 1];
        }

    }

    function removerControleJogador() {
        
        document.removeEventListener('keydown', controlarJogador);

    }

    let ultimoTempo = 0;

    function gameLoop(tempoAtual) {
        
        if (!rodando) {
            return;
        }

        let deltaTime = (tempoAtual - ultimoTempo) / 1000;

        ultimoTempo = tempoAtual;

        atualizar(deltaTime);
        desenhar();
        
        animationFrameId = requestAnimationFrame(gameLoop);

    }

    function atualizar(deltaTime) {
        
        jogador.mover(paredes);

        pontuacao += jogador.comer_ponto(pontos);
        pontuacao += jogador.comer_pastilhas(pastilhas);

        atualizarPoder(deltaTime);

        for (let fantasma of fantasmas) {
            
            fantasma.mover(paredes, deltaTime);

            if (retangulos_colidem(fantasma.retangulo, jogador.retangulo)) {
                
                if (fantasma.estado === 'assustado') {
                    
                    fantasma.posicao = [...fantasmas_posicoes_iniciais[fantasmas.indexOf(fantasma)]];

                    fantasma.retangulo.x = fantasma.posicao[0] + 1;
                    fantasma.retangulo.y = fantasma.posicao[1] + 1;

                    pontuacao_total += 200;

                } else {

                    vidas -= 1;

                    if (vidas > 0) {
                        resetarPosicoes();
                        mostrarMensagem(`Você perdeu uma vida! Vidas restantes: ${vidas}`);
                    } else {
                        rodando = false;
                        mostrarMensagem(`Você perdeu todas as vidas! Fim de Jogo!`, true);
                        salvarPontuacao(pontuacao_total + pontuacao);
                    }
                    break;
                }
            }
        }

        if (pontos.length === 0 && pastilhas.length === 0) {
            pontuacao_total += pontuacao;
            fase_atual += 1;

            if (fase_atual < LABIRINTOS.length) {
                
                mostrarMensagem('Fase Concluída!');

                setTimeout(() => {
                    iniciarFase();
                }, 2000);

            } else {

                rodando = false;
                removerControleJogador();
                salvarPontuacao(pontuacao_total + pontuacao);
                mostrarMensagem('Parabéns! Você venceu!', true);
                
            }

        }

    }

    function desenhar() {
        
        ctx.fillStyle = PRETO;
        ctx.fillRect(0, 0, LARGURA, ALTURA);

        ctx.fillStyle = AZUL;
        for (let parede of paredes) {
            ctx.fillRect(parede.x,parede.y, parede.width,parede.height)
        }

        for (let ponto of pontos) {
            ponto.desenhar(ctx);
        }
        for (const pastilha of pastilhas) {
            pastilha.desenhar(ctx);
        }

        jogador.desenhar(ctx)

        for (const fantasma of fantasmas) {
            fantasma.desenhar(ctx);
        }

        ctx.fillStyle = BRANCO;
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Pontuação: ${pontuacao_total + pontuacao}`, 10, 15);
        ctx.fillText(`Vidas: ${vidas}`, LARGURA - 80, 15);
        
        ctx.textAlign = 'center';
        ctx.fillText(`Fase: ${fase_atual + 1}`, LARGURA / 2, 15);

        if (poder_ativo) {
            ctx.fillStyle = BRANCO;
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Poder ativo: ${Math.ceil(tempo_poder_restante)}s`, LARGURA / 2, ALTURA - 20);
        }

    }

    mostrarMenu();

});