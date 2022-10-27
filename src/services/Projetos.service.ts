import http from '../utils/requests';

export function recuperarProjetos(){
    return http.get(`/funcionalidades/projetos`)
}