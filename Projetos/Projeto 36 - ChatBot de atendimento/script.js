document.getElementById('iniciar-chat').addEventListener('click', iniciarChat);

document.getElementById('botao-enviar').addEventListener('click', enviarMensagem);

document.getElementById('minimize-button').addEventListener('click', alternarJanelaChat);

document.getElementById('close-button').addEventListener('click', fecharChat);

let nomeUsuario = '';

const qa = [

    {pergunta:"Olá", resposta: "Olá, como posso ajudar?"},
    { pergunta: "oi", resposta: "Oi! Como posso ajudar você hoje?" },
    { pergunta: "qual é o seu nome?", resposta: "Eu sou o Chatbot de Atendimento." },
    { pergunta: "como posso acessar minha conta?", resposta: "Para acessar sua conta, clique em 'Login' no canto superior direito." },
    { pergunta: "quais são os cursos oferecidos?", resposta: "Oferecemos cursos de HTML, CSS e JavaScript." },
    { pergunta: "quanto custa o curso de HTML?", resposta: "O curso de HTML custa R$ 100,00." },
    { pergunta: "quanto custa o curso de CSS?", resposta: "O curso de CSS custa R$ 120,00." },
    { pergunta: "quanto custa o curso de JavaScript?", resposta: "O curso de JavaScript custa R$ 150,00." },
    { pergunta: "como faço para me inscrever no curso de HTML?", resposta: "Para se inscrever no curso de HTML, acesse a página do curso e clique em 'Inscrever-se'." },
    { pergunta: "como faço para me inscrever no curso de CSS?", resposta: "Para se inscrever no curso de CSS, acesse a página do curso e clique em 'Inscrever-se'." },
    { pergunta: "como faço para me inscrever no curso de JavaScript?", resposta: "Para se inscrever no curso de JavaScript, acesse a página do curso e clique em 'Inscrever-se'." },
    { pergunta: "qual é a duração do curso de HTML?", resposta: "O curso de HTML tem duração de 4 semanas." },
    { pergunta: "qual é a duração do curso de CSS?", resposta: "O curso de CSS tem duração de 6 semanas." },
    { pergunta: "qual é a duração do curso de JavaScript?", resposta: "O curso de JavaScript tem duração de 8 semanas." },
    { pergunta: "os cursos possuem certificado?", resposta: "Sim, todos os cursos oferecem certificado de conclusão." },
    { pergunta: "como recebo o certificado?", resposta: "O certificado é enviado por e-mail após a conclusão do curso." },
    { pergunta: "quais são as formas de pagamento?", resposta: "Aceitamos pagamentos via cartão de crédito, boleto bancário e PayPal." },
    { pergunta: "posso pagar parcelado?", resposta: "Sim, é possível parcelar o pagamento em até 12 vezes no cartão de crédito." },
    { pergunta: "qual é a carga horária do curso de HTML?", resposta: "O curso de HTML tem uma carga horária de 40 horas." },
    { pergunta: "qual é a carga horária do curso de CSS?", resposta: "O curso de CSS tem uma carga horária de 60 horas." },
    { pergunta: "qual é a carga horária do curso de JavaScript?", resposta: "O curso de JavaScript tem uma carga horária de 80 horas." },
    { pergunta: "os cursos são online?", resposta: "Sim, todos os nossos cursos são 100% online." },
    { pergunta: "como funcionam as aulas?", resposta: "As aulas são em formato de vídeo e você pode assistir no seu próprio ritmo." },
    { pergunta: "posso baixar os materiais?", resposta: "Sim, você pode baixar os materiais complementares dos cursos." },
    { pergunta: "qual é a metodologia de ensino?", resposta: "Nossa metodologia é prática, com muitos exercícios e projetos reais." },
    { pergunta: "há suporte para dúvidas?", resposta: "Sim, você pode tirar suas dúvidas com nossos instrutores via fórum." },
    { pergunta: "qual é o público-alvo dos cursos?", resposta: "Nossos cursos são voltados para iniciantes e desenvolvedores que desejam se atualizar." },
    { pergunta: "preciso de conhecimento prévio?", resposta: "Não, nossos cursos são feitos para quem não tem conhecimento prévio." },
    { pergunta: "qual é o diferencial dos seus cursos?", resposta: "Nosso diferencial é a abordagem prática e a qualidade dos instrutores." },
    { pergunta: "há algum desconto disponível?", resposta: "Sim, oferecemos descontos para pagamentos à vista e promoções sazonais." },
    { pergunta: "como posso acompanhar meu progresso?", resposta: "Você pode acompanhar seu progresso na plataforma, em seu perfil." },
    { pergunta: "há certificado de participação?", resposta: "Sim, ao completar o curso você recebe um certificado de participação." },
    { pergunta: "como acesso os cursos?", resposta: "Você pode acessar os cursos através do nosso site, na área do aluno." },
    { pergunta: "há prazo para concluir o curso?", resposta: "Não, você pode concluir o curso no seu próprio ritmo, sem prazos." },
    { pergunta: "qual é a média salarial de um desenvolvedor web?", resposta: "A média salarial varia, mas um desenvolvedor web júnior pode ganhar entre R$ 3.000,00 e R$ 5.000,00." },
    { pergunta: "os cursos são atualizados?", resposta: "Sim, nossos cursos são constantemente atualizados com as novas tecnologias." },
    { pergunta: "como posso cancelar minha inscrição?", resposta: "Você pode cancelar sua inscrição entrando em contato com nosso suporte." },
    { pergunta: "posso obter reembolso?", resposta: "Sim, oferecemos reembolso total se você cancelar dentro de 7 dias após a compra." },
    { pergunta: "há alguma garantia de aprendizado?", resposta: "Sim, garantimos que você vai aprender se seguir todas as aulas e exercícios." },
    { pergunta: "qual é a diferença entre HTML e CSS?", resposta: "HTML é usado para estruturar o conteúdo da web, enquanto CSS é usado para estilizar a aparência do conteúdo." },
    { pergunta: "o que é JavaScript?", resposta: "JavaScript é uma linguagem de programação usada para criar interatividade em sites." },
    { pergunta: "quais são os pré-requisitos para aprender JavaScript?", resposta: "Não há pré-requisitos, mas é recomendável ter conhecimento básico de HTML e CSS." },
    { pergunta: "posso usar os cursos em mais de um dispositivo?", resposta: "Sim, você pode acessar os cursos em qualquer dispositivo com internet." },
    { pergunta: "os cursos têm exercícios práticos?", resposta: "Sim, todos os nossos cursos incluem muitos exercícios práticos." },
    { pergunta: "há suporte técnico?", resposta: "Sim, oferecemos suporte técnico para ajudar com qualquer problema na plataforma." },
    { pergunta: "posso acessar os cursos a qualquer hora?", resposta: "Sim, nossos cursos estão disponíveis 24 horas por dia, 7 dias por semana." },
    { pergunta: "os cursos têm prazo de validade?", resposta: "Não, uma vez comprado, você tem acesso vitalício ao curso." },
    { pergunta: "posso compartilhar meu acesso?", resposta: "Não, o acesso é individual e intransferível." },
    { pergunta: "há aulas ao vivo?", resposta: "Não, todas as aulas são gravadas para que você possa assistir no seu próprio ritmo." },
    { pergunta: "qual é o conteúdo do curso de HTML?", resposta: "O curso de HTML abrange desde o básico até tópicos mais avançados, incluindo semântica e acessibilidade." },
    { pergunta: "qual é o conteúdo do curso de CSS?", resposta: "O curso de CSS inclui desde conceitos básicos até técnicas avançadas, como Flexbox e Grid Layout." },
    { pergunta: "qual é o conteúdo do curso de JavaScript?", resposta: "O curso de JavaScript cobre desde a sintaxe básica até conceitos avançados, como ES6, DOM e AJAX." },
    { pergunta: "há algum material extra?", resposta: "Sim, todos os cursos incluem materiais extras, como ebooks e links úteis." },
    { pergunta: "posso falar com os instrutores?", resposta: "Sim, você pode enviar mensagens aos instrutores através da plataforma." },
    { pergunta: "os cursos têm avaliação?", resposta: "Sim, ao final de cada módulo você encontra avaliações para testar seus conhecimentos." },
    { pergunta: "há algum pré-requisito para os cursos?", resposta: "Não, qualquer pessoa pode se inscrever em nossos cursos." },
    { pergunta: "quais são os benefícios de aprender HTML, CSS e JavaScript?", resposta: "Aprender essas tecnologias permite criar sites e aplicações web interativas, além de abrir portas para carreiras em desenvolvimento web." },
    { pergunta: "quanto tempo devo dedicar aos cursos?", resposta: "Recomendamos dedicar pelo menos 1 hora por dia para um bom aproveitamento." },
    { pergunta: "há algum suporte após o curso?", resposta: "Sim, você continua tendo acesso aos materiais e suporte mesmo após concluir o curso." },
    { pergunta: "como posso me preparar para o curso?", resposta: "Recomendamos um ambiente tranquilo, um computador com internet e um caderno para anotações." },
    { pergunta: "os cursos são indicados para crianças?", resposta: "Sim, nossos cursos são acessíveis para todas as idades, incluindo crianças." },
    { pergunta: "quais são os métodos de pagamento aceitos?", resposta: "Aceitamos pagamentos via cartão de crédito, boleto bancário e PayPal." },
    { pergunta: "posso acessar os cursos offline?", resposta: "Não, os cursos precisam de uma conexão com a internet para serem acessados." },
    { pergunta: "os cursos são em português?", resposta: "Sim, todos os nossos cursos são em português." },
    { pergunta: "como posso resetar minha senha?", resposta: "Você pode resetar sua senha clicando em 'Esqueci minha senha' na página de login." },
    { pergunta: "há limite de vagas?", resposta: "Não, nossos cursos não têm limite de vagas." },
    { pergunta: "como posso me inscrever no curso?", resposta: "Você pode se inscrever no curso acessando a página do curso e clicando em 'Inscrever-se'." },
    { pergunta: "qual é a duração média dos cursos?", resposta: "A duração média dos cursos varia de 4 a 8 semanas, dependendo do curso." },
    { pergunta: "posso ver uma prévia dos cursos?", resposta: "Sim, oferecemos prévias gratuitas de alguns cursos para você conhecer o conteúdo." },
    { pergunta: "os cursos são recomendados para quem?", resposta: "Nossos cursos são recomendados para qualquer pessoa interessada em desenvolvimento web, seja iniciante ou profissional." },
    { pergunta: "posso cancelar minha inscrição a qualquer momento?", resposta: "Sim, você pode cancelar sua inscrição a qualquer momento entrando em contato com nosso suporte." },
    { pergunta: "qual é o nível de dificuldade dos cursos?", resposta: "Os cursos são projetados para serem acessíveis a todos os níveis, do iniciante ao avançado." },
    { pergunta: "há exercícios de código?", resposta: "Sim, nossos cursos incluem muitos exercícios de código para praticar." },
    { pergunta: "posso interagir com outros alunos?", resposta: "Sim, você pode interagir com outros alunos através do fórum da plataforma." },
    { pergunta: "quais são os tópicos abordados no curso de HTML?", resposta: "O curso de HTML abrange tópicos como estrutura de páginas, tags, atributos e semântica." },
    { pergunta: "quais são os tópicos abordados no curso de CSS?", resposta: "O curso de CSS inclui tópicos como seletores, propriedades, layouts, Flexbox, Grid e animações." },
    { pergunta: "quais são os tópicos abordados no curso de JavaScript?", resposta: "O curso de JavaScript cobre variáveis, funções, loops, eventos, DOM, AJAX e ES6." },
    { pergunta: "há suporte para dúvidas técnicas?", resposta: "Sim, você pode tirar suas dúvidas técnicas com nossos instrutores." },
    { pergunta: "posso assistir as aulas em qualquer ordem?", resposta: "Sim, você pode assistir as aulas na ordem que preferir." },
    { pergunta: "há um fórum para discussão?", resposta: "Sim, nossa plataforma possui um fórum para discussão e troca de conhecimentos." },
    { pergunta: "qual é a validade do certificado?", resposta: "O certificado não tem validade específica, mas comprova que você concluiu o curso." },
    { pergunta: "posso imprimir o certificado?", resposta: "Sim, você pode imprimir o certificado enviado por e-mail." },
    { pergunta: "os cursos são compatíveis com dispositivos móveis?", resposta: "Sim, você pode acessar os cursos em dispositivos móveis e tablets." },
    { pergunta: "há suporte para acessibilidade?", resposta: "Sim, nossa plataforma é acessível para pessoas com deficiência." },
    { pergunta: "posso fazer download dos vídeos?", resposta: "Não, os vídeos não estão disponíveis para download, apenas streaming." },
    { pergunta: "há limite de acessos aos cursos?", resposta: "Não, você pode acessar os cursos quantas vezes quiser." },
    { pergunta: "os cursos são em vídeo?", resposta: "Sim, nossos cursos são compostos por vídeo-aulas gravadas." },
    { pergunta: "há algum material complementar?", resposta: "Sim, todos os cursos incluem materiais complementares, como artigos e ebooks." },
    { pergunta: "os cursos têm exercícios práticos?", resposta: "Sim, todos os cursos incluem muitos exercícios práticos para fixar o conteúdo." },
    { pergunta: "há algum suporte para iniciantes?", resposta: "Sim, nossos cursos são projetados para ajudar iniciantes a aprenderem do zero." },
    { pergunta: "os cursos têm algum pré-requisito?", resposta: "Não, qualquer pessoa pode se inscrever e acompanhar nossos cursos." },
    { pergunta: "posso assistir os vídeos em alta definição?", resposta: "Sim, todos os vídeos estão disponíveis em alta definição." },
    { pergunta: "há algum material de leitura?", resposta: "Sim, nossos cursos incluem materiais de leitura, como ebooks e artigos." },
    { pergunta: "posso pausar e continuar o curso?", resposta: "Sim, você pode pausar e continuar o curso quando quiser." },
    { pergunta: "há algum tipo de prova ou exame?", resposta: "Sim, ao final de cada módulo há avaliações para testar seus conhecimentos." },
    { pergunta: "posso ver a grade curricular?", resposta: "Sim, a grade curricular está disponível na página de cada curso." },
    { pergunta: "os cursos têm legendas?", resposta: "Sim, todos os vídeos possuem legendas em português." },
    { pergunta: "há algum certificado de conclusão?", resposta: "Sim, você recebe um certificado de conclusão ao finalizar o curso." },
    { pergunta: "posso assistir os vídeos em velocidade acelerada?", resposta: "Sim, você pode ajustar a velocidade de reprodução dos vídeos." },
    { pergunta: "há suporte para dúvidas gerais?", resposta: "Sim, você pode tirar suas dúvidas gerais através do suporte ao aluno." },
    { pergunta: "qual é o horário de atendimento do suporte?", resposta: "Nosso suporte está disponível de segunda a sexta, das 9h às 18h." },
    { pergunta: "os cursos são acessíveis para estrangeiros?", resposta: "Sim, qualquer pessoa com acesso à internet pode se inscrever em nossos cursos." },
    { pergunta: "há algum tipo de desconto para estudantes?", resposta: "Sim, oferecemos descontos especiais para estudantes." },
    { pergunta: "posso pagar em dólar?", resposta: "Sim, aceitamos pagamentos em dólar e outras moedas estrangeiras." },
    { pergunta: "há suporte para empresas?", resposta: "Sim, oferecemos pacotes especiais e suporte para empresas." },
    { pergunta: "posso usar os cursos para treinar minha equipe?", resposta: "Sim, nossos cursos são ideais para treinamento de equipes." },
    { pergunta: "há algum tipo de assinatura mensal?", resposta: "Não, nossos cursos são adquiridos individualmente, sem assinatura mensal." },
    { pergunta: "qual é a diferença entre os cursos de HTML, CSS e JavaScript?", resposta: "HTML é usado para estruturar páginas, CSS para estilizar e JavaScript para adicionar interatividade." },
    { pergunta: "posso aplicar o que aprendi em projetos reais?", resposta: "Sim, nossos cursos são focados em prática e você poderá aplicar os conhecimentos em projetos reais." },
    { pergunta: "os cursos são recomendados para quem quer mudar de carreira?", resposta: "Sim, nossos cursos são ideais para quem deseja iniciar uma nova carreira em desenvolvimento web." },
    { pergunta: "há algum suporte após concluir o curso?", resposta: "Sim, você continuará tendo acesso ao suporte e materiais mesmo após concluir o curso." },
    { pergunta: "posso acessar os cursos fora do Brasil?", resposta: "Sim, nossos cursos estão disponíveis para acesso de qualquer lugar do mundo." },
    { pergunta: "há algum tipo de mentoria?", resposta: "Sim, oferecemos mentoria com nossos instrutores para ajudar no seu aprendizado." },
    { pergunta: "posso fazer perguntas aos instrutores?", resposta: "Sim, você pode enviar suas perguntas aos instrutores através da plataforma." },
    { pergunta: "os cursos são focados em prática?", resposta: "Sim, nossa metodologia é voltada para a prática com muitos exercícios e projetos." },
    { pergunta: "há algum suporte para instalação de software?", resposta: "Sim, nossos instrutores podem ajudar com a instalação dos softwares necessários." },
    { pergunta: "qual é a carga horária total dos cursos?", resposta: "A carga horária total varia de acordo com o curso, mas geralmente é de 40 a 80 horas." },
    { pergunta: "os cursos têm projetos finais?", resposta: "Sim, ao final de cada curso você realizará um projeto para aplicar o que aprendeu." },
    { pergunta: "posso obter um certificado em inglês?", resposta: "Sim, oferecemos a opção de certificado em inglês mediante solicitação." },
    { pergunta: "os cursos têm validade?", resposta: "Não, uma vez comprado, você tem acesso vitalício aos cursos." },
    { pergunta: "posso assistir os vídeos no meu celular?", resposta: "Sim, nossa plataforma é responsiva e você pode assistir aos vídeos no seu celular." },
    { pergunta: "há algum tipo de comunidade para alunos?", resposta: "Sim, temos uma comunidade ativa onde alunos podem interagir e trocar conhecimentos." },
    { pergunta: "os cursos são indicados para freelancers?", resposta: "Sim, nossos cursos são ideais para freelancers que desejam se especializar." },
    { pergunta: "posso acessar os cursos de qualquer lugar?", resposta: "Sim, você pode acessar os cursos de qualquer lugar com internet." },
    { pergunta: "há algum suporte para configuração do ambiente de desenvolvimento?", resposta: "Sim, nossos instrutores podem ajudar com a configuração do ambiente de desenvolvimento." },
    { pergunta: "os cursos são recomendados para quem quer criar sites?", resposta: "Sim, nossos cursos são perfeitos para quem deseja aprender a criar sites profissionais." },
    { pergunta: "posso usar os cursos para melhorar meu portfólio?", resposta: "Sim, os projetos realizados nos cursos podem ser incluídos em seu portfólio." },
    { pergunta: "há algum tipo de acompanhamento?", resposta: "Sim, nossos instrutores acompanham seu progresso e podem oferecer feedback." },
    { pergunta: "os cursos têm exercícios de revisão?", resposta: "Sim, ao final de cada módulo há exercícios de revisão para fixar o conteúdo." },
    { pergunta: "há suporte para dúvidas de carreira?", resposta: "Sim, oferecemos orientação de carreira para ajudar você a entrar no mercado de trabalho." },
    { pergunta: "os cursos são recomendados para iniciantes?", resposta: "Sim, nossos cursos são projetados para serem acessíveis a iniciantes." },
    { pergunta: "posso ver as avaliações de outros alunos?", resposta: "Sim, na página de cada curso você encontra avaliações de outros alunos." },
    { pergunta: "há algum suporte para certificação?", resposta: "Sim, nossos instrutores podem ajudar com a preparação para certificações." },
    { pergunta: "os cursos são indicados para quem quer se especializar?", resposta: "Sim, nossos cursos são ideais para quem deseja se especializar em desenvolvimento web." },
    { pergunta: "há algum suporte para desenvolvimento de projetos?", resposta: "Sim, você pode tirar suas dúvidas sobre projetos com nossos instrutores." },
    { pergunta: "os cursos têm exercícios práticos?", resposta: "Sim, todos os cursos incluem muitos exercícios práticos para fixar o conteúdo." },
    { pergunta: "posso acessar os cursos mesmo após concluir?", resposta: "Sim, você terá acesso vitalício aos cursos mesmo após concluir." },
    { pergunta: "há algum tipo de suporte técnico?", resposta: "Sim, oferecemos suporte técnico para ajudar com qualquer problema na plataforma." },
    { pergunta: "posso acessar os cursos em qualquer dispositivo?", resposta: "Sim, você pode acessar os cursos em qualquer dispositivo com internet." },
    { pergunta: "os cursos têm avaliações?", resposta: "Sim, ao final de cada módulo você encontra avaliações para testar seus conhecimentos." },
    { pergunta: "há suporte para instalação de software?", resposta: "Sim, nossos instrutores podem ajudar com a instalação dos softwares necessários." },
    { pergunta: "qual é a carga horária total dos cursos?", resposta: "A carga horária total varia de acordo com o curso, mas geralmente é de 40 a 80 horas." },
    { pergunta: "os cursos têm projetos finais?", resposta: "Sim, ao final de cada curso você realizará um projeto para aplicar o que aprendeu." },
    { pergunta: "posso obter um certificado em inglês?", resposta: "Sim, oferecemos a opção de certificado em inglês mediante solicitação." },
    { pergunta: "os cursos têm validade?", resposta: "Não, uma vez comprado, você tem acesso vitalício aos cursos." },
    { pergunta: "posso assistir os vídeos no meu celular?", resposta: "Sim, nossa plataforma é responsiva e você pode assistir aos vídeos no seu celular." },
    { pergunta: "há algum tipo de comunidade para alunos?", resposta: "Sim, temos uma comunidade ativa onde alunos podem interagir e trocar conhecimentos." },
    { pergunta: "os cursos são indicados para freelancers?", resposta: "Sim, nossos cursos são ideais para freelancers que desejam se especializar." },
    { pergunta: "posso acessar os cursos de qualquer lugar?", resposta: "Sim, você pode acessar os cursos de qualquer lugar com internet." },
    { pergunta: "há algum suporte para configuração do ambiente de desenvolvimento?", resposta: "Sim, nossos instrutores podem ajudar com a configuração do ambiente de desenvolvimento." },
    { pergunta: "os cursos são recomendados para quem quer criar sites?", resposta: "Sim, nossos cursos são perfeitos para quem deseja aprender a criar sites profissionais." },
    { pergunta: "posso usar os cursos para melhorar meu portfólio?", resposta: "Sim, os projetos realizados nos cursos podem ser incluídos em seu portfólio." },
    { pergunta: "há algum tipo de acompanhamento?", resposta: "Sim, nossos instrutores acompanham seu progresso e podem oferecer feedback." },
    { pergunta: "os cursos têm exercícios de revisão?", resposta: "Sim, ao final de cada módulo há exercícios de revisão para fixar o conteúdo." },
    { pergunta: "há suporte para dúvidas de carreira?", resposta: "Sim, oferecemos orientação de carreira para ajudar você a entrar no mercado de trabalho." },
    { pergunta: "os cursos são recomendados para iniciantes?", resposta: "Sim, nossos cursos são projetados para serem acessíveis a iniciantes." },
    { pergunta: "posso ver as avaliações de outros alunos?", resposta: "Sim, na página de cada curso você encontra avaliações de outros alunos." },
    // Adicione mais perguntas e respostas aqui

];

