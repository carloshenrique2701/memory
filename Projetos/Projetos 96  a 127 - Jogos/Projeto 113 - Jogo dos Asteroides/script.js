const canvas = document.getElementById('telaJogo');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const imagensAsteroides = [];

let nave = {

    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 20,
    height: 20,
    angle: 0,
    velocidade: 0,
    rotacao: 0,
    tiros: []

}
let asteroides = [];
let pontos = 0;
let vidas = 3;


for (let i = 1; i <= 6; i++) {
    
    const img = new Image();

    img.src = `asteroides/asteroid${i}.png`;
    imagensAsteroides.push(img);
    
}

document.getElementById('pontos').textContent = pontos;
document.getElementById('vidas').textContent = vidas;

document.addEventListener('keydown', teclaPressionada);
document.addEventListener('keyup', teclaSolta);

function teclaSolta(e) {
    
    if (e.key === 'ArrowUp') {
        nave.velocidade = 0;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        nave.rotacao = 0;
    } else if (e.key === 'ArrowDown') {
        nave.velocidade = 0;
    } 
    

}

function teclaPressionada(e) {

    if (e.key === 'ArrowUp') {
        nave.velocidade = 5;
    } else if (e.key === 'ArrowLeft') {
        nave.rotacao = -0.1;
    } else if (e.key === 'ArrowRight') {
        nave.rotacao = 0.1;
    } else if (e.key === 'ArrowDown') {
        nave.velocidade = -5;
    } else if (e.key === ' ') {
        atirar()
    }
    
}

function atirar() {
    
    const tiro = {

        x: nave.x + Math.cos(nave.angle) * nave.width,
        y: nave.y + Math.sin(nave.angle) * nave.width,
        dx: Math.cos(nave.angle) * 5,
        dy: Math.sin(nave.angle) * 5

    }

    nave.tiros.push(tiro);

}

function criarAsteroids() {
    
    for (let i = 0; i < 5; i++) {
        
        adicionarAsteroids();
        
    }

}

function adicionarAsteroids() {
    //Nessa função, Math.random() é frequente mente usado para decidir cara ou coroa para definir posições
    let x, y;

    if (Math.random() < 0.5) {//Cara ou coroa para posição na parte do top ou baixo, esquerda ou direita

        x = Math.random() < 0.5 ? 0 : canvas.width;//Coloca do lado esquerda ou direita
        y = Math.random() * canvas.height;//Coloca em qualquer altura

    } else {

        y = Math.random() < 0.5 ? 0 : canvas.height;//Coloca em cima ou baixo
        x = Math.random() * canvas.width;//coloca em qualquer largura

    }

    let asteriode = {

        x: x,
        y: y,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        //Math.random() - 0.5 -> gera um número flutuante entre =0.5 a 0.5. Multiplicando por 2, temos -1 a 1,
            //isso define a velocidade  do deslocamento do asteroide para todas as direções de forma aleatória;
        radius: Math.random() * 30 + 15,
        //Essa propriedade determina o tamanho do asteroid gerando um número aleatório entre 0 a 30. Quando somado 
            //+15, o raio final varia entre min: 15 a max:45 definido, então, o tamanho do asteroid.
        imagem: imagensAsteroides[Math.floor(Math.random() * imagensAsteroides.length)]
        //Define uma imagem de asteroid aleatoriamente.

    }

    asteroides.push(asteriode);

}
 ///////////////////////////////  DESENHANDO ///////////////////////////////

function desenharNave() {
    
    ctx.save();
    ctx.translate(nave.x, nave.y);
    ctx.rotate(nave.angle);
    ctx.beginPath();
    ctx.moveTo(-nave.width / 2, nave.height / 2);
    ctx.lineTo(nave.width / 2, 0);
    ctx.lineTo(-nave.width / 2, -nave.height / 2);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();

}
function desenharTiros() {
    
    ctx.fillStyle = 'red';

    for (let tiro of nave.tiros) {
        
        ctx.beginPath();
        ctx.arc(tiro.x, tiro.y, 2, 0, Math.PI);//Desenha uma arco(nesse caso um circulo completo)
        ctx.fill();

    }

}
function desenharAsteroids() {
    
    for (let asteroid of asteroides) {
        
        ctx.drawImage(
            asteroid.imagem,
            asteroid.x - asteroid.radius,
            asteroid.y - asteroid.radius,
            asteroid.radius * 2,
            asteroid.radius * 2
        );

    }

}
 ///////////////////////////////  MOVIMENTOS ///////////////////////////////
