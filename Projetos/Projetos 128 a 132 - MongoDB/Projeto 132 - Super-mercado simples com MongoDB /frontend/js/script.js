document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
           
            e.preventDefault();

            const email = document.getElementById("emailLogin").value;
            const senha = document.getElementById("senhaLogin").value;

            try {
                
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || 'Erro no Login');
                    return;
                } 

                window.location.href = 'telaPrincipal.html';

            } catch (error) {
                alert('Erro ao fazer login');
                console.error('Erro ao fazer login: ', error);
            }

        });
    } 

    const cadastroUsuarioPublicoForm = document.getElementById('cadastroUsuarioPublicoForm');

    if (cadastroUsuarioPublicoForm) {
        cadastroUsuarioPublicoForm.addEventListener('submit', async (e) => {
           
            e.preventDefault();

            const nome = document.getElementById("nomeUsuarioPub").value;
            const email = document.getElementById("emailUsuarioPub").value;
            const senha = document.getElementById("senhaUsuarioPub").value;
            const idade = parseInt(document.getElementById("idadeUsuarioPub").value);

            try {
                
                const response = await fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha, idade })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || 'Erro no cadastro');
                    return;
                } 

                alert(data.message || 'Usuário cadastrado com sucesso!');
                window.location.href = 'login.html';

            } catch (error) {
                alert('Erro ao fazer cadastro.');
                console.error('Erro ao fazer cadastro: ', error);
            }

        });
    } 

    const btnAdicionar = document.getElementById('btnAdicionar');
    const btnFinalizarVenda = document.getElementById('btnFinalizar');
    const btnConfiguracoes = document.getElementById('btnConfiguracoes');
    const tabelaVendasBody = document.getElementById('tabelaVendasTbody');
    const valorTotalSpan = document.getElementById('valorTotal');
    const cpfClienteVenda = document.getElementById('cpfClienteVenda');

    let itensVenda = [];

    if (btnAdicionar && tabelaVendasBody && btnFinalizarVenda) {
        
        btnAdicionar.addEventListener('click', async () => {
           console.log('Adicionando Produto');
            const codigoProduto = document.getElementById('codigoProduto').value.trim();

            if (!codigoProduto) {

                alert('Digite o código do produto!');
                return;

            }

            try {

                const resp = await fetch(`http://localhost:3000/produtos/codigo/${codigoProduto}`);

                const produto = await resp.json();

                if (!resp.ok) {
                    alert(produto.message || 'Produto não encontrado.');
                    return;
                }

                const itemExistente = itensVenda.find(i => i.produtoID === produto._id);

                if (itemExistente) {
                    itemExistente.quantidade += 1;
                    itemExistente.subtotal = itemExistente.quantidade * itemExistente.precoUnitario;
                } else {

                    const novoItem = {

                        produtoId: produto._id,
                        nomeProduto: produto.nome,
                        quantidade: 1,
                        precoUnitario: produto.preco,
                        subtotal: produto.preco

                    }

                    itensVenda.push(novoItem);

                }
            
                atualizarTabelaVendas();

                document.getElementById('codigoProduto').value = '';
                document.getElementById('codigoProduto').focus();
                
            } catch (error) {
                alert('Erro ao buscar produto.');
                console.error('Erro ao buscar produto: ', error);
            }

        });

        btnFinalizarVenda.addEventListener('click', async () => {
           
            if (itensVenda.length === 0) {
                alert('Nenhum item no carrinho!');
                return;
            }

            const dataAtual = new Date();
            const dataFormatada = `${dataAtual.getFullYear()}-${String(dataAtual.getMonth() + 1).padStart(2, '0')}-${String(dataAtual.getDate()).padStart(2, '0')}`;

            try {

                const response = await fetch('http://localhost:3000/vendas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        itens: itensVenda,
                        clienteCpf: cpfClienteVenda.value.trim(),
                        dataVenda: dataFormatada    
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || 'Erro aofinalizar venda.');
                    return;
                }

                alert(data.message || 'Venda finalizada com sucesso');
                itensVenda = [];
                atualizarTabelaVendas()
                cpfClienteVenda.value = '';
                
            } catch (error) {
                alert('Erro ao finalizar venda.');
                console.error('Erro ao finalizar venda: ', error);
            }

        });

    }

    if (btnConfiguracoes) btnConfiguracoes.addEventListener('click', () => window.location.href = 'menu.html');

    function atualizarTabelaVendas() {
        
        tabelaVendasBody.innerHTML = '';

        let total = 0;

        itensVenda.forEach((item, idx) => {

            total += item.subtotal;

            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${item.nomeProduto}</td>
                <td>R$${item.precoUnitario.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantidade}" style="width: 60px" onchange="atualizarQuantidade(${idx}, this.value)">
                </td>
                <td>R$${item.subtotal.toFixed(2)}</td>
                <td class="actions">
                    <button class="delete" onclick="removerItem(${idx})">Remover</button>
                </td>
            `;

            tabelaVendasBody.appendChild(tr);

        });


        if (valorTotalSpan) valorTotalSpan.textContent = total.toFixed(2);

    }

    window.removerItem = (idx) => {

        itensVenda.splice(idx, 1);
        atualizarTabelaVendas()

    }

    window.atualizarQuantidade = (idx, novaQtd) => {

        const qtd = parseInt(novaQtd);

        if (qtd <= 0) return;

        itensVenda[idx].quantidade = qtd;
        itensVenda[idx].subtotal = itensVenda[idx].precoUnitario * qtd;

        atualizarTabelaVendas();

    }


    if (document.getElementById('listaUsuarios')) {

        carregarUsuarios();
        document.getElementById('filtroUsuario').addEventListener('input', carregarUsuarios);

    }
    if (document.getElementById('cadastroUsuarioForm')) prepararFormularioUsuario();




    
    if (document.getElementById('listaFornecedores')) {

        carregarFornecedores();
        document.getElementById('filtroFornecedor').addEventListener('input', carregarFornecedores);

    }
    if (document.getElementById('cadastroFornecedorForm')) prepararFormularioFornecedor();





    if (document.getElementById('listaProdutos')) {

        carregarProdutos();
        document.getElementById('filtroProduto').addEventListener('input', carregarProdutos);

    }
    if (document.getElementById('cadastroProdutoForm')) prepararFormularioProduto();





    if (document.getElementById('listaClientes')) {

        carregarClientes();
        document.getElementById('filtroCliente').addEventListener('input', carregarClientes);

    }
    if (document.getElementById('cadastroClienteForm')) prepararFormularioCliente();



    const btnBuscarRelatorio = document.getElementById('btnBuscarRelatorio');
    const fornecedorFiltro = document.getElementById('fornecedorFiltro');
    const produtoFiltro = document.getElementById('produtoFiltro');

    if (btnBuscarRelatorio) {

        carregarFornecedoresNoSelect(fornecedorFiltro);
        carregarProdutosNoSelect(produtoFiltro);
        
        btnBuscarRelatorio.addEventListener('click',async () => {
           
            const dataInicial = document.getElementById('dataInicial').value;
            const dataFinal = document.getElementById('dataFinal').value;
            const fornecedor = document.getElementById('fornecedorFiltro').value;
            const produto = document.getElementById('produtoFiltro').value;
            const cpf = document.getElementById('cpfFiltro').value;

            carregarRelatorio(dataInicial, dataFinal, fornecedor, produto, cpf);

        });

    }
    
});



/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/
/************************************************FORMULÁRIOS***********************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/


/********************************************Usuários Formulário*******************************************/


async function carregarUsuarios() {
    
    const filtro = document.getElementById('filtroUsuario').value;
    const lista = document.getElementById('listaUsuarios');
    lista.innerHTML = '';

    try {

        const response = await fetch(`http://localhost:3000/usuarios`);

        const usuarios = await response.json();

        usuarios.filter(u => u.nome.toLowerCase().includes(filtro) || u.email.toLowerCase().includes(filtro))
        .forEach(user => {

            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.idade}</td>
                <td class="actions">
                    <button class="edit" onclick="editarUsuario('${user._id}')">Editar</button>
                    <button class="delete" onclick="deletarUsuario('${user._id}')">Excluir</button>
                </td>
            `;
            
            lista.appendChild(tr);

        });
        
    } catch (error) {
        console.error('Erro ao carregar os usuários: ', error);
    }

}

function editarUsuario(id) {window.location.href = `cadastroUsuario.html?id=${id}`}

async function deletarUsuario(id) {
    
    if (!confirm('Tem certeza que deseja excluir esse usuário?'))return;

    try {

        const resp = await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });

        if (!resp.ok) return alert('Erro ao deletar usuário.');

        console.log('Usuário deletado com sucesso');
        carregarUsuarios();
        
    } catch (error) {
        console.error('Erro ao deletar usuário: ', error);
    }

}


async function prepararFormularioUsuario() {

    const urlParams = new URLSearchParams(window.location.search);
    const usuarioID = urlParams.get('id');
    let emailAntigo = '';

    if (usuarioID) {
        
        document.getElementById('tituloUsuario').textContent = 'Editar Usuário';

        try {
            
            const resp = await fetch(`http://localhost:3000/usuarios/${usuarioID}`);
            const usuario = await resp.json();

            if (!resp.ok) return alert(usuario.message || 'Erro ao preparar formulário.');

            if (usuario) {
                
                emailAntigo = usuario.email;
                document.getElementById('usuarioId').value = usuario._id;
                document.getElementById('nomeUsuario').value = usuario.nome;
                document.getElementById('emailUsuario').value = usuario.email;
                document.getElementById('senhaUsuario').value = usuario.senha || '';
                document.getElementById('idadeUsuario').value = usuario.idade;

            } else alert('usuário não encontrado');

        } catch (error) {
            console.error('Erro ao preparar formulário: ', error);
        }

    }

    document.getElementById('cadastroUsuarioForm').addEventListener('submit', async (e) => {
       
        e.preventDefault();

        const id = document.getElementById('usuarioId').value;
        const nome = document.getElementById('nomeUsuario').value;
        const email = document.getElementById('emailUsuario').value;
        const senha = document.getElementById('senhaUsuario').value;
        const idade = document.getElementById('idadeUsuario').value;

        
        try {

            if (id) {

                const resp = await fetch(`http://localhost:3000/usuarios/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha, idade, emailAntigo })
                });

                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao editar usuário.');
                
                alert('Usuário atualizado com sucesso.');

            } else {

                const resp = await fetch(`http://localhost:3000/usuarios`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha, idade })
                });
    
                
                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao editar usuário.');
                
                alert('Usuário cadastrado com sucesso.');

            }

            window.location.href = 'listaUsuarios.html';
            
        } catch (error) {
            console.error('Erro ao enviar usuário: ', error);
        }

    });
    
}




