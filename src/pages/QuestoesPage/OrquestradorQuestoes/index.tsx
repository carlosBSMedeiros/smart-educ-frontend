import { useNavigate } from "react-router-dom";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import QuestoesForm from "../QuestoesForm";

declare interface Props {
  isNovo: boolean;
};

function OrquestradorQuestoes({ isNovo }: Props) {
  var autenticador = useAutenticacaoContext();
  var navegador = useNavigate();
  
  let tipoUsuario = autenticador.usuario.tipoUsuario
  if (tipoUsuario === 'PROFESSOR' || tipoUsuario === 'ADMIN') {
    return <QuestoesForm isNovo={isNovo} />
  } else {
    navegador("/home", { replace: true })
    throw new DOMException('Oops, você não tem permissão a essa área!');
  }
}

export default OrquestradorQuestoes;