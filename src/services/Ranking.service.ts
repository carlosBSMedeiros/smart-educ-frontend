
import http from '../utils/requests';

export async function ListAllByTurma(idTurma:string){
    return await http.get(`/ranking/turma/${idTurma}`)
}

export async function getById(id:number){
    return await http.get(`/ranking/${id}`)
}

export async function recuperarRankingAtividade(idAtividade:string){
    return await http.get(`/ranking/atividade/${idAtividade}`)
}

export async function recuperarRankingTrilha(idTrilha:string){
    return await http.get(`/ranking/trilha/${idTrilha}`)
}