function iniciarChat() {

    const nomeUsuarioInput = document.getElementById('nome-usuario').value;

    if(nomeUsuarioInput.trim() !== '' ) {

        nomeUsuario = nomeUsuarioInput;

        document.getElementById('chat-intro').style.display = 'none';

        document.getElementById('chat-window').style.display = 'flex';

        adicionarMensagem("Ola, " + nomeUsuario + "! Como posso ajudar hoje?", 'bot-texto');

    } else{

        alert('Por favor, insira um nome de usuário.');

    }

}

function enviarMensagem() {

    const entradaUsuario = document.getElementById('entrada-usuario').value;

    if(entradaUsuario.trim() !== ''){

        adicionarMensagem(entradaUsuario, 'user-message');

        document.getElementById('entrada-usuario').value = '';

        respostaBot(entradaUsuario);

    }
    
}


function respostaBot(entradaUsuario) {
    
    const entradaUsuarioLower = entradaUsuario.toLowerCase();

    const resposta = encontrarResposta(entradaUsuarioLower) || 'Desculpe não entendi sua pergunta. Poderia reformulá-la?';

    setTimeout(() => adicionarMensagem(resposta, 'bot-message'), 500);

    if(entradaUsuarioLower.includes('quais são os cursos oferecidos')){

        setTimeout(() => exibirBotoesCursos(), 600);

    }

}

