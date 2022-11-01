import http from '../utils/requests';
import {AlunoTurma} from '../types/AlunoTurma';
import { ReqAlunoTurma } from '../types/ReqAlunoTurma';

export function incluirAlunoTurma(novaturma: ReqAlunoTurma){
    return http.post(`/alunoTurma`, novaturma)
}

export function alterarAlunoTurma(turmaAlt: AlunoTurma){
    return http.put(`/alunoTurma`, turmaAlt)
}

export function excluirAlunoTurma(idAlunoTurma: string){
    return http.delete(`/alunoTurma/${idAlunoTurma}`)
}

export function recuperaTurmasIdAluno(idAluno: string){
    return http.get(`/alunoTurma/aluno/${idAluno}`)
}

export function recuperarPorId(id: string){
    return http.get(`/alunoTurma/${id}`)
}

export function validarAlunoTurma(turma: AlunoTurma){

    var erros: string[] = []
    if(!turma){
        erros.push('A turma não é válida!')
    }

    if(turma.codigoTurma.trim() === ''){
        erros.push('O Código da turma não pode ser nulo') 
    }

    return erros
}