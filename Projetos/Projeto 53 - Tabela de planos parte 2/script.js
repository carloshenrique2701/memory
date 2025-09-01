document.addEventListener('DOMContentLoaded', function () {
    
    const botoesAssinar = document.querySelectorAll('#comprar-assinatura');

    botoesAssinar.forEach(botao =>{

        botao.addEventListener('click', function () {
            
            const planoID = this.parentElement.id;

            window.location.href = `assinatura.html?plano=${planoID}`;

        })


    });

});