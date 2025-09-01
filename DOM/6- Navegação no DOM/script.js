function acessarPai() {
    
    var iten2 = document.getElementById('iten2');

    var parent = iten2.parentNode;

    document.getElementById('resultados').textContent = 'O pai de item2 é uma tag: ' + parent.tagName
}

function listarChildren() {

    var divPrincipal = document.getElementById('divPrincipal');

    var children = divPrincipal.children;

    var listarFilhos = Array.from(children).map(children => children.tagName).join(', ');
    
    document.getElementById('resultados').textContent = `Filhos de 'divPrincipal': ${listarFilhos}`;
}

function irProximo() {
    
    var item2 = document.getElementById('iten2');

    var proximo = item2.nextSibling;

    while (proximo && proximo.nodeType !== 1) {
        
        proximo = proximo.nextSibling;

    }

    document.getElementById('resultados').textContent = proximo
        ? 'Próximo irmão de "Second": ' + proximo.textContent
        : 'Não há próximo irmão';

}

function irAnterior() {
    
    var item2 = document.getElementById('iten2');

    var anterior = item2.previousSibling;

    while (anterior && anterior.nodeType !== 1) {
        
        anterior = anterior.previousSibling;

    }

    document.getElementById('resultados').textContent = anterior
        ? 'Irmão anterior de "Second": ' + anterior.textContent
        : 'Não há irmão anterior';

}

