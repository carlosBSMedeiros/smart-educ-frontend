import { AtividadeConcluida } from './../types/AtividadeConcluida';
import { RespostaQuest } from '../types/RespostaQuest';
import http from '../utils/requests';

export function recuperarAtividadesIdTrilha(idTrilha:string){
    return http.get(`/atividade/trilha/${idTrilha}`)
}

export function getById(id:string){
    return http.get(`/atividade/${id}`)
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