function moverNave() {
    
    nave.angle += nave.rotacao;//Gira a nave
    nave.x += Math.cos(nave.angle) * nave.velocidade;//Move em x com base em seu angulo
    nave.y += Math.sin(nave.angle) * nave.velocidade;//Move em y com base em seu angulo

    if(nave.x < 0) nave.x = canvas.width;
    if(nave.y < 0) nave.y = canvas.height;
    if(nave.x > canvas.width) nave.x = 0;
    if(nave.y > canvas.height) nave.y = 0;

}
function moverTiros() {
    
    for (let i = nave.tiros.length - 1; i >= 0; i--) {
        
        let tiro = nave.tiros[i];
        tiro.x += tiro.dx;
        tiro.y += tiro.dy;

        if (tiro.x < 0 || tiro.x > canvas.width || tiro.y < 0 || tiro.y > canvas.height) {
            nave.tiros.splice(i, 1); //Remove se sair das bordas do canvas.
        }
        
    }

}
function moverAsteroids() {
    
    for (let asteroid of asteroides) {
        
        asteroid.x += asteroid.dx;
        asteroid.y += asteroid.dy;

        //Somente quando o asteroid ultrapassa por completo os limites do canvas, ele é teleportado pro outro lado
        if(asteroid.x < 0 - asteroid.radius) asteroid.x = canvas.width - asteroid.radius;
        if(asteroid.x  - asteroid.radius > canvas.width) asteroid.x = 0 - asteroid.radius;
        if(asteroid.y < 0  - asteroid.radius) asteroid.y = canvas.height - asteroid.radius;
        if(asteroid.y  - asteroid.radius > canvas.height) asteroid.y = 0 - asteroid.radius;

    }

}

 ///////////////////////////////  COLISÕES ///////////////////////////////
function detectarColisoes() {
    
    for (let i = nave.tiros.length - 1; i >= 0; i--) {
        //Verifica se 1 tiro atingiu algum asteroid
        
        let tiro = nave.tiros[i];
        
        for (let j = asteroides.length - 1; j >= 0; j--) {
            
            let asteroid = asteroides[j];

            let dist = Math.hypot(tiro.x - asteroid.x, tiro.y - asteroid.y);
            //Calcula a distância entre o tiro e o asteroid usando hypot(hipotenusa), que retorna a raiz
                //quadrada da soma dos quadrados das diferenças entre as cordenadas x e y dos dois objetos.
                //\(c=\sqrt{a^{2}+b^{2}}\)
            

            if (dist < asteroid.radius) {
                //Se a distancia entre o asteroid e o tiro for menor que o tamanho(radius) do asteroid
                
                pontos += 10;
                document.getElementById('pontos').textContent = pontos;
                nave.tiros.splice(i, 1);
                asteroides.splice(j, 1);
                adicionarAsteroids();
                break;

            }
        }
    }

    for (let asteroid of asteroides) {
        //Verifica se algum asteroid atingiu o jogador

        let dist = Math.hypot(nave.x - asteroid.x, nave.y - asteroid.y);

        if (dist < asteroid.radius) { 
            //Se a distancia entre o asteroid e a nave for menor que o tamanho(radius) do asteroid
            vidas --;

            document.getElementById('vidas').textContent = vidas;

            if (vidas <= 0) {
                
                alert('Game Over!');
                window.location.reload();

            }

            asteroides.splice(asteroides.indexOf(asteroid), 1);
            adicionarAsteroids();
            break;

        }

    }

}

function desenhar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharNave();
    desenharTiros();
    desenharAsteroids();
    moverNave();
    moverTiros();
    moverAsteroids();
    detectarColisoes();
    requestAnimationFrame(desenhar);

}

criarAsteroids();
setInterval(adicionarAsteroids, 5000);
desenhar();