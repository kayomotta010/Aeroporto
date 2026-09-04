import Voo from "./Voo.js";
import StorageService from "./StorageService.js";
import PainelView from "./PainelView.js";
import AgenteIoTService from "./AgenteIoTService.js";

let meuVooAtual;
const frotaDeVoos = []; // Coleção de voos para o agente IoT monitorar

const storage = new StorageService();
const painel = new PainelView();

// Função callback enviada ao Agente IoT para redesenhar a tela
const renderizarPainel = () => {
    if (meuVooAtual) {
        painel.atualizarInterface(meuVooAtual);
    }
};

// Instanciando o Agente IoT Autônomo e iniciando a varredura
const agenteIoT = new AgenteIoTService(frotaDeVoos, renderizarPainel);
agenteIoT.iniciarMonitoramentoCorreto();

painel.habilitarControles(false);

// REGISTRAR VOO
painel.btnRegistrar.addEventListener("click", () => {
    const dados = painel.pegarDadosFormulario();

    if (!dados.codigo || !dados.origem || !dados.destino) {
        painel.mostrarMensagem("❌ Preencha todos os campos.");
        return;
    }

    if (dados.origem.toLowerCase() === dados.destino.toLowerCase()) {
        painel.mostrarMensagem("❌ A origem não pode ser igual ao destino.");
        return;
    }

    meuVooAtual = new Voo(dados.codigo, dados.origem, dados.destino);

    // Adiciona o voo à frota monitorada pelo Agente IoT
    frotaDeVoos.push(meuVooAtual);

    storage.salvarVoo(meuVooAtual);

    painel.mostrarMensagem("✅ Voo cadastrado! Agente IoT assumiu o monitoramento.");
    painel.habilitarControles(true);
    painel.atualizarInterface(meuVooAtual);
    painel.limparFormulario();
});

// GASTAR COMBUSTÍVEL
painel.btnGastar.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            meuVooAtual.gastar(10);
            storage.salvarVoo(meuVooAtual);
            painel.atualizarInterface(meuVooAtual);
        } catch (erro) {
            painel.mostrarMensagem("❌ " + erro.message);
        }
    }
});

// ABASTECER
painel.btnAbastecer.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            meuVooAtual.abastecer(10);
            storage.salvarVoo(meuVooAtual);
            painel.atualizarInterface(meuVooAtual);
        } catch (erro) {
            painel.mostrarMensagem("❌ " + erro.message);
        }
    }
});

// DECOLAR
painel.btnDecolar.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            meuVooAtual.decolar();
            storage.salvarVoo(meuVooAtual);
            painel.atualizarInterface(meuVooAtual);
            painel.mostrarMensagem("🛫 Voo decolando!");
        } catch (erro) {
            painel.mostrarMensagem("❌ " + erro.message);
        }
    }
});

// POUSAR
painel.btnPousar.addEventListener("click", () => {
    if (meuVooAtual) {
        meuVooAtual.pousar();
        storage.salvarVoo(meuVooAtual);
        painel.atualizarInterface(meuVooAtual);
        painel.mostrarMensagem("🛬 Voo pousando...");

        setTimeout(() => {
            storage.salvarVoo(meuVooAtual);
            painel.atualizarInterface(meuVooAtual);
            painel.mostrarMensagem("✅ Voo aterrissou!");
        }, 2100);
    }
});

// ATIVAR SUPERSÔNICO
painel.btnSuper.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            meuVooAtual.ativarSupersonico();
            storage.salvarVoo(meuVooAtual);
            painel.atualizarInterface(meuVooAtual);
            painel.mostrarMensagem("⚡ MODO SUPERSÔNICO ATIVADO!");
        } catch (erro) {
            painel.mostrarMensagem("❌ " + erro.message);
        }
    }
});