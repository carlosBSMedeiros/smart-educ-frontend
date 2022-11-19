import { useNavigate, useParams } from "react-router-dom";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import AtividadeForm from "../AtividadeForm";

declare interface Props{
    isNovo:boolean
}

function OrquestradorAtividade({isNovo}:Props){
    var autenticador = useAutenticacaoContext();
    var navegador = useNavigate();

    let tipoUsuario = autenticador.usuario.tipoUsuario
    if (tipoUsuario === 'PROFESSOR' || tipoUsuario === 'ADMIN') {
      return <AtividadeForm isNovo={isNovo} />
    } else {
      navegador("/home", { replace: true })
      throw new DOMException('Oops, você não tem permissão a essa área!');
    }

}

export default OrquestradorAtividade