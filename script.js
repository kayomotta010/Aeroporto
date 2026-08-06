// =======================================================
// LÓGICA DE COMBUSTÍVEL (Antigo voo.js)
// =======================================================
class VooSeguro {
    #codigo;
    #combustivel;

    constructor(codigoPassado, origemPassada, destinoPassada) {
        // Validação de Dados (Bomba-Relógio)
        if (origemPassada.trim().toLowerCase() === destinoPassada.trim().toLowerCase()) {
            throw new Error(`Operação Negada: O voo não pode ter a origem igual ao destino!`);
        }
        if (codigoPassado.trim() === "") {
            throw new Error("Erro de Segurança: Todo voo precisa de um código.");
        }

        this.#codigo = codigoPassado;
        this.origem = origemPassada;
        this.destino = destinoPassada;
        this.#combustivel = 100; // Tanque inicia cheio
    }

    get codigo() { return this.#codigo; }
    get combustivel() { return this.#combustivel; }

    get lerCombustivel() {
        return `O tanque do voo ${this.#codigo} está em ${this.#combustivel}%`;
    }

    abastecer(quantidade) {
        if (quantidade < 0) throw new Error("Erro: Não é possível tirar combustível por aqui!");
        if (this.#combustivel + quantidade > 100) throw new Error("Erro: O tanque vai transbordar! Limite é 100%.");
        this.#combustivel += quantidade;
    }

    gastar(quantidade) {
        if (quantidade < 0) throw new Error("Erro: Digite um valor positivo para gastar.");
        if (this.#combustivel - quantidade < 0) throw new Error("Erro crítico: Combustível insuficiente para realizar a manobra!");
        this.#combustivel -= quantidade;
    }
}


// =======================================================
// LÓGICA DE TORRE E ANIMAÇÃO (Antigo script.js integrado)
// =======================================================
class AeronaveIntegrada extends VooSeguro {
    constructor(codigo, origem, destino) {
        super(codigo, origem, destino); // Chama a validação da classe pai
        this.status = "No Pátio";
        this.altitude = 0;
        this.elementoAviao = document.getElementById('aviao');
    }

    atualizarPainelTorre() {
        document.getElementById('display-status').innerText = this.status;
        document.getElementById('display-rota').innerText = `${this.origem} ➔ ${this.destino}`;
        document.getElementById('display-altitude').innerText = this.altitude;
    }

    decolar() {
        if (this.status !== "Em voo" && this.status !== "Supersônico") {
            // A decolagem consome combustível automaticamente!
            this.gastar(15); 
            
            this.status = "Em voo";
            this.altitude = 35000;
            this.elementoAviao.classList.remove('pre-pouso');
            this.elementoAviao.classList.add('decolado');
            this.atualizarPainelTorre();
            return true;
        }
        return false;
    }

    pousar() {
        if (this.status === "Em voo" || this.status === "Supersônico") {
            this.status = "Pousando...";
            this.altitude = 5000;
            this.atualizarPainelTorre();

            this.elementoAviao.classList.add('pre-pouso');

            setTimeout(() => {
                this.status = "Aterrissado";
                this.altitude = 0;
                this.elementoAviao.classList.remove('decolado');
                this.elementoAviao.classList.remove('pre-pouso');
                this.atualizarPainelTorre();
            }, 2100);
        }
    }

    ativarSupersonico() {
        if (this.status === "Em voo") {
            // O supersônico gasta muito combustível de uma vez
            this.gastar(25);
            
            this.status = "Supersônico";
            this.altitude = 60000;
            this.atualizarPainelTorre();
            alert("⚠️ MODO SUPERSÔNICO ATIVADO! Consumo extremo de combustível detectado!");
            return true;
        } else {
            alert("Aeronave precisa estar estabilizada em voo para ativar o supersônico.");
            return false;
        }
    }
}


// =======================================================
// INTEGRAÇÃO COM A INTERFACE HTML (DOM)
// =======================================================
let meuVooAtual;

// Capturando elementos do Painel de Registro
const inputCodigo = document.getElementById("inputCodigo");
const inputOrigem = document.getElementById("inputOrigem");
const inputDestino = document.getElementById("inputDestino");
const btnRegistrar = document.getElementById("btnRegistrar");
const mensagemTela = document.getElementById("avisoSistema");

// Capturando elementos do Painel de Combustível e Torre
const tituloVoo = document.getElementById("tituloVoo");
const textoPainel = document.getElementById("painelCombustivel");
const barraCombustivel = document.getElementById("progressoCombustivel");

const btnGastar = document.getElementById("btnGastar");
const btnAbastecer = document.getElementById("btnAbastecer");
const btnDecolar = document.getElementById("btnDecolar");
const btnPousar = document.getElementById("btnPousar");
const btnSuper = document.getElementById("btnSuper");

// Função para sincronizar a barra de combustível visualmente
function atualizarInterfaceGrafica() {
    if (meuVooAtual) {
        textoPainel.innerText = meuVooAtual.lerCombustivel;
        barraCombustivel.style.width = `${meuVooAtual.combustivel}%`;
        
        // Cores dinâmicas na barra de combustível
        if (meuVooAtual.combustivel > 50) {
            barraCombustivel.style.backgroundColor = '#10b981'; // Verde
            barraCombustivel.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.5)';
        } else if (meuVooAtual.combustivel > 20) {
            barraCombustivel.style.backgroundColor = '#f59e0b'; // Laranja
            barraCombustivel.style.boxShadow = '0 0 10px rgba(245, 158, 11, 0.5)';
        } else {
            barraCombustivel.style.backgroundColor = '#ef4444'; // Vermelho
            barraCombustivel.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)';
        }
    }
}

function habilitarControles(habilitar) {
    btnGastar.disabled = !habilitar;
    btnAbastecer.disabled = !habilitar;
    btnDecolar.disabled = !habilitar;
    btnPousar.disabled = !habilitar;
    btnSuper.disabled = !habilitar;
}

// Evento: Registrar Voo (Junta a segurança com a animação)
btnRegistrar.addEventListener("click", () => {
    try {
        // Tenta instanciar a classe Integrada (Valida dados na hora)
        meuVooAtual = new AeronaveIntegrada(inputCodigo.value, inputOrigem.value, inputDestino.value);
        
        mensagemTela.innerText = "✅ Voo cadastrado e liberado pela Torre!";
        mensagemTela.style.color = "#10b981"; // Verde sucesso
        tituloVoo.innerText = `Abastecimento do Voo ${meuVooAtual.codigo}`;
        
        // Atualiza ambas as áreas da tela
        meuVooAtual.atualizarPainelTorre();
        atualizarInterfaceGrafica();
        habilitarControles(true);

    } catch (erro) {
        // Se a validação falhar (ex: mesma origem/destino), bloqueia tudo
        mensagemTela.innerText = "❌ " + erro.message;
        mensagemTela.style.color = "#ef4444"; // Vermelho erro
        meuVooAtual = undefined;
        habilitarControles(false);
    }
});

// Eventos de Combustível Manual
btnGastar.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            meuVooAtual.gastar(10);
            atualizarInterfaceGrafica();
        } catch(e) { alert(e.message); }
    }
});

btnAbastecer.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            // Regra extra: Só pode abastecer se não estiver voando
            if (meuVooAtual.status === "Em voo" || meuVooAtual.status === "Supersônico") {
                throw new Error("Operação suicida: Não é possível reabastecer a aeronave em pleno voo!");
            }
            meuVooAtual.abastecer(10);
            atualizarInterfaceGrafica();
        } catch(e) { alert(e.message); }
    }
});

// Eventos da Pista de Decolagem
btnDecolar.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            // Tenta decolar (o decolar agora consome 15% de combustível!)
            if(meuVooAtual.decolar()) {
                atualizarInterfaceGrafica();
            }
        } catch(e) { alert(e.message); } // Exibe alerta se não tiver combustível para decolar
    }
});

btnPousar.addEventListener("click", () => {
    if (meuVooAtual) meuVooAtual.pousar();
});

btnSuper.addEventListener("click", () => {
    if (meuVooAtual) {
        try {
            // Ativar supersônico consome 25% de combustível!
            if(meuVooAtual.ativarSupersonico()){
                atualizarInterfaceGrafica();
            }
        } catch(e) { alert(e.message); }
    }
});