/********************************************Fornecedores Formulário*******************************************/


async function carregarFornecedores() {
    
    const filtro = document.getElementById('filtroFornecedor').value.toLowerCase();

    try {

        const resp = await fetch(`http://localhost:3000/fornecedor`);
        const fornecedores = await resp.json();

        if (!resp.ok) return alert('Erro ao buscar fornecedores.');
        
        const lista = document.getElementById('listaFornecedores');
        lista.innerHTML = '';

        fornecedores
        .filter(f => f.nome.toLowerCase().includes(filtro))
        .forEach(forn => {

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${forn.nome}</td>
                <td>+${forn.telefone}</td>
                <td>${forn.email}</td>
                <td class="actions">
                    <button class="edit" onclick="editarFornecedor('${forn._id}')">Editar</button>
                    <button class="delete" onclick="deletarFornecedor('${forn._id}')">Excluir</button>
                </td>
            `;
            
            lista.appendChild(tr);

        });
        
    } catch (error) {
        console.error('Erro ao carregar fornecedores: ', error);
    }

};


function editarFornecedor(id) {window.location.href = `cadastroFornecedor.html?id=${id}`}

async function deletarFornecedor(id) {
    
    if (!confirm('Tem certeza que deseja excluir esse fornecedor?')) return;

    try {

        const resp = await fetch(`http://localhost:3000/fornecedor/${id}`, { method: 'DELETE' });

        if (!resp.ok) return alert('Erro ao deletar fornecedor.');

        console.log('Fornecedor deletado com sucesso');
        carregarFornecedores();
        
    } catch (error) {
        console.error('Erro ao deletar fornecedor: ', error);
    }

}

async function prepararFormularioFornecedor() {

    const urlParams = new URLSearchParams(window.location.search);
    const fornecedorID = urlParams.get('id');
    let nomeFornecedorAntigo = '';

    if (fornecedorID) {
        
        document.getElementById('tituloFornecedor').textContent = 'Editar Fornecedor';

        try {
            
            const resp = await fetch(`http://localhost:3000/fornecedor/${fornecedorID}`);
            const fornecedor = await resp.json();

            if (!resp.ok) return alert(fornecedor.message || 'Erro ao preparar formulário.');

            if (fornecedor) {
                
                nomeFornecedorAntigo = fornecedor.nome;
                document.getElementById('fornecedorId').value = fornecedor._id;
                document.getElementById('nomeFornecedor').value = fornecedor.nome;
                document.getElementById('emailFornecedor').value = fornecedor.email;
                document.getElementById('telefoneFornecedor').value = fornecedor.telefone;

            } else alert('Fornecedor não encontrado');

        } catch (error) {
            console.error('Erro ao preparar formulário: ', error);
        }

    }

    document.getElementById('cadastroFornecedorForm').addEventListener('submit', async (e) => {
       
        e.preventDefault();

        const id = document.getElementById('fornecedorId').value;
        const nome = document.getElementById('nomeFornecedor').value;
        const email = document.getElementById('emailFornecedor').value;
        const telefone = document.getElementById('telefoneFornecedor').value;

        
        try {

            if (id) {

                const resp = await fetch(`http://localhost:3000/fornecedor/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, telefone, nomeFornecedorAntigo })
                });
    
                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao editar fornecedor.');
                
                alert('Fornecedor atualizado com sucesso.');

            } else {

                const resp = await fetch(`http://localhost:3000/fornecedor`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, telefone })
                });

                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao cadastrar fornecedor.');
                
                alert('Fornecedor cadastrado com sucesso.');

            }

            window.location.href = 'listaFornecedores.html';
            
        } catch (error) {
            console.error('Erro ao enviar formulário: ', error);
        }

    });
    
}

async function carregarFornecedoresNoSelect(selectElement) {
    
    try {
        
        const resp = await fetch(`http://localhost:3000/fornecedor`);
        const fornecedores = await resp.json();

        fornecedores.forEach(f => {

            const opt = document.createElement('option');
            opt.value = f._id;
            opt.textContent = f.nome;

            selectElement.appendChild(opt);

        })

    } catch (error) {
        console.error('Erro ao carregar fornecedores no select: ', error);
    }

}


/********************************************Produtos Formulário*******************************************/


async function carregarProdutos() {
    
    const filtro = document.getElementById('filtroProduto').value.toLowerCase();

    try {

        const resp = await fetch(`http://localhost:3000/produtos`);
        const produtos = await resp.json();

        if (!resp.ok) return alert('Erro ao buscar produtos.');
        
        const lista = document.getElementById('listaProdutos');
        lista.innerHTML = '';

        produtos
        .filter(p => p.nome.toLowerCase().includes(filtro))
        .forEach(prod => {

            const fornecedornome = prod.fornecedor ? prod.fornecedor.nome : '-';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${prod.codigo}</td>
                <td>${prod.nome}</td>
                <td>${fornecedornome}</td>
                <td>${prod.preco.toFixed(2)}</td>
                <td>${prod.quantidadeEstoque}</td>
                <td class="actions">
                    <button class="edit" onclick="editarProduto('${prod._id}')">Editar</button>
                    <button class="delete" onclick="deletarProduto('${prod._id}')">Excluir</button>
                </td>
            `;
            
            lista.appendChild(tr);

        });
        
    } catch (error) {
        console.error('Erro ao carregar produtos: ', error);
    }

};


function editarProduto(id) {window.location.href = `cadastroProduto.html?id=${id}`}

async function deletarProduto(id) {
    
    if (!confirm('Tem certeza que deseja excluir esse produto?')) return;

    try {

        const resp = await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' });

        if (!resp.ok) return alert('Erro ao deletar produto.');

        console.log('Produto deletado com sucesso');
        carregarProdutos();
        
    } catch (error) {
        console.error('Erro ao deletar produto: ', error);
    }

}

async function prepararFormularioProduto() {

    const selForm = document.getElementById('fornecedorProduto');
    await carregarFornecedoresNoSelect(selForm);

    const urlParams = new URLSearchParams(window.location.search);
    const produtoID = urlParams.get('id');
    let nomeAntigo = '';
    let codigoAntigo = '';

    if (produtoID) {
        
        document.getElementById('tituloProduto').textContent = 'Editar Produto';

        try {
            
            const resp = await fetch(`http://localhost:3000/produtos/${produtoID}`);
            const produto = await resp.json();

            if (!resp.ok) return alert(produto.message || 'Erro ao preparar formulário.');

            if (produto) {
                
                nomeAntigo = produto.nome;
                codigoAntigo = produto.codigo;
                document.getElementById('produtoId').value = produto._id;
                document.getElementById('nomeProduto').value = produto.nome;
                document.getElementById('codigoProduto').value = produto.codigo;
                document.getElementById('descricaoProduto').value = produto.descricao;
                document.getElementById('precoProduto').value = produto.preco;
                document.getElementById('estoqueProduto').value = produto.quantidadeEstoque;
                if (produto.fornecedor) {
                selForm.value = produto.fornecedor._id;
                }
            } else alert('Produto não encontrado');

        } catch (error) {
            console.error('Erro ao preparar formulário: ', error);
        }

    }

    document.getElementById('cadastroProdutoForm').addEventListener('submit', async (e) => {
       
        e.preventDefault();

        const id = document.getElementById('produtoId').value;
        const nome = document.getElementById('nomeProduto').value;
        const codigo = document.getElementById('codigoProduto').value;
        const descricao = document.getElementById('descricaoProduto').value;
        const preco = document.getElementById('precoProduto').value;
        const quantidadeEstoque = parseInt(document.getElementById('estoqueProduto').value);
        const fornecedor = selForm.value || null;
        
        try {

            if (id) {

                const resp = await fetch(`http://localhost:3000/produtos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, codigo, descricao, preco, quantidadeEstoque, fornecedor, nomeAntigo, codigoAntigo })
                });
    
                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao editar produto.');
                
                alert('Produto atualizado com sucesso.');

            } else {

                const resp = await fetch(`http://localhost:3000/produtos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, codigo, descricao, preco, quantidadeEstoque, fornecedor })
                });
    
                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao cadastrar produto.');
                
                alert('Produto cadastrado com sucesso.');

            }

            window.location.href = 'listaProdutos.html';
            
        } catch (error) {
            console.error('Erro ao enviar formulário: ', error);
        }

    });
    
}
async function carregarProdutosNoSelect(selectElement) {
    
    try {
        
        const resp = await fetch(`http://localhost:3000/produtos`);
        const produtos = await resp.json();

        produtos.forEach(p => {

            const opt = document.createElement('option');
            opt.value = p._id;
            opt.textContent = p.nome;

            selectElement.appendChild(opt);

        })

    } catch (error) {
        console.error('Erro ao carregar produtos no select: ', error);
    }

}


/********************************************Clientes Formulário*******************************************/

function formatarCPF(cpf) {
    
    const cpfArray = cpf.split('');
    let cpfFormatado = '';
    let contador = 0;

    cpfArray.forEach(e => {

        if (contador === 3 || contador === 6 ) {
            cpfFormatado += '.';
            cpfFormatado += e;
        } else if (contador === 9){
            cpfFormatado += '-'
            cpfFormatado += e;
        } else {
            cpfFormatado += e;
        }
        contador++;

    });

    return cpfFormatado;

}

async function carregarClientes() {
    
    const filtro = document.getElementById('filtroCliente').value.toLowerCase();

    try {

        const resp = await fetch(`http://localhost:3000/clientes`);
        const clientes = await resp.json();

        if (!resp.ok) return alert('Erro ao buscar clientes.');
        
        const lista = document.getElementById('listaClientes');
        lista.innerHTML = '';

        clientes
        .filter(
            c => c.nome.toLowerCase().includes(filtro) ||
            c.cpf.toLowerCase().includes(filtro)
        )
        .forEach(cli => {

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatarCPF(cli.cpf)}</td>
                <td>${cli.nome}</td>
                <td>+${cli.telefone || ''}</td>
                <td>${cli.endereco || ''}</td>
                <td class="actions">
                    <button class="edit" onclick="editarCliente('${cli._id}')">Editar</button>
                    <button class="delete" onclick="deletarCliente('${cli._id}')">Excluir</button>
                </td>
            `;
            
            lista.appendChild(tr);

        });
        
    } catch (error) {
        console.error('Erro ao carregar clientes: ', error);
    }

};


function editarCliente(id) {window.location.href = `cadastroCliente.html?id=${id}`}

async function deletarCliente(id) {
    
    if (!confirm('Tem certeza que deseja excluir esse cliente?')) return;

    try {

        const resp = await fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE' });

        if (!resp.ok) return alert('Erro ao deletar cliente.');

        console.log('Cliente deletado com sucesso');
        carregarClientes();
        
    } catch (error) {
        console.error('Erro ao deletar cliente: ', error);
    }

}

async function prepararFormularioCliente() {

    const urlParams = new URLSearchParams(window.location.search);
    const clienteID = urlParams.get('id');
    let cpfAntigo = '';

    if (clienteID) {
        
        document.getElementById('tituloCliente').textContent = 'Editar Cliente';

        try {
            
            const resp = await fetch(`http://localhost:3000/clientes/${clienteID}`);
            const cliente = await resp.json();

            if (!resp.ok) return alert(cliente.message || 'Erro ao preparar formulário.');

            if (cliente) {
                
                cpfAntigo = cliente.cpf;
                document.getElementById('clienteId').value = cliente._id;
                document.getElementById('nomeCliente').value = cliente.nome;
                document.getElementById('cpfCliente').value = cliente.cpf;
                document.getElementById('telefoneCliente').value = cliente.telefone || '';
                document.getElementById('enderecoCliente').value = cliente.endereco || '';

            } else alert('Cliente não encontrado');

        } catch (error) {
            console.error('Erro ao preparar formulário: ', error);
        }

    }

    document.getElementById('cadastroClienteForm').addEventListener('submit', async (e) => {
       
        e.preventDefault();

        const id = document.getElementById('clienteId').value;
        const nome = document.getElementById('nomeCliente').value;
        const cpf = document.getElementById('cpfCliente').value;
        const telefone = document.getElementById('telefoneCliente').value;
        const endereco = document.getElementById('enderecoCliente').value;
        
        try {

            if (id) {

                const resp = await fetch(`http://localhost:3000/clientes/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, cpf, telefone, endereco, cpfAntigo })
                });
    

                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao cadastrar cliente.');
                
                alert('Cliente atualizado com sucesso.');

            } else {

                const resp = await fetch(`http://localhost:3000/clientes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, cpf, telefone, endereco })
                });
    

                const data = await resp.json();
    
                if (!resp.ok) return alert(data.message || 'Erro ao editar cliente.');
                
                alert('Cliente cadastrado com sucesso.');

            }

            window.location.href = 'listaClientes.html';
            
        } catch (error) {
            console.error('Erro ao enviar formulário: ', error);
        }

    });
    
}

