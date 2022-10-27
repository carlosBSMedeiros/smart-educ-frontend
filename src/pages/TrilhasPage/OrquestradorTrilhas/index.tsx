import { useNavigate, useParams } from "react-router-dom";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import TrilhasForm from "../TrilhasForm";

declare interface Props{
    isNovo:boolean
}

function OrquestradorTrilhas({isNovo}:Props){
    var autenticador = useAutenticacaoContext();
    var navegador = useNavigate();

    let tipoUsuario = autenticador.usuario.tipoUsuario
    if (tipoUsuario === 'ALUNO') {
        return <TrilhasForm isNovo={isNovo} />
    } else if(tipoUsuario === 'PROFESSOR' || tipoUsuario ==='ADMIN' ) {
        return <TrilhasForm isNovo={isNovo} />
    } else{
        navegador("/home", { replace: true })
        throw new DOMException('Ocorreu um erro ao tentar acessar a página de trilhas')
    }

}

export default OrquestradorTrilhas