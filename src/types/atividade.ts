export type Atividade = {
    id: string,
    idTrilha: string,
    idTrilhaAtividade: string,
    idBancoQuestao: string,
    tipoAtividade: string,
    contudoTexto: string,
    iframe:string,
    enunciado:string,
    titulo:string,
    concluida: string,
    ordem:number,
    quantConcluido:number
}

export type TipoAtividade = {
    nome: string,
    descricao: string
}

export type AtividadeAluno = {
    id:string,
    titulo:string,
    idTrilhaAtividade:string,
    idBancoQuestao:string,
    ordem:number,
    enunciado:string,
    tipoAtividade:string,
    conteudoTexto:string,
    concluida:boolean
}