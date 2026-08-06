class Voo {
    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
    }
}

class RadarService {
    async buscarVoosGlobais() {
        console.log("Iniciando busca no satélite...");

        let resposta = await fetch("https://api.exemplo-aeroporto.com/voos-hoje");

        if (!resposta.ok) {
            throw new Error("Falha na comunicação com o radar");
        }

        let dadosJson = await resposta.json();

        let voosRicos = dadosJson.map(dado => new Voo(dado.id, dado.cidade));

        return voosRicos;
    }
}

async function iniciarRadar() {
    let painelDOM = document.getElementById("telaPainel");
    let radar = new RadarService();

    painelDOM.innerHTML = "Buscando dados no satélite...";

    try {
        let listaPronta = await radar.buscarVoosGlobais();

        painelDOM.innerHTML =
            `Sucesso! Temos ${listaPronta.length} voos no radar.`;

    } catch (erro) {
        console.error(erro);

        painelDOM.innerHTML =
            "Erro ao conectar com o radar. Verifique sua internet.";

    } finally {
        console.log("Processo finalizado (sucesso ou erro).");
    }
}

iniciarRadar();

/* 
=========================================================
RELATÓRIO DE CONECTIVIDADE (Async/Await & UX)
Auditores: [Kayo Motta]

1. Por que é impossível conectar um sistema na internet sem lidar com o "Assincronismo" (espera)? O que o "await" faz literalmente com a execução do código?
R: [ porque a internet não responde na hora. Quando fazemos uma requisição (tipo fetch), o sistema precisa esperar a resposta do servidor, e isso pode demorar.
O await serve para fazer o código “esperar” essa resposta antes de continuar a execução. Ele pausa a função até a Promise ser resolvida (ou seja, até os dados chegarem), evitando que o código continue sem ter os dados ainda.]

2. O que acontece com a Experiência do Usuário (UX) se não colocarmos uma mensagem de "Loading..." antes do fetch? 
R: [o usuário pode achar que o sistema travou ou que não está funcionando, isso acontece porque o sistema está esperando a resposta da internet, mas a tela fica parada sem mostrar nada. Então o usuário não sabe que algo está acontecendo em segundo plano, o que deixa a experiência ruim e confusa.]

3. Para que serve o bloco 'finally' em uma requisição de internet? Por que ele é o lugar perfeito para esconder a animação/texto de "Loading"?
R: [ O bloco finally serve para executar um código independente de dar certo ou errado na requisição, ele é o lugar ideal para esconder o "Loading..." porque ele sempre vai rodar no final, mesmo se der erro ou sucesso. Assim, garantimos que a mensagem de carregando seja removida da tela em qualquer situação.]
=========================================================
*/
