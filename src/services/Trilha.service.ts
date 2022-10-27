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

export function recuperarPorId(id:string){
    return http.get(`/trilha/${id}`)
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
    if(trilha.ordem === 99 || trilha.ordem===null){
        erros.push('ordem deve ser preenchido')
    }

    let idMateriatrim = trilha.idMateria.trim()
    if(idMateriatrim === '99' || idMateriatrim === '' ){
        erros.push('Você deve selecionar uma Matéria válida para a trilha!')
    }

    return erros
}