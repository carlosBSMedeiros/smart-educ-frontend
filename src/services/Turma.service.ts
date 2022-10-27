import http from '../utils/requests';
import {Turma} from '../types/turma';

export function incluirTurma(novaturma: Turma){
    return http.post(`/turma`, novaturma)
}

export function alterarTurma(turmaAlt: Turma){
    return http.put(`/turma`, turmaAlt)
}

export function excluirTurma(idturma: string, idProf: string){
    return http.delete(`/turma/${idturma}/professor/${idProf}`)
}

export function recuperaTurmasIdProfessor(idProfessor:string){
    var idProf = idProfessor;
    return http.get(`/turma/professor/${idProf}`)
}

export function recuperarPorId(id:string){
    return http.get(`/turma/${id}`)
}

export function validarTurma(turma: Turma){

    var erros: string[] = []
    if(!turma){
        erros.push('A turma não é válida!')
    }

    if(turma.codigo.trim() === ''){
        erros.push('O Código da turma não pode ser nulo') 
    }

    let idSerie = turma.idSerie
    if(idSerie === 99){
        erros.push('Você deve selecionar uma Série válida para a turma!')
    }

    return erros
}