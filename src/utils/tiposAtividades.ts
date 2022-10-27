import { TipoAtividade } from "../types/atividade";

export function getTipoAtividadeCompleto(abrev:string){

    var infos:TipoAtividade={
        nome: 'Texto',
        descricao: 'Atividade textual. Pode ser um texto, um link externo, um documento, etc'
    }

    if(abrev.toUpperCase() === 'QUEST'){
        infos.nome = 'Questionário'
        infos.descricao = 'Questionário interativo construído pelo professor'
    } else if (abrev.toUpperCase() === 'TRILHA'){
        infos.nome = 'Trilha'
        infos.descricao = 'Trilha de aprendizado com outras atividades'
    } 
     
    return infos
}