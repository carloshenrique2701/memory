document.getElementById("botaoFecharPrincipal").addEventListener("click", function() { 

    document.getElementById("bannerPrincipal").style.display = "none"; 

});

document.querySelectorAll(".botaoFechar").forEach(botao =>{

    botao.addEventListener("click", function() { 

        event.stopPropagation(); // Impede que o evento se propague para o banner principal

        this.parentElement.style.display = "none"; // Fecha o banner específico

    });

});

document.querySelectorAll('.banner').forEach(banner => {

    banner.addEventListener('click', function() {

        window.open('https://www.webmotors.com.br/carros/estoque/chevrolet/impala', '_blank');

    });

});