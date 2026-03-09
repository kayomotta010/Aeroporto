// CLASSE MÃE
class Voo {
    constructor(codigo, origem, destino, altitude) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.altitude = altitude;
        this.status = "No Pátio";
        this.elementoAviao = document.getElementById('aviao');
    }

    atualizarStatus() {
        document.getElementById('display-codigo').innerText = this.codigo;
        document.getElementById('display-rota').innerText = `${this.origem} -> ${this.destino}`;
        document.getElementById('display-status').innerText = this.status;
        document.getElementById('display-altitude').innerText = this.altitude;
    }

    decolar() {
        if (this.status !== "Em voo" && this.status !== "Supersônico") {
            this.status = "Em voo";
            this.altitude = 35000;
            this.elementoAviao.classList.remove('pre-pouso');
            this.elementoAviao.classList.add('decolado');
            this.atualizarStatus();
        }
    }

    pousar() {
        if (this.status === "Em voo" || this.status === "Supersônico") {
            this.status = "Pousando...";
            this.altitude = 5000;
            this.atualizarStatus();

            // Passo 1: Leva o avião para a "esquerda" invisivelmente
            this.elementoAviao.classList.add('pre-pouso');

            // Passo 2: Sincroniza com o CSS (2.1 segundos)
            setTimeout(() => {
                this.status = "Aterrissado";
                this.altitude = 0;
                this.elementoAviao.classList.remove('decolado');
                this.elementoAviao.classList.remove('pre-pouso');
                this.atualizarStatus();
            }, 2100); 
        }
    }
}

// SUBCLASSE JATO
class JatoExecutivo extends Voo {
    constructor(codigo, origem, destino, altitude) {
        super(codigo, origem, destino, altitude);
        this.modoSupersonico = false;
    }

    ativarSupersonico() {
        if (this.status === "Em voo") {
            this.modoSupersonico = true;
            this.status = "Supersônico";
            this.altitude = 60000;
            this.atualizarStatus();
            alert("⚠️ MODO SUPERSONICO ATIVADO!");
        } else {
            alert("O jato precisa estar voando para ativar o modo supersônico.");
        }
    }
}

// SUBCLASSE CARGA
class VooCarga extends Voo {
    constructor(codigo, origem, destino, altitude, capacidade) {
        super(codigo, origem, destino, altitude);
        this.capacidadeMaxima = capacidade;
        this.cargaAtual = 0;
    }

    embarcarCarga(peso) {
        if (this.status === "No Pátio" || this.status === "Aterrissado") {
            if (this.cargaAtual + peso <= this.capacidadeMaxima) {
                this.cargaAtual += peso;
                alert(`Sucesso! Carga atual: ${this.cargaAtual}kg`);
                this.atualizarStatus();
            } else {
                alert("Erro: Peso excede a capacidade!");
            }
        } else {
            alert("Pouse para carregar o avião.");
        }
    }
}

// --- INICIALIZAÇÃO ÚNICA (Apenas um objeto) ---
// Se quiser testar o cargueiro, troque para: new VooCarga("CARGO-1", "SP", "RJ", 0, 5000)
const meuVoo = new JatoExecutivo("JATO-77", "São Paulo", "Nova York", 0);
meuVoo.atualizarStatus();

// --- FUNÇÕES DOS BOTÕES ---
function comandarDecolagem() { meuVoo.decolar(); }
function comandarPouso() { meuVoo.pousar(); }

function ativarSuper() {
    if (meuVoo instanceof JatoExecutivo) {
        meuVoo.ativarSupersonico();
    } else {
        alert("Aeronave atual não é um jato.");
    }
}

function carregarAviao() {
    if (meuVoo instanceof VooCarga) {
        const peso = Number(prompt("Quantos KG deseja carregar?"));
        meuVoo.embarcarCarga(peso);
    } else {
        alert("Aeronave atual não é de carga.");
    }
}