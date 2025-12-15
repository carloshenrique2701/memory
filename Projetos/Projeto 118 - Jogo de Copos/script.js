const BRANCO = '#fff';
const PRETO = '#000';
const VERMELHO = 'rgb(255, 0, 0)';
const VERDE = 'rgb(0, 255, 0)';

const LARGURA = 800;
const ALTURA = 600;

const tela = document.getElementById('tela');
tela.width = LARGURA;
tela.height = ALTURA;
const contexto = tela.getContext('2d');

const copoLarguraOriginal = 150;
const copoAlturaOriginal = 200;
const MIN_COPO_LARGURA = 50;
const MIN_COPO_ALTURA = 70

let pontuacao = 0;
let velocidade = 5;
let rodada = 1;

let copoFrenteOriginal = new Image();
let copoTrasOriginal = new Image();
let bolaImagemOriginal = new Image();

copoFrenteOriginal.src = 'copo_frente.png';
copoTrasOriginal.src = 'copo_tras.png';
bolaImagemOriginal.src = 'bola.png';

let imagensCarregadas = 0;

copoFrenteOriginal.onload = verificarCarregamento;
copoTrasOriginal.onload = verificarCarregamento;
bolaImagemOriginal.onload = verificarCarregamento;

function verificarCarregamento() {
    
    imagensCarregadas++;

    if (imagensCarregadas === 3) {
        iniciarJogo();
    }

}

function gerarPosicoesIniciais(numeroCopos, copoLargura) {
    
    let posicoes = [];
    let espaco = 50;
    let espacoTotal = LARGURA - 2 * espaco;
    let larguraTotalCopos = numeroCopos * copoLargura;
    let espacoEntreCopos;

    if (numeroCopos > 1) {
        
        espacoEntreCopos = (espacoTotal - larguraTotalCopos) / (numeroCopos - 1);

        if (espacoEntreCopos < 0) {
            espacoEntreCopos = 0;
        }

    } else {
        espacoEntreCopos = 0;
    }

    let x = espaco;
    let y = ALTURA / 2 - copoAltura / 2;

    for (let i = 0; i < numeroCopos; i++) {
        
        posicoes.push({x: x, y: y});
        x+= copoLargura + espacoEntreCopos;

    }

    return posicoes;

}

function desenharCopos(copos, mostrandoBola = false, posicaoBola = 0, estadosCopos = null) {
    //Limpa o ultimo ponto onde o copo esteve de branco
    contexto.fillStyle = BRANCO;
    contexto.fillRect(0,0,LARGURA, ALTURA);

    for (let i = 0; i < copos.length; i++) {
        let x = copos[i].x;
        let y = copos[i].y;

        if (estadosCopos && estadosCopos[i] === 'frente') {
            contexto.drawImage(copoFrenteResized, x, y, copoLargura, copoAltura)
        }else {
            contexto.drawImage(copoTrasResized, x, y, copoLargura, copoAltura)
        }

    }

    if (mostrandoBola) {
            
        let xBola = copos[posicaoBola].x;
        let yBola = copos[posicaoBola].y;

        contexto.drawImage(
            bolaImagemResized,
            xBola + copoLargura / 2 - bolaImagemResized.width / 2,
            yBola + copoAltura - bolaImagemResized.height - 10,
            bolaImagemResized.width,
            bolaImagemResized.height
        );
    }

    contexto.fillStyle = PRETO;
    contexto.font = '36px Arial';
    contexto.fillText(`Pontuação: ${pontuacao}`, 10, 40);

    let textoRodada = `Rodada: ${rodada}`;
    let larguraTextoRodada = contexto.measureText(textoRodada).width;
    contexto.fillText(textoRodada, LARGURA - larguraTextoRodada - 10, 40);

}

