document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('botao-negrito').addEventListener('click', () => aplicarEstilo('bold'));
    document.getElementById('botao-italico').addEventListener('click', () => aplicarEstilo('italic'));
    document.getElementById('botao-sublinhado').addEventListener('click', () => aplicarEstilo('underline'));

    document.getElementById('seletor-tamanho-font').addEventListener('change', function() {

        var tamanhoFonte = this.value;

        aplicarTamanhoFonte(tamanhoFonte);
        
    });

    document.getElementById('seletor-tipo-font').addEventListener('change', function() {

        aplicarEstilo('fontName', this.value);
        
    });
    document.getElementById('seletor-cor').addEventListener('input', function() {

        aplicarEstilo('foreColor', this.value);
        
    });
    document.getElementById('botao-alinhar-esquerda').addEventListener('click', ()=> aplicarEstilo('justifyLeft'));
    document.getElementById('botao-alinhar-centro').addEventListener('click', ()=> aplicarEstilo('justifyCenter'));
    document.getElementById('botao-alinhar-direita').addEventListener('click', ()=> aplicarEstilo('justifyRight'));


    document.getElementById('botao-inserir-marcadores').addEventListener('click', ()=>{
        
        aplicarEstilo('insertUnorderedList');

        ajustarTamanhoLista(this.value);
    
    });
    document.getElementById('botao-inserir-numeracao').addEventListener('click', ()=>{
        
        aplicarEstilo('insertOrderedList');

        ajustarTamanhoLista(this.value);
    
    });

    document.getElementById('botao-inserir-imagem').addEventListener('click', function(){

        document.getElementById('entrada-imagem').click();
    
    });       
    document.getElementById('entrada-imagem').addEventListener('change', inserirImagem);
    document.getElementById('botao-exportar').addEventListener('click', exportarConteudo);
    
});

function aplicarEstilo(comando, valor = null) {
    
    document.execCommand(comando, false, valor);

}

function aplicarTamanhoFonte(tamanhoFonte) {

    const selecao = window.getSelection();

    if (!selecao.rangeCount) return;
    
    let range = selecao.getRangeAt(0);

    const span = document.createElement('span');

    span.style.fontSize = `${tamanhoFonte}px`;

    range.surroundContents(span);

}

function ajustarTamanhoLista(tammanhoFonteSelecionada) {
    
    const editor = document.getElementById('editor');

    const tamanhoFonte = tammanhoFonteSelecionada || editor.styles.fontSize;

    const listas = editor.querySelectorAll('ul, ol');

    listas.forEach(lista =>{

        lista.style.fontSize = tamanhoFonte;

    });

}

function inserirImagem(event) {

    const arquivo = event.target.files[0];

    if(!arquivo)return;

    const leitor = new FileReader();

    leitor.onload = function (e) {
        
        const src = e.target.result;

        const editor = document.getElementById('editor');

        if(!imagemJaAdicionada(src, editor)){

            const img = document.createElement('img');

            img.src = src;

            img.style.maxWidth = '100%';

            editor.appendChild(img);

        }

    }

    leitor.readAsDataURL(arquivo);

    event.target.value = '';
    
}

function imagemJaAdicionada(src, editor) {

    const imagens = editor.getElementsByTagName('img');

    for (let i = 0; i < imagens.length; i++) {

        if(imagens[i].src === src){

            return true;

        }
        
    }

    return false;
    
}

function exportarConteudo() {

    // Acessa o conteúdo HTML do elemento com o ID 'editor'.
    // 'document.getElementById' é usado para encontrar o
    // elemento 'editor' e '.innerHTML' obtém todo o HTML dentro desse elemento.
    const conteudo = document.getElementById('editor').innerHTML;

    // Cria um novo Blob (Binary Large Object) que é um tipo de
    // objeto para lidar com dados binários (neste caso, texto também).
    // O conteúdo do editor é passado como um array para o
    // construtor do Blob, junto com um objeto especificando o
    // tipo de conteúdo como 'text/html'.
    const blob = new Blob([conteudo], {type: "text/html"});

    // Cria uma URL única para o Blob criado, que
    // representa o arquivo a ser baixado.
    // 'URL.createObjectURL' gera uma URL que pode ser
    // usada para representar o Blob no navegador.
    const url = URL.createObjectURL(blob);

    // Cria um novo elemento <a> (link), que será
    // usado para iniciar o download.
    const link = document.createElement('a');

    // Define o atributo 'href' do link para a URL do Blob,
    // apontando para o arquivo a ser baixado.
    link.href = url;

    // Define o atributo 'download' do link, especificando o
    // nome do arquivo que será salvo no computador do usuário.
    // Quando o usuário clicar no link, o arquivo será baixado com este nome.
    link.download = 'conteudoEditor.html';

    // Simula um clique no link criado. Como o link tem os
    // atributos 'href' (apontando para o Blob) e 'download',
    // o navegador iniciará o download automaticamente.
    link.click();

    // Remove o link do documento após o clique. Isso é
    // feito para limpar e evitar deixar elementos inutilizados no DOM.
    document.body.removeChild(link);

}
