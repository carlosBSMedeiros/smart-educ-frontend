import { Atividade } from '../types/atividade';
import { AtividadeConcluida } from '../types/AtividadeConcluida';
import { RespostaQuest } from '../types/RespostaQuest';
import http from '../utils/requests';



export function incluirAtividade(novaAtividade: Atividade){
    novaAtividade.iframe = normalizaDados(novaAtividade.iframe);
    return http.post(`/atividade`, novaAtividade)
}

export function alterarAtividade(atividadeAlt: Atividade){
    atividadeAlt.iframe = normalizaDados(atividadeAlt.iframe);
    return http.put(`/atividade`, atividadeAlt)
}

export function excluirAtividade(idAtividade: string){
    return http.delete(`/atividade/${idAtividade}`)
}

export function recuperarAtividadesIdProfessor(idProfessor:string){
    return http.get(`/atividade/professor/${idProfessor}`)
}

export function recuperarAtividadesAluno(){
    return http.get('/atividade')
}

export function recuperarPorId(id:string){
    return http.get(`/atividade/${id}`)
}

export function recuperarParaAluno(idAtividade:string, idAluno:string){
    return http.get(`/atividade/aluno/${idAluno}/atividade/${idAtividade}`)
}

export function validarAtividade(atividade: Atividade){

    var erros: string[] = []
    if(!atividade){
        erros.push('A atividade não é válida!')
    }


    if(atividade.tipoAtividade === 'TEXTO'){
        if(atividade.contudoTexto.trim() === ''){
            erros.push('O texto não pode ser nulo') 
        }
    }

    if(atividade.idBancoQuestao === 'QUEST'){
        if(atividade.contudoTexto.trim() === ''){
            erros.push('O Banco de questão não pode ser nulo') 
        }
    }

    if(atividade.idBancoQuestao === 'JOGO'){
        if(atividade.iframe.trim() === ''){
            erros.push('O Iframe do jogo não pode ser nulo') 
        }
    }

    if(atividade.enunciado.trim() === ''){
        erros.push('Enunciado não pode ser Nulo')
    }

    if(atividade.titulo.trim() === ''){
        erros.push('Título não pode ser Nulo')
    }

    if(atividade.ordem === 99 || atividade.ordem===null){
        erros.push('ordem deve ser preenchido')
    }

    return erros
}




export function recuperarAtividadesIdTrilha(idTrilha:string){
    return http.get(`/atividade/trilha/${idTrilha}`)
}

export function getById(id:string){
    return http.get(`/atividade/${id}`)
}


const normalizaDados = (iframe:string) =>{
    return iframe.replaceAll('"',"'")
}


export function concluirJogo(idAtividade:string, idAluno:string,){
    let concluida:AtividadeConcluida = {
        id: "",
        idTrilha:"",
        idAtividade:idAtividade,
        idAluno:idAluno,
        pontos:10
    };
    
    return http.post('/atividade/concluir', concluida)
}

export function concluirQuest(respostaQuests:RespostaQuest[], idAtividade:string, idAluno:string,){
    let concluida:AtividadeConcluida = {
        id: "",
        idTrilha:"",
        idAtividade:idAtividade,
        idAluno:idAluno,
        pontos:calculatePontos(respostaQuests)
    };
    
    return http.post('/atividade/concluir', concluida)
}

export function concluirTexto(idAtividade:string, idAluno:string,){
    let concluida:AtividadeConcluida = {
        id: "",
        idTrilha: "",
        idAtividade: idAtividade,
        idAluno: idAluno,
        pontos: 20
    };
    
    return http.post('/atividade/concluir', concluida)
}

const calculatePontos =  (respostaQuests:RespostaQuest[]) =>{
    let pontos = 0;
    respostaQuests.forEach(e => {
        if(e.respostaAluno === e.respostaCorreta){
            pontos+=10;
            console.log(pontos);
        }
    })

    return pontos;
}
