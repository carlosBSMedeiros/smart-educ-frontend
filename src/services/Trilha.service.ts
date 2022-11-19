import http from '../utils/requests';
import {TrilhaRequest} from '../types/trilha'

export function incluirTrilha(novaTrilha: TrilhaRequest){
    return http.post(`/trilha`, novaTrilha)
}

export function alterarTrilha(trilhaAlt: TrilhaRequest){
    return http.put(`/trilha`, trilhaAlt)
}

export function excluirTrilha(idtrilha: string){
    return http.delete(`/trilha/${idtrilha}`)
}

export function recuperarTrilhasIdProfessor(idProfessor:string){
    return http.get(`/trilha/professor/${idProfessor}`)
}

export function recuperarTrilhasAluno(idAluno:string){
    return http.get(`/trilha/all/${idAluno}`)
}

export function recuperarPorId(id:string){
    return http.get(`/trilha/${id}`)
}

export function recuperarParaAluno(idTrilha:string, idAluno:string){
    return http.get(`/trilha/aluno/${idAluno}/trilha/${idTrilha}`)
}

export function validarTrilha(trilha: TrilhaRequest){

    var erros: string[] = []
    if(!trilha){
        erros.push('A trilha não é válida!')
    }

    if(trilha.titulo.trim() === ''){
        erros.push('O título da trilha não pode ser nulo') 
    }
    if(trilha.descricao.trim() === ''){
        erros.push('Descrição da trilha não pode ser Nula')
    }

    let idMateriatrim = trilha.idMateria.trim()
    if(idMateriatrim === '99' || idMateriatrim === '' ){
        erros.push('Você deve selecionar uma Matéria válida para a trilha!')
    }

    return erros
}