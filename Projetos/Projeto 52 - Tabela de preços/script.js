document.addEventListener('DOMContentLoaded', function () {
   
    const botoesAssinar = document.querySelectorAll('.botao-assinar');

    botoesAssinar.forEach(botao =>{

        botao.addEventListener('click', function () {
            
            const planoId = this.parentElement.id;
            //Captura o ID do elemento pai do botão que 
            //representa o ID do plano associado

            window.location.href = `assinatura.html?plano=${planoId}`;

        });

    });

});