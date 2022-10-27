import http from '../utils/requests';

export function recuperarFuncionalidadesInfos(){
    return http.get(`/funcionalidades`)
}