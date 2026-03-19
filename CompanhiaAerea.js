export default Passageiros;

class CampanhiaAerea {
    constructor(nome,codigo){
        this.nome = nome;
        this.codigo = codigo;
    }

    realizarEmbarque(passageiros){
        if(passageiros.estaNoEmbarque){
            console.log(`Passageiro ${passageiros.nome} embarcou no voo da campanhia ${this.nome}.`);
        }
    };
    atualizarCodigo(novoCodigo){
        this.codigo = novoCodigo;
        console.log(`Código atualizado para: ${this.codigo}`);
    }
    statusVoo(){
        console.log(`A campanhia ${this.nome} com código ${this.codigo} está operando normalmente.`);
    }
}