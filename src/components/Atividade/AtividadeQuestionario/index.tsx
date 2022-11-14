import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { TituloAtividadeStyled } from "../styledComponentes"
import Questionario from "../../Questionario";
declare interface Props{
    atividade:AtividadeAluno
}

function AtividadeFormTipoQuest({atividade}: Props){
    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
                <Questionario idBancoQuestao={atividade.idBancoQuestao} idAtividade={atividade.id}></Questionario>
            </TituloAtividadeStyled>
            
        </div>
    )
}

export default AtividadeFormTipoQuest