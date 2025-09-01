class Livro {
    #copias;

    constructor(nome, autor, copias) {
        this.nome = nome;
        this.autor = autor;
        this.#copias = copias;
    }

    getCopias() {
        return this.#copias;
    }

    emprestar() {
        if (this.#copias > 0) {
            this.#copias--;
            return true;
        }
        return false;
    }

    devolver() {
        this.#copias++;
    }
}

class Biblioteca {
    constructor() {
        this.livros = [];
    }

    adicionarLivro(nome, autor, copias) {
        const novoLivro = new Livro(nome, autor, copias);
        this.livros.push(novoLivro);
        console.log(`\nO livro "${nome}" foi adicionado com sucesso.\n`);
    }

    #encontrarLivro(nomeDoLivro) {
        return this.livros.find(livro => livro.nome === nomeDoLivro);
    }

    emprestar1(nome, nomeDoLivro) {
        const livro = this.#encontrarLivro(nomeDoLivro); 
        if (livro) {
            if (livro.emprestar()) {// livro aqui esta instanciado na classe livros
                console.log(`${nome} pegou o livro "${nomeDoLivro}".`);
            } else {
                console.log(`Não temos o livro "${nomeDoLivro}" disponível no momento.`);
            }
        } else {
            console.log(`O livro "${nomeDoLivro}" não foi encontrado.`);
        }
    }

    devolver1(nomeDoLivro) {
        const livro = this.#encontrarLivro(nomeDoLivro);
        if (livro) {
            livro.devolver();// livro aqui esta instanciado na classe livros
            console.log(`O livro "${nomeDoLivro}" foi devolvido.`);
        } else {
            console.log(`O livro "${nomeDoLivro}" não foi encontrado.`);
        }
    }

    checarCopias(nomeDoLivro) {
        const livro = this.#encontrarLivro(nomeDoLivro);
        if (livro) {
            console.log(`Cópias disponíveis do livro "${nomeDoLivro}": ${livro.getCopias()}`);
        } else {
            console.log(`O livro "${nomeDoLivro}" não foi encontrado.`);
        }
    }
}

// Exemplo de uso
const biblioteca = new Biblioteca();
biblioteca.adicionarLivro('Senhor dos Anéis', 'J.R.R. Tolkien', 2);

biblioteca.emprestar1('Carlos', 'Senhor dos Anéis');
biblioteca.checarCopias('Senhor dos Anéis');
biblioteca.devolver1('Senhor dos Anéis');
biblioteca.checarCopias('Senhor dos Anéis');