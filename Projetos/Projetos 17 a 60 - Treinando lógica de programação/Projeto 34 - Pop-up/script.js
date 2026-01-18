var modal = document.getElementById('meuModal');

var botaoModal = document.getElementById('botaoModal');

var spanFecharModal = document.getElementById('fechar');


botaoModal.onclick = function() {
    
    modal.style.display = 'block';

}

spanFecharModal.onclick = function() {

    modal.style.display = 'none';

}

/* Quando o usuário clicar em qualquer lugar fora do modal, ele será fechado */
window.onclick = function(event) {

    if(event.target == modal) {

        modal.style.display = 'none';

    }

}

/************************************************************************************************************************************************/

var botaoAlerta = document.getElementById('botaoAlerta');

botaoAlerta.onclick = function() {

    alert("Essa é uma mensagem de alerta!");

}

/************************************************************************************************************************************************/

var botaoNotificação = document.getElementById('botaoNotificacao');

var botaoFechar = document.getElementById('botao-fechar'); 

botaoNotificação.onclick = function() {

    var notificacao = document.getElementById('notificacao');

    notificacao.className = "notificacao mostrar"

    setTimeout(function() {

        notificacao.className = notificacao.className.replace('mostrar', '');

    }, 5000);

}

botaoFechar.onclick = function() {

    var notificacao = document.getElementById('notificacao');

    notificacao.className = notificacao.className.replace('mostrar', '');

}

/************************************************************************************************************************************************/

var botaoLightBox = document.getElementById('botaoLightbox');

var lightBox = document.getElementById('lightbox');

var imagemLightbox = document.getElementById('imagemLightbox');

var spanFecharLightbox = document.getElementsByClassName('fechar')[2];

botaoLightBox.onclick = function() {

    var imagem = document.getElementById('imagem');

    imagem.style.display = 'block';

    imagem.click();

    imagem.style.display = 'none';

}

spanFecharLightbox.onclick = function() {

    lightBox.style.display = 'none';
    
}

window.onclick = function(event) {

    if(event.target == lightBox) {

        lightBox.style.display = 'none';

    }

}

function abrirLightBox(element) {

    lightBox.style.display = 'block';

    imagemLightbox.src = element.src;

    document.getElementById("legenda").innerHTML = element.alt;
    
}

/************************************************************************************************************************************************/

var botaoMenuContexto = document.getElementById('botaoMenuContexto');

var menuContexto = document.getElementById('menu-conteudo');

botaoMenuContexto.onclick = function() {

    event.preventDefault();

    menuContexto.style.top = "50%";

    menuContexto.style.left = "50%";

    menuContexto.style.transform = "translate(-50%, -50%)";

    menuContexto.style.display = 'block';

}

window.onclick = function(event) {

    if(event.button !== 2 && event.target !== botaoMenuContexto) {

        menuContexto.style.display = 'none';

    }

}


function acao1() {

    alert("Ação 1 selecionada!");
    document.body.style.backgroundColor = "#b69696";
    menuContexto.style.display = 'none';

    
}

function acao2() {

    alert("Ação 2 selecionada!");
    document.body.style.backgroundColor = "#a296b6ff";
    menuContexto.style.display = 'none';

    
}

function acao3() {

    alert("Ação 3 selecionada!");
    document.body.style.backgroundColor = "#595757ff";
    menuContexto.style.display = 'none';


}

/************************************************************************************************************************************************/

var botaoConfimacao = document.getElementById('botaoConfirmacao');

var confirmacao = document.getElementById('confirmacao');

var spanFecharConfirmacao = document.getElementsByClassName('fechar')[3];

var botaoSim = document.getElementById('botaoSim');

var botaoNao = document.getElementById('botaoNao');

botaoConfimacao.onclick = function() {

    confirmacao.style.display = 'block';

}

spanFecharConfirmacao.onclick = function() {

    confirmacao.style.display = 'none';

}

botaoSim.onclick = function() {
    
    document.body.style.backgroundColor = "#6b5a1aff";
    confirmacao.style.display = 'none';

}

botaoNao.onclick = function() {

    confirmacao.style.display = 'none';

}

window.onclick = function(event) {

    if(event.target == confirmacao) {

        confirmacao.style.display = 'none';

    }

}

/*************************************************************************************************************************************************/

var botaoEntradaTexto = document.getElementById('botaoEntradaTexto');

var entradaTexto = document.getElementById('entradaTexto');

var spanFecharEntradaTexto = document.getElementsByClassName('fechar')[4];

var botaoEnviar = document.getElementById('botaoEnviar');

var textoEntrada = document.getElementById('textoEntrada');

botaoEntradaTexto.onclick = function() {

    entradaTexto.style.display = 'block';

}

spanFecharEntradaTexto.onclick = function() {

    entradaTexto.style.display = 'none';

}

botaoEnviar.onclick = function() {

    var texto = document.getElementById('textoEntrada').value;

    alert("Você digitou: " + texto);

    entradaTexto.style.display = 'none';

    textoEntrada.value = '';

}

window.onclick = function(event) {

    if(event.target == entradaTexto) {

        entradaTexto.style.display = 'none';

    }

}