import http from '../utils/requests';
import { Credenciais, Usuario, Token } from '../types/usuario'

export async function login(credencias: Credenciais) {
    return http.post<Usuario>(`/authenticate`, credencias)
        .then(response => {
            // const usuarioLogado: Usuario = {
            //     nome: response.data.nome,
            //     email: response.data.email,
            //     jwttoken: response.data.jwttoken,
            //     autenticado: true,
            //     tipoUsuario: response.data.tipoUsuario,
            //     nomeEscola: response.data.nomeEscola,
            //     serie: response.data.serie,

            // }
            const usuarioLogado = (response.data as Usuario)
            storeToken(response.data.jwttoken)
            storeUsuarioLogado(usuarioLogado)
            return usuarioLogado;
        }).catch(err => {
            throw err
        })
}

export async function logout() {
    window.localStorage.removeItem('usuario_logado')
    excluirToken();
}

export const storeToken = (token: Token) => {
    window.localStorage.setItem('jwttoken', token);
}
export const getToken = () => {
    var token = window.localStorage.getItem('jwttoken') 
    return token
}

export const excluirToken = () => {
    window.localStorage.removeItem('jwttoken')
}

export const storeUsuarioLogado = (usuario: Usuario) => {
    window.localStorage.setItem('usuario_logado', JSON.stringify(usuario));
}

export const getUsuarioLogado = () => {
    let usuarioLogadoJson = window.localStorage.getItem('usuario_logado')
    if (usuarioLogadoJson !== null) {
        const usuarioLogado: Usuario = JSON.parse(usuarioLogadoJson);
        return usuarioLogado;
    }
    return null
}

export const excluirUsuarioLogado = () => {
    window.localStorage.removeItem('usuario_logado')
}


