const telaJogo = document.getElementById('telaJogo');
const contexto = telaJogo.getContext('2d');
const somTiro = document.getElementById('somTiro');
const modal = document.getElementById("modal");
const mensagemModal = document.getElementById("mensagemModal");
const botaoContinuar = document.getElementById("botaoContinuar");
const botaoTerminar = document.getElementById("botaoTerminar");

class Objeto {

    constructor(x, y, largura, altura, cor){

        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;

    }

    desenhar(){

        contexto.fillStyle = this.cor;
        contexto.fillRect(this.x, this.y, this.largura, this.altura);

    }

}

class Jogador extends Objeto {

    constructor(x, y, largura, altura, imagem){

        super(x, y, largura, altura)
        this.imagem = imagem;
        this.velocidade = 0;
        this.vidas = parseInt(localStorage.getItem('vidas'), 10) || 3;//'10' especifica que a base é decimal.

    }

    desenhar() {

        contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)

    }

    atualizar() {

        this.x += this.velocidade;
        this.x = Math.max(0, Math.min(this.x, telaJogo.width - this.largura))//Impede que o jogador não saia dos limites do canvas.

    }

    mover(direcao) {

        const velocidade = 5;
        this.velocidade = direcao === 'esquerda' ? -velocidade : velocidade;

    }

    parar() {

        this.velocidade = 0;

    }

    perderVida() {

        this.vidas--;
        document.getElementById('vidas').innerText = `Vidas: ${this.vidas}`;

        if (this.vidas === 0) {
            
            localStorage.setItem('vidas', 3);
            exibirModal('Você perdeu! 😭😭😭😭', false);

        }

    }

}

class Bala extends Objeto{

    constructor(x, y, largura, altura, cor, velocidade){

        super(x, y, largura, altura, cor);
        this.velocidade = velocidade;

    }

    atualizar() {

        this.y += this.velocidade;

    }

}

class Inimigo extends Objeto {
    constructor(x, y, largura, altura, imagem) {
        
        super(x, y, largura, altura);

        this.imagem = imagem;
        this.chanceTiro = 0.0003;//Chance de um inimigo atirar a cada frame
        this.direcao = 1

    }

    desenhar() {

        contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)

    }

    atualizar() {

        this.x += this.direcao;

        if (Math.random() < this.chanceTiro) {//Gera um número aleatóorio entre 1 e 0.
        //Verifica se esse número é menor que a chance de disparo, se sim, atira.
            this.atirar();
        }

    }

    atirar(){

        balasInimigas.push(new Bala(this.x + this.largura/2 - 2, this.y + this.altura, 4, 10, 'blue', 2));
        //A bala é calculada para ser disparada dop meiro do inimigo em X
    }
}

function exibirModal(mensagem, podeContinuar) {
    
    mensagemModal.innerText = mensagem;

    if (podeContinuar) {
        
        botaoContinuar.style.display = 'inline-block';

    } else {
        
        botaoContinuar.style.display = 'none';

    }

    modal.style.display = 'flex';

}

class GradeInimigos {//Classe e responsável por gerar inimigos

    constructor(linhas, colunas, espacamentoInimigo, larguraInimigo, alturaInimigo) {
        
        this.linhas = linhas;
        this.colunas = colunas;
        this.espacamentoInimigo = espacamentoInimigo;
        this.larguraInimigo = larguraInimigo;
        this.alturaInimigo = alturaInimigo;
        this.inimigos = [];
        this.direcao = 1;
        this.pontuacao = 0;
        this.criarInimigos();

    }

    criarInimigos() {

        this.inimigos = [];

        for (let linha = 0; linha < this.linhas; linha++) {
            
            for (let coluna = 0; coluna < this.colunas; coluna++) {
                
                this.inimigos.push(new Inimigo(
                    //Esses calculos asseguram que o inimigo gerado é posicionado de maneira que eles não fiquem um
                        //acima do outro, ocasionando sobreposição.
                    coluna * (this.larguraInimigo + this.espacamentoInimigo), //X
                    linha * ( this.alturaInimigo + this.espacamentoInimigo), //Y
                    this.larguraInimigo,
                    this.alturaInimigo,
                    imagemInimigo
                ));
                
            }
            
        }

    }

