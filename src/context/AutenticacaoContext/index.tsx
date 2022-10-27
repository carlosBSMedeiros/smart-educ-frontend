import React from 'react';
import { Usuario, Credenciais } from '../../types/usuario'
import { login as LoginService, logout as LogoutService, getUsuarioLogado } from '../../services/Autenticacao.service'
import {fimSessaoTimeout} from '../../components/Alerts'
import { useNavigate } from 'react-router-dom';
import { carregando } from '../../components/Alerts/index'


interface AutenticacaoContextType {
    usuario: Usuario;
    login: (credenciais: Credenciais, onSucces: VoidFunction, onFailure: Function) => void;
    logout: () => void;
}

var AutenticacaoContext = React.createContext<AutenticacaoContextType>(null!);

const usuarioDefault: Usuario =  {
    nome: '',
    email: '',
    jwttoken: '',
    autenticado: false,
    tipoUsuario: '',
    nomeEscola: '',
    idUsuario: '',
    disciplinaProfessor:'',
    idDisciplinaProfessor:99,
    idEscola : ''
}

export function AutenticacaoProvider({ children }: { children: React.ReactNode }) {
    const navegador = useNavigate();
    var [usuario, setUsuario] = React.useState<Usuario>(
        getUsuarioLogado() || usuarioDefault
    );

    async function login(credencias: Credenciais, onSucces: VoidFunction, onFailure: Function) {
        carregando.fire()
        LoginService(credencias).then(usuarioLogado => {
            setUsuario(usuarioLogado)
            iniciarTimerExpirarSessao()
            onSucces();
        }).catch(error => {
            if (error.response) {
                onFailure(error.response.data)
            } else {
                onFailure('Erro desconhecido no login!')
            }
        })
    };

    async function logout() {
        setUsuario(usuarioDefault)
        LogoutService();
        navegador('login');
    };

    function iniciarTimerExpirarSessao(){
        setTimeout(()=>{
            fimSessaoTimeout.fire({
                title: 'Sua sessão expirou. Você será redirecionado a página de login'
            }).then(() =>{
                logout();
            })
        }, 60 * 60 * 980); //59min
    }

    var value = { usuario, login, logout };

    return <AutenticacaoContext.Provider value={value}>{children}</AutenticacaoContext.Provider>;
}

export function useAutenticacaoContext() {
    return React.useContext(AutenticacaoContext);
}


