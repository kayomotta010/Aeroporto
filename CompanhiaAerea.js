class CompanhiaAerea {
constructor(nome, codigo) {
this.nome = nome;
this.codigo = codigo;
}

realizarEmbarque(passageiro) {
    if (passageiro.estaNoEmbarque) {
        console.log(`Passageiro ${passageiro.nome} embarcou no voo da companhia ${this.nome}.`);
    }
}

atualizarCodigo(novoCodigo) {
    this.codigo = novoCodigo;
    console.log(`Código atualizado para: ${this.codigo}`);
}

statusVoo() {
    console.log(`A companhia ${this.nome} com código ${this.codigo} está operando normalmente.`);
}

}

export default CompanhiaAerea;