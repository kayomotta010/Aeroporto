export default Passageiros;

class PortaoEmbarque {
    constructor(numero, voo){
        this.numero = numero;
        this.voo = voo;
        console.log(`Portão de embarque ${this.numero} para o voo ${this.voo} criado.`);
    }

    embarcar(passageiro){
        if(passageiro.status === "Confirmada"){
            console.log(`Passageiro ${passageiro.nome} embarcando no voo ${this.voo} pelo portão ${this.numero}.`);
        } else {
            console.log(`Passageiro ${passageiro.nome} não pode embarcar. Status da passagem: ${passageiro.status}`);
        }
    }

    desembarcar(passageiro){
        if(passageiro.status === "Confirmada"){
            console.log(`Passageiro ${passageiro.nome} desembarcando do voo ${this.voo} pelo portão ${this.numero}.`);
        } else {
            console.log(`Passageiro ${passageiro.nome} não pode desembarcar. Status da passagem: ${passageiro.status}`);
    }
    }
}