class Voo {
constructor(codigo, origem, destino, altitude = 0) {
this.codigo = codigo;
this.origem = origem;
this.destino = destino;
this.altitude = altitude;

    this.status = "No Pátio";
    this.combustivel = 100;
}

decolar() {
    if (this.status !== "Em voo") {
        if (this.combustivel < 15) {
            throw new Error("Combustível insuficiente para decolar.");
        }

        this.combustivel -= 15;
        this.status = "Em voo";
        this.altitude = 35000;

        console.log(`Aeronave ${this.codigo} decolou.`);
    }
}

pousar() {
    if (this.status === "Em voo" || this.status === "Supersônico") {
        this.status = "Pousando...";
        this.altitude = 5000;

        console.log(`Aeronave ${this.codigo} está pousando.`);

        setTimeout(() => {
            this.status = "Aterrissado";
            this.altitude = 0;

            console.log(`Aeronave ${this.codigo} aterrissou.`);
        }, 2000);
    }
}

gastar(quantidade) {
    if (this.combustivel - quantidade < 0) {
        throw new Error("Combustível insuficiente.");
    }

    this.combustivel -= quantidade;
}

abastecer(quantidade) {
    if (this.combustivel + quantidade > 100) {
        throw new Error("O tanque não pode passar de 100%.");
    }

    if (this.status === "Em voo" || this.status === "Supersônico") {
        throw new Error("Não é possível abastecer durante o voo.");
    }

    this.combustivel += quantidade;
}

ativarSupersonico() {
    if (this.status !== "Em voo") {
        throw new Error("A aeronave precisa estar em voo.");
    }

    if (this.combustivel < 25) {
        throw new Error("Combustível insuficiente para o modo Supersônico.");
    }

    this.combustivel -= 25;
    this.status = "Supersônico";
    this.altitude = 60000;

    console.log("Modo Supersônico ativado!");
}

}

// ARQUIVO: Voo.js
export default class Voo {
    constructor(codigo, origem, destino, tempoParaDecolagem = 3) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.status = "No Solo";
        this.altitude = 0;
        this.combustivel = 100;
        
        // Atributo temporal para o robô IoT monitorar (em ciclos de 5s)
        this.tempoParaDecolagem = tempoParaDecolagem; 
    }

    gastar(quantidade) {
        if (this.combustivel - quantidade < 0) throw new Error("Combustível insuficiente.");
        this.combustivel -= quantidade;
    }

    abastecer(quantidade) {
        if (this.combustivel + quantidade > 100) throw new Error("Tanque cheio.");
        this.combustivel += quantidade;
    }

    decolar() {
        if (this.combustivel < 15) throw new Error("Combustível baixo para decolar.");
        this.status = "Em voo";
        this.altitude = 35000;
        this.combustivel -= 15;
    }

    pousar() {
        this.status = "Pousando...";
        this.altitude = 5000;
        setTimeout(() => {
            this.status = "Aterrissado";
            this.altitude = 0;
        }, 2000);
    }

    ativarSupersonico() {
        if (this.status !== "Em voo") throw new Error("Aeronave deve estar em voo.");
        this.status = "Supersônico";
        this.altitude = 60000;
        this.combustivel -= 25;
    }
}

export default Voo;