export type Atividade = {
    id: string,
    titulo: string,
    idTrilha: string,
    idTrilhaAtividade: string,
    idBancoQuestao: string,
    tipoAtividade: string,
    contudoTexto: string,
    concluida: string,
    quantConcluido:number
}

export type TipoAtividade = {
    nome: string,
    descricao: string
}