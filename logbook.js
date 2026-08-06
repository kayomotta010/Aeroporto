/* 
=========================================================
RELATÓRIO DE AUDITORIA (SERIALIZAÇÃO E RE-HIDRATAÇÃO)

Auditores: [Seu Nome] e [Nome do colega]

1. Por que o formato JSON (JSON.stringify) não consegue salvar "métodos" (funções) de uma classe, salvando apenas os "atributos" (dados textuais)?
R: Porque o JSON foi criado para guardar apenas dados, como textos, números e valores. Os métodos são funções e não fazem parte do formato JSON, por isso eles não são salvos.

2. O que o JavaScript perde na memória quando converte um Objeto para JSON? (Explique o que é o Prototype).
R: O JavaScript perde o Prototype do objeto. O Prototype é onde ficam os métodos da classe. Quando o objeto é convertido para JSON, ele volta apenas com os dados, sem os métodos.

3. Defina o que é "Re-hidratar um Objeto". Como nós consertamos o código do Júnior aplicando essa técnica?
R: Re-hidratar um objeto é criar uma nova instância da classe usando o comando new e copiar os dados que estavam no JSON para ela. Assim o objeto volta a ter os métodos da classe e funciona normalmente.
=========================================================
*/

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