    atualizar() {

        let atingiuParede = false;

        this.inimigos.forEach(inimigo => {

            inimigo.atualizar();

            if (inimigo.x <= 0 || inimigo.x >= telaJogo.width) atingiuParede = true; 
            //Verifica se o inimigo atingiu as bordas do canvas

        });

        if (atingiuParede) {
            
            this.direcao *= -1; //Multiplica a direção atual por -1 para trocar o sinal da operação, 
            // controlando direita e esquerda.

            const offsetY = this.alturaInimigo + this.espacamentoInimigo;

            this.inimigos.forEach(inimigo => { //Assegura que todos os inimigos se movam para a direção certa

                inimigo.direcao = this.direcao;

                inimigo.y += offsetY; 
                //Move cada inimigo para baixo adicionando 'offset' à posição 'y' de cada inimigo.
                //Isso faz com que a grade inteira de inimigos desça cada vez que qualquer inimigo atinja uma
                    //das bordas laterais do canva
            });

        }

        this.inimigos.forEach(inimigo => {

            if (//Colisão entre um inimigo e o jogador
                inimigo.x < jogador.x + jogador.largura &&
                inimigo.x + jogador.largura > jogador.x &&
                inimigo.y + jogador.altura > jogador.y &&
                inimigo.y < jogador.y + jogador.altura
            ) {
                
                jogador.perderVida();

            }

            if (inimigo.y + inimigo.altura >= telaJogo.height) {//Verifica se o inimigo passou da tela(invasão)
                jogador.perderVida();
            }

            balasJogador.forEach((bala, indice) => {

                if (//Verifica se a bala do jogador atingiu um inimigo
                    bala.x < inimigo.x + inimigo.largura &&
                    bala.x + bala.largura > inimigo.x &&
                    bala.y < inimigo.y + inimigo.altura &&
                    bala.y + bala.altura > inimigo.y 
                ) {
                    balasJogador.splice(indice, 1);//Remove a bala

                    this.inimigos.splice(this.inimigos.indexOf(inimigo), 1);//Remove o inimigo atingido

                    this.aumentarPontuacao();
                }

            });


            if (this.inimigos.length === 0 && jogador.vidas > 0) { 
                //Verifica se todos os inimigos foram mortos e se o jogador ainda possui uma vida
                
                chefe = new Chefe(telaJogo.width / 2 - 200, 0, 400, 200, imagemChefe)//Cria o chefão

            }

        });

    }

    desenhar() {

        this.inimigos.forEach(inimigo => inimigo.desenhar())

    }

    aumentarPontuacao() {

        this.pontuacao++;

        const pontuacaoFormatada = this.pontuacao.toLocaleString('pt-BR');

        document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacaoFormatada}`;

        localStorage.setItem('pontuacao', this.pontuacao);

    }

}

class Chefe extends Objeto {
    constructor(x, y, largura, altura, imagem) {

        super(x, y, largura, altura, imagem);
        this.imagem = imagem;
        this.vidas = 100;
        this.chanceTiro = 0.02;
        this.direcao = 1;
        this.velocidade = 2;
        
    }

    desenhar(){

        contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);

    }

    atualizar() {

        this.x += this.direcao * this.velocidade;

        if(this.x <= 0 || this.x + this.largura >= telaJogo.width) {

            this.direcao *= -1;

        }

        if(Math.random() < this.chanceTiro) {

            this.atirar()

        }

    }

    atirar() {

        balasInimigas.push(new Bala(this.x + this.largura / 2 - 2, this.y + this.altura, 4, 10, 'blue', 2));

    }

    levarDano() {

        this.vidas--;

        if(this.vidas <= 0) {

            gradeInimigos.pontuacao += 100;

            const pontuacaoFormatada = gradeInimigos.pontuacao.toLocaleString('pt-BR');

            document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacaoFormatada}`;

            localStorage.setItem('vidas', jogador.vidas +1);

            exibirModal('🎉🎉🎉Parabéns!!! Você derrotou o chefe pela primeira vez!!!🎉🎉🎉 Você ganhou +1 vida!!!', true);

        }

    }
}

const imagemJogador = new Image();
imagemJogador.src = 'nave.png';

const imagemInimigo = new Image();
imagemInimigo.src = 'inimigo.png';

