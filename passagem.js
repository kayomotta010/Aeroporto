class Passagem {
constructor(numero, classe, preco) {
this.numero = numero;
this.classe = classe;
this.preco = preco;
this.status = "Reservada";
}

confirmarReserva() {
    if (this.status === "Reservada") {
        this.status = "Confirmada";
        console.log(`Passagem número ${this.numero} confirmada. status: ${this.status}`);
    }
}

cancelarReserva() {
    if (this.status === "Reservada") {
        this.status = "Cancelada";
        console.log(`Passagem número ${this.numero} cancelada. status: ${this.status}`);
    }
}

corrigirPreco(novoPreco) {
    this.preco = novoPreco;
    console.log(`Preço atualizado para: R$ ${this.preco}`);
}

}

export default Passagem;