function encontrarResposta(entrada) {

    let melhorCorrespondencia = '';

    let menorDistancia = Infinity;

    qa.forEach(item => {

        const distancia = calcularDistanciaLevenshtein(entrada, item.pergunta.toLowerCase());

        if(distancia < menorDistancia){

            menorDistancia = distancia;

            melhorCorrespondencia = item.resposta;

        }

    })

    return menorDistancia <= (entrada.length / 2) ? melhorCorrespondencia : null;
    
}

/**
 *
 * A Distância de Leveshtein (ou Levenshtein Distance) é uma medida de dissimilaridade, ou seja, quanto mais próxima de 0, mais semelhantes as strings são. Ela pega duas strings a serem comparadas e 
 * calcula quantos caracteres diferentes elas possuem. O modo de calculo é o seguinte:
 * 
 *  -Se o caractere for igual recebe 0
 *  -Se o caractere for diferente recebe 1
 *  -Se fornecessário a inclusão ou exclusão de um caractere recebe 1
 * 
 * Ao final, ele conta quantos caracteres diferentes foram encontrados e retorna essa quantidade dividido pelo tamanho da maior string. Vamos ver um exemplo:
 * 
 *              PATO X GATO
 * 
 * """      G  |  A  |  T  |  O
 * "" | 0 | 1  |  2  |  3  |  4   
 * P  | 1 | 1  |  2  |  3  |  4
 * A  | 2 | 2  |  1  |  2  |  3
 * T  | 3 | 3  |  2  |  1  |  2
 * O  | 4 | 4  |  3  |  2  |  1
 * 
 * 
 *                           + Matriz de distância
 * A matriz de distância é uma tabela que mostra o número de operações necessárias para transformar uma string em outra. Cada célula da matriz representa o número de operações necessárias 
 * para transformar a string da linha em cima na string da coluna da esquerda.
 * 
 *          INTENÇÃO X EXECUÇÃO
 * 
 * """      I | N | T | E | N | Ç | Ã | O
 * "" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
 * E  | 1 | 1 | 2 | 3 | 3 | 4 | 5 | 6 | 7
 * X  | 2 | 2 | 2 | 2 | 3 | 4 | 5 | 6 | 7
 * E  | 3 | 3 | 3 | 3 | 3 | 4 | 5 | 6 | 7
 * C  | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 6 | 7
 * U  | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 6 | 7
 * Ç  | 6 | 6 | 6 | 6 | 6 | 6 | 5 | 6 | 7
 * Ã  | 7 | 7 | 7 | 7 | 7 | 7 | 6 | 5 | 6
 * O  | 8 | 8 | 8 | 8 | 8 | 8 | 7 | 6 | 5
 * 
 * Note que nessas matrizes de distância de edição,a Célula[0][0] recebe Sempre 0 (custo para transformar "" em ""). Apartir dai, fazemos assim:
 * 
 *      matriz[i-1][j] + 1,    # Deleção
 *      matriz[i][j-1] + 1,    # Inserção
 *      matriz[i-1][j-1] + 1   # Substituição
 * 
 * 
 *                          + Cálculo
 * A Distância de Levenshtein é calculada usando a seguinte fórmula:
 * d = min(matriz[i-1][j] + 1, matriz[i][j-1] + 1, matriz[i-1][j-1] + 1)
 * 
 * 
 * A última celula da matriz, que representa a distância de Levenshtein, recebe o valor de alterações necessárias para transformar a primeira string em outra. No nosso primeiro exemplo, temos o número 1 e 
 * no segundo exemplo, temos o número 5. A distância de Levenshtein para as strings "PATO" e "GATO" é 1, enquanto a distância de Levenshtein para as strings "INTEÇÃO" e "EXECUÇÃO" é 5. Com esse valor em mãos,
 * vamos fazer um calculo para deixar mais claro o que estamos fazendo. Vamos pegar esse valor e dividir pelo tamanho da maior string, por exemplo: "INTEÇÃO" tem 8 caracteres e "EXECUÇÃO" tem 9 caracteres, logo,
 * a distância de Levenshtein para as  dividido pelo tamanho da maior string, temos 5/9 = 0.5555555, ou seja, 55,56%. Para "Pato" e "Gato", a distância de Levenshtein para as  dividido pelo tamanho da maior string,
 * temos 1/4 = 0.25, ou seja, 25%. 
 * 
 * Ao final, essa divisão que é feita, ela é uma Normalização da distância de Levenshtein, que nos ajuda a comparar as strings de maneira mais eficiente, evitando assim, distancias muito grandes e precisão muito baixa.
 * 
 */