const imagemChefe = new Image();
imagemChefe.src = 'chefe.png';

const jogador = new Jogador(telaJogo.width / 2 - 15, telaJogo.height - 30, 30, 10, imagemJogador);
const balasJogador = [];

const gradeInimigos = new GradeInimigos(10, 12, 10, 30, 20);
const balasInimigas = [];

let chefe = null;

function loopJogo() {
    
    contexto.clearRect(0, 0, telaJogo.width, telaJogo.height)

    jogador.atualizar();

    jogador.desenhar();

    balasJogador.forEach((bala, indice) => {

        bala.atualizar();

        if (bala.y + bala.altura < 0) { //Verifica se a bala saiu pelo topo da tela
            
            balasJogador.splice(indice, 1); //Remove a bala

        } else {

            bala.desenhar();

        }

    });
    
    balasInimigas.forEach((bala, indice) => {

        bala.atualizar();

        if (bala.y > telaJogo.height) {//Verifica se a bala passou do limite inferior do canvas
            
            balasInimigas.splice(indice, 1); //Remove as balas

        } else {

            bala.desenhar();

        }

    });

    if(gradeInimigos.inimigos.length > 0) {

        gradeInimigos.atualizar();
        gradeInimigos.desenhar();

    }

    if(chefe) {

        chefe.atualizar();
        chefe.desenhar();

    }

    balasJogador.forEach((bala, indiceBala) => {


        if(chefe && //Verifica se a  bala atingiu o chefe
            bala.x < chefe.x + chefe.largura &&
            bala.x + bala.largura > chefe.x &&
            bala.y < chefe.y + chefe.altura &&
            bala.y + bala.altura > chefe.y 
        ) {

            chefe.levarDano();
            console.log(chefe.vidas)
            balasJogador.splice(indiceBala, 1)

        }

        gradeInimigos.inimigos.forEach((inimigo, indiceInimigo) => {

            if(//Verifica se as balas aliadas atingem o inimigo
                bala.x < inimigo.x + inimigo.largura &&
                bala.x + bala.largura > inimigo.x &&
                bala.y < inimigo.y + inimigo.altura &&
                bala.y + bala.altura > inimigo.y 
            ) {

                gradeInimigos.splice(indiceInimigo, 1);

                balasJogador.splice(indiceBala, 1);

                gradeInimigos.aumentarPontuacao();

            }

        });

    });

    balasInimigas.forEach((bala, indice) => {

        if (//Verifica se as balas inimigas atingiram o jogador
            bala.x < jogador.x + jogador.largura &&
            bala.x + bala.largura > jogador.x &&
            bala.y < jogador.y + jogador.altura &&
            bala.y + bala.altura > jogador.y 
        ) {

            balasInimigas.splice(indice, 1);
            jogador.perderVida();
            
        }

    })
    
    if(jogador.vidas > 0) {

        requestAnimationFrame(loopJogo);

    }

    

}

botaoTerminar.addEventListener('click', () => {

    localStorage.setItem('vidas', 3);
    document.location.reload();

});

botaoContinuar.addEventListener('click', () => {

    document.location.reload();

})

window.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowLeft') {
        
        jogador.mover('esquerda');

    } else if(e.key === 'ArrowRight'){
        
        jogador.mover('direita');

    } if(e.key === ' ' && balasJogador.length < 100) {

        balasJogador.push(new Bala(jogador.x + jogador.largura / 2 - 2, jogador.y, 4, 10, 'red', -4));
        somTiro.currentTime = 0;//Reseta o tempo de reprodução do som para 0, garantido que seja reproduzido do inicio
        somTiro.play();

    }
      
});

window.addEventListener('keyup', (e) => {

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        jogador.parar();
    }

});

document.addEventListener('DOMContentLoaded', () => {

    const pontuacaoSalva = localStorage.getItem('pontuacao');

    if (pontuacaoSalva != null) {
        
        document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacaoSalva}`;

        gradeInimigos.pontuacao = parseInt(pontuacaoSalva, 10)

    }

    const vidasSalvas = parseInt(localStorage.getItem('vidas', 10) || 3);

    jogador.vidas = vidasSalvas;

    document.getElementById('vidas').innerText = `Vidas: ${jogador.vidas}`;

});

loopJogo();