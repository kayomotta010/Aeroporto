export default Passageiros;

class Bagagem {
    constructor(peso, tipo){
        this.peso = peso;
        this.tipo = tipo;
        this.status = "No Check-in";
    }
    despachar(){
        if(thia.status === "No Check-in"){
            this.status = "Despachada";
            console.log(`Bagagem do tipo ${this.tipo} com peso ${this.peso} kg foi despachada. status: ${this.status}.`);
            setTimeout (() => {
                this.status = "Em Trânsito";
                console.log(`Bagaem do tipo ${this.tipo} com peso ${this.peso} kg está em trânsito. status: ${this.status}.`);
            }, 2000);
        }
    }
    entregar(){
        if(this.status === "Em Trânsito"){
            this.status = "Entregue";
            console.log(`Bagagem do tipo ${this.tipo} com peso ${this.peso} kg foi entregue. status: ${this.status}.`);
        }
    }

    corrigirPeso(novoPeso){
        this.peso = novoPeso;
        console.log(`Peso atualizado para: ${this.peso} kg`);
    }
}