function animarTroca(copos, idx1, idx2, velocidade, callback) {
    //Posições iniciais de cada copo
    let x1Inicial = copos[idx1].x;
    let y1Inicial = copos[idx1].y;

    let x2Inicial = copos[idx2].x;
    let y2Inicial = copos[idx2].y;

    //Deslocamentos
    let dx1 = x2Inicial - x1Inicial;
    let dy1 = y2Inicial - y1Inicial;

    let dx2 = x1Inicial - x2Inicial;
    let dy2 = y1Inicial - y2Inicial;

    let passos = Math.max(Math.abs(dx1), Math.abs(dy1)) / velocidade;
    passos = Math.ceil(passos);

    if (passos === 0)passos = 1;

    let passoAtual = 0;

    function animar() {
        
        if (passoAtual < passos) {
            
            let t = (passoAtual + 1) / passos;
            let h = 150;

            //Novas posições
            let novaX1 = x1Inicial + dx1 * t;
            let novaY1 = y1Inicial + dy1 * t - h * 4 * t * (1 - t);

            let novaX2 = x2Inicial + dx2 * t;
            let novaY2 = y2Inicial + dy2 * t - h * 4 * t * (1 - t);

            //Aplicando novas posicoes
            copos[idx1].x = novaX1;
            copos[idx1].y = novaY1;

            copos[idx2].x = novaX2;
            copos[idx2].y = novaY2;

            desenharCopos(copos);

            passoAtual++;
            setTimeout(animar, 10);

        } else {

            //Aplicando posições contrárias dos copos
            copos[idx1].x = x2Inicial;
            copos[idx1].y = y2Inicial;

            copos[idx2].x = x1Inicial;
            copos[idx2].y = y1Inicial;


            desenharCopos(copos);

            if (callback)callback();

        }

    }
    animar();

}

function animarGirarCopo(copos, idx, velocidade, girarPara='frente', callback) {
    
    let x = copos[idx].x;
    let y = copos[idx].y;

    let escala = 0;
    let passos = 20;
    let passoAtual = 0;

    function animar() {
        
        if (passoAtual <= passos) {
            
            escala = 1 - Math.abs(passoAtual - 10) / 10;
            let larguraEscalada = copoLargura * escala;
            let posX = x + (copoLargura - larguraEscalada) / 2;

            contexto.fillStyle = BRANCO;
            contexto.fillRect(0, 0, LARGURA, ALTURA);

            for (let i = 0; i < copos.length; i++) {

                if (i !== idx) {
                    contexto.drawImage(copoTrasResized, copos[i].x, copos[i].y, copoLargura, copoAltura);
                }
                
            }

            let imagemCopo = girarPara === 'frente' ? copoFrenteResized : copoTrasResized;

            contexto.drawImage(imagemCopo, posX, y, larguraEscalada, copoAltura);

            if (girarPara === 'frente' && passoAtual >= 10) {
                contexto.drawImage(
                    bolaImagemResized,
                    x + copoLargura / 2 - bolaImagemResized.width / 2,
                    y + copoAltura - bolaImagemResized.height -10,
                    bolaImagemResized.width,
                    bolaImagemResized.height
                )
            }

            contexto.fillStyle = PRETO;
            contexto.font = '36px Arial';
            contexto.fillText(`Pontuação: ${pontuacao}`, 10, 40);

            let textoRodada = `Rodada: ${rodada}`;
            let larguraTextoRodada = contexto.measureText(textoRodada).width;
            contexto.fillText(textoRodada, LARGURA - larguraTextoRodada - 10, 40);

            passoAtual++;
            setTimeout(animar, velocidade);

        } else {

            desenharCopos(copos, girarPara === 'frente', idx);

            if (callback) {
                callback()
            }

        }

    }

    animar();

}

function embaralharCopos(copos, velocidade,callback) {
    
    let numeroDeEmbaralhamanetos = 10;
    let embaralhamentosFeitos = 0;

    function embaralhar() {
        
        if (embaralhamentosFeitos < numeroDeEmbaralhamanetos) {
            
            if (copos.length > 1) {
                
                let indices = [];

                for (let i = 0; i < copos.length; i++) {
                    indices.push(i);                
                }

                let idx1 = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];//Remove e obtem um indice aleatório
                let idx2 = indices[Math.floor(Math.random() * indices.length)];//Obtem outro indice aleatório dos restantes

                animarTroca(copos, idx1, idx2, velocidade, function () {
                    embaralhamentosFeitos++;
                    embaralhar();
                });

            } 
        } else {
                
            if (callback) callback();

        }
    }

    embaralhar();

}

let jogando = true;
let acerto = false;
let numeroCopos = 3;
let copoLargura = copoLarguraOriginal;
let copoAltura = copoAlturaOriginal;
let copoFrenteResized;
let copoTrasResized;
let bolaImagemResized;
let copos = [];
let estadosCopos = [];
let posicaoBola;

