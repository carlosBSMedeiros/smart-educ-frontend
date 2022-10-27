import { useNavigate } from "react-router-dom";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import BancoQuestoesForm from "../BancoQuestoesForm";

declare interface Props {
  isNovo: boolean;
};

function OrquestradorBancoQuestoes({ isNovo }: Props) {
  var autenticador = useAutenticacaoContext();
  var navegador = useNavigate();
  
  let tipoUsuario = autenticador.usuario.tipoUsuario
  if (tipoUsuario === 'PROFESSOR' || tipoUsuario === 'ADMIN') {
    return <BancoQuestoesForm isNovo={isNovo} />
  } else {
    navegador("/home", { replace: true })
    throw new DOMException('Oops, você não tem permissão a essa área!');
  }
}

export default OrquestradorBancoQuestoes;