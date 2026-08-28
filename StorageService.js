class StorageService {

salvarVoo(voo) {
    localStorage.setItem("vooAtual", JSON.stringify(voo));

    console.log("Voo salvo no LocalStorage.");
}

carregarVoo() {
    const dados = localStorage.getItem("vooAtual");

    if (dados) {
        return JSON.parse(dados);
    }

    return null;
}

removerVoo() {
    localStorage.removeItem("vooAtual");

    console.log("Voo removido do LocalStorage.");
}

}

export default StorageService;