/* RELATÓRIO DE AUDITORIA VIP
Auditor: [Kayo Malmsteen Gabriel Ferreira Motta]

1. Por que o código quebrou na linha do constructor do PassageiroVIP? O que faltava e para que serve?
R:porque quando utilizar Herança no JavaScript, a classe filha (PassageiroVIP) é obrigada a chamar o construtor da classe mãe antes de acessar ou modificar qualquer propriedade usando a palavra-chave 'this'. Faltava a função super(nome, cpfPassado). serve para enviar os dados básicos para a classe mãe se iniciar corretamente no sistema.

2. Por que o método exibirCredencial() deu erro de privacidade? Como resolvemos isso usando o conceito de Getter?
R: Deu erro porque atributos iniciados com '#' como o #cpf possuem escopo estrito de privacidade e pertencem exclusivamente à classe onde foram criados. Nem mesmo classes herdeiras podem acessá-los diretamente. Resolvemos isso removendo o '#' no acesso e chamando o método Getter público 'this.lerCpf', que foi projetado pela classe mãe para disponibilizar a leitura do dado de forma segura.

3. Por que a linha cliente1.#cpf = "000..." é considerada uma falha de segurança (Encapsulamento)?
R: É uma falha grave porque viola o começo do Encapsulamento, onde dados sensíveis e estruturais de um objeto (como o CPF de um passageiro) não devem ser expostos ou modificados diretamente por códigos externos. O JavaScript gera um erro de sintaxe imediato pra n deixar um agente externo corromper ou adulterar a integridade da informação.
*/

// ==========================================
// SISTEMA DE EMBARQUE VIP - CORRIGIDO E AUDITADO
// ==========================================

class Passageiro {
    #cpf;
    
    constructor(nome, cpfPassado) {
        this.nome = nome;
        this.#cpf = cpfPassado;
    }

   
    get lerCpf() {
        return this.#cpf;
    }
}

class PassageiroVIP extends Passageiro {
    constructor(nome, cpfPassado, categoriaLounge) {
        // CORREÇÃO 1: Invocando o construtor da classe mãe para permitir a herança
        super(nome, cpfPassado); 
        this.categoriaLounge = categoriaLounge; 
    }

    exibirCredencial() {
        // CORREÇÃO 2: Acessando o CPF através do Getter público 'this.lerCpf' em vez de '#cpf' direto
        console.log(`Passageiro VIP: ${this.nome} | CPF: ${this.lerCpf} | Lounge: ${this.categoriaLounge}`);
    }
}

try {
    console.log("Iniciando sistema de embarque VIP...");
    
    let cliente1 = new PassageiroVIP("Ana Souza", "111.222.333-44", "Diamante");
    
    // CORREÇÃO 3: A linha ilegal 'cliente1.#cpf = "000..."' foi removida.
    
    cliente1.exibirCredencial();

} catch (erro) {
    console.error("ALERTA CRÍTICO NO PORTÃO DE EMBARQUE:", erro.message);
}