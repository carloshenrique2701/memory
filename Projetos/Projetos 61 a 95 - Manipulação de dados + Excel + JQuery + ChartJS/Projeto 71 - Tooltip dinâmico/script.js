document.addEventListener('DOMContentLoaded', function () {
    
    const tooltip = document.getElementById('tooltip');

    const trBody = document.getElementById('corpoTabela').getElementsByTagName('tr');

    let tempoEsconderTooltip;

    for (let i = 0; i < trBody.length; i++) {
        
        trBody[i].addEventListener('mouseover', function (evento) {
        
            clearTimeout(tempoEsconderTooltip);
            adicionarElementosTooltip(trBody[i]);
            exibirTooltip(evento);
    
        });
    
        trBody[i].addEventListener('mouseout', function () {
            
            tempoEsconderTooltip = setTimeout(esconderTooltip, 300);
    
        });
        
    }


    tooltip.addEventListener('mouseover', function () {
        
        clearTimeout(tempoEsconderTooltip);

    });

    tooltip.addEventListener('mouseout', function () {
        

        tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

    });

    function adicionarElementosTooltip(linha) {
        
        tooltip.innerHTML = `
        <p><strong>Nome:</strong> ${linha.cells[0].innerHTML}</p>
        <p><strong>Departamento:</strong> ${linha.cells[1].innerHTML}</p>
        <p><strong>Email:</strong> ${linha.cells[2].innerHTML}</p>
        <button id="eviarEmail">Enviar email</button>`

        document.getElementById('eviarEmail').addEventListener('click', function () {
            
            const nome = linha.cells[0].innerHTML;
            const departamento = linha.cells[1].innerHTML;
            const destinatario = linha.cells[2].innerHTML;

            const assunto = 'Chamado do RH';

            const corpo = `Olá ${nome}, sou do RH e preciso confirmar alguns dados com você. Por favor, verifique se estão corretos e me dê uma resposta:
                Nome: ${nome}
                Departamento: ${departamento}
                Email: ${destinatario}
            `;

            /*
            const mailtoUrl = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoTexto)}`;

            window.location.href = mailtoUrl;
            */
            //encodeURIComponent = codifica amensagem para inclusão na url
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destinatario)}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

            window.open(gmailUrl, '_blank');

        })

    }

    function exibirTooltip(evento) {
    
        tooltip.style.display = 'block';

        tooltip.style.left = evento.pageX + 'px';
        tooltip.style.top = evento.pageY + 'px';

    }

    function esconderTooltip() {
        
        tooltip.style.display = 'none';

    }

});



