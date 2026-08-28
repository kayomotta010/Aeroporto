class PainelView {

constructor() {
    // Campos
    this.inputCodigo = document.getElementById("inputCodigo");
    this.inputOrigem = document.getElementById("inputOrigem");
    this.inputDestino = document.getElementById("inputDestino");

    // Botões
    this.btnRegistrar = document.getElementById("btnRegistrar");
    this.btnGastar = document.getElementById("btnGastar");
    this.btnAbastecer = document.getElementById("btnAbastecer");
    this.btnDecolar = document.getElementById("btnDecolar");
    this.btnPousar = document.getElementById("btnPousar");
    this.btnSuper = document.getElementById("btnSuper");

    // Textos da tela
    this.mensagemTela = document.getElementById("avisoSistema");
    this.tituloVoo = document.getElementById("tituloVoo");
    this.textoPainel = document.getElementById("painelCombustivel");
    this.barraCombustivel = document.getElementById("progressoCombustivel");

    this.displayStatus = document.getElementById("display-status");
    this.displayRota = document.getElementById("display-rota");
    this.displayAltitude = document.getElementById("display-altitude");
}

pegarDadosFormulario() {
    return {
        codigo: this.inputCodigo.value,
        origem: this.inputOrigem.value,
        destino: this.inputDestino.value
    };
}

limparFormulario() {
    this.inputCodigo.value = "";
    this.inputOrigem.value = "";
    this.inputDestino.value = "";
}

mostrarMensagem(mensagem) {
    this.mensagemTela.innerText = mensagem;
}

atualizarInterface(voo) {
    this.displayStatus.innerText = voo.status;

    this.displayRota.innerText =
        `${voo.origem} ➔ ${voo.destino}`;

    this.displayAltitude.innerText =
        voo.altitude;

    this.tituloVoo.innerText =
        `Abastecimento do Voo ${voo.codigo}`;

    this.textoPainel.innerText =
        `O tanque está em ${voo.combustivel}%`;

    this.barraCombustivel.style.width =
        `${voo.combustivel}%`;
}

habilitarControles(habilitar) {
    this.btnGastar.disabled = !habilitar;
    this.btnAbastecer.disabled = !habilitar;
    this.btnDecolar.disabled = !habilitar;
    this.btnPousar.disabled = !habilitar;
    this.btnSuper.disabled = !habilitar;
}

}

export default PainelView;