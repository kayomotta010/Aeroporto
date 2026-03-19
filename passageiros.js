class Passageiros {
    constructor(nome, cpf, dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.estaNoEmbarque = false;
    }

    realizarCheckInSeguranca() {
        this.estaNoEmbarque = true;
        console.log(`Passageiro ${this.nome} passou pelo Raio-x e está na área de embarque.`);
    }

    corrigirNome(novoNome) {
        this.nome = novoNome;
        console.log(`Nome atualizado para: ${this.nome}`);
    }
}