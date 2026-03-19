export default Passageiros;

class TorreControle {
    constructor(nome, altura){
        this.nome = nome;
        this.altura = altura;
        console.log(`Torre de controle ${this.nome} criada.`);
    }

    ConfirmarVoo(voo){
       if(voo){
            console.log(`Voo ${voo} confirmado pela torre de controle ${this.nome}.`);
        } else {
            console.log(`Voo não confirmado. Verifique as informações do voo.`);
        }
    }

    cancelarVoo(voo){
        if(voo){
            console.log(`Voo ${voo} cancelado pela torre de controle ${this.nome}.`);
        } else {
            console.log(`Voo não cancelado. Verifique as informações do voo.`);
        }
    }

    confirmarPouso(voo){
        if(voo){
            console.log(`Voo ${voo} confirmado para pouso pela torre de controle ${this.nome}.`);
        } else {
            console.log(`Voo não confirmado para pouso. Verifique as informações do voo.`);
        }
    }

    cancelarPouso(voo){
        if(voo){
            console.log(`Voo ${voo} cancelado para pouso pela torre de controle ${this.nome}.`);
        } else {
            console.log(`Voo não cancelado para pouso. Verifique as informações do voo.`);
        }
    }
}