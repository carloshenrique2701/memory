document.addEventListener('DOMContentLoaded', function () {
    
    const tabela = document.getElementById('tabela-central').getElementsByTagName('tbody')[0];

    const tooltipSerie = document.getElementById('serie-tooltip');

    const tooltipDetalhes = document.getElementById('detalhes-tooltip');

    let tempoEsconderTooltip;

    const excel = 'notas_estudantes.xlsx';

    function carregarDados(arquivo) {
        
        fetch(arquivo)
            .then(response => response.arrayBuffer())
            .then(data => {

                const wb = XLSX.read(data, { type: 'array'});

                const ws = wb.Sheets['Dados'];

                const dadosJson = XLSX.utils.sheet_to_json(ws, { header: 1 });

                processarDados(dadosJson);

            })
            .catch(error => console.error('Erro ao carregar o arquivo: ', error));

    }

    carregarDados(excel);

    const turmas = {};

    function processarDados(dados) {
        // Pular cabeçalho
        const linhas = dados.slice(1);
        
        linhas.forEach(linha => {
            const [nome, turma, n1, n2, n3, n4, faltas] = linha;
            
            // Converter vírgula para ponto e garantir números
            const converterNumero = (valor) => parseFloat(valor.toString().replace(',', '.'));
            
            const notas = [n1, n2, n3, n4].map(converterNumero);
            const media = notas.reduce((sum, nota) => sum + nota, 0) / 4;
            const totalFaltas = parseInt(faltas);
    
            // Inicializar ou atualizar turma
            if(!turmas[turma]){
                turmas[turma] = {
                    somaMedias: 0,
                    totalAlunos: 0,
                    totalFaltas: 0,
                    alunos: []
                };
            }

            const aluno = {
                nomeAluno: nome,
                mediaAluno: media,
                faltasAluno: totalFaltas,
                turmaAluno: turma,
                notasAluno: notas
            };
    
            // Atualizar dados da turma
            turmas[turma].somaMedias += media;
            turmas[turma].totalAlunos++;
            turmas[turma].totalFaltas += totalFaltas;
            turmas[turma].alunos.push(aluno);
        });
    
        // Agora criar as linhas da tabela
        Object.keys(turmas).forEach(turma => {
            const dadosTurma = turmas[turma];
            const mediaTurma = dadosTurma.somaMedias / dadosTurma.totalAlunos;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${turma}</td>
                <td>${mediaTurma.toFixed(2)}</td>
                <td>${dadosTurma.totalFaltas}</td>
            `;
            tabela.appendChild(tr);

            tr.addEventListener('mousemove', function(evento) {
                
                exibirTooltip(evento, dadosTurma.alunos, turma);

            });

            tr.addEventListener('mouseout', function() {
                
                tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

            });
        });
        
    }

    function exibirTooltip(evento, alunos, turma) {
        // Limpar tabela anterior
        const tabelaSerie = document.getElementById('tabela-serie').getElementsByTagName('tbody')[0];
        tabelaSerie.innerHTML = ''; // Limpar antes de adicionar novos
        
        // Atualizar título da série
        const serie = document.getElementById('serie');
        serie.innerHTML = `<strong>Série: </strong>${turma}`;
        
        // Processar CADA aluno do array
        alunos.forEach(aluno => {
            let situacao = calcularSituacao(aluno.mediaAluno, aluno.faltasAluno);
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.nomeAluno}</td>
                <td>${aluno.mediaAluno.toFixed(2)}</td>
                <td class="${situacao === 'Aprovado' ? 'aprovado' :
                            situacao === 'Recuperação' ? 'recuperacao' : 'reprovado'}">
                    ${situacao}
                </td>
            `;

            tabelaSerie.appendChild(tr);

            tr.addEventListener('mousemove', function(evento) {
                
                exibirTooltipDetalhes(evento, aluno);

            });

            tr.addEventListener('mouseout', function() {
                
                tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

            });
            
        });
    
        tooltipSerie.style.display = 'block';
        posicionarTooltip(tooltipSerie, evento, 10, 10);

    }

    function exibirTooltipDetalhes(evento, aluno) {

        let situacao = calcularSituacao(aluno.mediaAluno, aluno.faltasAluno);

        tooltipDetalhes.innerHTML = `
            <div class="separacao">
                <h4>Nome: </h4>
                <p>${aluno.nomeAluno}</p>
            </div>
            <div class="separacao">
                <table>
                    <thead>
                        <th>Nota 1</th>
                        <th>Nota 2</th>
                        <th>Nota 3</th>
                        <th>Nota 4</th>
                    </thead>

                    <tbody>
                        <tr>
                            <td>${aluno.notasAluno[0].toFixed(1)}</td>
                            <td>${aluno.notasAluno[1].toFixed(1)}</td>
                            <td>${aluno.notasAluno[2].toFixed(1)}</td>
                            <td>${aluno.notasAluno[3].toFixed(1)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="separacao">
                <h4>Média: </h4>
                <p>${aluno.mediaAluno.toFixed(2)}</p>
                <h4>Situação: </h4>
                <p class="${situacao === 'Aprovado' ? 'aprovado' :
                            situacao === 'Recuperação' ? 'recuperacao' : 'reprovado'}">

                    ${situacao}
                
                </p>
                <h4>Faltas: </h4>
                <p>${aluno.faltasAluno}</p>
            </div>
        `;

        tooltipDetalhes.style.display = 'block';
        posicionarTooltip(tooltipDetalhes, evento, 10, 10);


    }

    function posicionarTooltip(tooltip, evento, offsetX = 10, offsetY = 10) {

        const larguraTooltip = tooltip.offsetWidth;
        const alturaTooltip = tooltip.offsetHeight;
        const larguraJanela = window.innerWidth;
        const alturaJanela = window.innerHeight;
    
        let left = evento.pageX + offsetX;
        let top = evento.pageY + offsetY;
    
        // Se ultrapassar a borda direita → posiciona à esquerda do cursor
        if (left + larguraTooltip > larguraJanela) {
            left = evento.pageX - larguraTooltip - offsetX;
        }
    
        // Se ultrapassar a borda inferior → posiciona acima do cursor
        if (top + alturaTooltip > alturaJanela) {
            top = evento.pageY - alturaTooltip - offsetY;
        }
    
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        
    }
    

    function calcularSituacao(media, faltas) {
        if (faltas > 10) {
            return 'Reprovado por falta';
        } else if (media >= 7) {
            return 'Aprovado';
        } else if (media >= 4) {
            return 'Recuperação';
        } else {
            return 'Reprovado por nota';
        }
    }

    function esconderTooltip() {
        // Só esconder se o mouse não estiver sobre NENHUM dos dois tooltips
        const mouseSobreSerie = tooltipSerie.matches(':hover');
        const mouseSobreDetalhes = tooltipDetalhes.matches(':hover');
    
        if (!mouseSobreSerie && !mouseSobreDetalhes) {
            tooltipSerie.style.display = 'none';
            tooltipDetalhes.style.display = 'none';
        }
    }
    
    // Quando o mouse sai do tooltip 1 (séries)
    tooltipSerie.addEventListener('mouseout', function (event) {
        // Se o mouse foi para dentro do tooltipDetalhes, não esconder
        if (!tooltipDetalhes.contains(event.relatedTarget)) {
            tempoEsconderTooltip = setTimeout(esconderTooltip, 200);
        }
    });
    
    // Quando o mouse sai do tooltip 2 (detalhes)
    tooltipDetalhes.addEventListener('mouseout', function (event) {
        // Se o mouse foi para dentro do tooltipSerie, não esconder
        if (!tooltipSerie.contains(event.relatedTarget)) {
            tempoEsconderTooltip = setTimeout(esconderTooltip, 200);
        }
    });
    
    // Se o mouse voltar para qualquer tooltip, cancelar o fechamento
    tooltipSerie.addEventListener('mouseover', () => clearTimeout(tempoEsconderTooltip));
    tooltipDetalhes.addEventListener('mouseover', () => clearTimeout(tempoEsconderTooltip));
    

    document.getElementById('filtro').addEventListener('input', filtrarListaSerieAlunos);

    function filtrarListaSerieAlunos(event) {
        
        const termo = event.target.value.toLowerCase();

        const alunosLinha = document.getElementById('tabela-serie').querySelectorAll('tbody tr');

        alunosLinha.forEach(linha => {

            const nome = linha.cells[0].innerHTML.toLowerCase();
            const situacao = linha.cells[2].innerHTML.toLowerCase();

            if(nome.includes(termo) || situacao.includes(termo)){

                linha.style.display = '';

            } else{

                linha.style.display = 'none';

            }

        });

    }

});