const API_BASE = 'http://localhost:3000/api/albuns';

const parametros = new URLSearchParams(window.location.search);

const albumId = parametros.get('id');

const modal = document.getElementById('modal');
const fecharModal = document.getElementById('fecharModal');
const imagemModal = document.getElementById('imagemModal');
const descricaoSobreposta = document.getElementById('descricaoSobreposta');
const botaoAnterior = document.getElementById('anterior');
const botaoProximo = document.getElementById('proximo');
const botaoBaixar = document.getElementById('baixar');

let fotos = [];
let indiceAtual = 0;

document.getElementById('imagemFoto').addEventListener("change", function () {
    
    const nomeArquivoSpan = document.getElementById('nomeArquivo');

    if (this.files && this.files.length > 0) {
        nomeArquivoSpan.textContent = this.files[0].name;
    } else {
        nomeArquivoSpan.textContent = "Nenhum arquivo escolhido."
    }

})

async function carregarAlbum() {
    
    try {

        const resposta = await fetch(`${API_BASE}/${albumId}`);
        const album = await resposta.json();

        if (!resposta.ok) {
            alert(album.mensagem || "Erro ao carregar o album");
            return;
        } 

        document.getElementById('tituloAlbum').textContent = `Fotos do Álbum: ${album.nome}`;

        fotos = album.fotos || [];

        exibirFotos();
        
    } catch (error) {
        alert("Erro ao carregar álbum");
        console.log("Erro ao carregar álbum: ", error);
    }

}

function exibirFotos() {
    
    const container = document.getElementById('containerFotos');
    container.innerHTML = '';

    fotos.forEach((foto, index) => {

        const card = document.createElement('div');
        card.classList.add('album-card');

        const img = document.createElement('img');
        img.src = `http://localhost:3000/uploads/${foto.caminho}`;
        img.alt = "Foto do Álbum";
        img.addEventListener('click', () => abrirModal(index));
        img.classList.add('foto-thumb')

        card.appendChild(img);

        const p = document.createElement('p');
        p.textContent = foto.descricao || '';

        card.appendChild(p);
        card.onclick = () => abrirModal(index);
        container.appendChild(card);

    });

}

async function adicionarFoto(event) {
    
    event.preventDefault();

    const descricao = document.getElementById('descricaoFoto').value;
    const arquivo = document.getElementById('imagemFoto').files[0];

    if (!arquivo) {
        alert('Selecione uma imagem');
        return;
    }

    const formData = new FormData();
    formData.append('descricao', descricao);
    formData.append('imagem', arquivo);

    try {

        const resposta = await fetch(`${API_BASE}/${albumId}/fotos`, {
            method: "POST",
            body: formData
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao adicionar foto ao álbum");
            return;
        }

        document.getElementById("formFoto").reset();
        document.getElementById("nomeArquivo").textContent = "Nenhum arquivo escolhido.";
        
        //Mantém o array local das fotos e o container de fotos sempre atualizados
        fotos = dados.album.fotos;
        exibirFotos();
        
    } catch (error) {
        alert("Erro ao adicionar foto ao álbum");
        console.log("Erro ao adicionar foto ao álbum: ", error);
    }

}

function abrirModal(indice) {
    
    indiceAtual = indice;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    imagemModal.src = `http://localhost:3000/uploads/${fotos[indice].caminho}`;
    descricaoSobreposta.textContent = fotos[indice].descricao || '';

}

function fecharModalFunc() {
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

}

//Troca de imagens
function fotoAnterior() {
    
    if (indiceAtual <= 0) {
        
        indiceAtual = fotos.length - 1;

    } else {

        indiceAtual--;
        
    }

    abrirModal(indiceAtual);

}
function proximaFoto() {
    
    if (indiceAtual >= fotos.length - 1) {
        
        indiceAtual = 0;

    } else {

        indiceAtual++;
        
    }

    abrirModal(indiceAtual);

}

async function baixarImagem() {

    try {
        /*
        Pensando
        Blob (Binary Large Object) é pensar nele como um "arquivo bruto" dentro
         da memória do seu navegador. 
        Enquanto uma URL é apenas o "endereço" de onde o arquivo mora, o Blob é 
         o conteúdo do arquivo em si, convertido em uma sequência de bytes.
        */
        // 1. Busca os dados da imagem como um Blob
        const resposta = await fetch(imagemModal.src);
        const blob = await resposta.blob();
        
        // 2. Cria uma URL temporária para esse Blob
        const urlBlob = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = urlBlob;

        // Extrai o nome do arquivo da URL original
        const partes = imagemModal.src.split("/");
        const nomeArquivo = partes[partes.length - 1];
        link.download = nomeArquivo;

        document.body.appendChild(link);
        link.click();

        // 3. Limpeza
        document.body.removeChild(link);
        window.URL.revokeObjectURL(urlBlob); // Libera memória em 2025
    } catch (erro) {
        console.error("Erro ao baixar a imagem:", erro);
        // Fallback: tenta abrir em nova aba se o fetch falhar
        window.open(imagemModal.src, '_blank');

    }
}

fecharModal.addEventListener('click', fecharModalFunc);
botaoAnterior.addEventListener('click',(e) => {

    //Impede que o clique do botão propague para outro elementos superiores, evitando que o modal seje fechado.
    e.stopPropagation();
    fotoAnterior();

});

botaoProximo.addEventListener('click',(e) => {

    e.stopPropagation();
    proximaFoto();

});

botaoBaixar.addEventListener('click',(e) => {

    e.stopPropagation();
    baixarImagem();

});

window.addEventListener('click', (e) => {

    if (e.target === modal) {//Fecha se o usuário clica fora do modal e dos botoes
        fecharModalFunc();
    }

});

document.getElementById('formFoto').addEventListener('submit', adicionarFoto);
window.addEventListener('load', carregarAlbum);