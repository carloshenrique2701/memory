const API_BASE = 'http://localhost:3000/api/albuns';

async function criarAlbum(evento) {
    
    evento.preventDefault();

    const nomeAlbum = document.getElementById('nomeAlbum').value.trim();

    if (!nomeAlbum) {
        alert("O nome do álbum não pode ficar vazio.");
        return;
    }

    const formData = new FormData();
    formData.append('nome', nomeAlbum);

    const capaInput = document.getElementById('capaAlbum');

    if (capaInput.files && capaInput.files.length > 0) formData.append('capa', capaInput.files[0]);

    try {//Tenta armazenar o album no bd
        
        const resposta = await fetch(API_BASE, {
            method: "POST",
            body: formData
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao criar álbum");
            return;
        }

        document.getElementById('formAlbum').reset();
        document.getElementById('nomeArquivoCapa').textContent = "Nenhum arquivo escolhido.";
        carregarAlbuns();

    } catch (error) {
        alert('Não foi possível criar um novo álbum.');
        console.log('Erro ao criar álbum: ', error);
    }

}

async function carregarAlbuns() {
    
    try {

        const resposta = await fetch(API_BASE);//GET
        const albuns = await resposta.json();
        const container = document.getElementById('containerAlbuns');

        container.innerHTML = '';
        
        albuns.forEach((album) => {
            
            const card = document.createElement('div');

            card.classList.add("album-card");

            if (album.capa) {
                
                const imgCapa = document.createElement('img');
                imgCapa.src = `http://localhost:3000/uploads/${album.capa}`;
                imgCapa.alt = `Foto da Capa`;
                imgCapa.classList.add('album-capa');

                card.appendChild(imgCapa);

            } else {

                const placeholder = document.createElement("div");
                placeholder.classList.add('album-capa');
                placeholder.textContent = 'Sem Capa';

                card.appendChild(placeholder);

            }

            const titulo = document.createElement('h3');
            titulo.textContent = album.nome;
            
            card.appendChild(titulo);

            const link = document.createElement('a');
            link.textContent = 'Ver Fotos';
            link.href = `album.html?id=${album._id}`;

            card.appendChild(link);
            card.onclick = () => window.location.href = `album.html?id=${album._id}`;
            container.appendChild(card);

        });
        
    } catch (error) {
        alert('Não foi possível carregar um novo álbum.');
        console.log('Erro ao carregar álbum: ', error);
    }

}

document.getElementById('formAlbum').addEventListener('submit', criarAlbum);
window.addEventListener('load', carregarAlbuns);
document.getElementById('capaAlbum').addEventListener('change', function () {

    const nomeArquivoSpan = document.getElementById('nomeArquivoCapa');

    if (this.files && this.files.length > 0) {
        nomeArquivoSpan.textContent = this.files[0].name;
    } else {
        nomeArquivoSpan.textContent = "Nenhum arquivo escolhido";
    }

});
