export default class AgenteIoTService {
    constructor(frota, funcaoRenderizar) {
        this.frota = frota;
        this.renderizar = funcaoRenderizar; // Função que atualiza a tela/View
        this.intervalId = null;
    }

    iniciarMonitoramentoIncorreto() {
        console.log("Iniciando monitoramento...");
        console.log("O código com 'while (true)' travaria a Call Stack e congelaria a aba.");
    }

    // DESAFIO CONCLUÍDO: Assincronismo Temporal via Web APIs / Event Loop
    iniciarMonitoramentoCorreto() {
        console.log("🤖 Agente Autônomo IoT iniciado com sucesso!");

        this.intervalId = setInterval(() => {
            console.log("⏱️ Agente IoT: Varrendo frota de aeronaves...");

            this.frota.forEach(voo => {
                // Verifica a propriedade fictícia de contagem regressiva
                if (voo.tempoParaDecolagem > 0) {
                    voo.tempoParaDecolagem -= 1;
                    console.log(`Voo ${voo.codigo}: Falta(m) ${voo.tempoParaDecolagem}s para decolagem.`);
                } else if (voo.status !== "Decolado" && voo.status !== "Atrasado") {
                    voo.status = "Decolado";
                    console.log(`🚀 Voo ${voo.codigo} atualizado para Decolado!`);
                }
            });

            // Redesenha a View com as atualizações dos voos
            if (typeof this.renderizar === "function") {
                this.renderizar();
            }
        }, 5000); // 5000ms = 5 segundos
    }

    pararMonitoramento() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("🛑 Agente IoT desligado para evitar Memory Leak.");
        }
    }
}