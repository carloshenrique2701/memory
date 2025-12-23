document.addEventListener('DOMContentLoaded', () => {

    const niveis = [
        {palavras: ['PEDRA', 'CARVAO', 'SELVA', 'LEAO'], letras: 'PEDRCAVSLO'},
        {palavras: ['FLORESTA', 'RIO', 'MONTANHA', 'SOL'], letras: 'FLORESTAMINH'},
        {palavras: ['COMPUTADOR', 'TECLADO', 'MOUSE', 'TELA'], letras: 'COMPUTADREL'},
        {palavras: ['BICICLETA', 'RODA', 'GUIAO', 'FREIO'], letras: 'BICLETARODGUIF'},
        {palavras: ['OCEANO', 'BARCO', 'PRAIA', 'ONDA'], letras: 'OCEANBARPID'},
        {palavras: ['MUSICA', 'NOTA', 'CANTO', 'SOM'], letras: 'MUSICANT'},
        {palavras: ['LIVRO', 'PAGINA', 'HISTORIA', 'AUTOR'], letras: 'LIVROPAGHSTER'},
        {palavras: ['JARDIM', 'FLOR', 'ARVORE', 'PLANTA'], letras: 'JARDIMFLORVPT'},
        {palavras: ['ESCOLA', 'PROFESSOR', 'ALUNO', 'AULA'], letras: 'ESCOLPROFESSRNAU'},
        {palavras: ['RESTAURANTE', 'MESA', 'COMIDA', 'PRATO'], letras: 'RESTAURANTEMSCDIPO'},
        {palavras: ['HOSPITAL', 'MEDICO', 'PACIENTE', 'REMEDIO'], letras: 'HOSPITALMEDICNTR'},
        {palavras: ['MERCADO', 'COMPRA', 'PRODUTO', 'PRECO'], letras: 'MERCADOCOMPRUT'},
        {palavras: ['BIBLIOTECA', 'LIVRO', 'ESTOJO', 'LEITURA'], letras: 'BIBLIOTECALVRSJ'},
        {palavras: ['PRAÇA', 'BANCO', 'FONTE', 'JARDIM'], letras: 'PRAÇABNCOFTEJ'},
        {palavras: ['AVIAO', 'AEROPORTO', 'VOO', 'PILOTO'], letras: 'AVIAOEROPORTL'},
        {palavras: ['CARRO', 'MOTOR', 'RODA', 'PNEU'], letras: 'CARROMOTDPN'},
        {palavras: ['CELULAR', 'TELA', 'BOTAO', 'CHAMADA'], letras: 'CELULARTEBOCMHD'},
        {palavras: ['RELOGIOS', 'PONTEIRO', 'HORA', 'TEMPO'], letras: 'RELOGIOSPONTEIRHTM'},
        {palavras: ['CASA', 'PORTA', 'JANELA', 'QUARTO'], letras: 'CASAPORTJNELQUR'},
        {palavras: ['ESPORTE', 'BOLA', 'JOGO', 'TIME'], letras: 'ESPORTEBALJGTM'},
        {palavras: ['INVERNO', 'FRIO', 'NEVE', 'CASACO'], letras: 'INVERNOFECAS'},
        {palavras: ['VERAO', 'CALOR', 'PRAIA', 'SOL'], letras: 'VERAOCALRPIS'},
        {palavras: ['ANIMAL', 'GATO', 'CACHORRO', 'PATO'], letras: 'ANIMALGTCHRP'},
        {palavras: ['FRUTA', 'BANANA', 'MACA', 'LARANJA'], letras: 'FRUTABANMCLRJ'},
        {palavras: ['CORES', 'AZUL', 'VERMELHO', 'VERDE'], letras: 'CORESAZULVMELHD'},
        {palavras: ['FAMILIA', 'PAI', 'MAE', 'FILHO'], letras: 'FAMILIAPAIMEFLH'},
        {palavras: ['TRABALHO', 'ESCRITORIO', 'CHEFE', 'FUNCAO'], letras: 'TRABALHOESCRITRCHEFUN'},
        {palavras: ['CIDADE', 'RUA', 'PREDIO', 'CARRO'], letras: 'CIDADERUAPREDOC'},
        {palavras: ['PAISAGEM', 'NATUREZA', 'BELO', 'VISTA'], letras: 'PAISAGEMNATUREZBLVT'},
        {palavras: ['VIAGEM', 'MALA', 'PASSAPORTE', 'HOTEL'], letras: 'VIAGEMALPSSPORTEHT'}
    ];

    let nivelAtual = parseInt(localStorage.getItem('nivelAtual')) || 0;

    let pontos = parseInt(localStorage.getItem('pontos')) || 0;

    const gradePalavras = document.getElementById("grade-palavras");
    const circuloLetras = document.getElementById("circulo-letras");
    const mensagem = document.getElementById("mensagem");
    const totalMoedas = document.getElementById("total-moedas");
    const nivelAtualElement = document.getElementById("nivel-atual");
    const canvas = document.getElementById("linha-conexao");
    const botaoDica = document.getElementById("botao-dica");
    const modalDica = document.getElementById("modal-dica");
    const palavrasDica = document.getElementById("palavras-dica");
    const fecharDica = document.getElementById("fechar-dica");
    const ctx = canvas.getContext('2d');

    totalMoedas.textContent = pontos;
    nivelAtualElement.textContent = nivelAtual + 1;

    let timer;
    let letrasSelecionadas = '';
    let celulasSelecionadas = [];

    function reiniciarSelecao() {
        
        clearTimeout(timer);

        letrasSelecionadas = '';

        celulasSelecionadas.forEach(celula => celula.style.backgroundColor = '#ff4081');
        celulasSelecionadas = []

    }

    function criarGradePalaveas(palavras) {
        
        gradePalavras.innerHTML = '';

        palavras.forEach(palavra => {

            const linha = document.createElement('div');

            linha.classList.add('linha-palavra');
            linha.dataset.palavra = palavra;

            for (let i = 0; i < palavra.length; i++) {
                
                const celula = document.createElement('div');
                celula.classList.add('celula-palavra', 'vazio');
                linha.appendChild(celula);

            }

            gradePalavras.appendChild(linha);

        });

    }

    function criarCiculoLetras(letras) {
        
        circuloLetras.innerHTML = '';

        const circulo = document.createElement('div');

        circulo.style.width = '500px';
        circulo.style.height = '500px';
        circulo.style.borderRadius = '50%';
        circulo.style.position = 'relative';
        circulo.style.backgroundColor = '#81c784';

        circuloLetras.appendChild(circulo);

        const minRadius = 200;//Raio mínimo em px
        const maxRadius = 250;//Raio máximo em px
        const numLetters = letras.length; 
        const radius = Math.min(maxRadius, minRadius + numLetters * 5); 
        //Calcula o raio efetivo do circulo, ajustando com base no número de letras.
        //Isso assegura que o circulo seja grande o suficiente para acomodar todas as letras confortavelmente.

        const angleStep = (2 * Math.PI) / numLetters;
        //Calcula o passo angular entre cada letra, dividindo o circulo completo em 360 graus (2 * PI) pelo número 
            // de letras. Em outras palavras, basicamente calcula a distribuição dos elementos no circulo para que
            //não fique algum elemento com espaçamento irregular, e sim, todos igualmente distribuidos.
        //isso determina o angulo de separação entre cada letra no cpirculo. 

        letras.split('').forEach((letra, index) => {
            //Divide a string letras em um array de caracteres individuais e intera sobre ele, por exemplo:
                //letras: 'PEDRCAVSLO' => letras = ['P', 'E', 'D', 'R', 'C', 'A', 'V', 'S', 'L', 'O'].

            const angle = index * angleStep;
            //Calcula em radianos para cada letra, multiplicando o indice pela quantidade de espaço entre elas.
            const x = radius * Math.cos(angle) + circulo.offsetWidth / 2 - 40;
            //Calcula a posição x usando o cosseno do ângulo, ajustando para o centro do círculo e centralizando a célula.
            const y = radius * Math.sin(angle) + circulo.offsetHeight / 2 - 40;
            //Calcula a posição y usando o seno do ângulo, ajustando para o centro do círculo e centralizando a célula.
            const celula = document.createElement('div');

            celula.textContent = letra;
            celula.style.left = `${x}px`;
            celula.style.top = `${y}px`;
            celula.style.position = `absolute`;
            celula.style.width = `80px`;
            celula.style.height = `80px`;
            celula.style.borderRadius = `50%`;
            celula.style.backgroundColor = `#ff4081`;
            celula.style.display = `flex`;
            celula.style.justifyContent = `center`;
            celula.style.alignItems = `center`;
            celula.style.color = `#fff`;
            celula.style.border = `2px solid #388e3c`;
            celula.style.transform = `background-color 0.3s`;

            celula.addEventListener('click', selecionarLetra);

            circulo.appendChild(celula)

        });

        canvas.width = circuloLetras.offsetWidth;
        canvas.height = circuloLetras.offsetHeight;

    }

    function selecionarLetra(event) {

        const letraClicada = event.target;
        letrasSelecionadas += letraClicada.textContent;//Acumula as letras clicadas
        celulasSelecionadas.push(letraClicada);//Mais tarde esse array rastreia quais celulas foram selecionadas
        letraClicada.style.backgroundColor = '#ffeb3b';
        
        clearTimeout(timer);//Limpa o timer atual, evitando que a seleção seja reiniciada prematuramente
        timer = setTimeout(reiniciarSelecao, 5000);
        
        verificarPalavra(letrasSelecionadas);
        
    }

    function verificarPalavra(palavra) {

        const linhas = Array.from(gradePalavras.children);//Converte a coleção de elementos filhos para em um array
        //'gradePalavras.children' contém todos os elementos que representam linhas de palavras na interface no jogo.

        let encontrou = false;

        linhas.forEach(linha => {

            if (linha.dataset.palavra === palavra && !encontrou) {
                //Verifica se o 'data-palavra' === palavra formada pelas letras selecionadas.
                //A condição !encontrou garante que a busca pare assim que uma correspondência válida for 
                    //encontrada, previnindo verificações desnecessárias. 
                
                preencherPalavraNaGrade(linha, palavra);
                encontrou = true;

            }

        });

        if (encontrou) {
            
            mensagem.textContent = 'Excelente!';

            const palavras = niveis[nivelAtual].palavras;//Acessa a lista de palavras do nivel atua
            palavras.splice(palavras.indexOf(palavra), 1);//Remove a palavra encontrada da lista evitando que seja encontrada novamente

            if (palavras.length === 0) avançarNivel();//Se todas as palavras forem encontradas

            celulasSelecionadas.forEach(celula => celula.style.backgroundColor = '#4caf50');//Verde 

            setTimeout(() => {

                celulasSelecionadas.forEach(celula => celula.style.backgroundColor = '#ff4081');//Volta acor original
                celulasSelecionadas = [];

            }, 1000);

            letrasSelecionadas = '';

        } else {

            mensagem.textContent = '';
            
        }
        
    }

    function avançarNivel() {
        
        pontos += 100;
        nivelAtual += 1;
        
        localStorage.setItem('pontos', pontos)
        localStorage.setItem('nivelAtual', nivelAtual);

        if(nivelAtual < niveis.length){

            carregarNivel();

        } else {

            mensagem.textContent = 'Parabéns!!! Você completou todos os níveis!';

        }

        totalMoedas.textContent = pontos;
        nivelAtualElement.textContent = nivelAtual + 1;

    }

    function preencherPalavraNaGrade(linha, palavra) {
        
        const celulas = Array.from(linha.children);//Converte a coleção de elementos filhos para em um array

        for (let i = 0; i < palavra.length; i++) {//Itera sobre cada letra na palavra fornecida
            
            celulas[i].textContent = palavra[i];//Adiciona cada letra da palavra acertada
            celulas[i].classList.remove('vazio');
            celulas[i].classList.add('preenchido');

            
        }

    }

    function carregarNivel() {
        
        const nivel = niveis[nivelAtual];

        criarGradePalaveas(nivel.palavras);
        criarCiculoLetras(nivel.letras);

        mensagem.textContent = '';
        celulasSelecionadas = []
        letrasSelecionadas = '';

    }

    carregarNivel();

    botaoDica.addEventListener('click', () => {

        const nivel = niveis[nivelAtual];

        palavrasDica.innerHTML = `<strong>Palavras:</strong> ${nivel.palavras.join(', ')}`;
        modalDica.style.display = 'block';

    });

    fecharDica.addEventListener('click', () => {

        modalDica.style.display = 'none';

    })

})