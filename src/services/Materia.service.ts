
import { Materia } from '../types/materia';
import http from '../utils/requests';

export async function incluirMateria(novamateria: Materia){
    return await http.post('/materia', novamateria)
}

export async function alterarMateria(materiaAlt: Materia){
    return await http.put('/materia', materiaAlt)
}

export function excluirMateria(idmateria: string){
    return http.delete(`/materia/${idmateria}`)
}

export async function  recuperarMateriasIdProfessor(idProfessor:string){
    var idProf = idProfessor;
    return await http.get(`/materia/professor/${idProf}`)
}

export function recuperarPorId(id:string){
    return http.get(`/materia/${id}`)
}

export function validarMateria(materia: Materia){

    var erros: string[] = []
    if(!materia){
        erros.push('cadastrdo inválido!')
    }

    if(materia.nome.trim() === ''){
        erros.push('Nome precisa ser preenchido') 
    }

    let idSerie = materia.idSerie
    if(idSerie === 99 ){
        erros.push('Você deve selecionar uma série!')
    }

    return erros
}