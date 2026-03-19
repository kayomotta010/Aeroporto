export default Passageiros;

class Passagem {
    constructor(numero, classe, preço) {
        this.numero = numero;
        this.classe = classe;
        this.preço = preço;
        this.status = "Reservada";
    }

    confirmarReserva() {
        if (this.status === "Reservada") {
            this.status = "Confirmada";
            console.log(`Passagem número ${this.numero} confirmada. status: ${this.status}`);
        }
    }

    cancelarReserva(){
        if(this.status === "Reservada")
           this.status = "Cancelada";
           console.log(`Passagem número ${this.numero} cancelada. status: ${this.status}`);
    }

    corrigirPreço(novoPreço){
        this.preço = novoPreço;
        console.log(`Preço atualizado para: R$ ${this.preço}`);
    }
}