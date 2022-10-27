import http from '../utils/requests';
import {BancoQuestao} from '../types/bancoQuestao'

export async function incluirBancoQuestao(novaBancoQuestao: BancoQuestao){
    return await http.post('/bancoQuestao', novaBancoQuestao)
}

export async function alterarBancoQuestao(BancoQuestaoAlt: BancoQuestao){
    return await http.put('/bancoQuestao', BancoQuestaoAlt)
}

export function excluirBancoQuestao(idBancoQuestao: string){
    return http.delete(`/bancoQuestao/${idBancoQuestao}`)
}

export async function  recuperarBancoQuestaosIdProfessor(idProfessor:string){
    var idProf = idProfessor;
    return await http.get(`/bancoQuestao/professor/${idProf}`)
}

export function recuperarPorId(id:string){
    return http.get(`/bancoQuestao/${id}`)
}

export function validarBancoQuestao(BancoQuestao: BancoQuestao){

    var erros: string[] = []
    if(!BancoQuestao){
        erros.push('O Banco Questão não é válido!')
    }

    if(BancoQuestao.nomeBanco.trim() === ''){
        erros.push('Nome do banco precisa ser preenchido') 
    }

    let idMateriatrim = BancoQuestao.idMateria.trim()
    if(idMateriatrim === '99' || idMateriatrim === '' ){
        erros.push('Você deve selecionar uma Matéria válida para a BancoQuestao!')
    }

    return erros
}