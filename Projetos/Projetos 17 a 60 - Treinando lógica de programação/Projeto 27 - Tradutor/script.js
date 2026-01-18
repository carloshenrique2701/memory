document.getElementById('btnTraduzir').addEventListener('click', function() {

    const textoOrigem = document.getElementById('textoOrigem').value;
    const idiomaOrigem = document.getElementById('idiomaOrigem').value;
    const idiomaDestino = document.getElementById('idiomaDestino').value;

    //fetch é uma funcao do javascript para fazer requisicoes http
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${idiomaOrigem}&tl=${idiomaDestino}&dt=t&q=${encodeURIComponent(textoOrigem)}`)
        //then é uma funcao que recebe o retorno da requisicao, nesse caso, ele espera um JSON
        //e converte o retorno para um objeto javascript
        .then(response => response.json())

        //data é o objeto javascript que contem a resposta da requisicao
        //neste caso, data é um array de arrays, onde o primeiro elemento é o array de traducoes
        //e o primeiro elemento desse array é a traducao em si
        //entao, data[0][0][0] é a traducao que queremos
        .then(data => {

            const traducao = data[0][0][0];

            document.getElementById('resultado').innerHTML = traducao;

        })
    // caso ocorra algum erro na requisicao, ele sera tratado aqui
    .catch(erro => console.log(erro));

});