function calcularDistanciaLevenshtein(a, b) {

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {

        matrix[i] = [i];
        
    }

    for (let j = 0; j <= a.length; j++) {
        
        matrix[0][j] = j;
        
    }
    

    for (let i = 1; i <= b.length; i++) {
        
        for (let j = 1; j <= a.length; j++) {
            
            if(b.charAt(i - 1) === a.charAt(j - 1)){

                matrix[i][j] = matrix[i-1][j-1];

            } else{

                matrix[i][j] = matrix[i-1][j-1] + 1;

                matrix[i][j] = Math.min(matrix[i][j], matrix[i][j - 1] + 1)

                matrix[i][j] = Math.min(matrix[i][j], matrix[i - 1][j] + 1)

            }
            
        }
        
    }

    return matrix[b.length][a.length];

}

function exibirBotoesCursos() {

    const chatOutPut = document.getElementById('chat-output');

    const cursosBotoes = document.createElement('div');

    cursosBotoes.id = 'cursos-botoes';

    const cursos = [

        {nome: 'HTML', link: 'https://exemplo.com/curso-html'},
        {nome: 'CSS', link: 'https://exemplo.com/curso-css'},
        {nome: 'JavaScript', link: 'https://exemplo.com/curso-javascript'}

    ]

    cursos.forEach(curso => {
        
        const botaoCurso = document.createElement('a');

        botaoCurso.className = 'botao-curso';

        botaoCurso.href = curso.link;

        botaoCurso.target = '_blank';

        botaoCurso.textContent = curso.nome

        cursosBotoes.appendChild(botaoCurso);

    });

    chatOutPut.appendChild(cursosBotoes);
    cursosBotoes.scrollIntoView();
    
}

function adicionarMensagem(mensagem, classe) {

    const elementoMensagem = document.createElement('div');

    elementoMensagem.className = `message ${classe}`;

    elementoMensagem.textContent = mensagem;

    document.getElementById('chat-output').appendChild(elementoMensagem);

    elementoMensagem.scrollIntoView();

}

function alternarJanelaChat(){

    const janelaChat = document.getElementById('chat-window');

    janelaChat.style.display = janelaChat.style.display === 'none'

        ?'flex'

        :'none'
    ;

}

function fecharChat() {
    
    const elementoChatBot = document.getElementById('chatbot');

    elementoChatBot.style.display = 'none'

}
