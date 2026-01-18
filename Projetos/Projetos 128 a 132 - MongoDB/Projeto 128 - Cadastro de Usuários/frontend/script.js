document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('formularioCadastro')) { //Verifica se o usuario esta na pagina de cadastro 
        
        prepararFormulario();

    } else {//ou no index

        carregarUsuarios();

    }

    if (document.getElementById("campoFiltro")) {//Carrega os usuario ja filtrados
        
        document.getElementById('campoFiltro').addEventListener('input', () => {

            carregarUsuarios();

        })

    }

});

async function carregarUsuarios() {
    
    const filtro = document.getElementById("campoFiltro") ? document.getElementById("campoFiltro").value.toLowerCase() : '';

    //Faz uma requisição para obter os usuários do servidor rodando no localhost na porta 3000
    const resposta = await fetch(`http://localhost:3000/usuarios`);

    //Converte a resposta da requisição em um json
    const usuarios = await resposta.json();

    const tabela = document.getElementById('tabelaUsuarios');
    tabela.innerHTML = '';

    if(usuarios) console.log('usuários encontrados: ', usuarios);

    usuarios
        .filter(usuario => 

            // Converte o nome do usuário para minúsculas e verifica se 
            //      contém o valor digitado no filtro
            usuario.nome.toLowerCase().includes(filtro) || 

            // Converte o email do usuário para minúsculas e verifica se
            //      contém o valor digitado no filtro
            usuario.email.toLowerCase().includes(filtro)

        )
        .forEach(usuario => {//Coloca cada usuario na tabela
            
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.idade}</td>
                <td class='acoes'>

                    <button class="editar" onclick="editarUsuario('${usuario._id}')">Editar</button>
                    <button class="excluir" onclick="excluirUsuario('${usuario._id}', '${usuario.nome}')">Excluir</button>

                </td>
            `;

            tabela.appendChild(linha);

        });
}

async function editarUsuario(idUsuario) {
    
    //Carrega a pagina de cadastro passando o id do usuario como parametro, permitindo que a pagina possa 
        //identificar de qual usuário iremos editar.
    window.location.href=`cadastro.html?id=${idUsuario}`;

}

async function excluirUsuario(idUsuario, nomeUsuario) {
    
    if (confirm(`Tem certeza que deseja excluir o usuário ${nomeUsuario}?`)) {//Pede confirmação do usuário
        
        //Faz uma requisição HTTP DELETE para que o usuário seja removido
        await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {method: 'DELETE'});

        alert('Usuário excluido com sucesso.');

        carregarUsuarios();

    }

}

async function prepararFormulario() {
    
    const parametrosURL = new URLSearchParams(window.location.search);//Encontra os parametros da url
    const idUsuario = parametrosURL.get('id');//Pega um parametro especifico

    if (idUsuario) { //Se existir algum id na url
        
        document.getElementById('tituloPagina').textContent = 'Editar Usuário';

        const resposta = await fetch('http://localhost:3000/usuarios');//Obtem a lista de cadastros
        const listaUsuarios = await resposta.json();//transforma em json
        const usuarioEncontrado = listaUsuarios.find(u => u._id === idUsuario);//Busca pelo id especifico

        if (usuarioEncontrado) {//Se o id existir na lista

            document.getElementById('idUsuario').value = usuarioEncontrado._id;
            document.getElementById('nome').value = usuarioEncontrado.nome;
            document.getElementById('email').value = usuarioEncontrado.email;
            document.getElementById('idade').value = usuarioEncontrado.idade;
            
        }

    }

    //Envio do formulario
    document.getElementById('formularioCadastro').addEventListener('submit', async (evento) => {

        //Impede o comportamento padrão do formulário (carregar a página ao se enviado), sendo tudo tratado vi JS
        evento.preventDefault();

        //Captura os valores dos campos
        const idUsuarioCampo = document.getElementById("idUsuario").value;//Oculto ao usuário
        const nomeUsuario = document.getElementById('nome').value;
        const emailUsuario = document.getElementById('email').value;
        const idadeUsuario = Number(document.getElementById('idade').value);;

        if (idUsuarioCampo) {//Se possui valor é uma edição
            
            //Requisição http para atualizar os dados do usuário específico no servidor, essa função é usada 
                // para se comunicar com o servidor Backend e modificar os dados no BD. 
            await fetch(`http://localhost:3000/usuarios/${idUsuarioCampo}`, {

                method: 'PUT',//Atualiza um registro existente.
                headers: { 'Content-Type': 'application/json'},//Cabeçalho indicando que os dados estão no formato JSON
                //Converte os dados em JSON antes de enviá-los ao servidor (melhor interpretada pelo Backend) 
                body: JSON.stringify({nome: nomeUsuario, email: emailUsuario, idade: idadeUsuario})

            });

            alert('Usuário atualizado com sucesso!');

        } else {//Novo usuário

            await fetch(`http://localhost:3000/usuarios`, {

                method: 'POST',//Indica a criação de um novo registro no BD.
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({nome: nomeUsuario, email: emailUsuario, idade: idadeUsuario})

            });

            alert('Usuário adicionado com sucesso!');

        }

        window.location.href = 'index.html';

    });

}
