document.addEventListener('DOMContentLoaded', function () {
    
    const tabela = document.querySelector('#tabela-dados tbody');

    const excel = 'Estados.xlsx';

    function carregarDados(arquivo) {
        
        fetch(arquivo)
            .then(response => response.arrayBuffer())

            .then(data => {

                const wb = XLSX.read(data, {type: 'array'});

                const ws = wb.Sheets['Dados'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, { header: 1 })
                // header: 1, indica que a primeira linha é um cabeçalho

                processarDados(dadosJson);
                
            })

            .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    function processarDados(dados) {
        
        dados.slice(1).forEach(linha => {
            
            const tr = document.createElement('tr');

            linha.forEach((celula, indice) => {

                const td = document.createElement('td');

                if (indice === 2) {
                    //Se fo a linha de indice 2, que no caso é um numero, o numero 
                    // é formatado antes de ser inserido na tabela
                    td.textContent = Number(celula).toLocaleString('pt-BR');

                } else{

                    td.textContent = celula;

                }

                tr.appendChild(td);

            });

            tabela.appendChild(tr);

        });

    }

    function destacarCelulas(evento) {
        
        const celulas = document.querySelectorAll('#tabela-dados td, #tabela-dados th');

        celulas.forEach(celula => {

            celula.classList.remove('destaque', 'destaque-atual');

        });

        if (evento.target.tagName === 'TD') {
            
            const indiceTd = evento.target.cellIndex;
            /* Obtém o índice da célula na linha (começando de 0), o que é 
                        útil para destacar a coluna correta. */

            const indiceTr = evento.target.parentNode.rowIndex;
            /* Obtém o índice da linha onde a célula está. Este índice é 
                        usado para destacar a linha correta.
            'parentNode' refere-se ao elemento pai da célula (tr), e 'rowIndex' 
                        dá o índice baseado em sua posição no contexto da tabela. */

            document.querySelectorAll(`#tabela-dados tr:nth-child(${indiceTr}) td`)
            .forEach(td => td.classList.add('destaque'));
            /* Esta linha utiliza o método `document.querySelectorAll` para 
                        selecionar todos os elementos 'td' (células da tabela)
                        que estão dentro da linha especificada pelo índice 
                        `indiceTr`. 
            O `nth-child` é um seletor CSS que seleciona o filho especificado por 
                        um índice de seu elemento pai, neste caso, `indiceTr` que é 
                        o índice da linha onde ocorreu o evento.
            Para cada uma dessas células selecionadas ('td'), o método `forEach` é 
                        aplicado para iterar sobre cada elemento 'td'.
            Dentro do `forEach`, a função anônima recebe cada 'td' e adiciona a 
                        classe 'destaque' ao seu atributo de classe.
            A classe 'destaque' é definida no CSS para alterar a aparência 
                        visual das células, como mudança de cor de fundo, indicando
                        que toda a linha está sendo destacada devido à 
                        interação do usuário. */

            document.querySelectorAll(`#tabela-dados tr td:nth-child(${indiceTd + 1})`)
            .forEach(td => td.classList.add('destaque'));
            /* Similar à linha anterior, esta linha de código seleciona todas 
                        as células ('td') que estão na mesma coluna do elemento
                        onde o evento de mouseover ocorreu. 
            A seleção é feita por `nth-child(${indiceTd + 1})`, que 
                        identifica todas as células que estão na posição 
                        de coluna igual ao índice da célula alvo (`indiceTd`) 
                        mais um, porque os índices no CSS começam em 1,
                        enquanto o índice no JavaScript (`cellIndex`) começa em 0. 
            O método `forEach` é novamente utilizado para iterar por todas
                        as células retornadas e `classList.add('destaque')` é 
                        chamado em cada uma delas para aplicar a classe de estilo que altera
                        visualmente a cor de fundo, destacando a coluna inteira visualmente. */
            
            document.querySelector(`#tabela-dados tr:nth-child(1) th:nth-child(${indiceTd + 1})`)
            .classList.add('destaque');
            /* Esta linha seleciona especificamente o cabeçalho da coluna (elemento 'th') 
                        que corresponde à coluna onde o evento de mouseover
                        foi detectado. 
            `document.querySelector` é usado para obter o primeiro (e único) 
                        cabeçalho de coluna que corresponde ao seletor
                        CSS especificado, que utiliza `nth-child` para 
                        encontrar o cabeçalho na mesma posição da célula 
                        que desencadeou o evento.
            A adição da classe 'destaque' ao cabeçalho da coluna não só 
                        ajuda a identificar visualmente qual coluna 
                        está ativa, mas também alinha esteticamente com o 
                        destaque das células da coluna, fornecendo uma experiência 
                        de usuário coesa e informativa. */

            
            evento.target.classList.add('destaque-atual');

        } 

    }

    tabela.addEventListener('mouseover', destacarCelulas)

    carregarDados(excel);

})