document.addEventListener('DOMContentLoaded', function () {
    
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    //Tenta recuperar o array 'carrinho' do armazenamento local, convertendo a string JSON para
        // um objeto do JavaScript.
    //Se não houver nada no localstorage, retorna um array vazio para trabalharmos nele.

    const categorias = {

        "Alimentos": [

            {id: 1, nome: 'Arroz', descricao: 'Arroz branco 5kg', imagemUrl: 'imgs/arroz.jpg', preco: '12:50'},
            { id: 2, nome: "Feijão", descricao: "Feijão preto, 1kg", imagemUrl: "imgs/feijao.jpg", preco: "7,50" },
            { id: 3, nome: "Macarrão", descricao: "Macarrão integral, 500g", imagemUrl: "imgs/macarrao.jpg", preco: "4,99" }

        ],
        "Bebidas": [

            { id: 4, nome: "Coca Cola", descricao: "Refrigerante de cola, 2l", imagemUrl: "imgs/coca.jpg", preco: "6,99" },
            { id: 5, nome: "Suco de Laranja", descricao: "Suco natural, 1l", imagemUrl: "imgs/suco.jpg", preco: "5,99" },
            { id: 6, nome: "Água Mineral", descricao: "Água mineral sem gás, 500ml", imagemUrl: "imgs/agua.jpg", preco: "1,99" }
        
        ],

        "Laticínios": [

            { id: 7, nome: "Leite Integral", descricao: "Leite integral, 1l", imagemUrl: "imgs/leite.jpg", preco: "3,59" },
            { id: 8, nome: "Queijo", descricao: "Queijo", imagemUrl: "imgs/queijo.jpg", preco: "50,90" },
            { id: 9, nome: "Iogurte Natural", descricao: "Iogurte natural, 320g", imagemUrl: "imgs/iogurte.jpg", preco: "2,99" }
        
        ],

        "Produtos de Limpeza": [

            { id: 10, nome: "Detergente", descricao: "Detergente líquido, 500ml", imagemUrl: "imgs/detergente.jpg", preco: "1,79" },
            { id: 11, nome: "Desinfetante", descricao: "Desinfetante multiuso, 1l", imagemUrl: "imgs/desinfetante.jpg", preco: "4,99" },
            { id: 12, nome: "Água Sanitária", descricao: "Água sanitária, 2l", imagemUrl: "imgs/agua_sanitaria.jpg", preco: "3,49" }
        
        ],

        "Snacks": [

            { id: 13, nome: "Batata Chips", descricao: "Batata chips, sabor original, 100g", imagemUrl: "imgs/batata_chips.jpg", preco: "6,99" },
            { id: 14, nome: "Amendoim", descricao: "Amendoim torrado e salgado, 200g", imagemUrl: "imgs/amendoim.jpg", preco: "5,49" },
            { id: 15, nome: "Bolacha Recheada", descricao: "Bolacha recheada, sabor chocolate, 150g", imagemUrl: "imgs/bolacha.jpg", preco: "2,50" }
        
        ]


    };

    const secoesProdutos = document.getElementById('secoes-produtos');
    const botaoPesquisar = document.getElementById('botao-pesquisar');
    const botaoVerCarrinho = document.getElementById('botao-ver-carrinho');
    const campoPesquisa = document.getElementById('campo-pesquisa');
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const listaItensCarrinho = document.getElementById('lista-itens-carrinho');
    const botaoCategoria = document.querySelectorAll('.categoria');
    const botaoLimparFiltro = document.getElementById('limpar-filtro');
    const imagemProduto = document.getElementById('imagem-produto');
    const nomeProduto = document.getElementById('nome-produto');
    const descricaoProduto = document.getElementById('descricao-produto');
    const precoProduto = document.getElementById('preco-produto');
    const quantidadeProduto = document.getElementById('quantidade-produto');
    const botaoAdicionarCarrinhoModal = document.getElementById('botao-adicionar-carrinho-modal');
    const modalProduto = new bootstrap.Modal(document.getElementById('modalProduto'));
    //cria uma instância permitindo mostrar e esconder o modal programaticamente.

    function atualizarExibicaoProdutos(categoriasFiltradas) {
        //Apesar de inicialmente receber o array de categorias, em outra function, será filtrado passando somente a
            //categoria selecionada na barra de navegação lateral e aqui passará a exibir somente os itens da categoria
            //selecionada.
        
        secoesProdutos.innerHTML = '';

        Object.keys(categoriasFiltradas).forEach(categoria => {
            //Object.keys => é usado para manipular um array de chave valor, no caso, categoria(Alimentos, Bebidas)
                //está sendo usado para verificar se existe logo abaixo.

            if (categoriasFiltradas[categoria].length > 0) {
                
                let secao = document.createElement('section')
                let h2 = document.createElement('h2')

                h2.textContent = '======= ' + categoria + ' ======='; 

                h2.style.textAlign = 'center';

                let linha = document.createElement('div');

                linha.className = 'row'; //Alinha horizontalmente

                categoriasFiltradas[categoria].forEach(produto => {

                    let coluna = document.createElement('div');

                    coluna.className = 'col-md-4'; //Ocupa 4 de 12 colunas, logo 3 colunas grandes 4x3 = 12

                    let cartao = document.createElement('div');

                    cartao.className = 'card';

                    cartao.innerHTML += `
                        <img src="${produto.imagemUrl}" class="bg-imagem-topo" alt="${produto.nome}" data-bs-toggle="modal" data-bs-target="#modalProduto" data-produto-id="${produto.id}">
                        <div>
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">${produto.descricao}</p>
                            <p class="card-text"><strong>R$ ${produto.preco}</strong></p>
                            <button class="btn btn-primary adicionar-ao-carrinho" data-produto-id="${produto.id}">Adicionar ao Carrinho</button>
                        </div>
                    `;

                    coluna.appendChild(cartao);

                    linha.appendChild(coluna);                    

                });

                secao.appendChild(h2);
                secao.appendChild(linha);
                secoesProdutos.appendChild(secao);

            }

        });

        document.querySelectorAll('.adicionar-ao-carrinho').forEach(botao => {

            botao.addEventListener('click', function () {
                console.log('Adicionando produto ao carrinho')
                const idProduto = parseInt(this.getAttribute('data-produto-id'));

                adicionarAoCarrinho(idProduto);

            });

        });

        document.querySelectorAll('.bg-imagem-topo').forEach(imagem => {

            imagem.addEventListener('click', function () {
                
                const idProduto = parseInt(this.getAttribute('data-produto-id'));

                const produto = obterProdutoPorId(idProduto);

                if(produto){

                    imagemProduto.src = produto.imagemUrl;

                    nomeProduto.textContent = produto.nome;
                    descricaoProduto.textContent = produto.descricao;
                    precoProduto.textContent = produto.preco;

                    botaoAdicionarCarrinhoModal.setAttribute('data-produto-id', produto.id);

                    quantidadeProduto.value = 1;

                    modalProduto.show();

                }

            })

        })

    }

    function adicionarAoCarrinho(idProduto, quantidade = 1) {
        
        const produto = obterProdutoPorId(idProduto);

        if(!produto) return;

        const produtoExistente = carrinho.find(item => item.id === produto.id);
        //Produra se tem algum produto com esse id no localStorage, se tiver, ele retorna o produto, se não 
            // tiver ele retorna false.

        if(produtoExistente) {

            produtoExistente.quantidade += 1;
            console.log('Há um produto deste no carrinho. Aumentando quantidade.')

        } else {

            carrinho.push({...produto, quantidade: quantidade});
            //Cria um novo objeto copiando todas as propriedades de 'produto' e adicionando/atualizando a 
                // propriedade quantidade.
            //Em outras palavras, ele cria um array como nas categorias:
            /*
            const produto = {
                id: 1,
                nome: "Camiseta",
                preco: 29.90
            };

            const quantidade = 2;

            // Isso cria um NOVO objeto:
            const itemCarrinho = {

                ...produto,          // Copia: id, nome, preco
                quantidade: quantidade // Adiciona a propriedade quantidade

            };

            console.log(itemCarrinho);
            
            // Resultado:
            // {
            //   id: 1,
            //   nome: "Camiseta", 
            //   preco: 29.90,
            //   quantidade: 2
            // }

            Segurança: Mantém o produto original intacto para outros usos
            */
           console.log('Não há um produto deste no carrinho. Adicionando ao carrinho');

        }

        atualizarContadorCarrinho();

    }

    function obterProdutoPorId(id) {
        
        for (let categoria in categorias) {
            
            const produto = categorias[categoria].find(item => item.id === id);

            if(produto){

                console.log('Produto encontrado');
                return produto;

            }
            
        }

        console.log('Produto não encontrado');
        return null;

    }

    function atualizarContadorCarrinho() {

        contadorCarrinho.textContent = `${carrinho.length}`;

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        //Salva o estado atual do carrinho no armazenamento do navegador para persistência de dados.
        //'JSON.stringify(carrinho)' converte o array 'carrinho' em uma string JSON para que possa ser armazenado
            //corretamente, pois o armazenamento local só suporta strings.
        
    }

    function exibirCarrinho() {
        
        listaItensCarrinho.innerHTML = '';

        if(carrinho.length === 0) {

            let mensagemVazia = document.createElement('li');

            mensagemVazia.textContent = 'Seu carrinho está vazio';

            mensagemVazia.className = 'list-group-item';

            listaItensCarrinho.appendChild(mensagemVazia);

        } else {

            carrinho.forEach(item => {

                let itemLista = document.createElement('li');

                itemLista.className = 'list-group-item d-flex justify-content-between align-items-center';

                itemLista.innerHTML = `
                    <div class="item-carrinho">
                        <img src="${item.imagemUrl}" alt="${item.nome}" class="imagem-item-carrinho">
                        <div class="detalhes-item-carrinho">
                            <span><strong>${item.nome}</strong></span>
                            <span>R$${item.preco}</span>
                            <span>Quantidade: ${item.quantidade}</span>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm remover-do-carrinho" data-produto-id="${item.id}">Remover</button>
                `;

                listaItensCarrinho.appendChild(itemLista);

            });

            let itemTotal = document.createElement('li');

            itemTotal.className = 'list-group-item list-group-item-dark';

            let total = carrinho.reduce((acc, item) => acc + (parseFloat(item.preco.replace(',', '.')) * item.quantidade), 0);

            itemTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

            listaItensCarrinho.appendChild(itemTotal);

        }

        document.querySelectorAll(".remover-do-carrinho").forEach(botao => {

            botao.addEventListener('click', function () {
                console.log('Removendo produto do carrinho')
                const idProduto = parseInt(this.getAttribute('data-produto-id'));
                //O atributo 'data-produto-id' está na tag html

                removerDoCarrinho(idProduto);

            });

        });

        let modalCarrinho = new bootstrap.Modal(document.getElementById('modalCarrinho'), {});

        modalCarrinho.show();

        modalCarrinho._element.addEventListener('hidden.bs.modal', function () {
            //Adiciona um ouvinte de eventos ao elemento do modal que detecta quando o modal é fechado.
            //'hidden.bs.modal' é um evento específico do bootstrap que é disparado após o modal ser
                //completamente escondido.

            window.location.href = "index.html";//Recarregar.

        })

    }
    
    function removerDoCarrinho(idProduto) {

        carrinho = carrinho.filter(item => item.id !== idProduto);
        //Remove todos que não tem esse id

        atualizarContadorCarrinho();

        exibirCarrinho();
        
    }

    atualizarExibicaoProdutos(categorias);
    atualizarContadorCarrinho();

    botaoVerCarrinho.addEventListener('click', exibirCarrinho);

    botaoAdicionarCarrinhoModal.addEventListener('click', function () {
       
        const idProduto = parseInt(this.getAttribute('data-produto-id'));
        
        const quantidade = parseInt(quantidadeProduto.value);

        adicionarAoCarrinho(idProduto, quantidade);

        modalProduto.hide();

    });

    botaoPesquisar.addEventListener('click', function () {
        
        const termoPesquisa = campoPesquisa.value.toLowerCase();

        const categoriasFiltradas = {};

        Object.keys(categorias).forEach(categoria => {

            categoriasFiltradas[categoria] = categorias[categoria].filter(produto => {

                return produto.nome.toLowerCase().includes(termoPesquisa);

            });

        });

        atualizarExibicaoProdutos(categoriasFiltradas)

    })

    botaoCategoria.forEach(botao => {
        
        botao.addEventListener('click', function () {

            const categoria = this.getAttribute('data-categoria');

            const categoriasFiltradas = {}

            categoriasFiltradas[categoria] = categorias[categoria];

            atualizarExibicaoProdutos(categoriasFiltradas)

        });
    });

    botaoLimparFiltro.addEventListener('click', function () {
        
        atualizarExibicaoProdutos(categorias);

    })

});