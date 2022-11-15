class TrilhaAluno {

    id: string;
    titulo: string;
    descricao: string;
    nomeMateria: string;
    quantAtividade: number;
    quantConcluido: number;
    concluida: boolean;
    atividadesTrilhaDTOs: AtividadeAluno[]

    constructor(data: any) {
        this.id = data.id;
        this.titulo = data.titulo;
        this.descricao = data.descricao;
        this.nomeMateria = data.nomeMateria;
        this.quantAtividade = data.quantAtividade;
        this.quantConcluido = data.quantConcluido;
        this.concluida = data.concluida;
        this.atividadesTrilhaDTOs = [];
    }

}

class AtividadeAluno {

    id: string;
    titulo: string;
    idTrilhaAtividade: string;
    idBancoQuestao: string;
    ordem: number;
    enunciado: string;
    tipoAtividade: string;
    conteudoTexto: string;
    concluida: boolean;
    _proximaConc: boolean;
    _anteriorConc: boolean;

    constructor(data:any, prox:boolean, ant:boolean) {
        this.id = data.id
        this.titulo = data.titulo
        this.idTrilhaAtividade = data.idTrilhaAtividade
        this.idBancoQuestao = data.idBancoQuestao
        this.ordem = data.ordem
        this.enunciado = data.enunciado
        this.tipoAtividade = data.tipoAtividade
        this.conteudoTexto = data.conteudoTexto
        this.concluida = data.concluida
        this._proximaConc = prox;
        this._anteriorConc = ant;
    }

    public set setProxima(prox:boolean){
        this._proximaConc = prox;
    }

    public get getProxima(){
        return this._proximaConc;
    }

    public set setAnterior(ant:boolean){
        this._anteriorConc = ant;
    }

    public get getAnterior(){
        return this._anteriorConc;
    }

}

export { TrilhaAluno, AtividadeAluno }