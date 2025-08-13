document.getElementById('seletorArquivo').addEventListener('change', function (e) {
                                                            //É acionado quando  o usu seleciona um arquivo atravez do input
    const arquivos = e.target.files;//files é uma propriedade q contem os arquivos selecionados
    const galeria = document.getElementById('galeria');

    Array.from(arquivos).forEach(arquivo=>{

        if(arquivo.type.startsWith('image/')){

            const leitor = new FileReader();//ferramenta que permite ler o conteúdo do arquivo armazenado no cliente

            leitor.onload = function (e) {

                const descricao = prompt("Insira uma descrição para a imagem '" + arquivo.name + "':");
                const div = document.createElement('div');

                div.classList.add('imagem');

                const img = new Image(); //Semelhante a document.createElement('div');
                img.src = e.target.result;//caminho da img
                img.alt = arquivo.name;//nome da img
                img.onclick = function () {abrirModal(e.target.result, descricao)}; 
                
                div.appendChild(img);//coloca a img dentro do div

                galeria.appendChild(div)//O div é adicionado ao elemento galeria
            };
            leitor.readAsDataURL(arquivo); //chamar leitor.readAsDataURL(arquivo); para que o FileReader comece a ler o arquivo. Sem essa linha, o onload nunca será chamado, e a imagem não será carregada.
        };
    });
});

function abrirModal(src, descricao){

    const modal = document.getElementById('modal');

    modal.style.display = 'flex';
    modal.querySelector('img').src = src;
    modal.querySelector('.descricao').textContent = descricao || "Sem descrição";//Se não houver descriçã, há o texto padrão
        //Procura o img e o .descricao dentro do seletor modal no css
    window.imagemAtual = src;//Armazena a url da imagem na variável global ´ window.imagemAtual´ Isso é útil se precisarmos de outras funcionalidades para excluir a img ou navegar entre varias imgs carregadas no modal

};

function fecharModal() {
    
    const modal = document.getElementById('modal');

    modal.style.display = 'none';

};

function removerImagem(event) {

    event.stopPropagation();//É importante para  que o evento de click nao se propague para outras imgs e feche todo o modal

    const imagens = document.querySelectorAll('#galeria .imagem img');//Qnd adiciona uma img, ele vai dentro de uma div>img.imagem e tudo isso vai dentro da div-galeria

    imagens.forEach(img =>{

        if(img.src === window.imagemAtual){

            img.parentElement.remove();

        };
    }); 
    fecharModal();
};