function iniciarJogo() {
    
    function jogoLoop() {
               
        if (rodada > 20 || !jogando) { 
            contexto.fillStyle = PRETO;
            contexto.font = '48px Arial';
            contexto.fillText('FIM DE JOGO!', LARGURA/2 - 150, ALTURA/2);
            contexto.font = '36px Arial';
            contexto.fillText(`Pontuação final: ${pontuacao}`, LARGURA/2 - 150, ALTURA/2 + 50);
            return;
        }
        if (rodada % 5 === 0 && rodada !== 0) {
            numeroCopos += 1;
        }

        let espaco = 50;
        let espacoTotal = LARGURA - 2 * espaco;
        let maxCopoLargura = (espacoTotal - (numeroCopos - 1) * 10) / numeroCopos;

        if (maxCopoLargura > copoLarguraOriginal) {
            copoLargura = copoLarguraOriginal;
        } else {
            copoLargura = Math.max(maxCopoLargura, MIN_COPO_LARGURA);
        }

        copoAltura = copoLargura * (copoAlturaOriginal / copoLarguraOriginal);

        copoFrenteResized = new Image();
        copoFrenteResized.src = copoFrenteOriginal.src;

        copoTrasResized = new Image();
        copoTrasResized.src = copoTrasOriginal.src;

        bolaImagemResized = new Image();
        bolaImagemResized.src = bolaImagemOriginal.src;

        copoFrenteResized.onload = function () {
            copoFrenteResized.width = copoLargura;
            copoFrenteResized.height = copoAltura;
        }
        copoTrasResized.onload = function () {
            copoTrasResized.width = copoLargura;
            copoTrasResized.height = copoAltura;
        }
        bolaImagemResized.onload = function () {
            bolaImagemResized.width = copoLargura * 0.33;
            bolaImagemResized.height = copoAltura * 0.33;
        }

        copos = gerarPosicoesIniciais(numeroCopos, copoLargura);

        if (!acerto) {
            posicaoBola = Math.floor(Math.random() * numeroCopos)
        }

        estadosCopos = new Array(numeroCopos).fill('tras');

        animarGirarCopo(copos, posicaoBola, 30, 'frente', function () {
            
            setTimeout(function () {
                animarGirarCopo(copos, posicaoBola, 30, 'tras', function () {
                    embaralharCopos(copos, velocidade, function () {

                        let esperandoEscolha = true;

                        function aoClicar(evento) {
                            
                            if (esperandoEscolha) {
                                
                                let rect = tela.getBoundingClientRect();

                                let xClique = evento.clientX - rect.left;
                                let yClique = evento.clientY - rect.top;

                                for (let i = 0; i < copos.length; i++) {

                                    let x = copos[i].x;
                                    let y = copos[i].y;

                                    if (
                                        xClique >= x &&
                                        xClique <= x + copoLargura &&
                                        yClique >= y &&
                                        yClique <= y + copoAltura
                                    ) {

                                        esperandoEscolha = false;

                                        tela.removeEventListener('click', aoClicar);

                                        animarGirarCopo(copos, i, 30, 'frente', function () {
                                            
                                            if (i === posicaoBola) {
                                                pontuacao += 1;
                                                velocidade += 1;
                                                acerto = true;

                                                contexto.fillStyle = VERDE;
                                                contexto.font = '36px Arial';

                                                let mensagem = 'Parabéns! Você acertou!';
                                                let largura_mensagem = contexto.measureText(mensagem).width;

                                                contexto.fillText(mensagem, LARGURA / 2- largura_mensagem / 2, 100);

                                                setTimeout(function () {
                                                    rodada+=1;
                                                    jogoLoop();
                                                }, 2000);

                                            } else {

                                                acerto = false;

                                                animarGirarCopo(copos, posicaoBola, 30, 'frente', function () {
                                                    
                                                    contexto.fillStyle = VERMELHO;
                                                    contexto.font = '36px Arial';

                                                    let mensagem = `Errado! A bola estava no copo ${posicaoBola + 1}`;
                                                    let largura_mensagem = contexto.measureText(mensagem).width;
                                                    contexto.fillText(mensagem, LARGURA / 2 - largura_mensagem / 2, 100);

                                                    setTimeout(function () {
                                                        
                                                        rodada += 1;
                                                        jogoLoop();

                                                    }, 2000);
                                                });
                                            }
                                        }); 
                                        
                                        break;
                                    }
                                }
                            }
                        }

                        tela.addEventListener('click', aoClicar);
                    });
                })
            }, 3000);

        });

    }

    jogoLoop()

}
