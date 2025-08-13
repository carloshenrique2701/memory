let indiceAtual = 0;

const slides = document.querySelectorAll('.item-carousel');

const containerCarousel = document.querySelector('.container-carousel');

const bannerAnimado = document.querySelector('.banner-animado');

const bannerResponsivo = document.querySelector('.banner-responsivo');

/************************************************************************************************************************************************* */

function mostrarSlides(indice){

    slides.forEach((slide, index) => {
        slide.style.display = (index === indice) ? 'block' : 'none';
    });

    indiceAtual = indice;

}

/************************************************************************************************************************************************* */
/**
 * 
 * A lógica matemática utilizada aqui, é que quando o índice atual é incrementado, 
 * ele deve voltar ao início (0) quando atingir o número total de slides.
 * Da mesma forma, quando decrementamos o índice atual, ele deve voltar ao fim (slides.length - 1).
 * Por exemplo, se o indice atual for 1, ele recebe +1 e se torna 2. Depois, ele é dividido(resto) pelo número total de slides (3), 
 * resultando em 0, pois 2 % 3 é 2. Isso cria um loop que é cessado quando atingir 3, pois 0 % 3 = 0 | 1 % 3 = 1 | e 2 % 3 = 2, porém 
 * 3 % 3 = 0, reiniciando o ciclo. Evitando assim, precisarmos usar um if para verificar se o índice atual é maior ou igual ao número de slides.
 * 
 * Beneficios:
 * - Código mais limpo e conciso.
 * - Menos linhas de código, o que facilita a manutenção.
 * - Evita a necessidade de condicionais adicionais, tornando o código mais eficiente.
 * - Facilita a compreensão do fluxo de controle, pois a lógica é mais direta.
 * - Melhora a legibilidade, pois a operação matemática é intuitiva para quem entende o conceito de módulo.
 * - Permite uma fácil adaptação caso o número de slides mude, pois a lógica permanece a mesma.
 * - Evita erros comuns de lógica que podem ocorrer com condicionais complexos.
 * - Evita repetição de condicionais, tornando o código mais DRY (Don't Repeat Yourself).
 * 
 */
function slideProximo() {
    indiceAtual = (indiceAtual + 1) % slides.length;
    mostrarSlides(indiceAtual);
}

function slideAnterior() {
    indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
    mostrarSlides(indiceAtual);
}

function fecharCarousel() {
    containerCarousel.style.display = 'none';
    indiceAtual = 0; // Reseta o índice atual ao fechar o carousel
}

function fecharBannerAnimado(event) {
    event.preventDefault();
    bannerAnimado.style.display = 'none';
}

function fecharBannerResponsivo(event) {
    event.stopPropagation();
    bannerResponsivo.style.display = 'none';
}

setInterval(slideProximo, 5000); // Muda o slide automaticamente a cada 5 segundos

/************************************************************************************************************************************************* */

function abrirLink(url){
    window.open(url, '_blank');
}

function abrirGoogle(){
    window.open('https://www.google.com', '_blank');
}

/************************************************************************************************************************************************* */

mostrarSlides(indiceAtual);