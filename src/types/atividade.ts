export type Atividade = {
    id: string,
    titulo: string,
    idTrilha: string,
    idTrilhaAtividade: string,
    idBancoQuestao: string,
    tipoAtividade: string,
    contudoTexto: string,
    concluida: boolean,
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
    concluida:string
}