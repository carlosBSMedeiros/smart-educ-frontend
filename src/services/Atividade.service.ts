import http from '../utils/requests';

export function recuperarAtividadesIdTrilha(idTrilha:string){
    return http.get(`/atividade/trilha/${idTrilha}`)
}