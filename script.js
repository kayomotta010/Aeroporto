class Voo {
    constructor(codigo, origem, destino, altitude) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.altitude = altitude;
        this.status = "No Pátio";
        this.elementoAviao = document.getElementById('aviao'); // Referência direta ao avião
    }

    atualizarStatus() {
        document.getElementById('display-codigo').innerText = this.codigo;
        document.getElementById('display-rota').innerText = `${this.origem} -> ${this.destino}`;
        document.getElementById('display-status').innerText = this.status;
        document.getElementById('display-altitude').innerText = this.altitude;
    }

    decolar() {
        if (this.status !== "Em voo") {
            this.status = "Em voo";
            this.altitude = 35000;
            
            // Aplica a classe de decolagem (vai para a direita)
            this.elementoAviao.classList.remove('pre-pouso');
            this.elementoAviao.classList.add('decolado');
            
            this.atualizarStatus();
        }
    }

    pousar() {
        if (this.status === "Em voo") {
            this.status = "Pousando...";
            this.altitude = 5000;
            this.atualizarStatus();

            // PASSO 1: Teletransportar para a esquerda (invisível para o usuário)
            this.elementoAviao.classList.add('pre-pouso');

            // PASSO 2: Usar um pequeno delay para o navegador processar o teletransporte
            // antes de iniciar a animação de pouso
            setTimeout(() => {
                this.status = "Aterrissado";
                this.altitude = 0;
                
                // Remove as classes de voo para ele voltar à posição original (left: 10px)
                this.elementoAviao.classList.remove('decolado');
                this.elementoAviao.classList.remove('pre-pouso');
                
                this.atualizarStatus();
            }, 100); // 100 milissegundos é suficiente
        }
    }
}

// Inicialização
const meuVoo = new Voo("AD123", "São Paulo", "Lisboa", 0);
meuVoo.atualizarStatus();

// Funções dos botões
function comandarDecolagem() {
    meuVoo.decolar();
}

function comandarPouso() {
    meuVoo.pousar();
}