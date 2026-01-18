const API_URL = "http://localhost:3000/api/posts";

async function createPost(event) {
    
    event.preventDefault();//Impede comportamento padrão do formulario de recarregar a pagina

    const postText = document.getElementById('postText').value;
    const postImagem = document.getElementById('postImagem').files[0];
    
        //Verifica se o campo de texto foi deixado vazio após remover os espaços extra com a função trim()
    if (!postText.trim()) {
        alert('O campo de texto não pode estar vazio.');
        return;
    }

    //Cria um objeto da classe FormData. Essa classe éuma maneia de construir umconjunto de pares chave/valor 
        // representando compos de formulário e seus valores, que podem ser enviados através de uma requisição
        //HTTP. É especialmente útil para enviar arquivos via AJAX.
    //AJAX é um acrônimo para Asynchronous JavaScript and XML (JavaScript e XML Assíncronos). Não se trata de uma
        //  linguagem de programação isolada, mas de um conjunto de tecnologias que permite que páginas web 
        // atualizem partes de seu conteúdo de forma dinâmica e assíncrona, ou seja,sem regarregar a página. 
    const formData = new FormData();
                //  Chave  |  Valor
    formData.append('text', postText);

    if (postImagem) formData.append("image", postImagem);//Se tiver alguma imagem no novo post

    try {

        //Requisição para o sevidor com intuito de armazenar o novo post
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        //Verifica se arespostado servidor não foi bem-sucedida (i.e., o status é diferente do intervalo de 200 - 299);
            //i.e. => abreviação para "id est" = "isto é" || "ou seja";
        if (!response.ok) throw new Error("Erro ao criar post.");

        //Aguarda a resposta do servidor e transforma de json para um objeto JS
        const data = await response.json();
        
        alert(data.message);//Mensagem do servidor

        document.getElementById('createPostForm').reset();
        document.getElementById('nomeArquivo').textContent = "Nenhum arquivo escolhido.";

        loadPosts();
        
    } catch (error) {
        
        console.error("Erro ao criar post: ", error);
        alert('Erro ao criar post. Veja o console.');

    }

}


async function loadPosts() {
    
    try {
        
        //Envia uma requisição GET para o servidor e aguarda a resposta. Para realizar uma requisição do tipo
            //  GET usando a API Fetch, não é necessário especificar o método no objeto de configuração.
        const response = await fetch(API_URL);
        const posts = await response.json(); //Converte de json para um objeto JS
        const postContainer = document.getElementById("postsContainer");

        postContainer.innerHTML = '';

        posts.forEach((post) => {
            
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const textParagraph = document.createElement('p');
            textParagraph.textContent = post.text;

            postElement.appendChild(textParagraph);

            if (post.image) {
                
                const imageElement = document.createElement('img');
                //Controi o caminho apartir do endereçp do servidor
                imageElement.src = `http://localhost:3000/uploads/${post.image}`;
                imageElement.alt = "Imagem do post";

                postElement.appendChild(imageElement);

            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir Post';
            deleteButton.addEventListener("click", () => deletePost(post._id));

            postElement.appendChild(deleteButton);
            postContainer.appendChild(postElement);

        });

    } catch (error) {
        console.error("Erro ao carregar post: ", error);
    }

}

async function deletePost(postId) {
    
    try {

        //Faz uma requisição do tipo "DELETE".
        const response = await fetch(`${API_URL}/${postId}`, {
            method: "DELETE"
        });

        //Verifica o status da resposta if != (200 - 299).
        if (!response.ok) throw new Error("Erro ao deletar post.");
        
        const data = await response.json();

        alert(data.message);//Mensagem do servidor

        loadPosts();
        
    } catch (error) {
        console.error("Erro ao deletar post: ", error);
        alert('Erro ao deletar post. Veja o console.');
    }

}

document.getElementById("postImagem").addEventListener('change', function () {
    
    const nomeArquivoSpan = document.getElementById('nomeArquivo');

    if (this.files && this.files.length > 0) {
        nomeArquivoSpan.textContent = this.files[0].name;
    } else {
        nomeArquivoSpan.textContent = "Nenhum arquivo selecionado.";
    }

});

window.addEventListener('load', loadPosts);

document.getElementById('createPostForm').addEventListener('submit', createPost);
