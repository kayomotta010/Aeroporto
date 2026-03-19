export default Passageiros;

class Aeronave {
    constructor(codigo, origem, destino, altitude) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.altitude = altitude;
        this.status = "No Pátio";
    }

    decolar(){
        if(this.status !== "Em voo");
        this.status = "Em voo";
        this.altitude = 35000;
        console.log(`A aeronave ${this.codigo} decolou. status: ${this.status}, altitude: ${this.altitude} pés.`);
    }

    pousar(){
        if(this.status === "Em voo"){
            this.status = "Pousando...";
            this. altitude = 5000;
            console.log(`A aeronave ${this.codigo} está pousando. status: ${this.status}, altitude: ${this.altitude} pés.`);
            setTimeout(() => {
                this.status = "Aterrissado";
                this.altitude = 0;
                console.log(`A aeronave ${this.codigo} aterrissou. status: ${this.status}, altitude: ${this.altitude} pés.`);
            }, 2000);
        }
    }

    corrigirDestino(novoDestino){
        this.destino = novoDestino;
        console.log(`Destino atualizado para: ${this.destino}`);
    }
}