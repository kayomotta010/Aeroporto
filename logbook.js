
class Voo {
    constructor(codigo, origem) {
        this.codigo = codigo;
        this.origem = origem;
        this.status = "No Solo";
    }

    decolar() {
        this.status = "Em Voo";
        console.log(`🛫 O voo ${this.codigo} acabou de decolar de ${this.origem}!`);
    }
}

console.log("=== SALVANDO O VOO NO DISCO ===");

let vooOriginal = new Voo("G3-777", "Curitiba");

console.log("Teste antes de salvar:");
vooOriginal.decolar();

localStorage.setItem("meuLogbook", JSON.stringify(vooOriginal));

console.log("Voo salvo com sucesso no LocalStorage!");

console.log("\n=== LENDO O VOO NO DIA SEGUINTE ===");

let dadosDoDisco = localStorage.getItem("meuLogbook");

let vooRecuperado = JSON.parse(dadosDoDisco);

console.log("Dados recuperados:", vooRecuperado);
console.log("Código:", vooRecuperado.codigo);

let vooHidratado = new Voo(
    vooRecuperado.codigo,
    vooRecuperado.origem
);

vooHidratado.status = vooRecuperado.status;

console.log("\nObjeto re-hidratado:");
console.log(vooHidratado);

console.log("Tentando decolar o voo re-hidratado...");
vooHidratado.decolar();

console.log("Status atual:", vooHidratado.status);