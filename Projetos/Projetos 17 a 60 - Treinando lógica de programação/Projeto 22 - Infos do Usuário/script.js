function obterInformacoesUsuario() {

    if (confirm("Deseja permitir que o site colete informações sobre você?")) {
        
        document.getElementById('informacoes').innerText = '';

        fetch('https://api.ipify.org?format=json')//REaliza uma aquisição para a API ipify para obter o IP publico do usuário
            .then(resposta =>{//É tipo uma função dos dados da aquisição

                return resposta.json();//Converte a informação para JSON

            })
            .then(dados =>{//Aqui são processados os dados

                const infoIP = `IP:${dados.ip}\n`; //Cria String contendo o IP

                obterLocalizacao(dados.ip, infoIP);

            })
            .catch(erro =>{//Caso de erro na aquisição

                console.error('Erro ao obter o IP:', erro);

                document.getElementById('informacoes').innerText = 'Erro em obter o IP.'

            });

    } else {

        document.getElementById('informacoes').innerText = 'Autorização negada pelo usuário'
        
    }
    
}

function obterLocalizacao(ip, infoIP) {

    fetch(`https://ipapi.co/${ip}/json/`)//Obtem o endereço a partir do ip
        .then(resposta =>{

            return resposta.json();//Converte a informação para JSON

        })
        .then(dadosLocal =>{

            const localizacao = `País: ${dadosLocal.country_name}\nCidade:${dadosLocal.city}\nRegião:${dadosLocal.region}\n`

            const infoUsuario = coletarInfoNavegador();

            document.getElementById("informacoes").innerText = infoIP + localizacao + infoUsuario;

        })
        .catch(erro =>{

            console.log('Erro ao obter localização', erro);

            document.getElementById('informacoes').innerText = infoIP + 'Erro ao obter localização\n' + coletarInfoNavegador();

        })
    
}

function coletarInfoNavegador() {

    const tipoDispositivo = identificarTipoDispositivo();

    const informacoesUsuario = {

        'Tipo de dispositivo':tipoDispositivo,
        'Navegador': navigator.userAgent,
        'Plataforma': navigator.platform,
        'lingua': navigator.language,
        'conexão': navigator.connection ? navigator.connection.effectiveType: 'Não disponível'

    }
    
    return JSON.stringify(informacoesUsuario, null, 2);//null é para nao modifica as chaves durante a conversão e o 2 indica q cada nivel do JSON resultante deve ter um recuo de dois espações

}

function identificarTipoDispositivo() {

    const userAgent = navigator.userAgent.toLowerCase();//converte a string para letras minusculas e garante que a comparação de texto seja feita sem problemas

    if(/mobile|android|silk|midp|poket/i.test(userAgent)){
        
        return 'Móvel';

    }else if(/tablet|ipad/i.test(userAgent)){

        return 'Tablet';

    }else{

        return 'Desktop';

    }
    
}
